package com.bustopup.server.entity;

import com.bustopup.server.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private String id;
    private String userId;
    private String cardId;
    private BigDecimal amount;
    private TransactionType type;
    private LocalDateTime createdAt;
}
