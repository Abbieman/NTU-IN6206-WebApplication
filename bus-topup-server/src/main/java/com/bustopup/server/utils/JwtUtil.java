package com.bustopup.server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "bus_topup_server_super_secure_secret_key_123";
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24h

    /**
     * Generate Token
     */
    public static String generateToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Get userId from Token
     */
    public static String getUserIdFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    /**
     * Check if token is expired
     */
    public static boolean isTokenExpired(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration().before(new Date());
    }
}
