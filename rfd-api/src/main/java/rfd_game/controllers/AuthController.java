package rfd_game.controllers;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import rfd_game.domain.GameUserService;
import rfd_game.models.GameUser;
import rfd_game.security.JwtConverter;

import javax.validation.ValidationException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/rfd")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtConverter jwtConverter;
    private final GameUserService gameUserService;

    public AuthController(AuthenticationManager authenticationManager, JwtConverter jwtConverter, GameUserService gameUserService) {
        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
        this.gameUserService = gameUserService;
    }

    @PostMapping("/create_game_user")
    public ResponseEntity<?> createGameUser(@RequestBody Map<String, String> credentials){
        GameUser gameUser = null;

        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            gameUser = gameUserService.createGameUser(username,password);
        } catch (ValidationException ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        } catch (DuplicateKeyException ex){
            return new ResponseEntity<>("That username already exists",HttpStatus.BAD_REQUEST);
        }
        HashMap<String, Integer> map = new HashMap<>();
        map.put("gameUserId",gameUser.getGameUserId());
        return new ResponseEntity<>(map, HttpStatus.CREATED);

        }
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> credentials) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                credentials.get("username"), credentials.get("password")
        );

        try{
            Authentication authentication = authenticationManager.authenticate((authToken));

            if (authentication.isAuthenticated()){
                GameUser user = (GameUser) authentication.getPrincipal();

                String jwtToken = jwtConverter.getTokenFromUser(user);

                HashMap<String, String> map = new HashMap<>();
                map.put("jwt_token", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.CREATED);
            }
        } catch (AuthenticationException ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
    }

    @GetMapping("/get_game_user/{id}")
    public GameUser getGameUserById(@PathVariable int id){
        return gameUserService.findGameUserById(id);

    }
}
