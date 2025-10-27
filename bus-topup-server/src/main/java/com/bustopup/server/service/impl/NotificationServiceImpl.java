package com.bustopup.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bustopup.server.context.UserContext;
import com.bustopup.server.entity.Notification;
import com.bustopup.server.mapper.NotificationMapper;
import com.bustopup.server.service.NotificationService;
import com.bustopup.server.vo.NotificationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    NotificationMapper notificationMapper;

    @Autowired
    public void setNotificationMapper(NotificationMapper notificationMapper) {
        this.notificationMapper = notificationMapper;
    }

    @Override
    public List<NotificationVo> getNotifications() {
        String userId = UserContext.getUserId();
        QueryWrapper<Notification> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        queryWrapper.orderByDesc("created_at");
        List<Notification> notifications = notificationMapper.selectList(queryWrapper);
        return notifications.stream()
                .map(n ->  NotificationVo.builder()
                    .id(n.getId())
                    .title(n.getTitle())
                    .content(n.getContent())
                    .type(n.getType())
                    .isRead(n.getIsRead())
                    .createdAt(n.getCreatedAt())
                    .build()
        ).collect(Collectors.toList());
    }
}
