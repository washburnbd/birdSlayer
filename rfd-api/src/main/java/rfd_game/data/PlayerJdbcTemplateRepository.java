package rfd_game.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import rfd_game.data.mappers.*;
import rfd_game.models.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PlayerJdbcTemplateRepository implements PlayerRepository {

    private final JdbcTemplate jdbcTemplate;

    public PlayerJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Player addPlayer(Player player){
        final String sql = "insert into player (game_user_id, current_hp, max_hp, defense, damage, boss_slain) values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,player.getGameUserId());
            ps.setInt(2,player.getCurrentHp());
            ps.setInt(3,player.getMaxHp());
            ps.setInt(4,player.getDefense());
            ps.setInt(5,player.getDamage());
            ps.setBoolean(6,player.isBossSlain());
            return ps;
        },keyHolder);
        if(rowsAffected <= 0){
            return null;
        }
        player.setPlayerId(keyHolder.getKey().intValue());
        List<Room> rooms = new ArrayList<>();
        player.setRoomsGenerated(rooms);
        player.setEquippedArmor(null);
        player.setEquippedWeapon(null);
        addInventory(player.getPlayerId());
        //setPlayerUp(player);
        return player;
    }

    @Override
    public Boolean updatePlayer(Player player) {

        int equippedWeaponId = player.getEquippedWeaponId();
        int equippedArmorId = player.getEquippedArmorId();
        int currentHp = player.getCurrentHp();
        int maxHp = player.getMaxHp();
        int defense = player.getDefense();
        int damage = player.getDamage();
        boolean bossSlain = player.isBossSlain();
        int playerId = player.getPlayerId();

        final String sql = "update player set " +
                "equipped_weapon_id = ?, " +
                "equipped_armor_id = ?, " +
                "current_hp = ?, " +
                "max_hp = ?, "+
                "defense = ?, " +
                "damage = ?, " +
                "boss_slain = ? " +
                "where player_id = ?;";
        return jdbcTemplate.update(sql,equippedWeaponId,equippedArmorId,currentHp,
                maxHp,defense, damage, bossSlain, playerId) > 0;
    }

    @Override
    public Inventory addInventory(int playerId){
        final String sql = "insert into inventory (player_id) values (?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,playerId);
            return ps;
        },keyHolder);
        if(rowsAffected <= 0){
            return null;
        }
        Inventory inventory = new Inventory();
        inventory.setInventoryId(keyHolder.getKey().intValue());
        inventory.setPlayerId(playerId);
        List<Weapon> weapons = new ArrayList<>();
        List<Armor> armors = new ArrayList<>();
        inventory.setWeaponList(weapons);
        inventory.setArmorList(armors);
        return inventory;
    }
    @Override
    public List<Inventory> findAllInventory(){
        final String sql = "select player_id, inventory_id from inventory;";
        return jdbcTemplate.query(sql, new InventoryMapper());
    }
    @Override
    public Inventory findPlayerInventory(int playerId){
        final String sql = "select inventory_id, player_id from inventory where player_id = ?;";
        return jdbcTemplate.query(sql, new InventoryMapper(),playerId).stream().findFirst().orElse(null);
    }

    @Override
    public Player findPlayerById(int playerId){

        final String sql = "select player_id, game_user_id, current_hp, max_hp," +
                "defense, damage, boss_slain, equipped_weapon_id, equipped_armor_id from player " +
                "where player_id = ?;";
        Player player = jdbcTemplate.query(sql, new PlayerMapper(), playerId).stream()
                .findFirst().orElse(null);
        if(player == null){
            return null;
        }
        setPlayerUp(player);

        return player;
    }
    @Override
    public List<Player> findAllPlayer(){
        final String sql = "select player_id, game_user_id, current_hp, max_hp, defense, damage, boss_slain, equipped_weapon_id, equipped_armor_id from player;";
        List<Player> players = jdbcTemplate.query(sql, new PlayerMapper());
        for(Player player : players){
            setPlayerUp(player);
        }
        return players;
    }

    private void setPlayerUp (Player player){
        player.setRoomsGenerated(findPlayerRooms(player.getPlayerId()));

        Inventory inventory = findPlayerInventory(player.getPlayerId());
        inventory.setWeaponList(getInventoryWeapons(player.getPlayerId()));
        inventory.setArmorList(getInventoryArmor(player.getPlayerId()));
        player.setInventory(inventory);

        if(player.getEquippedWeaponId() != 0){
            Weapon w = findWeaponById(player.getEquippedWeaponId());
            player.setEquippedWeapon(w);
        }

        if(player.getEquippedArmorId() != 0){
            Armor a = findArmorById(player.getEquippedArmorId());
            player.setEquippedArmor(a);
        }
    }



    @Override
    public boolean updateCurrentHP(int hp, int playerId){

        final String sql ="update player set " +
                "current_hp = ? " +
                "where player_id = ?;";

        return jdbcTemplate.update(sql, hp, playerId) > 0;
    }

    @Override
    public boolean updateMaxHP(int hp, int playerId){

        final String sql ="update player set " +
                "max_hp = ? " +
                "where player_id = ?;";

        return jdbcTemplate.update(sql, hp, playerId) > 0;
    }

    @Override
    public boolean updateDamage(int damage, int playerId){

        final String sql ="update player set " +
                "damage = ? " +
                "where player_id = ?;";

        return jdbcTemplate.update(sql, damage, playerId) > 0;
    }

    @Override
    public boolean updateDefense(int defense, int playerId){

        final String sql ="update player set " +
                "defense = ? " +
                "where player_id = ?;";

        return jdbcTemplate.update(sql, defense, playerId) > 0;
    }

    @Override
    public boolean updateBossSlain(int playerId){

        final String sql ="update player set " +
                "boss_slain = true " +
                "where player_id = ?;";

        return jdbcTemplate.update(sql, playerId) > 0;
    }

    private List<Room> findPlayerRooms(int playerId){
        final String sql = "select room_id,player_id,weapon_id,armor_id,enemy_id,enemy_hp,layout,room_cleared from room where player_id = ?;";
        return jdbcTemplate.query(sql,new RoomMapper(),playerId);
    }

    private Weapon findWeaponById(int weaponId){
        final String sql = "select weapon_id, weapon_damage from weapon where weapon_id = ?;";
        return jdbcTemplate.query(sql, new WeaponMapper(), weaponId).stream().findFirst().orElse(null);
    }
    private Armor findArmorById(int armorId){
        final String sql = "select armor_id, armor_defense from armor where armor_id = ?;";
        return jdbcTemplate.query(sql, new ArmorMapper(), armorId).stream().findFirst().orElse(null);
    }


    @Override
    public Weapon addWeapon(Weapon weapon, int playerId){
        Inventory playerInventory = findAllInventory().stream().filter(i->i.getPlayerId() == playerId).findFirst().orElse(null);
        if(playerInventory == null){
            return null;
        }
        final String sql = "insert into inventory_weapon (inventory_id,weapon_id) values (?,?);";
        boolean success = jdbcTemplate.update(sql,
                playerInventory.getInventoryId(),
                weapon.getWeaponId()) > 0;
        if(!success){
            return null;
        }
        final String sql2 = "select inventory_id, weapon_id from inventory_weapon where inventory_id=?;";
        var playerInventoryWeapons = jdbcTemplate.query(sql2, new InventoryWeaponMapper(),playerInventory.getInventoryId());

        List<Weapon> playerWeapons = new ArrayList<>();
        for(InventoryWeapon iw : playerInventoryWeapons){
            playerWeapons.add(findWeaponById(iw.getWeaponId()));
        }
        playerInventory.setWeaponList(playerWeapons);
        return weapon;
    }
    @Override
    public Armor addArmor(Armor armor, int playerId){
        Inventory playerInventory = findAllInventory().stream().filter(i->i.getPlayerId() == playerId).findFirst().orElse(null);
        if(playerInventory == null){
            return null;
        }
        final String sql = "insert into inventory_armor (inventory_id,armor_id) values (?,?);";
        boolean success = jdbcTemplate.update(sql,
                playerInventory.getInventoryId(),
                armor.getArmorId()) > 0;
        if(!success){
            return null;
        }
        final String sql2 = "select inventory_id, armor_id from inventory_armor where inventory_id=?;";
        var playerInventoryArmor = jdbcTemplate.query(sql2, new InventoryArmorMapper(),playerInventory.getInventoryId());

        List<Armor> playerArmors = new ArrayList<>();
        for(InventoryArmor ia : playerInventoryArmor){
            playerArmors.add(findArmorById(ia.getArmorId()));
        }
        playerInventory.setArmorList(playerArmors);
        return armor;
    }

    @Override
    public List<Weapon> getInventoryWeapons (int playerId){
        Inventory playerInventory = findAllInventory().stream().filter(i->i.getPlayerId() == playerId).findFirst().orElse(null);
        if(playerInventory == null){
            return null;
        }
        final String sql = "select inventory_id, weapon_id from inventory_weapon where inventory_id=?;";
        var playerInventoryWeapons = jdbcTemplate.query(sql, new InventoryWeaponMapper(),playerInventory.getInventoryId());

        List<Weapon> weaponList = new ArrayList<>();

        for (InventoryWeapon inventoryWeapon : playerInventoryWeapons){
            int weaponId = inventoryWeapon.getWeaponId();
            Weapon w = findWeaponById(weaponId);
            weaponList.add(w);
        }

        return weaponList;
    }

    @Override
    public List<Armor> getInventoryArmor (int playerId){
        Inventory playerInventory = findAllInventory().stream().filter(i->i.getPlayerId() == playerId).findFirst().orElse(null);
        if(playerInventory == null){
            return null;
        }
        final String sql2 = "select inventory_id, armor_id from inventory_armor where inventory_id=?;";
        var playerInventoryArmor = jdbcTemplate.query(sql2, new InventoryArmorMapper(),playerInventory.getInventoryId());

        List<Armor> armorList = new ArrayList<>();

        for(InventoryArmor inventoryArmor : playerInventoryArmor){
            int armorId = inventoryArmor.getArmorId();
            Armor a = findArmorById(armorId);
            armorList.add(a);
        }

        return armorList;
    }


}
