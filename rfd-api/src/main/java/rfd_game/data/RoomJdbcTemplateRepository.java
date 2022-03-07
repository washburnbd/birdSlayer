package rfd_game.data;


import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import rfd_game.data.mappers.ArmorMapper;
import rfd_game.data.mappers.EnemyMapper;
import rfd_game.data.mappers.RoomMapper;
import rfd_game.data.mappers.WeaponMapper;
import rfd_game.models.Armor;
import rfd_game.models.Enemy;
import rfd_game.models.Room;
import rfd_game.models.Weapon;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RoomJdbcTemplateRepository implements RoomRepository {
    private final JdbcTemplate jdbcTemplate;

    public RoomJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    //Public


    //createRoom
    @Override
    public Room createRoom(Room room){
        final String sql = "insert into room (player_id,weapon_id,armor_id,enemy_id,enemy_hp,layout,room_cleared) values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,room.getPlayerId());
            ps.setInt(2,room.getWeaponId());
            ps.setInt(3,room.getArmorId());
            ps.setInt(4,room.getEnemyId());
            ps.setInt(5,room.getEnemyHp());
            ps.setString(6,room.getLayout());
            ps.setBoolean(7, room.isRoomCleared());
            return ps;
        },keyHolder);
        if(rowsAffected <= 0){
            return null;
        }
        room.setRoomId(keyHolder.getKey().intValue());
        return room;
    }


   // updateEnemyHp
    @Override
    public boolean updateEnemyHp(Room room) {
        final String sql = "update room set " +
                "enemy_hp=? " +
                "where room_id = ?;";

        return jdbcTemplate.update(sql,
                room.getEnemyHp(),
                room.getRoomId()) > 0;
    }


    //updateRoomLoot
    @Override
    public boolean updateRoomLoot(Room room){
        final String sql = "update room set " +
                "weapon_id=?, " +
                "armor_id=? " +
                "where room_id = ?;";
        return jdbcTemplate.update(sql,
                room.getWeaponId(),
                room.getArmorId(),
                room.getRoomId()) > 0;
    }

    //updateRoomClearance
    @Override
    public boolean updateRoomClearance(Room room){
        final String sql = "update room set " +
                "room_cleared=? " +
                "where room_id = ?;";
        return jdbcTemplate.update(sql,
                room.isRoomCleared(),
                room.getRoomId()) > 0;
    }

    //updateRoomLayout
    @Override
    public boolean updateRoomLayout(Room room){
        final String sql = "update room set " +
                "layout=? " +
                "where room_id = ?;";
        return jdbcTemplate.update(sql,
                room.getLayout(),
                room.getRoomId()) > 0;
    }

//Private

    //findAllEnemy / findEnemyById
    @Override
    public List<Enemy> findAllEnemy(){
        final String sql = "select enemy_id, max_hp, defense, damage from enemy;";

        return jdbcTemplate.query(sql, new EnemyMapper());
    }



    @Override
    public Enemy findEnemyById(int enemyId) {
        final String sql = "select enemy_id, max_hp, defense, damage from enemy where enemy_id = ?;";

        return jdbcTemplate.query(sql, new EnemyMapper(), enemyId).stream().findFirst().orElse(null);
    }



    // findAllWeapon / findWeaponById
    @Override
    public List<Weapon> findAllWeapon(){
        final String sql ="select weapon_id, weapon_damage from weapon;";
        return jdbcTemplate.query(sql, new WeaponMapper());
    }


    @Override
    public Weapon findWeaponById(int weaponId){
        final String sql = "select weapon_id, weapon_damage from weapon where weapon_id=?;";
        return jdbcTemplate.query(sql, new WeaponMapper(),weaponId).stream().findFirst().orElse(null);
    }

    //findAllArmor / findArmorById
    @Override
    public List<Armor> findAllArmor(){
        final String sql = "select armor_id, armor_defense from armor;";
        return jdbcTemplate.query(sql, new ArmorMapper());
    }

    @Override
    public Armor findArmorById(int armorId){
        final String sql = "select armor_id, armor_defense from armor where armor_id=?;";
        return jdbcTemplate.query(sql, new ArmorMapper(), armorId).stream().findFirst().orElse(null);
    }

    @Override
    public Room findRoomById(int roomId){
        final String sql = "select room_id,player_id, weapon_id, armor_id, enemy_id, enemy_hp, layout, room_cleared from room where room_id=?;";
        return jdbcTemplate.query(sql,new RoomMapper(), roomId).stream().findFirst().orElse(null);

    }

}
