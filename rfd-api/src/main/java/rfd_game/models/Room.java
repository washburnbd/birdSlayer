package rfd_game.models;

public class Room {

    private int roomId;
    private int playerId;
    private int weaponId;
    private int armorId;
    private int enemyId;
    private int enemyHp;
    private String layout;
    private boolean roomCleared;

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public int getWeaponId() {
        return weaponId;
    }

    public void setWeaponId(int weaponId) {
        this.weaponId = weaponId;
    }

    public int getArmorId() {
        return armorId;
    }

    public void setArmorId(int armorId) {
        this.armorId = armorId;
    }

    public int getEnemyId() {
        return enemyId;
    }

    public void setEnemyId(int enemyId) {
        this.enemyId = enemyId;
    }

    public int getEnemyHp() {
        return enemyHp;
    }

    public void setEnemyHp(int enemyHp) {
        this.enemyHp = enemyHp;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public boolean isRoomCleared() {
        return roomCleared;
    }

    public void setRoomCleared(boolean roomCleared) {
        this.roomCleared = roomCleared;
    }

    @Override
    public String toString() {
        return "Room{" +
                "roomId=" + roomId +
                ", weaponId=" + weaponId +
                ", armorId=" + armorId +
                ", enemyId=" + enemyId +
                ", enemyHp=" + enemyHp +
                ", layout='" + layout + '\'' +
                ", roomCleared=" + roomCleared +
                '}';
    }
}


