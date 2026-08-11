package com.example.fintrack.controller;

import com.example.fintrack.dto.expense.CreateExpenseRequest;
import com.example.fintrack.dto.expense.ExpenseResponse;
import com.example.fintrack.dto.expense.UpdateExpenseRequest;
import com.example.fintrack.security.CustomUserDetails;
import com.example.fintrack.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CreateExpenseRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        expenseService.createExpense(
                                userDetails.getUserId(),
                                request
                        )
                );
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getUserExpenses(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        return ResponseEntity.ok(
                expenseService.getUserExpenses(
                        userDetails.getUserId()
                )
        );
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponse> getExpense(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long expenseId
    ) {

        return ResponseEntity.ok(
                expenseService.getExpense(
                        userDetails.getUserId(),
                        expenseId
                )
        );
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long expenseId,
            @Valid @RequestBody UpdateExpenseRequest request
    ) {

        return ResponseEntity.ok(
                expenseService.updateExpense(
                        userDetails.getUserId(),
                        expenseId,
                        request
                )
        );
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long expenseId
    ) {

        expenseService.deleteExpense(
                userDetails.getUserId(),
                expenseId
        );

        return ResponseEntity.noContent().build();
    }
}
