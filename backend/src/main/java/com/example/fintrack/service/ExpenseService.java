package com.example.fintrack.service;

import com.example.fintrack.dto.expense.CreateExpenseRequest;
import com.example.fintrack.dto.expense.ExpenseResponse;
import com.example.fintrack.dto.expense.UpdateExpenseRequest;
import com.example.fintrack.entity.Expense;
import com.example.fintrack.entity.User;
import com.example.fintrack.exception.ResourceNotFoundException;
import com.example.fintrack.exception.UnauthorizedException;
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

    public ExpenseResponse createExpense(Long userId, CreateExpenseRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id: " + userId)
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

    public List<ExpenseResponse> getUserExpenses(Long userId) {

        return expenseRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ExpenseResponse getExpense(Long userId, Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense not found with id: " + expenseId)
                );

        if (!expense.getUser().getId().equals(userId)) {
            throw new UnauthorizedException(
                    "You are not allowed to access this expense"
            );
        }

        return mapToResponse(expense);
    }

    public ExpenseResponse updateExpense(Long userId, Long expenseId, UpdateExpenseRequest request) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense not found with id: " + expenseId)
                );

        if (!expense.getUser().getId().equals(userId)) {
            throw new UnauthorizedException(
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
                        new ResourceNotFoundException("Expense not found with id: " + expenseId)
                );

        if (!expense.getUser().getId().equals(userId)) {
            throw new UnauthorizedException(
                    "You are not allowed to delete this expense"
            );
        }

        expenseRepository.delete(expense);
    }

    private ExpenseResponse mapToResponse(Expense expense) {

        return new ExpenseResponse(
                expense.getId(),
                expense.getTitle(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getExpenseDate()
        );
    }
}
