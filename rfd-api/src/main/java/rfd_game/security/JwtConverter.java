package rfd_game.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.List;


import org.springframework.stereotype.Component;
import rfd_game.models.GameUser;

@Component
public class JwtConverter {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final String ISSUER = "game";
    private final int EXPIRATION_MINUTES = 60;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(GameUser user) {
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())
                .claim("id",user.getGameUserId())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public GameUser getUserFromToken(String token){
        if(token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));

            String username = jws.getBody().getSubject();

            int gameUserId = (int) jws.getBody().get("id");



            return new GameUser(gameUserId, username, "", false, List.of());
        } catch (JwtException e) {
            System.out.println(e);
        }
        return null;
    }
}
