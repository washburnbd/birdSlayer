package rfd_game.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rfd_game.domain.CombatService;
import rfd_game.models.Player;
import rfd_game.models.Room;

@RestController
@RequestMapping("/rfd")
public class GameControllerBrandon {

    private final CombatService combatService;

    public GameControllerBrandon(CombatService combatService){
        this.combatService=combatService;
    }

    @GetMapping("/findPlayer/{playerId}")
    public Player findPlayerById(@PathVariable int playerId){
        return combatService.getPlayerById(playerId);
    }

    @GetMapping("/findRoom/{roomId}")
    public Room findRoomById(@PathVariable int roomId){
        return combatService.getRoomById(roomId);
    }

    @PutMapping("/attack/{roomId}/{playerId}")
    public ResponseEntity<?> attack(@PathVariable int roomId, @PathVariable int playerId){
        Room room = combatService.getRoomById(roomId);
        Player player = combatService.getPlayerById(playerId);
        if(room == null || player == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        int result = combatService.playerAttack(player, room);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/defend/{roomId}/{playerId}")
    public ResponseEntity<?> defend(@PathVariable int roomId, @PathVariable int playerId){
        Room room = combatService.getRoomById(roomId);
        Player player = combatService.getPlayerById(playerId);
        if(room == null || player == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        int result = combatService.playerDefend(player, room);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/slay_boss/{playerId}")
    public ResponseEntity<?> slayBoss(@PathVariable int playerId){
        boolean slain = combatService.updateBossSlain(playerId);
        return new ResponseEntity<>(slain,HttpStatus.OK);

    }

    //Combat
    //GET
    // get player stats
    // get enemy stats

    // these after you post attack or defend
    // get attack results (you attack or are attacked)
    // get enemy move

    //POST
    // attack
    // defend

    //PUT
    //at some point add a feature that you can use inventory
    //DELETE
}
