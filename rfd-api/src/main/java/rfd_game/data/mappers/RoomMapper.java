package rfd_game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.Room;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoomMapper implements RowMapper<Room>{
    @Override
    public Room mapRow(ResultSet resultSet, int i) throws SQLException {
        Room room = new Room();
        room.setRoomId(resultSet.getInt("room_id"));
        room.setPlayerId(resultSet.getInt("player_id"));
        room.setWeaponId(resultSet.getInt("weapon_id"));
        room.setArmorId(resultSet.getInt("armor_id"));
        room.setEnemyId(resultSet.getInt("enemy_id"));
        room.setEnemyHp(resultSet.getInt("enemy_hp"));
        room.setLayout(resultSet.getString("layout"));
        room.setRoomCleared(resultSet.getBoolean("room_cleared"));
        return room;
    }
}
