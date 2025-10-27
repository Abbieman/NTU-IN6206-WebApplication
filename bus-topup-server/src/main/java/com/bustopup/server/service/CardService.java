package com.bustopup.server.service;

import com.bustopup.server.dto.AddCardDTO;
import com.bustopup.server.entity.Card;
import com.bustopup.server.enums.CardType;

import java.util.List;

public interface CardService {
    // Add Card
    void addCard(AddCardDTO addCardDTO);
    // Bind Card
    void bindCard(String cardNumber, CardType cardType);
    // Get Card Info
    List<Card> getCardList();
}
