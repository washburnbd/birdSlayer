package rfd_game.data;

import rfd_game.models.Armor;
import rfd_game.models.Inventory;
import rfd_game.models.Player;
import rfd_game.models.Weapon;

import java.util.List;

public interface PlayerRepository {
    Player addPlayer(Player player);

    Boolean updatePlayer(Player player);

    Inventory addInventory(int playerId);

    List<Inventory> findAllInventory();

    Weapon addWeapon(Weapon weapon, int playerId);

    Armor addArmor(Armor armor, int playerId);

    Inventory findPlayerInventory(int playerId);

    List<Weapon> getInventoryWeapons (int playerId);

    List<Armor> getInventoryArmor (int playerId);

    Player findPlayerById(int playerId);

    List<Player> findAllPlayer();

    boolean updateCurrentHP(int hp, int playerId);

    boolean updateMaxHP(int hp, int playerId);

    boolean updateDamage(int damage, int playerId);

    boolean updateDefense(int defense, int playerId);

    boolean updateBossSlain(int playerId);
}
