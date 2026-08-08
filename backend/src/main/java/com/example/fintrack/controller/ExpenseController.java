package com.example.fintrack.controller;

import com.example.fintrack.dto.expense.CreateExpenseRequestDto;
import com.example.fintrack.dto.expense.ExpenseResponseDto;
import com.example.fintrack.dto.expense.UpdateExpenseRequestDto;
import com.example.fintrack.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponseDto> createExpense(
            @RequestParam Long userId,
            @Valid @RequestBody CreateExpenseRequestDto request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.createExpense(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponseDto>> getUserExpenses(
            @RequestParam Long userId
    ) {
        return ResponseEntity.ok(expenseService.getUserExpenses(userId));
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponseDto> getExpense(
            @RequestParam Long userId,
            @PathVariable Long expenseId
    ) {
        return ResponseEntity.ok(expenseService.getExpense(userId, expenseId));
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponseDto> updateExpense(
            @RequestParam Long userId,
            @PathVariable Long expenseId,
            @Valid @RequestBody UpdateExpenseRequestDto request
    ) {
        return ResponseEntity.ok(expenseService.updateExpense(
                userId,
                expenseId,
                request
        ));
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(
            @RequestParam Long userId,
            @PathVariable Long expenseId
    ) {
        expenseService.deleteExpense(userId, expenseId);
        return ResponseEntity.noContent().build();
    }
}
