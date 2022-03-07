package rfd_game.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class GameUser extends User{
    private int gameUserId;
    private boolean isAdmin;

    public GameUser(int gameUserId, String username, String password, boolean disabled, List<String> roles) {

        super(username, password, !disabled,
                true, true, true,
                convertRolesToAuthorities(roles));
        this.gameUserId = gameUserId;

    }



    public int getGameUserId() {
        return gameUserId;
    }

    public void setGameUserId(int gameUserId) {
        this.gameUserId = gameUserId;
    }


    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public static List<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {

        return new ArrayList<>(roles.size());
    }

    @Override
    public String toString() {
        return "GameUser{" +
                "gameUserId=" + gameUserId +

                ", isAdmin=" + isAdmin +
                '}';
    }
}
