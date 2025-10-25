package com.bustopup.server.controller;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.common.result.Result;
import com.bustopup.server.dto.AddCardDTO;
import com.bustopup.server.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/card")
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
    public Result<Object> addCard(@RequestBody Map<String, String> body) {
        String cardId = body.get("cardId");
        cardService.bindCard(cardId);
        return Result.success(Message.BIND_CARD_SUCCESS);
    }
}
