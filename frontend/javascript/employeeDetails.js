/* =========================================================
   EMPLOYEE DETAILS / EMPLOYEE FORM
========================================================= */


/* =========================================================
   DEFAULT EMPLOYEES
========================================================= */

const defaultEmployees = [

    {
        id: 1,
        empNo: "EMP001",
        name: "John Smith",
        dateOfJoin: "2022-06-15",
        previousExperience: "3 Years",
        skillsSet: "JavaScript, HTML, CSS, Bootstrap",
        proposedModule: "Vendor Management",
        bgcStatus: "Completed",
        bgcDate: "2022-06-20",
        pvcApplicationDate: "2022-06-25"
    },

    {
        id: 2,
        empNo: "EMP002",
        name: "Priya Sharma",
        dateOfJoin: "2023-01-10",
        previousExperience: "2 Years",
        skillsSet: "Java, Spring Boot, SQL",
        proposedModule: "Resource Management",
        bgcStatus: "In Progress",
        bgcDate: "2023-01-15",
        pvcApplicationDate: "2023-01-20"
    },

    {
        id: 3,
        empNo: "EMP003",
        name: "Rahul Kumar",
        dateOfJoin: "2024-03-05",
        previousExperience: "5 Years",
        skillsSet: "React, JavaScript, Node.js",
        proposedModule: "Onboarding",
        bgcStatus: "Pending",
        bgcDate: "",
        pvcApplicationDate: ""
    }

];


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getEmployees() {

    const stored =
        localStorage.getItem("employees");

    if (stored) {

        try {

            return JSON.parse(stored);

        } catch (error) {

            console.error(
                "Employee localStorage error:",
                error
            );

        }

    }


    localStorage.setItem(
        "employees",
        JSON.stringify(defaultEmployees)
    );


    return defaultEmployees;

}


function saveEmployees(employees) {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}


/* =========================================================
   URL PARAMETERS
========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const employeeId =
    urlParams.get("id");


let pageMode =
    urlParams.get("mode") || "create";


/* =========================================================
   FORM ELEMENTS
========================================================= */

let employeeForm = null;
let employeeTitle = null;
let subtitle = null;
let submitButton = null;
let message = null;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Find form elements if we are
         * currently on employee.html.
         */

        employeeForm =
            document.getElementById(
                "employeeForm"
            );


        employeeTitle =
            document.querySelector(
                ".employee-title"
            );


        subtitle =
            document.querySelector(
                ".subtitle"
            );


        submitButton =
            document.getElementById(
                "submitBtn"
            );


        message =
            document.getElementById(
                "message"
            );


        /*
         * Render employee grid.
         *
         * On employee.html this simply
         * does nothing because the table
         * does not exist there.
         */

        renderEmployees();


        /*
         * If employee form exists,
         * handle create/view/edit mode.
         */

        if (employeeForm) {

            if (employeeId) {

                loadEmployee();

            }
            else {

                setupCreateMode();

            }

        }

    }
);


/* =========================================================
   CREATE EMPLOYEE BUTTON
========================================================= */

function openCreateEmployee() {

    window.location.href =
        "employee.html";

}


/* =========================================================
   VIEW EMPLOYEE
========================================================= */

function viewEmployee(id) {

    window.location.href =
        `employee.html?id=${encodeURIComponent(id)}&mode=view`;

}


/* =========================================================
   EDIT EMPLOYEE FROM GRID
========================================================= */

function editEmployeeFromGrid(id) {

    window.location.href =
        `employee.html?id=${encodeURIComponent(id)}&mode=edit`;

}


/* =========================================================
   CREATE MODE
========================================================= */

function setupCreateMode() {

    pageMode = "create";


    if (employeeTitle) {

        employeeTitle.textContent =
            "Employee Details";

    }


    if (subtitle) {

        subtitle.textContent =
            "Enter employee information";

    }


    enableForm();


    if (submitButton) {

        submitButton.style.display =
            "block";

        submitButton.innerHTML =
            "Submit";

    }

}


/* =========================================================
   LOAD EMPLOYEE
========================================================= */

