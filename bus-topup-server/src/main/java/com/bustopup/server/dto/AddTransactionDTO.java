package com.bustopup.server.dto;

import com.bustopup.server.common.result.Message;
import com.bustopup.server.enums.TransactionType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddTransactionDTO {
    @NotBlank(message = Message.CARD_NUM_EMPTY)
    @Pattern(regexp = "^\\d{16}$", message = Message.CARD_NUM_16_DIGITS)
    private String cardNumber;

    @NotNull(message = Message.AMOUNT_NULL)
    @DecimalMin(value = "0.01", message = Message.AMOUNT_MORE_THAN_0)
    private BigDecimal amount;

    @NotNull(message = Message.TYPE_NULL)
    private TransactionType type;
}
