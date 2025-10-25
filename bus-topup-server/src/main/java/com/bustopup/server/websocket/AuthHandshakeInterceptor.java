package com.bustopup.server.websocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class AuthHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) {
        // 解析 WebSocket 连接 URL 中的 userId 参数
        String query = request.getURI().getQuery();

        if (query != null && query.contains("userId=")) {
            // 解析 userId
            String userId = query.split("userId=")[1];
            attributes.put("userId", userId);
            System.out.println("✅ userId set to: " + userId);
        } else {
            System.out.println("⚠️ No userId found in query");
        }

        return true; // 允许握手继续
    }

    @Override
    public void afterHandshake(ServerHttpRequest request,
                               ServerHttpResponse response,
                               WebSocketHandler wsHandler,
                               Exception exception) {
        // 握手完成后无需操作
    }
}
