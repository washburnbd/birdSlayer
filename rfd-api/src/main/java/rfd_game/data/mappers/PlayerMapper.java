package rfd_game.data.mappers;
import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.Player;

import java.sql.ResultSet;
import java.sql.SQLException;
public class PlayerMapper implements RowMapper<Player>{

    @Override
    public Player mapRow(ResultSet resultSet, int i) throws SQLException{
        Player player = new Player();
        player.setPlayerId(resultSet.getInt("player_id"));
        player.setGameUserId(resultSet.getInt("game_user_id"));
        player.setCurrentHp(resultSet.getInt("current_hp"));
        player.setMaxHp(resultSet.getInt("max_hp"));
        player.setDefense(resultSet.getInt("defense"));
        player.setDamage(resultSet.getInt("damage"));
        player.setBossSlain(resultSet.getBoolean("boss_slain"));
        player.setEquippedWeaponId(resultSet.getInt("equipped_weapon_id"));
        player.setEquippedArmorId(resultSet.getInt("equipped_armor_id"));
        return player;
    }
}
