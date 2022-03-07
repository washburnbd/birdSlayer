package rfd_game.domain;

import org.springframework.stereotype.Service;
import rfd_game.data.GameUserRepository;
import rfd_game.data.PlayerRepository;
import rfd_game.models.Player;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class StartGameService {

    GameUserRepository gameUserRepository;
    PlayerRepository playerRepository;

    public StartGameService(GameUserRepository gameUserRepository, PlayerRepository playerRepository) {
        this.gameUserRepository = gameUserRepository;
        this.playerRepository = playerRepository;
    }

    //Create a player and return it from the repository

    public Player createPlayer(Player player){
        return playerRepository.addPlayer(player);
    }

    public List<Player> getUserPlayers (int gameUserId){
       List<Player> allPlayers = playerRepository.findAllPlayer();
       return allPlayers.stream().filter(p -> p.getGameUserId() == gameUserId).collect(Collectors.toList());
    }
}
