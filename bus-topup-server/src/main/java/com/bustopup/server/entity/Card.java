package com.bustopup.server.entity;

import com.bustopup.server.enums.CardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    private String id;
    private String cardNumber;
    private CardType type;
    private String balance;
    private LocalDateTime createdAt;
    private LocalDateTime expiredAt;
}
