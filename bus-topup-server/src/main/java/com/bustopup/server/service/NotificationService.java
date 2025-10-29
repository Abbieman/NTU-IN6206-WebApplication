package com.bustopup.server.service;

import com.bustopup.server.vo.NotificationVo;

import java.math.BigInteger;
import java.util.List;

public interface NotificationService {
    // Get All the Notification of A User
    List<NotificationVo> getNotifications();
    // Read Notification
    void readNotification(BigInteger id);
    void readNotifications(List<BigInteger> ids);
    // Delete Notification
    void deleteNotification(BigInteger id);
    void deleteNotifications(List<BigInteger> ids);
}
