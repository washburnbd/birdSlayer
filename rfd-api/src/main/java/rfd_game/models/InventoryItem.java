package rfd_game.models;

public enum InventoryItem {
    WEAPONS("Weapons"),
    ARMOR("Armor");

    private final String title;

    InventoryItem(String title) {
        this.title = title;
    }
}
