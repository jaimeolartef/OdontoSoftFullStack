package org.enterprise.odontosoft.view.security;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.file.AccessDeniedException;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;


public class UtilSecurity {

  private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
  private static final int MINUTES = 60;

  public static String generateToken(String user) {
    var now = Instant.now();
    return Jwts.builder()
      .subject(user)
      .issuedAt(Date.from(now))
      .expiration(Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)))
      .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
      .compact();
  }

  public static String extractUsername(String token) throws AccessDeniedException {
    return getTokenBody(token).getSubject();
  }

  public static Boolean validateToken(String token, UserDetails userDetails) throws AccessDeniedException {
    final String username = extractUsername(token);
    return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  private static Claims getTokenBody(String token) throws AccessDeniedException {
    try {
      return Jwts
        .parser()
        .setSigningKey(SECRET_KEY)
        .build()
        .parseSignedClaims(token)
        .getPayload();
    } catch (ExpiredJwtException e) { // Invalid signature or expired token
      throw new AccessDeniedException("Access denied: " + e.getMessage());
    }
  }

  private static boolean isTokenExpired(String token) throws AccessDeniedException {
    Claims claims = getTokenBody(token);
    return claims.getExpiration().before(new Date());
  }

}
