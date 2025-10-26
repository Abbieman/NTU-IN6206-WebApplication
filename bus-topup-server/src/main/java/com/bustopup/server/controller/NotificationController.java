package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.service.NotificationService;
import com.bustopup.server.vo.NotificationVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
@Tag(name = "Notification")
public class NotificationController {

    NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/getNotificationList")
    @Operation(summary = "get all notification")
    public Result<List<NotificationVo>> getNotificationList() {
        List<NotificationVo> notificationVoList = notificationService.getNotifications();
        return Result.success(notificationVoList, Message.SUCCESS);
    }

}
