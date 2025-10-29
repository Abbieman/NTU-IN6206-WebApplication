package com.bustopup.server.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigInteger;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        // ✅ 1. 支持 Java 8 时间类型（LocalDateTime 等）
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // ✅ 2. 忽略未知字段 & null
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        // ✅ 3. 防止 MyBatis / Hibernate 懒加载异常
        mapper.addMixIn(Object.class, IgnoreLazyInitializerMixin.class);

        // ✅ 4. 防止 Enum 被解析成数字
        mapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, true);

        // ✅ 5. 🔥 全局注册 Long / BigInteger → String 序列化模块
        SimpleModule longModule = new SimpleModule();
        longModule.addSerializer(Long.class, ToStringSerializer.instance);
        longModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        longModule.addSerializer(BigInteger.class, ToStringSerializer.instance);
        mapper.registerModule(longModule);

        return mapper;
    }

    /**
     * 忽略 Hibernate/MyBatis 懒加载参数
     */
    private abstract static class IgnoreLazyInitializerMixin {
        @com.fasterxml.jackson.annotation.JsonIgnore
        private Object handler;
        @com.fasterxml.jackson.annotation.JsonIgnore
        private Object hibernateLazyInitializer;
    }
}
