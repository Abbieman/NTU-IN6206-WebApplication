package com.bustopup.server.config;

import com.bustopup.server.subscriber.NotificationSubscriber;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class RedisListenerConfig {

    /**
     * Bean of subscribing Redis topic
     */
    @Bean
    public RedisMessageListenerContainer redisContainer(RedisConnectionFactory connectionFactory,
                                                        NotificationSubscriber subscriber,
                                                        RedisTemplate<String, Object> redisTemplate) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        // use adapter to package subscriber
        MessageListenerAdapter adapter = new MessageListenerAdapter(subscriber, "handleMessage");
        adapter.setSerializer(redisTemplate.getValueSerializer());

        // same with topic of publisher
        container.addMessageListener(adapter, new ChannelTopic("message-events"));
        System.out.println("======== Redis listener registered on topic: message-events ========");

        return container;
    }
}
