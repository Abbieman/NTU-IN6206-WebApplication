package com.bustopup.server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "bus_topup_server"; // Secret key
    private static final long EXPIRATION_TIME = 86400000; // Expire time

    // generate Token
    public static String generateToken(String userId) {
        SecretKeySpec secretKeySpec = new SecretKeySpec(SECRET.getBytes(), "HmacSHA256");
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKeySpec)
                .compact();
    }

    // from Token get ID
    public static String getUserIdFromToken(String token) {
        // clear Bearer
        token = token.replace("Bearer ", "");
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
