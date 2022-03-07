package rfd_game.data;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import rfd_game.data.mappers.GameUserMapper;
import rfd_game.models.GameUser;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class GameUserJdbcTemplateRepository implements GameUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public GameUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public GameUser findGameUserById(int gameUserId) {

        final String sql = "select game_user_id, username, password_hash, is_admin "
                + "from game_user "
                + "where game_user_id = ?;";

        return jdbcTemplate.query(sql, new GameUserMapper(List.of()), gameUserId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public GameUser findGameUserByUsername(String username){
        final String sql = "select game_user_id, username, password_hash, is_admin "
                + "from game_user "
                + "where username = ?;";

        return jdbcTemplate.query(sql, new GameUserMapper(List.of()), username).stream()
                .findFirst().orElse(null);

    }

    @Override
    public GameUser createGameUser(GameUser gameUser) {

        final String sql = "insert into game_user (username, password_hash, is_admin) "
                + " values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, gameUser.getUsername());
            ps.setString(2, gameUser.getPassword());
            ps.setBoolean(3, gameUser.isAdmin());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }


        gameUser.setGameUserId(keyHolder.getKey().intValue());
        return gameUser;
    }


}
