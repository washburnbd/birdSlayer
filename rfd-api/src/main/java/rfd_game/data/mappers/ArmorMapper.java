package rfd_game.data.mappers;

import rfd_game.models.Armor;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ArmorMapper implements RowMapper<Armor> {

    @Override
    public Armor mapRow(ResultSet resultSet, int i) throws SQLException {
        Armor armor = new Armor();
        armor.setArmorId(resultSet.getInt("armor_id"));
        armor.setArmorDefense(resultSet.getInt("armor_defense"));
        return armor;
    }
}
