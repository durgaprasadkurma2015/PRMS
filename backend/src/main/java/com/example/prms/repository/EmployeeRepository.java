package com.example.prms.repository;

import com.example.prms.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmpNo(String empNo);

    boolean existsByEmpNo(String empNo);
}