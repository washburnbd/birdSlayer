package rfd_game.models;

import javax.validation.constraints.*;
import java.util.Objects;

public class Armor {

    private int armorId;
    private int armorDefense;


    public int getArmorId() {
        return armorId;
    }

    public void setArmorId(int armorId) {
        this.armorId = armorId;
    }

    public int getArmorDefense() {
        return armorDefense;
    }

    public void setArmorDefense(int armorDefense) {
        this.armorDefense = armorDefense;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Armor)) return false;
        Armor armor = (Armor) o;
        return armorId == armor.armorId && armorDefense == armor.armorDefense;
    }

    @Override
    public int hashCode() {
        return Objects.hash(armorId, armorDefense);
    }
}
