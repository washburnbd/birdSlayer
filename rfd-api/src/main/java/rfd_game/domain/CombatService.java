package rfd_game.domain;

import org.springframework.stereotype.Service;
import rfd_game.data.GameUserRepository;
import rfd_game.data.PlayerRepository;
import rfd_game.data.RoomRepository;
import rfd_game.models.Enemy;
import rfd_game.models.Inventory;
import rfd_game.models.Player;
import rfd_game.models.Room;

@Service
public class CombatService {

    GameUserRepository gameUserRepository;
    PlayerRepository playerRepository;
    RoomRepository roomRepository;
    boolean isEnemyDefending;
    boolean isPlayerDefending;
    boolean isPlayerTurn = true;

    CombatService(GameUserRepository gameUserRepository, PlayerRepository playerRepository, RoomRepository roomRepository){
        this.gameUserRepository = gameUserRepository;
        this.playerRepository = playerRepository;
        this.roomRepository = roomRepository;
    }

    // public
    //combat starts here, player goes first and then chooses what to do via controller
    public boolean getPlayerTurn(){
        return isPlayerTurn;
    }

    // get player stats to display (includes inventory)
    public Player getPlayerById(int id){
        return playerRepository.findPlayerById(id);
    }
    // get room stats
    public Room getRoomById(int id){
        return roomRepository.findRoomById(id);
    }
    // attack (controlled by controller)
    public int playerAttack(Player player, Room room){
        isPlayerDefending = false;

        int damageInflicted = damageCalculation(isEnemyDefending, true, room, player);
        updateEnemyHp(damageInflicted,room);

        // added code
        // I want to include a death animation. User clicks attack, player attacks -> kills enemy -> room cleared
        // Controller calls playerAttack. If it gets 0, the UI will play enemyDeathAnimation instead of asking the
        // controller to call enemyMove.
        if(room.isRoomCleared()){
            if(room.getEnemyId()==4){
                playerRepository.updateBossSlain(player.getPlayerId());
            }
            return 0;
        }

        isPlayerTurn = false;
        return enemyMove(room, player);
    }
    // defend (controlled by controller)
    public int playerDefend(Player player, Room room){
        isPlayerDefending = true;
        isPlayerTurn = false;
        return enemyMove(room, player);
    }

    public boolean updateBossSlain(int playerId){
        return playerRepository.updateBossSlain(playerId);
    }



    // private
    // update player hp
    private void updatePlayerHp(int hpChange, Player player){
        playerRepository.updateCurrentHP((player.getCurrentHp()-hpChange), player.getPlayerId());
    }

    // update enemy hp
    private void updateEnemyHp(int hpChange, Room room){
        Enemy enemy = roomRepository.findEnemyById(room.getEnemyId());
        int nextHp = room.getEnemyHp()-hpChange;
        room.setEnemyHp(nextHp);
        roomRepository.updateEnemyHp(room);
        if(nextHp <= 0){
            clearRoom(room);
        }
    }

    // update max player hp
    private void updateMaxPlayerHp (int hpChange, Player player){
        playerRepository.updateMaxHP((player.getMaxHp()-hpChange), player.getPlayerId());
    }

    // clear room
    private void clearRoom (Room room){
        room.setRoomCleared(true);
        roomRepository.updateRoomClearance(room);
    }

    // enemy move (always follows attack/defend/update inventory)
    private int enemyMove (Room room, Player player){
        int choice = (int) Math.floor(Math.random()*2)+1;

        // 0 = dead (returned in playerAttack if room is cleared after updateEnemyHp), 1 = attack, 2 = defend.

        switch(choice){
            case 1:
                enemyAttack(room, player);
                break;
            case 2:
                enemyDefend();
                break;
        }

        isPlayerTurn = true;
        return choice;
    }

    private void enemyDefend() {
        isEnemyDefending = true;
    }

    private void enemyAttack(Room room, Player player){
        isEnemyDefending = false;
        int damageInflicted = damageCalculation(isPlayerDefending, false, room, player);
        updatePlayerHp(damageInflicted,player);
    }

    // defending indicates if the person being attacked is defending or not
    // playerAttacking indicates if it is the player who is attacking
    private int damageCalculation(boolean defending, boolean playerAttacking, Room room, Player player){

        int totalDamage = 0;
        double defenseBonus = 0.0;
        Enemy enemy = roomRepository.findEnemyById(room.getEnemyId());

        //Player Attacks
        if(playerAttacking){

            defenseBonus = (double) enemy.getDefense();

            if(defending){
                defenseBonus = defenseBonus * 2.0;
            }

            int numberOfDice = player.getDamage();
            int numberOfSides = player.getEquippedWeapon().getWeaponDamage();

            for(int i = 0; i<numberOfDice; i++){
                totalDamage+=(int)Math.floor(Math.random()*numberOfSides)+1;
            }

            totalDamage = (int) (totalDamage * (1.0-defenseBonus/100.0));

            return totalDamage;
        }

        
        //Enemy Attacks
        defenseBonus = (double) player.getDefense() + player.getEquippedArmor().getArmorDefense();

        if (defending){
            defenseBonus = defenseBonus * 2.0;
        }

        int numberOfRolls = enemy.getDamage();

        for (int i = 0; i<numberOfRolls; i++){
            totalDamage += (int) Math.floor(Math.random()*6)+1;
        }

        totalDamage = (int) (totalDamage * (1.0-defenseBonus/100.0));

        return totalDamage;
    }
}
