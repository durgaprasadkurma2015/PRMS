package com.example.prms.service;

//package com.example.prms.service;

import com.example.prms.entity.Employee;
import com.example.prms.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;


    public EmployeeService(
            EmployeeRepository employeeRepository) {

        this.employeeRepository =
                employeeRepository;
    }


    // Save employee
    public Employee saveEmployee(Employee employee) {

        if (employeeRepository.existsByEmpNo(
                employee.getEmpNo())) {

            throw new RuntimeException(
                    "Employee number already exists."
            );
        }

        return employeeRepository.save(employee);
    }


    // Get all employees
    public List<Employee> getAllEmployees() {

        return employeeRepository.findAll();
    }


    // Get employee by employee number
    public Employee getByEmpNo(String empNo) {

        return employeeRepository
                .findByEmpNo(empNo)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found."
                        )
                );
    }
}

