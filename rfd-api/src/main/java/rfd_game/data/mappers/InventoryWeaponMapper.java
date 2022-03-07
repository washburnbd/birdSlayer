package rfd_game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.InventoryArmor;
import rfd_game.models.InventoryWeapon;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InventoryWeaponMapper implements RowMapper<InventoryWeapon> {
    @Override
    public InventoryWeapon mapRow(ResultSet resultSet, int i) throws SQLException {
        InventoryWeapon iw = new InventoryWeapon();
        iw.setInventoryId(resultSet.getInt("inventory_id"));
        iw.setWeaponId(resultSet.getInt("weapon_id"));
        return iw;}
}
