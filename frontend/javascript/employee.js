/* =========================================================
   REGISTER / ACCOUNT PAGE
========================================================= */


/* =========================================================
   LOCAL STORAGE
========================================================= */

function getAccounts() {

    const stored =
        localStorage.getItem("accounts");

    return stored
        ? JSON.parse(stored)
        : [];

}


function saveAccounts(accounts) {

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );

}


/* =========================================================
   URL PARAMETERS
========================================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const accountId =
    urlParams.get("id");

let pageMode =
    urlParams.get("mode") || "create";


/* =========================================================
   ELEMENTS
========================================================= */

const accountForm =
    document.getElementById("accountForm");

const pageTitle =
    document.getElementById("pageTitle");

const pageDescription =
    document.getElementById("pageDescription");

const accountActions =
    document.getElementById("accountActions");

const formButtons =
    document.getElementById("formButtons");

const editBtn =
    document.getElementById("editBtn");

const deleteBtn =
    document.getElementById("deleteBtn");


/* =========================================================
   FORM FIELDS
========================================================= */

const fieldIds = [

    "prmsId",
    "vendorName",
    "dob",
    "role",
    "module",
    "contact",
    "email",
    "username"

];


function getFormFields() {

    return fieldIds
        .map(function (id) {

            return document.getElementById(id);

        })
        .filter(function (field) {

            return field;

        });

}


const genderRadios =
    document.querySelectorAll(
        'input[name="gender"]'
    );


/* =========================================================
   POPUP VARIABLES
========================================================= */

let popupCallback = null;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (accountId) {

            loadAccount();

        } else {

            setupCreateMode();

        }

    }
);


/* =========================================================
   CREATE MODE
========================================================= */

function setupCreateMode() {

    pageTitle.textContent =
        "Create Account";

    pageDescription.textContent =
        "Create a new vendor account";

    accountActions.style.display =
        "none";

    formButtons.style.display =
        "flex";

    enableFormFields();

}


/* =========================================================
   LOAD ACCOUNT
========================================================= */

function loadAccount() {

    const accounts =
        getAccounts();


    const account =
        accounts.find(function (item) {

            return String(item.id) ===
                String(accountId);

        });


    if (!account) {

        showPopup(
            "Account Not Found",
            "The selected account could not be found.",
            "warning",
            false,
            function () {

                window.location.href =
                    "employee.html";

            }
        );

        return;

    }


    /* =====================================================
       PAGE INFORMATION
    ===================================================== */

    if (pageMode === "edit") {

        pageTitle.textContent =
            "Edit Account";

        pageDescription.textContent =
            "Edit vendor account information";

    }

    else {

        pageTitle.textContent =
            "Account Details";

        pageDescription.textContent =
            "View vendor account information";

    }


    /* =====================================================
       FILL FORM
    ===================================================== */

    document.getElementById("prmsId").value =
        account.prmsId || "";

    /*
     * Supports both old "name" and new "vendorName"
     */

    document.getElementById("vendorName").value =
        account.vendorName ||
        account.name ||
        "";

    document.getElementById("dob").value =
        account.dob || "";

    document.getElementById("role").value =
        account.role || "";

    document.getElementById("module").value =
        account.module || "";

    document.getElementById("contact").value =
        account.contact || "";

    document.getElementById("email").value =
        account.email || "";

    document.getElementById("username").value =
        account.username || "";


    /* =====================================================
       GENDER
    ===================================================== */

    genderRadios.forEach(function (radio) {

        radio.checked =
            radio.value === account.gender;

    });


    /* =====================================================
       VIEW / EDIT
    ===================================================== */

    if (pageMode === "view") {

        setViewMode();

    }

    else if (pageMode === "edit") {

        enableEditMode();

    }

}


/* =========================================================
   VIEW MODE
========================================================= */

function setViewMode() {

    /* Show Edit/Delete */

    accountActions.style.display =
        "flex";


    /* Hide bottom buttons */

    formButtons.style.display =
        "none";


    /* Disable all fields */

    getFormFields().forEach(function (field) {

        field.disabled = true;

    });


    /* Disable gender */

    genderRadios.forEach(function (radio) {

        radio.disabled = true;

    });


    /* Show Edit */

    editBtn.style.display =
        "flex";


    /* Show Delete */

    deleteBtn.style.display =
        "flex";

}


