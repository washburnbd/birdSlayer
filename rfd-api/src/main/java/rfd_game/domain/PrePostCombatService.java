package rfd_game.domain;

import org.springframework.stereotype.Service;
import rfd_game.data.PlayerRepository;
import rfd_game.data.RoomRepository;
import rfd_game.models.*;

import java.util.List;

@Service
public class PrePostCombatService {
    private final PlayerRepository playerRepository;
    private final RoomRepository roomRepository;

    public PrePostCombatService(PlayerRepository playerRepository, RoomRepository roomRepository) {
        this.playerRepository = playerRepository;
        this.roomRepository = roomRepository;
    }
    //PUBLIC METHODS
    // Generate Room
    public Room generateRoom(int playerId){
        Room room = new Room();
        Weapon weapon = generateWeapon();
        Armor armor = generateArmor();
        Enemy enemy = generateEnemy();
        String randomLayout = generateRandomLayout();

        // Randomly chooses if loot is armor or weapon, then generates it
        int coin = (int) Math.floor(Math.random()*2);
        if(coin < 1){
            room.setWeaponId(weapon.getWeaponId());
            room.setArmorId(0);
        } else {
            room.setWeaponId(0);
            room.setArmorId(armor.getArmorId());
        }
        room.setPlayerId(playerId);
        room.setEnemyId(enemy.getEnemyId());
        room.setEnemyHp(enemy.getMaxHp());
        room.setLayout(randomLayout);
        room.setRoomCleared(false);

        return roomRepository.createRoom(room);
    }
    public Room generateFirstRoom(int playerId){
        Room room = new Room();
        room.setPlayerId(playerId);
        room.setEnemyId(0);
        room.setEnemyHp(0);
        room.setWeaponId(1);
        room.setArmorId(1);
        room.setLayout("Start Room");
        room.setRoomCleared(true);
        return roomRepository.createRoom(room);
    }

    public Room generateBossRoom(int playerId){
        Room room = new Room();
        Enemy enemy = roomRepository.findEnemyById(4);

        room.setWeaponId(0);
        room.setArmorId(0);
        room.setPlayerId(playerId);
        room.setEnemyId(enemy.getEnemyId());
        room.setEnemyHp(enemy.getMaxHp());
        room.setLayout("Boss Lair");
        room.setRoomCleared(false);

        return roomRepository.createRoom(room);
    }

    public boolean updatePlayer (Player player){
        return playerRepository.updatePlayer(player);
    }

    // Get Inventory
    public List<Weapon> getPlayerWeapons(int playerId){
        return playerRepository.getInventoryWeapons(playerId);
    }
    public List<Armor> getPlayerArmors(int playerId){
        return playerRepository.getInventoryArmor(playerId);
    }
    // Add item to inventory
    public Weapon addWeapon(Weapon weapon, int playerId){
        return playerRepository.addWeapon(weapon, playerId);
    }
    public Armor addArmor(Armor armor, int playerId){
        return playerRepository.addArmor(armor, playerId);
    }

    // Get player / weapons / armor
    public Player findPlayerById(int playerId){
        return playerRepository.findPlayerById(playerId);
    }
    public Weapon findWeaponById(int weaponId){
        return roomRepository.findWeaponById(weaponId);
    }
    public Armor findArmorById(int armorId){
        return roomRepository.findArmorById(armorId);
    }

    public Inventory findPlayerInventory(int playerId){
        Inventory inventory = playerRepository.findAllInventory().stream().filter(i->i.getPlayerId() == playerId).findFirst().orElse(null);
        if(inventory == null){
            return null;
        }
        List<Weapon> weaponList = getPlayerWeapons(playerId);
        List<Armor> armorList = getPlayerArmors(playerId);
        inventory.setWeaponList(weaponList);
        inventory.setArmorList(armorList);
        return inventory;
    }

    //PRIVATE METHODS
    //Generate Enemy
    private List<Enemy> findAllEnemy(){
        return roomRepository.findAllEnemy();
    }
    private Enemy generateEnemy(){
        List<Enemy> enemies= findAllEnemy();
        int randomEnemyId = (int) Math.floor(Math.random()*(enemies.size()-2))+1;
        return roomRepository.findEnemyById(randomEnemyId);
    }

    // Generate Loot

    private List<Armor> findAllArmor(){
        return roomRepository.findAllArmor();
    }


    private Weapon generateWeapon(){
        List<Weapon> weapons = roomRepository.findAllWeapon();
        int numberOfWeapons = weapons.size();
        int randomWeaponId = (int) Math.floor(Math.random()*(numberOfWeapons-1))+1;
        return roomRepository.findWeaponById(randomWeaponId);
    }
    private Armor generateArmor(){
        List<Armor> armors = findAllArmor();
        int randomArmorId = (int) Math.floor(Math.random()*(armors.size()-1))+1;
        return roomRepository.findArmorById(randomArmorId);
    }

    private String generateRandomLayout(){
        int randomNumber = (int) Math.floor(Math.random()*5);

        String toReturn = "default room";

        switch(randomNumber){
            case 0:
                toReturn = "Dungeon Room";
                break;
            case 1:
                toReturn = "Dark Corridor";
                break;
            case 2:
                toReturn = "Long Hallway";
                break;
            case 3:
                toReturn = "Enemy Lair";
                break;
            case 4:
                toReturn = "Enemy Nest";
                break;
        }
        return toReturn;
    }


}
