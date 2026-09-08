/* =========================================
GET ACCOUNTS
========================================= */

function getAccounts() {

const stored =
    localStorage.getItem("accounts");

if (stored) {
    return JSON.parse(stored);
}

return [];

}

/* =========================================
SAVE ACCOUNTS
========================================= */

function saveAccounts(accounts) {

localStorage.setItem(
    "accounts",
    JSON.stringify(accounts)
);

}

/* =========================================
GET URL PARAMETERS
========================================= */

const urlParams =
new URLSearchParams(window.location.search);

const accountId =
urlParams.get("id");

const pageMode =
urlParams.get("mode");

/* =========================================
ELEMENTS
========================================= */

const pageTitle =
document.getElementById("pageTitle");

const pageDescription =
document.getElementById("pageDescription");

const accountActions =
document.getElementById("accountActions");

const formButtons =
document.getElementById("formButtons");

const accountForm =
document.getElementById("accountForm");

/* =========================================
FORM FIELDS
========================================= */

const fields = [

document.getElementById("prmsId"),

document.getElementById("vendorName"),

document.getElementById("dob"),

document.getElementById("role"),

document.getElementById("module"),

document.getElementById("contact"),

document.getElementById("email"),

document.getElementById("username"),

document.getElementById("status")

];

/* =========================================
RADIO BUTTONS
========================================= */

const genderRadios =
document.querySelectorAll(
'input[name="gender"]'
);

/* =========================================
LOAD ACCOUNT
========================================= */

function loadAccount() {

if (!accountId) {
    return;
}


const accounts =
    getAccounts();


const account =
    accounts.find(function(item) {

        return item.id === Number(accountId);

    });


if (!account) {

    alert("Account not found.");

    window.location.href =
        "account.html";

    return;

}


/* =====================================
   PAGE TITLE
===================================== */

if (pageTitle) {

    pageTitle.textContent =
        "Account Details";

}


if (pageDescription) {

    pageDescription.textContent =
        "View vendor account information";

}


/* =====================================
   FILL FORM
===================================== */

document.getElementById("prmsId").value =
    account.prmsId || "";

document.getElementById("vendorName").value =
    account.name || "";

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

document.getElementById("status").value =
    account.status || "Active";


/* =====================================
   GENDER
===================================== */

genderRadios.forEach(function(radio) {

    radio.checked =
        radio.value === account.gender;

});


/* =====================================
   VIEW MODE
===================================== */

if (pageMode === "view") {

    setViewMode();

}

}

/* =========================================
VIEW MODE
========================================= */

function setViewMode() {

/* Show edit/delete */

if (accountActions) {

    accountActions.style.display =
        "flex";

}


/* Disable all normal fields */

fields.forEach(function(field) {

    if (field) {

        field.disabled = true;

    }

});


/* Disable gender */

genderRadios.forEach(function(radio) {

    radio.disabled = true;

});


/* Hide Save / Cancel */

if (formButtons) {

    formButtons.style.display =
        "none";

}

}

/* =========================================
ENABLE EDIT
========================================= */

function enableEdit() {

fields.forEach(function(field) {

    if (field) {

        field.disabled = false;

    }

});


/* Enable gender */

genderRadios.forEach(function(radio) {

    radio.disabled = false;

});


/* PRMS ID normally should remain fixed */

const prmsId =
    document.getElementById("prmsId");

if (prmsId) {

    prmsId.disabled = true;

}


/* Show Save / Cancel */

if (formButtons) {

    formButtons.style.display =
        "flex";

}


/* Change description */

if (pageDescription) {

    pageDescription.textContent =
        "Edit vendor account information";

}


/* Hide edit button after clicking */

const editBtn =
    document.getElementById("editBtn");

if (editBtn) {

    editBtn.style.display =
        "none";

}

}

/* =========================================
DELETE CURRENT ACCOUNT
========================================= */

function deleteCurrentAccount() {

const confirmed =
    confirm(
        "Are you sure you want to delete this account?"
    );


if (!confirmed) {

    return;

}


let accounts =
    getAccounts();


accounts =
    accounts.filter(function(account) {

        return account.id !== Number(accountId);

    });


saveAccounts(accounts);


alert(
    "Account deleted successfully."
);


window.location.href =
    "account.html";

}

/* =========================================
GO BACK
========================================= */

function goBack() {

window.location.href =
    "account.html";

}

/* =========================================
SAVE / UPDATE ACCOUNT
========================================= */

if (accountForm) {

accountForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* New account */

        if (!accountId) {

            const accounts =
                getAccounts();


            const newAccount = {

                id:
                    Date.now(),

                prmsId:
                    document
                        .getElementById("prmsId")
                        .value
                        .trim(),

                name:
                    document
                        .getElementById("vendorName")
                        .value
                        .trim(),

                dob:
                    document
                        .getElementById("dob")
                        .value,

                gender:
                    document
                        .querySelector(
                            'input[name="gender"]:checked'
                        )?.value || "",

                role:
                    document
                        .getElementById("role")
                        .value,

                module:
                    document
                        .getElementById("module")
                        .value,

                contact:
                    document
                        .getElementById("contact")
                        .value
                        .trim(),

                email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),

                username:
                    document
                        .getElementById("username")
                        .value
                        .trim(),

                status:
                    document
                        .getElementById("status")
                        .value

            };


            accounts.push(newAccount);

            saveAccounts(accounts);


            alert(
                "Account created successfully."
            );


            window.location.href =
                "account.html";

            return;

        }


        /* Update existing account */

        let accounts =
            getAccounts();


        const index =
            accounts.findIndex(
                function(account) {

                    return account.id ===
                        Number(accountId);

                }
            );


        if (index === -1) {

            alert("Account not found.");

            return;

        }


        accounts[index].prmsId =
            document
                .getElementById("prmsId")
                .value
                .trim();

        accounts[index].name =
            document
                .getElementById("vendorName")
                .value
                .trim();

        accounts[index].dob =
            document
                .getElementById("dob")
                .value;

        accounts[index].gender =
            document
                .querySelector(
                    'input[name="gender"]:checked'
                )?.value || "";

        accounts[index].role =
            document
                .getElementById("role")
                .value;

        accounts[index].module =
            document
                .getElementById("module")
                .value;

        accounts[index].contact =
            document
                .getElementById("contact")
                .value
                .trim();

        accounts[index].email =
            document
                .getElementById("email")
                .value
                .trim();

        accounts[index].username =
            document
                .getElementById("username")
                .value
                .trim();

        accounts[index].status =
            document
                .getElementById("status")
                .value;


        saveAccounts(accounts);


        alert(
            "Account updated successfully."
        );


        window.location.href =
            "account.html";

    }
);

}

/* =========================================
INITIALIZE
========================================= */

document.addEventListener(
"DOMContentLoaded",
function() {

    if (accountId) {

        loadAccount();

    }

}

);


