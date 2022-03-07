package rfd_game.models;

import java.util.List;
import rfd_game.models.Room;

public class Player {

    private int playerId;
    private int gameUserId;
    private int currentHp;
    private int maxHp;
    private int defense;
    private int damage;
    private boolean bossSlain;
    private List<Room> roomsGenerated;
    private int equippedWeaponId;
    private int equippedArmorId;
    private Weapon equippedWeapon;
    private Armor equippedArmor;
    private int attackRating;
    private Inventory inventory;

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public int getEquippedWeaponId() {
        return equippedWeaponId;
    }

    public void setEquippedWeaponId(int equippedWeaponId) {
        this.equippedWeaponId = equippedWeaponId;
    }

    public int getEquippedArmorId() {
        return equippedArmorId;
    }

    public void setEquippedArmorId(int equippedArmorId) {
        this.equippedArmorId = equippedArmorId;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public int getGameUserId() {
        return gameUserId;
    }

    public void setGameUserId(int gameUserId) {
        this.gameUserId = gameUserId;
    }

    public int getCurrentHp() {
        return currentHp;
    }

    public void setCurrentHp(int currentHp) {
        this.currentHp = currentHp;
    }

    public int getMaxHp() {
        return maxHp;
    }

    public void setMaxHp(int maxHp) {
        this.maxHp = maxHp;
    }

    public int getDefense() {
        return defense;
    }

    public void setDefense(int defense) {
        this.defense = defense;
    }

    public int getDamage() {
        return damage;
    }

    public void setDamage(int damage) {
        this.damage = damage;
    }

    public boolean isBossSlain() {
        return bossSlain;
    }

    public void setBossSlain(boolean bossSlain) {
        this.bossSlain = bossSlain;
    }

    public int getAttackRating() {
        return attackRating;
    }

    public void setAttackRating(int attackRating) {
        this.attackRating = attackRating;
    }

    public List<Room> getRoomsGenerated() {
        return roomsGenerated;
    }

    public void setRoomsGenerated(List<Room> roomsGenerated) {
        this.roomsGenerated = roomsGenerated;
    }

    public Weapon getEquippedWeapon() {
        return equippedWeapon;
    }

    public void setEquippedWeapon(Weapon equippedWeapon) {
        this.equippedWeapon = equippedWeapon;
    }

    public Armor getEquippedArmor() {
        return equippedArmor;
    }

    public void setEquippedArmor(Armor equippedArmor) {
        this.equippedArmor = equippedArmor;
    }
}
