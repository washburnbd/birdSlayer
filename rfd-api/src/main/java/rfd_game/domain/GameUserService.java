package rfd_game.domain;

import org.springframework.dao.DuplicateKeyException;
import rfd_game.data.GameUserRepository;
import rfd_game.models.GameUser;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;

@Service
public class GameUserService implements UserDetailsService {

    private final GameUserRepository gameUserRepository;
    private final PasswordEncoder encoder;

    public GameUserService(GameUserRepository gameUserRepository,
                           PasswordEncoder encoder) {
        this.gameUserRepository = gameUserRepository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        GameUser gameUser = gameUserRepository.findGameUserByUsername(username);

        if (gameUser == null || !gameUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return gameUser;
    }

    public GameUser findGameUserById(int id){

        return gameUserRepository.findGameUserById(id);
    }

    public GameUser createGameUser(String username, String password) {
        validate(username);
        validatePassword(password);

        password = encoder.encode(password);

        GameUser gameUser = new GameUser(0, username, password, false, List.of());

        return gameUserRepository.createGameUser(gameUser);
    }


    private void validate(String username) {
        if (username == null || username.isBlank()) {
            throw new ValidationException("username is required");
        }

        if (username.length() > 50) {
            throw new ValidationException("username must be less than 50 characters");
        }

        // check if duplicate
        GameUser existing = gameUserRepository.findGameUserByUsername(username);
        if(existing != null){
            throw new DuplicateKeyException("username already exists");
        }
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new ValidationException("password must be at least 8 characters");
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        if (digits == 0 || letters == 0 || others == 0) {
            throw new ValidationException("password must contain a digit, a letter, and a non-digit/non-letter");
        }
    }


}

