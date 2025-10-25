package com.bustopup.server.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // Support Java 8 Time Type（LocalDate, LocalDateTime）
        mapper.registerModule(new JavaTimeModule());
        // Do not transform LocalDateTime to timestamp
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        // Ignore unknown params
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        // Ignore null
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        // Prevent wrongs in lazy loading（MyBatis / Hibernate）
        mapper.addMixIn(Object.class, IgnoreLazyInitializerMixin.class);
        // Prevent transforming Enum to num
        mapper.configure(DeserializationFeature.FAIL_ON_NUMBERS_FOR_ENUMS, true);

        return mapper;
    }

    /**
     * Ignore Hibernate/MyBatis lazy loading params
     */
    private abstract static class IgnoreLazyInitializerMixin {
        @com.fasterxml.jackson.annotation.JsonIgnore
        private Object handler;
        @com.fasterxml.jackson.annotation.JsonIgnore
        private Object hibernateLazyInitializer;
    }
}
