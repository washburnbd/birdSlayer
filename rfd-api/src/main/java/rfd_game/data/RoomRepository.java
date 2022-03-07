package rfd_game.data;

import rfd_game.models.Armor;
import rfd_game.models.Enemy;
import rfd_game.models.Room;
import rfd_game.models.Weapon;

import java.util.List;

public interface RoomRepository {
    //createRoom
    Room createRoom(Room room);

    // updateEnemyHp
    boolean updateEnemyHp(Room room);

    //updateRoomLoot
    boolean updateRoomLoot(Room room);

    //updateRoomClearance
    boolean updateRoomClearance(Room room);

    //updateRoomLayout
    boolean updateRoomLayout(Room room);

    //findAllEnemy / findEnemyById
    List<Enemy> findAllEnemy();

    Enemy findEnemyById(int enemyId);

    // findAllWeapon / findWeaponById
    List<Weapon> findAllWeapon();

    Weapon findWeaponById(int weaponId);

    //findAllArmor / findArmorById
    List<Armor> findAllArmor();

    Armor findArmorById(int armorId);

    Room findRoomById(int roomId);
}
