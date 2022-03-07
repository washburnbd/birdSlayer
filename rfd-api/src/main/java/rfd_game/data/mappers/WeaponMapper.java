package rfd_game.data.mappers;

import org.springframework.jdbc.core.RowMapper;
import rfd_game.models.Weapon;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WeaponMapper implements RowMapper<Weapon> {

    @Override
    public Weapon mapRow(ResultSet resultSet, int i) throws SQLException {
        Weapon weapon = new Weapon();
        weapon.setWeaponId(resultSet.getInt("weapon_id"));
        weapon.setWeaponDamage(resultSet.getInt("weapon_damage"));
        return weapon;
    }
}