/* =========================================================
   EDIT BUTTON
========================================================= */

function enableEdit() {

    enableEditMode();

}


/* =========================================================
   EDIT MODE
========================================================= */

function enableEditMode() {

    pageMode = "edit";


    /* Enable fields */

    getFormFields().forEach(function (field) {

        field.disabled = false;

    });


    /* Enable gender */

    genderRadios.forEach(function (radio) {

        radio.disabled = false;

    });


    /* PRMS ID cannot be changed */

    const prmsId =
        document.getElementById("prmsId");

    if (prmsId) {

        prmsId.disabled = true;

    }


    /* Page title */

    pageTitle.textContent =
        "Edit Account";


    pageDescription.textContent =
        "Update vendor account information";


    /* Show form buttons */

    formButtons.style.display =
        "flex";


    /* Hide Edit */

    editBtn.style.display =
        "none";


    /* Keep Delete */

    deleteBtn.style.display =
        "flex";


    /* Change submit button */

    const submitButton =
        accountForm.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.innerHTML = `
            <i class="bi bi-check-lg me-1"></i>
            Save Changes
        `;

    }


    /* Change URL */

    window.history.replaceState(
        {},
        "",
        `employee.html?id=${accountId}&mode=edit`
    );

}


/* =========================================================
   DELETE ACCOUNT
========================================================= */

function deleteCurrentAccount() {

    if (!accountId) {

        showPopup(
            "Invalid Account",
            "The selected account is invalid.",
            "warning"
        );

        return;

    }


    /*
     * First show confirmation popup
     */

    showPopup(
        "Delete Account?",
        "Are you sure you want to permanently delete this account?",
        "danger",
        true,
        function () {

            performDelete();

        }
    );

}


/* =========================================================
   PERFORM DELETE
========================================================= */

function performDelete() {

    let accounts =
        getAccounts();


    const originalLength =
        accounts.length;


    accounts =
        accounts.filter(function (account) {

            return String(account.id) !==
                String(accountId);

        });


    /* Account doesn't exist */

    if (accounts.length === originalLength) {

        showPopup(
            "Account Not Found",
            "The account may have already been deleted.",
            "warning"
        );

        return;

    }


    /* Save */

    saveAccounts(accounts);


    /*
     * Show success popup
     */

    showPopup(
        "Account Deleted",
        "The vendor account was deleted successfully.",
        "success",
        false,
        function () {

            window.location.href =
                "employee.html";

        }
    );

}


/* =========================================================
   FORM SUBMIT
========================================================= */

if (accountForm) {

    accountForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!accountForm.checkValidity()) {

                accountForm.reportValidity();

                return;

            }


            /* Existing account */

            if (accountId) {

                updateAccount();

            }

            /* New account */

            else {

                createAccount();

            }

        }
    );

}


/* =========================================================
   CREATE ACCOUNT
========================================================= */

function createAccount() {

    const accounts =
        getAccounts();


    const newAccount = {

        id:
            Date.now(),

        prmsId:
            getValue("prmsId"),

        name:
            getValue("vendorName"),

        vendorName:
            getValue("vendorName"),

        dob:
            getValue("dob"),

        gender:
            getGender(),

        role:
            getValue("role"),

        module:
            getValue("module"),

        contact:
            getValue("contact"),

        email:
            getValue("email"),

        username:
            getValue("username"),

        status:
            "Active"

    };


    accounts.push(newAccount);


    saveAccounts(accounts);


    /* =====================================================
       SUCCESS POPUP
    ===================================================== */

    showPopup(
        "Account Created",
        "The vendor account has been created successfully.",
        "success",
        false,
        function () {

            window.location.href =
                "employee.html";

        }
    );

}


/* =========================================================
   UPDATE ACCOUNT
========================================================= */

