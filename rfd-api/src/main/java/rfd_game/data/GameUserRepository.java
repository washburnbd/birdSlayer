package rfd_game.data;

import org.springframework.transaction.annotation.Transactional;
import rfd_game.models.GameUser;

public interface GameUserRepository {

    @Transactional
    GameUser findGameUserById(int gameUserId);

    GameUser findGameUserByUsername(String username);

    @Transactional
    GameUser createGameUser(GameUser gameUser);


}