function loadEmployee() {

    const employees =
        getEmployees();


    const employee =
        employees.find(
            function (item) {

                return String(item.id) ===
                    String(employeeId);

            }
        );


    if (!employee) {

        showMessage(
            "Employee not found.",
            "danger"
        );


        setTimeout(
            function () {

                window.location.href =
                    "employeeDetails.html";

            },
            1000
        );


        return;

    }


    /* =====================================================
       FILL FORM
    ===================================================== */

    setValue(
        "empNo",
        employee.empNo
    );


    setValue(
        "name",
        employee.name
    );


    setValue(
        "dateOfJoin",
        employee.dateOfJoin
    );


    setValue(
        "previousExperience",
        employee.previousExperience
    );


    setValue(
        "skillsSet",
        employee.skillsSet
    );


    setValue(
        "proposedModule",
        employee.proposedModule
    );


    setValue(
        "bgcStatus",
        employee.bgcStatus
    );


    setValue(
        "bgcDate",
        employee.bgcDate
    );


    setValue(
        "pvcApplicationDate",
        employee.pvcApplicationDate
    );


    /* =====================================================
       MODE
    ===================================================== */

    if (pageMode === "view") {

        setupViewMode();

    }
    else {

        setupEditMode();

    }

}


/* =========================================================
   VIEW MODE
========================================================= */

function setupViewMode() {

    pageMode = "view";


    if (employeeTitle) {

        employeeTitle.textContent =
            "Employee Details";

    }


    if (subtitle) {

        subtitle.textContent =
            "View employee information";

    }


    disableForm();


    if (submitButton) {

        submitButton.style.display =
            "none";

    }


    createViewButtons();

}


/* =========================================================
   EDIT MODE
========================================================= */

function setupEditMode() {

    pageMode = "edit";


    if (employeeTitle) {

        employeeTitle.textContent =
            "Edit Employee Details";

    }


    if (subtitle) {

        subtitle.textContent =
            "Update employee information";

    }


    enableForm();


    /*
     * Emp No cannot be changed.
     */

    const empNo =
        document.getElementById(
            "empNo"
        );


    if (empNo) {

        empNo.disabled = true;

    }


    if (submitButton) {

        submitButton.style.display =
            "block";

        submitButton.innerHTML =
            "Save Changes";

    }

}


/* =========================================================
   ENABLE FORM
========================================================= */

function enableForm() {

    if (!employeeForm) {

        return;

    }


    const fields =
        employeeForm.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(
        function (field) {

            field.disabled = false;

        }
    );

}


/* =========================================================
   DISABLE FORM
========================================================= */

function disableForm() {

    if (!employeeForm) {

        return;

    }


    const fields =
        employeeForm.querySelectorAll(
            "input, select, textarea"
        );


    fields.forEach(
        function (field) {

            field.disabled = true;

        }
    );

}


/* =========================================================
   VIEW BUTTONS
========================================================= */

function createViewButtons() {

    const oldActions =
        document.getElementById(
            "employeeActions"
        );


    if (oldActions) {

        oldActions.remove();

    }


    const actions =
        document.createElement(
            "div"
        );


    actions.id =
        "employeeActions";


    actions.style.display =
        "flex";

    actions.style.gap =
        "10px";

    actions.style.marginTop =
        "20px";


    actions.innerHTML = `

        <button
            type="button"
            class="btn btn-primary"
            onclick="editEmployee()">

            <i class="bi bi-pencil"></i>
            Edit

        </button>


        <button
            type="button"
            class="btn btn-danger"
            onclick="deleteEmployee()">

            <i class="bi bi-trash"></i>
            Delete

        </button>


        <button
            type="button"
            class="btn btn-secondary"
            onclick="goBack()">

            <i class="bi bi-arrow-left"></i>
            Back

        </button>

    `;


    if (employeeForm) {

        employeeForm.appendChild(
            actions
        );

    }

}


/* =========================================================
   EDIT EMPLOYEE
========================================================= */

