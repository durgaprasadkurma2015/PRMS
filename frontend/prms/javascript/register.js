(function () {

    /* =====================================================
       SAMPLE DATA
    ===================================================== */

    const sampleAccounts = {

        1: {
            name: "Rahul Kumar",
            dob: "1990-05-15",
            gender: "Male",
            role: "Manager",
            module: "Vendor Management",
            contact: "9876543210",
            email: "rahul@example.com",
            prmsId: "PRMS001",
            username: "rahul.kumar"
        },

        2: {
            name: "Priya Sharma",
            dob: "1993-08-20",
            gender: "Female",
            role: "Employee",
            module: "Resource Management",
            contact: "9876501234",
            email: "priya@example.com",
            prmsId: "PRMS002",
            username: "priya.sharma"
        },

        3: {
            name: "Amit Singh",
            dob: "1988-11-10",
            gender: "Male",
            role: "Admin",
            module: "Onboarding",
            contact: "9988776655",
            email: "amit@example.com",
            prmsId: "PRMS003",
            username: "amit.singh"
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const form =
        document.getElementById("registerForm");

    const title =
        document.getElementById("registerTitle");

    const subtitle =
        document.getElementById("registerSubtitle");

    const viewActions =
        document.getElementById("viewActions");

    const formActions =
        document.getElementById("formActions");

    const submitBtn =
        document.getElementById("submitBtn");

    const resetBtn =
        document.getElementById("resetBtn");

    const editBtn =
        document.getElementById("editBtn");

    const deleteBtn =
        document.getElementById("deleteBtn");

    const closeBtn =
        document.getElementById("closeBtn");

    const message =
        document.getElementById("message");


    /* =====================================================
       PARAMETERS
    ===================================================== */

    const hash =
        window.location.hash;

    const queryPosition =
        hash.indexOf("?");


    let params =
        new URLSearchParams();


    if (queryPosition !== -1) {

        params =
            new URLSearchParams(
                hash.substring(
                    queryPosition + 1
                )
            );

    }


    const accountId =
        params.get("id");

    const mode =
        params.get("mode") || "create";


    /* =====================================================
       FIELDS
    ===================================================== */

    const fields = [

        document.getElementById("name"),

        document.getElementById("dob"),

        document.getElementById("role"),

        document.getElementById("module"),

        document.getElementById("contact"),

        document.getElementById("email"),

        document.getElementById("prmsId")

    ];


    /* =====================================================
       SET READONLY
    ===================================================== */

    function setReadonly(readonly) {

        fields.forEach(function (field) {

            field.disabled =
                readonly;

        });


        document
            .querySelectorAll(
                'input[name="gender"]'
            )
            .forEach(function (radio) {

                radio.disabled =
                    readonly;

            });


        /*
         * Username is always readonly
         */

        document.getElementById(
            "username"
        ).readOnly = true;

    }


    /* =====================================================
       LOAD ACCOUNT
    ===================================================== */

    function loadAccount(account) {

        document.getElementById(
            "name"
        ).value =
            account.name;


        document.getElementById(
            "dob"
        ).value =
            account.dob;


        document.getElementById(
            "role"
        ).value =
            account.role;


        document.getElementById(
            "module"
        ).value =
            account.module;


        document.getElementById(
            "contact"
        ).value =
            account.contact;


        document.getElementById(
            "email"
        ).value =
            account.email;


        document.getElementById(
            "prmsId"
        ).value =
            account.prmsId;


        document.getElementById(
            "username"
        ).value =
            account.username;


        const gender =
            document.querySelector(
                `input[name="gender"][value="${account.gender}"]`
            );


        if (gender) {

            gender.checked =
                true;

        }

    }


    /* =====================================================
       CREATE
    ===================================================== */

    function createMode() {

        title.textContent =
            "Create Account";


        subtitle.textContent =
            "Please fill in your details to register";


        form.reset();


        setReadonly(false);


        viewActions.classList.add(
            "d-none"
        );


        formActions.classList.remove(
            "d-none"
        );


        submitBtn.innerHTML = `

            <i class="bi bi-person-plus me-1"></i>

            Register

        `;


        resetBtn.classList.remove(
            "d-none"
        );

    }


    /* =====================================================
       VIEW
    ===================================================== */

    function viewMode(id) {

        const account =
            sampleAccounts[id];


        if (!account) {

            showMessage(
                "Account not found.",
                "danger"
            );

            return;

        }


        title.textContent =
            "Account Details";


        subtitle.textContent =
            "View account information";


        loadAccount(account);


        /*
         * Disable every field
         */

        setReadonly(true);


        /*
         * Show Edit / Delete
         */

        viewActions.classList.remove(
            "d-none"
        );


        /*
         * Hide Register / Reset / Close
         */

        formActions.classList.add(
            "d-none"
        );

    }


    /* =====================================================
       EDIT
    ===================================================== */

    function editMode() {

        title.textContent =
            "Edit Account";


        subtitle.textContent =
            "Update account information";


        setReadonly(false);


        viewActions.classList.add(
            "d-none"
        );


        formActions.classList.remove(
            "d-none"
        );


        submitBtn.innerHTML = `

            <i class="bi bi-check-circle me-1"></i>

            Update Account

        `;


        resetBtn.classList.add(
            "d-none"
        );

    }


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(
        text,
        type
    ) {

        message.innerHTML = `

            <div class="alert alert-${type}">

                ${text}

            </div>

        `;

    }


    /* =====================================================
       EDIT BUTTON
    ===================================================== */

    editBtn.addEventListener(
        "click",
        function () {

            editMode();

        }
    );


    /* =====================================================
       DELETE BUTTON
    ===================================================== */

    deleteBtn.addEventListener(
        "click",
        function () {

            const confirmed =
                confirm(
                    "Are you sure you want to delete this account?"
                );


            if (!confirmed) {

                return;

            }


            /*
             * Backend DELETE API
             * will go here later.
             */

            showMessage(
                "Account deleted successfully.",
                "success"
            );


            setTimeout(
                function () {

                    window.location.hash =
                        "account-details";

                },
                800
            );

        }
    );


    /* =====================================================
       CLOSE
    ===================================================== */

    closeBtn.addEventListener(
        "click",
        function () {

            window.location.hash =
                "account-details";

        }
    );


    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (mode === "edit") {

                showMessage(
                    "Account updated successfully.",
                    "success"
                );

            } else {

                showMessage(
                    "Account registered successfully.",
                    "success"
                );

            }


            setTimeout(
                function () {

                    window.location.hash =
                        "account-details";

                },
                800
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    if (
        mode === "view" &&
        accountId
    ) {

        viewMode(
            accountId
        );

    } else if (
        mode === "edit" &&
        accountId
    ) {

        const account =
            sampleAccounts[
                accountId
            ];


        if (account) {

            loadAccount(account);

            editMode();

        } else {

            createMode();

        }

    } else {

        createMode();

    }

})();
