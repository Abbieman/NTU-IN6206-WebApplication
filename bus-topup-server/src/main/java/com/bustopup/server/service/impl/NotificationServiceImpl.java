package com.bustopup.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.bustopup.server.common.exception.BizException;
import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.context.UserContext;
import com.bustopup.server.entity.Notification;
import com.bustopup.server.mapper.NotificationMapper;
import com.bustopup.server.service.NotificationService;
import com.bustopup.server.vo.NotificationVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
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

    @Override
    public void readNotification(BigInteger id) {
        Notification notification = notificationMapper.selectById(id);
        if (notification == null) {
            throw new BizException(StatusCode.BAD_REQUEST, "Notification not found");
        }
        notification.setIsRead(true);
        notificationMapper.updateById(notification);
    }

    @Override
    public void readNotifications(List<BigInteger> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.NOTIFICATION_NOT_EXISTS);
        };
        UpdateWrapper<Notification> updateWrapper = new UpdateWrapper<>();
        updateWrapper.in("id", ids).set("is_read", true);
        notificationMapper.update(null, updateWrapper);
    }

    @Override
    public void deleteNotification(BigInteger id) {
        int rows = notificationMapper.deleteById(id);
        if (rows == 0) {
            throw new BizException(StatusCode.BAD_REQUEST, Message.NOTIFICATION_NOT_EXISTS);
        }
    }

    @Override
    public void deleteNotifications(List<BigInteger> ids) {
        if (ids == null || ids.isEmpty()) return;
        notificationMapper.deleteBatchIds(ids);
    }
}