function editEmployee() {

    pageMode = "edit";


    enableForm();


    const empNo =
        document.getElementById(
            "empNo"
        );


    if (empNo) {

        empNo.disabled = true;

    }


    if (employeeTitle) {

        employeeTitle.textContent =
            "Edit Employee Details";

    }


    if (subtitle) {

        subtitle.textContent =
            "Update employee information";

    }


    if (submitButton) {

        submitButton.style.display =
            "block";

        submitButton.innerHTML =
            "Save Changes";

    }


    const actions =
        document.getElementById(
            "employeeActions"
        );


    if (actions) {

        actions.remove();

    }


    window.history.replaceState(
        {},
        "",
        `employee.html?id=${encodeURIComponent(employeeId)}&mode=edit`
    );

}


/* =========================================================
   FORM SUBMIT
========================================================= */

document.addEventListener(
    "submit",
    function (event) {

        if (
            !event.target.matches(
                "#employeeForm"
            )
        ) {

            return;

        }


        event.preventDefault();


        const form =
            event.target;


        if (!form.checkValidity()) {

            form.classList.add(
                "was-validated"
            );

            return;

        }


        if (
            pageMode === "edit" &&
            employeeId
        ) {

            updateEmployee();

        }
        else {

            createEmployee();

        }

    }
);


/* =========================================================
   CREATE EMPLOYEE
========================================================= */

function createEmployee() {

    const employees =
        getEmployees();


    let empNo =
        getValue("empNo");


    /*
     * Automatically generate EMP number
     * if the field is empty.
     */

    if (!empNo) {

        empNo =
            generateEmployeeNumber(
                employees
            );

    }


    const newEmployee = {

        id:
            Date.now(),

        empNo:
            empNo,

        name:
            getValue("name"),

        dateOfJoin:
            getValue("dateOfJoin"),

        previousExperience:
            getValue("previousExperience"),

        skillsSet:
            getValue("skillsSet"),

        proposedModule:
            getValue("proposedModule"),

        bgcStatus:
            getValue("bgcStatus"),

        bgcDate:
            getValue("bgcDate"),

        pvcApplicationDate:
            getValue("pvcApplicationDate")

    };


    employees.push(
        newEmployee
    );


    saveEmployees(
        employees
    );


    showMessage(
        "Employee created successfully.",
        "success"
    );


    /*
     * Redirect to employee grid.
     */

    setTimeout(
        function () {

            window.location.href =
                "employeeDetails.html";

        },
        700
    );

}


/* =========================================================
   GENERATE EMPLOYEE NUMBER
========================================================= */

function generateEmployeeNumber(
    employees
) {

    let highestNumber = 0;


    employees.forEach(
        function (employee) {

            const match =
                String(
                    employee.empNo || ""
                ).match(
                    /^EMP(\d+)$/i
                );


            if (match) {

                const number =
                    parseInt(
                        match[1],
                        10
                    );


                if (
                    number >
                    highestNumber
                ) {

                    highestNumber =
                        number;

                }

            }

        }
    );


    return (
        "EMP" +
        String(
            highestNumber + 1
        ).padStart(
            3,
            "0"
        )
    );

}


/* =========================================================
   UPDATE EMPLOYEE
========================================================= */

function updateEmployee() {

    const employees =
        getEmployees();


    const index =
        employees.findIndex(
            function (employee) {

                return String(employee.id) ===
                    String(employeeId);

            }
        );


    if (index === -1) {

        showMessage(
            "Employee not found.",
            "danger"
        );

        return;

    }


    /*
     * Keep original Emp No.
     */

    const originalEmpNo =
        employees[index].empNo;


    employees[index] = {

        ...employees[index],

        empNo:
            originalEmpNo,

        name:
            getValue("name"),

        dateOfJoin:
            getValue("dateOfJoin"),

        previousExperience:
            getValue("previousExperience"),

        skillsSet:
            getValue("skillsSet"),

        proposedModule:
            getValue("proposedModule"),

        bgcStatus:
            getValue("bgcStatus"),

        bgcDate:
            getValue("bgcDate"),

        pvcApplicationDate:
            getValue("pvcApplicationDate")

    };


    saveEmployees(
        employees
    );


    showMessage(
        "Employee updated successfully.",
        "success"
    );


    setTimeout(
        function () {

            window.location.href =
                "employeeDetails.html";

        },
        700
    );

}


/* =========================================================
   DELETE EMPLOYEE FROM FORM
========================================================= */

