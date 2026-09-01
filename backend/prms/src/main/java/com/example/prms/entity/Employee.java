package com.example.prms.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emp_no", nullable = false, unique = true)
    private String empNo;

    @Column(nullable = false)
    private String name;

    @Column(name = "date_of_join_tcs", nullable = false)
    private LocalDate dateOfJoinTcs;

    @Column(name = "previous_exp_in_tcs", nullable = false)
    private String previousExpInTcs;

    @Column(name = "skills_set", nullable = false, length = 1000)
    private String skillsSet;

    @Column(name = "proposed_module", nullable = false)
    private String proposedModule;

    @Column(name = "bgc_status", nullable = false)
    private String bgcStatus;

    @Column(name = "bgc_date", nullable = false)
    private LocalDate bgcDate;

    @Column(name = "pvc_application_date", nullable = false)
    private LocalDate pvcApplicationDate;


    public Employee() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getEmpNo() {
        return empNo;
    }

    public void setEmpNo(String empNo) {
        this.empNo = empNo;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public LocalDate getDateOfJoinTcs() {
        return dateOfJoinTcs;
    }

    public void setDateOfJoinTcs(LocalDate dateOfJoinTcs) {
        this.dateOfJoinTcs = dateOfJoinTcs;
    }


    public String getPreviousExpInTcs() {
        return previousExpInTcs;
    }

    public void setPreviousExpInTcs(String previousExpInTcs) {
        this.previousExpInTcs = previousExpInTcs;
    }


    public String getSkillsSet() {
        return skillsSet;
    }

    public void setSkillsSet(String skillsSet) {
        this.skillsSet = skillsSet;
    }


    public String getProposedModule() {
        return proposedModule;
    }

    public void setProposedModule(String proposedModule) {
        this.proposedModule = proposedModule;
    }


    public String getBgcStatus() {
        return bgcStatus;
    }

    public void setBgcStatus(String bgcStatus) {
        this.bgcStatus = bgcStatus;
    }


    public LocalDate getBgcDate() {
        return bgcDate;
    }

    public void setBgcDate(LocalDate bgcDate) {
        this.bgcDate = bgcDate;
    }


    public LocalDate getPvcApplicationDate() {
        return pvcApplicationDate;
    }

    public void setPvcApplicationDate(
            LocalDate pvcApplicationDate) {

        this.pvcApplicationDate =
                pvcApplicationDate;
    }
}

