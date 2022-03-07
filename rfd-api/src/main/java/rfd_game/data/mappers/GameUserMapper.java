package rfd_game.data.mappers;
import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.GameUser;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class GameUserMapper implements RowMapper<GameUser>{
    private final List<String> roles;

    public GameUserMapper(List<String> roles){
        this.roles = roles;
    }


    @Override
    public GameUser mapRow(ResultSet resultSet, int i) throws SQLException {
        return new GameUser(
        (resultSet.getInt("game_user_id")),
        (resultSet.getString("username")),
        (resultSet.getString("password_hash")),
        (false), roles);
    }

}