function deleteEmployee() {

    if (!employeeId) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmed) {

        return;

    }


    let employees =
        getEmployees();


    employees =
        employees.filter(
            function (employee) {

                return String(employee.id) !==
                    String(employeeId);

            }
        );


    saveEmployees(
        employees
    );


    showMessage(
        "Employee deleted successfully.",
        "success"
    );


    setTimeout(
        function () {

            window.location.href =
                "employeeDetails.html";

        },
        700
    );

}


/* =========================================================
   RENDER EMPLOYEE GRID
========================================================= */

/* =========================================================
   RENDER EMPLOYEE GRID
========================================================= */

function renderEmployees(employeeList = null) {

    const tableBody =
        document.getElementById("employeeTableBody");

    const emptyState =
        document.getElementById("emptyAccountState");


    /* employee.html does not have the grid */
    if (!tableBody) {
        return;
    }


    const employees =
        employeeList || getEmployees();


    tableBody.innerHTML = "";


    /* EMPTY STATE */

    if (employees.length === 0) {

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;
    }


    if (emptyState) {
        emptyState.style.display = "none";
    }


    /* CREATE ROWS */

   employees.forEach(function (employee, index) {

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>
            ${index + 1}
        </td>

        <td>
            ${escapeHtml(employee.empNo || "-")}
        </td>

        <td>
            ${escapeHtml(employee.name || "-")}
        </td>

        <td>
            ${escapeHtml(employee.proposedModule || "-")}
        </td>

        <td>
            ${getBGCStatusBadge(employee.bgcStatus)}
        </td>

        <td>
            <div class="employee-action-buttons">

                <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    title="View Employee"
                    onclick="viewEmployee('${employee.id}')">

                    <i class="bi bi-eye"></i>

                </button>

            </div>
        </td>

    `;

    tableBody.appendChild(row);

});

}


    




/* =========================================================
   BGC STATUS BADGE
========================================================= */

function getBGCStatusBadge(status) {

    const value =
        String(
            status || "Pending"
        );


    let badgeClass =
        "bg-secondary";


    if (
        value.toLowerCase() ===
        "completed"
    ) {

        badgeClass =
            "bg-success";

    }
    else if (
        value.toLowerCase() ===
        "in progress"
    ) {

        badgeClass =
            "bg-warning text-dark";

    }
    else if (
        value.toLowerCase() ===
        "pending"
    ) {

        badgeClass =
            "bg-secondary";

    }


    return `
        <span class="badge ${badgeClass}">
            ${escapeHtml(value)}
        </span>
    `;

}


/* =========================================================
   DELETE FROM GRID
========================================================= */

function deleteEmployeeFromGrid(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmed) {

        return;

    }


    let employees =
        getEmployees();


    employees =
        employees.filter(
            function (employee) {

                return String(employee.id) !==
                    String(id);

            }
        );


    saveEmployees(
        employees
    );


    renderEmployees();

}


/* =========================================================
   SEARCH EMPLOYEES
========================================================= */

function searchEmployees() {

    const searchInput =
        document.getElementById(
            "employeeSearch"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const employees =
        getEmployees();


    if (!searchText) {

        renderEmployees(
            employees
        );

        return;

    }


    const filtered =
        employees.filter(
            function (employee) {

                return (

                    String(
                        employee.empNo || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        employee.name || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        employee.proposedModule || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        employee.bgcStatus || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                    ||

                    String(
                        employee.skillsSet || ""
                    )
                    .toLowerCase()
                    .includes(searchText)

                );

            }
        );


    renderEmployees(
        filtered
    );

}


/* =========================================================
   GET VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(
            id
        );


    return element
        ? element.value.trim()
        : "";

}


/* =========================================================
   SET VALUE
========================================================= */

function setValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value || "";

    }

}


/* =========================================================
   SHOW MESSAGE
========================================================= */

function showMessage(
    text,
    type
) {

    if (!message) {

        return;

    }


    message.className =
        `alert alert-${type} text-center`;


    message.textContent =
        text;


    message.classList.remove(
        "d-none"
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   GO BACK
========================================================= */

function goBack() {

    window.location.href =
        "employeeDetails.html";

}
