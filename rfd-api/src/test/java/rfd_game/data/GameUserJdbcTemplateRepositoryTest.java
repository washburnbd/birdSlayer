package rfd_game.data;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import rfd_game.models.GameUser;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameUserJdbcTemplateRepositoryTest {

    @Autowired
    GameUserJdbcTemplateRepository repository;

    @Test
    void shouldFindGameUserById(){
        GameUser gameUser = repository.findGameUserById(1);
        assertNotNull(gameUser);
        GameUser expected = new GameUser(1,"admin","$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",false,List.of());

        assertEquals(expected,gameUser);
    }

    @Test
    void shouldAddUser(){
        GameUser gameUser = new GameUser(2,"admin","$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa",false,List.of());
        //P@ssw0rd!
        GameUser actual = repository.createGameUser(gameUser);
        assertEquals(actual, gameUser);
    }



}