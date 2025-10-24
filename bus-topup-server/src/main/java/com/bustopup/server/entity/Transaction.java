package com.bustopup.server.entity;

import com.bustopup.server.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private String id;
    private String userId;
    private String cardId;
    private Float amount;
    private TransactionType type;
    private LocalDateTime createdAt;
}
