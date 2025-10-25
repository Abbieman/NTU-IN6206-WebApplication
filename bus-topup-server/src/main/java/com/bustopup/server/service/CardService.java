package com.bustopup.server.service;

import com.bustopup.server.dto.AddCardDTO;
import com.bustopup.server.entity.Card;

public interface CardService {
    // add card
    void addCard(AddCardDTO addCardDTO);
    // bind card
    void bindCard(String cardId);
    // user: remove card
    // void removeCard(Card card);
}
