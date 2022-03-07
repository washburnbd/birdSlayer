package rfd_game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.Enemy;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EnemyMapper implements RowMapper<Enemy>{
    @Override
    public Enemy mapRow(ResultSet resultSet, int i) throws SQLException {
        Enemy enemy = new Enemy();
        enemy.setEnemyId(resultSet.getInt("enemy_id"));
        enemy.setMaxHp(resultSet.getInt("max_hp"));
        enemy.setDefense(resultSet.getInt("defense"));
        enemy.setDamage(resultSet.getInt("damage"));
        return enemy;
    }
}
