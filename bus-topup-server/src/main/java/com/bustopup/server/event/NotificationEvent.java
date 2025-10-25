package com.bustopup.server.event;

import com.bustopup.server.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationEvent {
    private String userId;
    private String title;
    private String content;
    private NotificationType type;
}
