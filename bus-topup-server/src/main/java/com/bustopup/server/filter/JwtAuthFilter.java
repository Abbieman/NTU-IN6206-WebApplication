package com.bustopup.server.filter;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.context.UserContext;
import com.bustopup.server.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;

    public JwtAuthFilter(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // Whitelist
    private static final List<String> EXCLUDED_PATHS = List.of(
            "/auth/login",
            "/auth/register",
            "/v3/api-docs",          // Swagger JSON
            "/swagger-ui",           // Swagger UI Static Resource
            "/swagger-ui.html",
            "/swagger-ui/index.html",
            "/swagger-resources",
            "/webjars"               // Swagger Dependency Resource
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        // Whitelist
        if (EXCLUDED_PATHS.stream().anyMatch(path::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            // Get Authorization Header
            String header = request.getHeader("Authorization");
            if (header == null || !header.startsWith("Bearer ")) {
                // No Token
                unauthorized(response);
                return;
            }
            String token = header.substring(7);
            // Check if token is in Redis
            String redisKey = "busTopup:token:" + token;
            if (Boolean.FALSE.equals(redisTemplate.hasKey(redisKey))) {
                unauthorized(response);
                return;
            }
            // Set user info to UserText
            String userId = JwtUtil.getUserIdFromToken(token);
            UserContext.setUserId(userId);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            unauthorized(response);
        } finally {
            // Clear ThreadLocal
            UserContext.clear();
        }
    }

    private void unauthorized(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(Message.INVALID_TOKEN);
    }
}
