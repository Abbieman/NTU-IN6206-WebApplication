package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.common.result.StatusCode;
import com.bustopup.server.service.NotificationService;
import com.bustopup.server.vo.NotificationVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

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
    @Operation(summary = "get all notifications")
    public Result<List<NotificationVo>> getNotificationList() {
        List<NotificationVo> notificationVoList = notificationService.getNotifications();
        return Result.success(notificationVoList, Message.SUCCESS);
    }

    @PostMapping("/readNotification")
    @Operation(summary = "read notification")
    public Result<Object> readNotification(@RequestBody Map<String, Object> body) {
        Object idObj = body.get("id");
        Object idsObj = body.get("ids");
        if (idObj != null) {
            BigInteger id = new BigInteger(idObj.toString());
            notificationService.readNotification(id);
            return Result.success(Message.SUCCESS);
        }
        if (idsObj instanceof java.util.List<?>) {
            List<BigInteger> ids = ((List<?>) idsObj).stream()
                    .map(Object::toString)
                    .map(BigInteger::new)
                    .toList();
            notificationService.readNotifications(ids);
            return Result.success(Message.SUCCESS);
        }
        return Result.error(StatusCode.BAD_REQUEST, Message.FAIL);
    }

    @PostMapping("/delete")
    @Operation(summary = "delete one or multiple notifications")
    public Result<Object> deleteNotification(@RequestBody Map<String, Object> body) {
        Object idObj = body.get("id");
        Object idsObj = body.get("ids");
        if (idObj != null) {
            BigInteger id = new BigInteger(idObj.toString());
            notificationService.deleteNotification(id);
            return Result.success(Message.SUCCESS);
        }
        if (idsObj instanceof List<?>) {
            List<BigInteger> ids = ((List<?>) idsObj).stream()
                    .map(Object::toString)
                    .map(BigInteger::new)
                    .toList();
            notificationService.deleteNotifications(ids);
            return Result.success(Message.SUCCESS);
        }
        return Result.error(StatusCode.BAD_REQUEST, Message.FAIL);
    }

}
