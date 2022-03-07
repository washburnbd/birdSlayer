package rfd_game.models;

import java.util.Objects;

public class Weapon {
    private int weaponId;
    private int weaponDamage;


    public int getWeaponId() {
        return weaponId;
    }

    public void setWeaponId(int weaponId) {
        this.weaponId = weaponId;
    }

    public int getWeaponDamage() {
        return weaponDamage;
    }

    public void setWeaponDamage(int weaponDamage) {
        this.weaponDamage = weaponDamage;
    }

    @Override
    public String toString() {
        return "Weapon{" +
                "weaponId=" + weaponId +
                ", weaponDamage=" + weaponDamage +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Weapon)) return false;
        Weapon weapon = (Weapon) o;
        return weaponId == weapon.weaponId && weaponDamage == weapon.weaponDamage;
    }

    @Override
    public int hashCode() {
        return Objects.hash(weaponId, weaponDamage);
    }
}
