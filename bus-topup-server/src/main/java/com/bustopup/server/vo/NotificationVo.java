package com.bustopup.server.vo;

import com.bustopup.server.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationVo {
    private String title;
    private String content;
    private NotificationType type;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
