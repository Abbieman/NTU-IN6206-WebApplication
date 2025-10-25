package com.bustopup.server.subscriber;

import com.bustopup.server.entity.Notification;
import com.bustopup.server.event.NotificationEvent;
import com.bustopup.server.mapper.NotificationMapper;
import com.bustopup.server.websocket.NotificationWebSocketHandler;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class NotificationSubscriber implements MessageListener {

    private final RedisTemplate<String, Object> redisTemplate;
    private final NotificationMapper notificationMapper;
    private final NotificationWebSocketHandler wsHandler;

    public NotificationSubscriber(RedisTemplate<String, Object> redisTemplate,
                                  NotificationMapper notificationMapper,
                                  NotificationWebSocketHandler wsHandler) {
        this.redisTemplate = redisTemplate;
        this.notificationMapper = notificationMapper;
        this.wsHandler = wsHandler;
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {
        Object obj = redisTemplate.getValueSerializer().deserialize(message.getBody());
        if (obj instanceof NotificationEvent event) {
            System.out.println("📩 Received message event: " + event);

            // Write into database
            Notification msg = Notification.builder()
                    .userId(event.getUserId())
                    .title(event.getTitle())
                    .content(event.getContent())
                    .type(event.getType())
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();
            notificationMapper.insert(msg);
            boolean sent = wsHandler.sendToUser(event.getUserId(),
                    "🔔 " + event.getTitle() + ": " + event.getContent());
            System.out.println("➡️ Message sent to user " + event.getUserId() + ": " + sent);
        }
    }
}
