package com.bustopup.server.service;

import com.bustopup.server.vo.NotificationVo;

import java.util.List;

public interface NotificationService {
    // Get All the Notification of A User
    List<NotificationVo> getNotifications();
}
