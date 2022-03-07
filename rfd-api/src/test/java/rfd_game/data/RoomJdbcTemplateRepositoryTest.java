package rfd_game.data;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import rfd_game.models.Enemy;
import rfd_game.models.Room;
import rfd_game.models.Weapon;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RoomJdbcTemplateRepositoryTest {

    @Autowired
    RoomJdbcTemplateRepository repository;

    @Test
    void shouldAddRoom() {
        Room room = new Room();
        room.setWeaponId(1);
        room.setArmorId(1);
        room.setEnemyId(1);
        room.setEnemyHp(1);
        room.setLayout("Test");
        room.setRoomCleared(false);
        Room actual = repository.createRoom(room);
        assertNotNull(actual);
        assertEquals(5, actual.getRoomId());
    }

    @Test
    void shouldUpdateEnemyHp() {
        Room room = repository.findRoomById(1);
        room.setEnemyHp(5);
        assertTrue(repository.updateEnemyHp(room));
        Room actual = repository.findRoomById(1);
        assertEquals(1, actual.getEnemyHp());
    }

    @Test
    void shouldUpdateRoomClearance() {
        Room room = repository.findRoomById(1);
        room.setRoomCleared(true);
        assertTrue(repository.updateRoomClearance(room));
        assertTrue(repository.findRoomById(1).isRoomCleared());
    }


    @Test
    void shouldUpdateRoomLayout() {
        Room room = repository.findRoomById(1);
        room.setLayout("Testing Update to Layout");
        assertTrue(repository.updateRoomLayout(room));
        Room actual = repository.findRoomById(1);
        assertEquals("Testing Update to Layout", actual.getLayout());
    }

    @Test
    void shouldFind2Enemies() {
        List<Enemy> enemies = repository.findAllEnemy();
        assertNotNull(enemies);
        assertTrue(enemies.size() == 2);
    }

    @Test
    void shouldFind2Weapons() {
        List<Weapon> weapons = repository.findAllWeapon();
        System.out.println(weapons);
        assertNotNull(weapons);
        assert(weapons.size() == 2);
    }

    @Test
    void shouldNotFindMissingEnemy() {
        Enemy missing = repository.findEnemyById(50);
        assertNull(missing);
    }

}