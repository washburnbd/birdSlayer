package rfd_game.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import rfd_game.data.PlayerRepository;
import rfd_game.data.RoomRepository;
import rfd_game.models.Enemy;
import rfd_game.models.Room;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CombatServiceTest {

    @Autowired
    CombatService service;

    @MockBean
    PlayerRepository playerRepository;

    @MockBean
    RoomRepository roomRepository;


    Room makeRoom(){
        Room room = new Room();
        room.setRoomId(1);
        Enemy enemy = makeEnemy();


        return room;
    }

    private Enemy makeEnemy() {
        Enemy enemy = new Enemy();

        return enemy;
    }

}