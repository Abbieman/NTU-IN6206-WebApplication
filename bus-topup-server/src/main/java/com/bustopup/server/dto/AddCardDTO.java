package com.bustopup.server.dto;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.enums.CardType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddCardDTO {

    @NotBlank(message = Message.CARD_NUM_EMPTY)
    @Pattern(regexp = "^\\d{16}$", message = Message.CARD_NUM_16_DIGITS)
    private String cardNumber;

    @NotNull(message = Message.CARD_TYPE_EMPTY)
    private CardType type;

    @NotBlank(message = Message.CARD_BALANCE_EMPTY)
    @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = Message.CARD_BALANCE_NOT_CORRECT)
    private String balance;
}