function updateAccount() {

    const accounts =
        getAccounts();


    const index =
        accounts.findIndex(function (account) {

            return String(account.id) ===
                String(accountId);

        });


    if (index === -1) {

        showPopup(
            "Account Not Found",
            "The account could not be found.",
            "warning"
        );

        return;

    }


    /*
     * Keep original PRMS ID
     */

    accounts[index].prmsId =
        accounts[index].prmsId;


    accounts[index].name =
        getValue("vendorName");

    accounts[index].vendorName =
        getValue("vendorName");

    accounts[index].dob =
        getValue("dob");

    accounts[index].gender =
        getGender();

    accounts[index].role =
        getValue("role");

    accounts[index].module =
        getValue("module");

    accounts[index].contact =
        getValue("contact");

    accounts[index].email =
        getValue("email");

    accounts[index].username =
        getValue("username");


    saveAccounts(accounts);


    /* =====================================================
       SUCCESS POPUP
    ===================================================== */

    showPopup(
        "Account Updated",
        "The vendor account has been updated successfully.",
        "success",
        false,
        function () {

            window.location.href =
                "employee.html";

        }
    );

}


/* =========================================================
   GET VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    return element
        ? element.value.trim()
        : "";

}


/* =========================================================
   GET GENDER
========================================================= */

function getGender() {

    const selected =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    return selected
        ? selected.value
        : "";

}


/* =========================================================
   ENABLE FORM
========================================================= */

function enableFormFields() {

    getFormFields().forEach(function (field) {

        field.disabled = false;

    });


    genderRadios.forEach(function (radio) {

        radio.disabled = false;

    });

}


/* =========================================================
   GO BACK
========================================================= */

function goBack() {

    window.location.href =
        "account.html";

}


/* =========================================================
   CUSTOM POPUP
========================================================= */

function showPopup(
    title,
    message,
    type = "success",
    showCancel = false,
    callback = null
) {

    const popup =
        document.getElementById("customPopup");

    const popupTitle =
        document.getElementById("popupTitle");

    const popupMessage =
        document.getElementById("popupMessage");

    const popupIcon =
        document.getElementById("popupIcon");

    const popupButtons =
        document.querySelector(
            ".popup-buttons"
        );

    const popupCancel =
        document.getElementById("popupCancel");

    const popupOk =
        document.getElementById("popupOk");


    if (!popup) {

        return;

    }


    /* =====================================================
       TEXT
    ===================================================== */

    popupTitle.textContent =
        title;

    popupMessage.textContent =
        message;


    /* =====================================================
       ICON
    ===================================================== */

    popupIcon.className =
        "popup-icon " + type;


    if (type === "success") {

        popupIcon.innerHTML =
            '<i class="bi bi-check-lg"></i>';

    }

    else if (type === "danger") {

        popupIcon.innerHTML =
            '<i class="bi bi-trash3"></i>';

    }

    else if (type === "warning") {

        popupIcon.innerHTML =
            '<i class="bi bi-exclamation-lg"></i>';

    }

    else {

        popupIcon.innerHTML =
            '<i class="bi bi-info-lg"></i>';

    }


    /* =====================================================
       CANCEL BUTTON
    ===================================================== */

    if (showCancel) {

        popupCancel.style.display =
            "block";

    }

    else {

        popupCancel.style.display =
            "none";

    }


    /* =====================================================
       BUTTON TEXT
    ===================================================== */

    popupOk.textContent =
        showCancel
            ? "Delete"
            : "OK";


    /* =====================================================
       DELETE BUTTON COLOR
    ===================================================== */

    popupOk.classList.toggle(
        "danger-button",
        type === "danger"
    );


    /* =====================================================
       SINGLE BUTTON
    ===================================================== */

    popupButtons.classList.toggle(
        "single-button",
        !showCancel
    );


    /* =====================================================
       CALLBACK
    ===================================================== */

    popupCallback =
        callback;


    /* =====================================================
       SHOW
    ===================================================== */

    popup.classList.add("show");

}


/* =========================================================
   CLOSE POPUP
========================================================= */

function closePopup() {

    const popup =
        document.getElementById("customPopup");

    if (!popup) {

        return;

    }


    popup.classList.remove("show");

    popupCallback = null;

}


/* =========================================================
   POPUP OK / DELETE
========================================================= */

function popupOkAction() {

    const callback =
        popupCallback;


    closePopup();


    if (typeof callback === "function") {

        callback();

    }

}
