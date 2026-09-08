/* =========================================
DEFAULT DATA
========================================= */

const defaultAccounts = [

{
    id: 1,
    prmsId: "PRMS001",
    name: "ABC Technologies",
    username: "abc",
    status: "Active"
},

{
    id: 2,
    prmsId: "PRMS002",
    name: "XYZ Solutions",
    username: "xyz",
    status: "Active"
},

{
    id: 3,
    prmsId: "PRMS003",
    name: "Global Services",
    username: "global",
    status: "Active"
},

{
    id: 4,
    prmsId: "PRMS004",
    name: "Digital Systems",
    username: "digital",
    status: "Active"
},

{
    id: 5,
    prmsId: "PRMS005",
    name: "Prime Solutions",
    username: "prime",
    status: "Active"
}

];

/* =========================================
GET ACCOUNTS
========================================= */

function getAccounts() {

const stored =
    localStorage.getItem("accounts");

if (stored) {

    return JSON.parse(stored);

}

localStorage.setItem(
    "accounts",
    JSON.stringify(defaultAccounts)
);

return defaultAccounts;

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
LOAD ACCOUNT TABLE
========================================= */

function loadAccountTable() {

const accounts = getAccounts();

const tbody =
    document.getElementById("accountTableBody");

if (!tbody) {
    return;
}

tbody.innerHTML = "";


/* Empty state */

const emptyState =
    document.getElementById("emptyAccountState");


if (accounts.length === 0) {

    if (emptyState) {
        emptyState.style.display = "block";
    }

    return;

}


if (emptyState) {
    emptyState.style.display = "none";
}


/* Create rows */

accounts.forEach(function(account, index) {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <!-- S.NO -->

        <td>
            ${index + 1}
        </td>


        <!-- PRMS ID -->

        <td>

            <span class="prms-badge">
                ${account.prmsId}
            </span>

        </td>


        <!-- VENDOR NAME -->

        <td>

            <span class="vendor-name">

               

                ${account.name}

            </span>

        </td>


        <!-- USERNAME -->

        <td>

            <span class="username-text">
                ${account.username}
            </span>

        </td>


        <!-- ACTION -->

        <td class="action-column">

            <button
                type="button"
                class="view-btn"
                title="View Account"
                aria-label="View Account"
                onclick="viewAccount(${account.id})">

                <i class="bi bi-eye"></i>

            </button>

        </td>

    `;


    tbody.appendChild(row);

});

}

/* =========================================
SEARCH ACCOUNTS
========================================= */

function searchAccounts() {

const input =
    document.getElementById("accountSearch");

if (!input) {
    return;
}


const searchValue =
    input.value
        .trim()
        .toLowerCase();


const rows =
    document.querySelectorAll(
        "#accountTableBody tr"
    );


let visibleRows = 0;


rows.forEach(function(row) {

    const text =
        row.textContent.toLowerCase();


    if (text.includes(searchValue)) {

        row.style.display = "";

        visibleRows++;

    } else {

        row.style.display = "none";

    }

});


/* Search empty state */

const emptyState =
    document.getElementById("emptyAccountState");


if (emptyState) {

    emptyState.style.display =
        visibleRows === 0
            ? "block"
            : "none";

}

}

/* =========================================
CREATE ACCOUNT
========================================= */

function openCreateAccount() {

window.location.href =
    "register.html";

}

/* =========================================
VIEW ACCOUNT
========================================= */

function viewAccount(id) {

window.location.href =
    `register.html?id=${id}&mode=view`;

}

/* =========================================
DELETE ACCOUNT
========================================= */

function deleteAccount(id) {

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

        return account.id !== id;

    });


saveAccounts(accounts);


alert(
    "Account deleted successfully."
);


window.location.href =
    "account.html";

}

/* =========================================
INITIALIZE
========================================= */

document.addEventListener(
"DOMContentLoaded",
function() {

    loadAccountTable();

}

);