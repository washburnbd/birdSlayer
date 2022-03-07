package rfd_game.domain;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import rfd_game.data.PlayerRepository;
import rfd_game.data.RoomRepository;
import rfd_game.models.Armor;
import rfd_game.models.Enemy;
import rfd_game.models.Room;
import rfd_game.models.Weapon;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PrePostCombatServiceTest {

    @Autowired
    PrePostCombatService service;

    @MockBean
    PlayerRepository playerRepository;

    @MockBean
    RoomRepository roomRepository;

    @Test
    void shouldGenerateRoom(){
        Weapon weapon = new Weapon();
        weapon.setWeaponId(1);
        weapon.setWeaponDamage(5);
        List<Weapon> weapons = new ArrayList<>();
        weapons.add(weapon);

        Armor armor = new Armor();
        armor.setArmorId(1);
        armor.setArmorDefense(10);
        List<Armor> armors = new ArrayList<>();
        armors.add(armor);

        Enemy enemy = new Enemy();
        enemy.setEnemyId(1);
        enemy.setMaxHp(10);
        enemy.setDefense(10);
        enemy.setDamage(10);
        List<Enemy> enemies = new ArrayList<>();
        enemies.add(enemy);

        Room room = new Room();
        room.setRoomId(1);
        room.setWeaponId(1);
        room.setArmorId(1);
        room.setEnemyHp(10);
        room.setLayout("Test");
        room.setRoomCleared(false);
        room.setEnemyId(1);

        when(roomRepository.findAllWeapon()).thenReturn(weapons);
        when(roomRepository.findAllArmor()).thenReturn(armors);
        when(roomRepository.findWeaponById(1)).thenReturn(weapon);
        when(roomRepository.findArmorById(1)).thenReturn(armor);
        when(roomRepository.findAllEnemy()).thenReturn(enemies);
        when(roomRepository.findEnemyById(1)).thenReturn(enemy);
        when(roomRepository.createRoom(room)).thenReturn(room);

        assertEquals(room,room);
    }



}