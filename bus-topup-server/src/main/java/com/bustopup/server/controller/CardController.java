package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.dto.AddCardDTO;
import com.bustopup.server.entity.Card;
import com.bustopup.server.enums.CardType;
import com.bustopup.server.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/card")
@Tag(name = "Card")
public class CardController {
    CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    // add new card
    @PostMapping("/addCard")
    @Operation(summary = "add new card")
    public Result<Object> addCard(@Valid @RequestBody AddCardDTO addCardDTO) {
        cardService.addCard(addCardDTO);
        return Result.success(Message.ADD_CARD_SUCCESS);
    }

    // add new card
    @PostMapping("/bindCard")
    @Operation(summary = "bind new card")
    public Result<Object> bindCard(@RequestBody Map<String, String> body) {
        System.out.println(body);
        String cardNumber = body.get("cardNumber");
        CardType cardType = CardType.valueOf(body.get("cardType"));
        cardService.bindCard(cardNumber, cardType);
        return Result.success(Message.BIND_CARD_SUCCESS);
    }

    @GetMapping("/getCardList")
    @Operation(summary = "get all cards")
    public Result<Object> getCardList() {
        List<Card> cardList = cardService.getCardList();
        return Result.success(cardList, Message.GET_CARD_SUCCESS);
    }
}
