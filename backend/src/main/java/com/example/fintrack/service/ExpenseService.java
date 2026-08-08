package com.example.fintrack.service;

import com.example.fintrack.dto.expense.CreateExpenseRequestDto;
import com.example.fintrack.dto.expense.ExpenseResponseDto;
import com.example.fintrack.dto.expense.UpdateExpenseRequestDto;
import com.example.fintrack.entity.Expense;
import com.example.fintrack.entity.User;
import com.example.fintrack.repository.ExpenseRepository;
import com.example.fintrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseResponseDto createExpense(Long userId, CreateExpenseRequestDto request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Expense expense = Expense.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .amount(request.getAmount())
                .category(request.getCategory())
                .expenseDate(request.getExpenseDate())
                .user(user)
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        return mapToResponse(savedExpense);
    }

    public List<ExpenseResponseDto> getUserExpenses(Long userId) {

        return expenseRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ExpenseResponseDto getExpense(Long userId, Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found")
                );

        if (!expense.getUser().getId().equals(userId)) {
            throw new RuntimeException(
                    "You are not allowed to access this expense"
            );
        }

        return mapToResponse(expense);
    }

    public ExpenseResponseDto updateExpense(Long userId, Long expenseId, UpdateExpenseRequestDto request) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found")
                );

        if (!expense.getUser().getId().equals(userId)) {
            throw new RuntimeException(
                    "You are not allowed to update this expense"
            );
        }

        expense.setTitle(request.getTitle());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setExpenseDate(request.getExpenseDate());

        Expense updatedExpense = expenseRepository.save(expense);

        return mapToResponse(updatedExpense);
    }

    public void deleteExpense(Long userId, Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found")
                );

        if (!expense.getUser().getId().equals(userId)) {
            throw new RuntimeException(
                    "You are not allowed to delete this expense"
            );
        }

        expenseRepository.delete(expense);
    }

    private ExpenseResponseDto mapToResponse(Expense expense) {

        return new ExpenseResponseDto(
                expense.getId(),
                expense.getTitle(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getExpenseDate()
        );
    }
}
