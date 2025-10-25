package com.bustopup.server.publisher;

import com.bustopup.server.event.NotificationEvent;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class NotificationPublisher {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String CHANNEL = "message-events";

    public NotificationPublisher(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /** publish message event */
    public void publish(NotificationEvent event) {
        redisTemplate.convertAndSend(CHANNEL, event);
        System.out.println("📢 Published message event: " + event);
    }
}
