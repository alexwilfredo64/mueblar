package project.backendmueblar.modules.auth.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import project.backendmueblar.modules.users.entities.UserEntity;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long expirationTime;

    public String generateToken(UserEntity  userEntity, Map<String, Integer> endpoints) {
        return Jwts.builder()
                .id(userEntity.getUserId().toString())
                .claims(Map.of("roleId", userEntity.getRoleEntity().getRoleId()))
                .claims(endpoints)
                .subject(userEntity.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ expirationTime))
                        .signWith(getSecretKey())
                        .compact();
    }

    private SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
