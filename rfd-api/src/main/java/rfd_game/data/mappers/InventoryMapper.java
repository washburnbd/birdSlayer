package rfd_game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.Inventory;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InventoryMapper implements RowMapper<Inventory> {

    @Override
    public Inventory mapRow(ResultSet resultSet, int i) throws SQLException {
        Inventory inventory = new Inventory();
        inventory.setInventoryId(resultSet.getInt("inventory_id"));
        inventory.setPlayerId(resultSet.getInt("player_id"));
        return inventory;
    }
}
