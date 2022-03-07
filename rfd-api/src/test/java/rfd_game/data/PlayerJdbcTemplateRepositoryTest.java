package rfd_game.data;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import rfd_game.data.mappers.PlayerMapper;
import rfd_game.models.Player;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class PlayerJdbcTemplateRepositoryTest {


    @Autowired
    PlayerJdbcTemplateRepository repository;

    @Test
    void shouldFindPlayerById(){
        Player player1 = repository.findPlayerById(1);
        assertEquals(player1.getPlayerId(),1);
        assertEquals(player1.getPlayerId(),1);
        assertEquals(player1.getGameUserId(),1);
    }
    @Test
    void shouldNotFindMissingPlayer(){
        Player missing = repository.findPlayerById(42);
        assertNull(missing);
    }

    @Test
    void shouldUpdateCurrentHp(){
        boolean result = repository.updateCurrentHP(25,1);
        assertTrue(result);
        assertEquals(25,repository.findPlayerById(1).getCurrentHp());
    }
    @Test
    void shouldNotUpdateCurrentHpMissing(){
        boolean result = repository.updateCurrentHP(25,42);
        assertFalse(result);
    }

    @Test
    void shouldUpdateMaxHp(){
        boolean result = repository.updateMaxHP(40,1);
        assertTrue(result);
        assertEquals(40,repository.findPlayerById(1).getMaxHp());
    }
    @Test
    void shouldNotUpdateMaxHpMissing(){
        boolean result = repository.updateMaxHP(40,42);
        assertFalse(result);
    }

    @Test
    void shouldUpdatePlayerDamage(){
        boolean result = repository.updateDamage(42,1);
        assertTrue(result);
        assertEquals(42,repository.findPlayerById(1).getDamage());
    }
    @Test
    void shouldNotUpdatePlayerDamageMissing(){
        boolean result = repository.updateDamage(42,42);
        assertFalse(result);
    }

    @Test
    void shouldUpdatePlayerDefense(){
        boolean result = repository.updateDefense(42,1);
        assertTrue(result);
        assertEquals(42,repository.findPlayerById(1).getDamage());
    }
    @Test
    void shouldNotUpdatePlayerDefenseMissing(){
        boolean result = repository.updateDefense(42,42);
        assertFalse(result);
    }

    @Test
    void shouldUpdateBossSlain(){
        boolean result = repository.updateBossSlain(1);
        assertTrue(result);
        assertTrue(repository.findPlayerById(1).isBossSlain());
    }
    @Test
    void shouldNotUpdateBossSlain(){
        boolean result = repository.updateBossSlain(42);
        assertFalse(result);
    }
}

