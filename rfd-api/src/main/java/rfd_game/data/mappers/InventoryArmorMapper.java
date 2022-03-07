package rfd_game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.Inventory;
import rfd_game.models.InventoryArmor;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InventoryArmorMapper implements RowMapper<InventoryArmor>{

    @Override
    public InventoryArmor mapRow(ResultSet resultSet, int i) throws SQLException {
        InventoryArmor ia = new InventoryArmor();
        ia.setInventoryId(resultSet.getInt("inventory_id"));
        ia.setArmorId(resultSet.getInt("armor_id"));
        return ia;}
}
