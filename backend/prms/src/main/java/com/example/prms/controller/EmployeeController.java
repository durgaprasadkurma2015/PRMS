package com.example.prms.controller;

//package com.example.prms.controller;

import com.example.prms.entity.Employee;
import com.example.prms.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;


    public EmployeeController(
            EmployeeService employeeService) {

        this.employeeService =
                employeeService;
    }


    // =========================
    // CREATE EMPLOYEE
    // =========================

    @PostMapping
    public ResponseEntity<?> createEmployee(
            @RequestBody Employee employee) {

        try {

            Employee savedEmployee =
                    employeeService.saveEmployee(employee);

            Map<String, Object> response =
                    new HashMap<>();

            response.put("success", true);

            response.put(
                    "message",
                    "Employee details saved successfully."
            );

            response.put(
                    "employee",
                    savedEmployee
            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            Map<String, Object> response =
                    new HashMap<>();

            response.put("success", false);

            response.put(
                    "message",
                    e.getMessage()
            );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }
    }


    // =========================
    // GET ALL EMPLOYEES
    // =========================

    @GetMapping
    public List<Employee> getAllEmployees() {

        return employeeService.getAllEmployees();
    }


    // =========================
    // GET EMPLOYEE BY EMP NO
    // =========================

    @GetMapping("/{empNo}")
    public ResponseEntity<?> getEmployee(
            @PathVariable String empNo) {

        try {

            return ResponseEntity.ok(
                    employeeService.getByEmpNo(empNo)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}
