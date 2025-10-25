package com.bustopup.server.service;

import com.bustopup.server.dto.AddCardDTO;
import com.bustopup.server.entity.Card;

import java.util.List;

public interface CardService {
    // Add Card
    void addCard(AddCardDTO addCardDTO);
    // Bind Card
    void bindCard(String cardId);
    // Get Card Info
    List<Card> getCardList();
}
