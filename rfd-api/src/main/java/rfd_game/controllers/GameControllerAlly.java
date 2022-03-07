package rfd_game.controllers;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import rfd_game.domain.StartGameService;
import rfd_game.models.GameUser;
import rfd_game.models.Player;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/rfd")
public class GameControllerAlly {

    //Starting a game
    //GET
    //find a player attached to your username
    //POST
    //create a player

    private final StartGameService service;

    public GameControllerAlly(StartGameService service) {
        this.service = service;
    }

    //Starting a game
    //GET game user and their list of players
    @GetMapping("/{gameUserId}/players")
    public List<Player> getPlayersByGameUserId(@PathVariable int gameUserId) {
        return service.getUserPlayers(gameUserId);
    }


    //POST
    //create a player
    @PostMapping("/create_player")
    public ResponseEntity<Object> createPlayer(@RequestBody @Valid Player player) throws DataAccessException {
        Player createdPlayer = service.createPlayer(player);
        if(createdPlayer == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

}


