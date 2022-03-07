package rfd_game.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rfd_game.domain.CombatService;
import rfd_game.domain.GameUserService;
import rfd_game.domain.PrePostCombatService;
import rfd_game.domain.StartGameService;
import rfd_game.models.*;

import java.util.List;

@RestController
@RequestMapping("/rfd")
public class GameControllerDaniel {

    private final GameUserService gameUserService;
    private final CombatService combatService;
    private final PrePostCombatService prePostCombatService;
    private final StartGameService startGameService;

    public GameControllerDaniel(GameUserService gameUserService, CombatService combatService, PrePostCombatService prePostCombatService, StartGameService startGameService) {
        this.gameUserService = gameUserService;
        this.combatService = combatService;
        this.prePostCombatService = prePostCombatService;
        this.startGameService = startGameService;
    }


    @GetMapping("/{player_id}/weapons")
    public List<Weapon> getWeapons(@PathVariable int player_id){
        return prePostCombatService.getPlayerWeapons(player_id);
    }

    @GetMapping("/{player_id}/armor")
    public List<Armor> getArmor(@PathVariable int player_id){
        return prePostCombatService.getPlayerArmors(player_id);
    }

    @PutMapping("/equip_weapon/{player_id}/{weapon_id}")
    public ResponseEntity<?> equipWeapon(@PathVariable int player_id, @PathVariable int weapon_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        Weapon weapon = prePostCombatService.findWeaponById(weapon_id);
        if(player == null || weapon == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Inventory inventory = prePostCombatService.findPlayerInventory(player_id);
        if(!inventory.getWeaponList().contains(weapon)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        player.setEquippedWeaponId(weapon.getWeaponId());
        player.setEquippedWeapon(weapon);
        boolean didUpdate = prePostCombatService.updatePlayer(player);
        return new ResponseEntity<>(didUpdate, HttpStatus.OK);
    }

    @PutMapping("/equip_armor/{player_id}/{armor_id}")
    public ResponseEntity<?> equipArmor(@PathVariable int player_id, @PathVariable int armor_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        Armor armor = prePostCombatService.findArmorById(armor_id);
        if(player == null || armor == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Inventory inventory = prePostCombatService.findPlayerInventory(player_id);
        if(!inventory.getArmorList().contains(armor)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        player.setEquippedArmor(armor);
        player.setEquippedArmorId(armor.getArmorId());
        boolean didUpdate = prePostCombatService.updatePlayer(player);
        return new ResponseEntity<>(didUpdate, HttpStatus.OK);
    }

    @PutMapping("/pickup_weapon/{player_id}/{weapon_id}")
    public ResponseEntity<?> pickupWeapon(@PathVariable int player_id, @PathVariable int weapon_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        Weapon weapon = prePostCombatService.findWeaponById(weapon_id);
        if(player == null || weapon == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Inventory inventory = prePostCombatService.findPlayerInventory(player_id);
        if(inventory == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        prePostCombatService.addWeapon(weapon,player_id);
        Inventory updatedInventory = prePostCombatService.findPlayerInventory(player_id);
        List<Weapon> newWeapons = updatedInventory.getWeaponList();

        return new ResponseEntity<>(newWeapons, HttpStatus.OK);
    }

    @PutMapping("/pickup_armor/{player_id}/{armor_id}")
    public ResponseEntity<?> pickupArmor(@PathVariable int player_id, @PathVariable int armor_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        Armor armor = prePostCombatService.findArmorById(armor_id);
        if(player == null || armor == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Inventory inventory = prePostCombatService.findPlayerInventory(player_id);
        if(inventory == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        prePostCombatService.addArmor(armor,player_id);
        Inventory updatedInventory = prePostCombatService.findPlayerInventory(player_id);
        List<Armor> newArmors = updatedInventory.getArmorList();

        return new ResponseEntity<>(newArmors,HttpStatus.OK);
    }

    @PostMapping("/create_first_room/{player_id}")
    public ResponseEntity<?> createFirstRoom(@PathVariable int player_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        if(player == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Room firstRoom = prePostCombatService.generateFirstRoom(player_id);
        if(firstRoom == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Room> playerRooms = player.getRoomsGenerated();
        playerRooms.add(firstRoom);
        player.setRoomsGenerated(playerRooms);
        return new ResponseEntity<>(firstRoom, HttpStatus.CREATED);
    }

    @PostMapping("/create_room/{player_id}")
    public ResponseEntity<?> createRoom(@PathVariable int player_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        if(player == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Room generatedRoom = prePostCombatService.generateRoom(player_id);
        if(generatedRoom == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Room> playerRooms = player.getRoomsGenerated();
        playerRooms.add(generatedRoom);
        player.setRoomsGenerated(playerRooms);
        return new ResponseEntity<>(generatedRoom, HttpStatus.CREATED);
    }

    @PostMapping("/create_boss_room/{player_id}")
    public ResponseEntity<?> createBossRoom(@PathVariable int player_id){
        Player player = prePostCombatService.findPlayerById(player_id);
        if(player == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Room bossRoom = prePostCombatService.generateBossRoom(player_id);
        if(bossRoom == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Room> playerRooms = player.getRoomsGenerated();
        playerRooms.add(bossRoom);
        player.setRoomsGenerated(playerRooms);
        return new ResponseEntity<>(bossRoom, HttpStatus.CREATED);
    }

}
