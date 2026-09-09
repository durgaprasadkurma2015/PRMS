/* =========================================================
   PRMS LOGIN
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginForm =
    document.getElementById("loginForm");

const username =
    document.getElementById("username");

const password =
    document.getElementById("password");

const usernameError =
    document.getElementById("usernameError");

const passwordError =
    document.getElementById("passwordError");

const message =
    document.getElementById("message");

const loginButton =
    document.getElementById("loginButton");

const showPassword =
    document.getElementById("showPassword");


/* =========================================================
   CONFIGURATION
   ========================================================= */

const MAX_USERNAME_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 100;


/* =========================================================
   CHECK REQUIRED ELEMENTS
   ========================================================= */

if (
    !loginForm ||
    !username ||
    !password ||
    !usernameError ||
    !passwordError ||
    !message ||
    !loginButton ||
    !showPassword
) {

    console.error(
        "Login page elements are missing."
    );

    throw new Error(
        "Login page initialization failed."
    );

}


/* =========================================================
   GENERAL MESSAGE
   ========================================================= */

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        "message mb-3 " + type;

}


/* =========================================================
   CLEAR GENERAL MESSAGE
   ========================================================= */

function clearMessage() {

    message.textContent = "";

    message.className =
        "message mb-3";

}


/* =========================================================
   USERNAME ERROR
   ========================================================= */

function showUsernameError(text) {

    username.classList.add(
        "is-invalid"
    );

    usernameError.textContent = text;

    usernameError.classList.add(
        "show"
    );

}


/* =========================================================
   CLEAR USERNAME ERROR
   ========================================================= */

function clearUsernameError() {

    username.classList.remove(
        "is-invalid"
    );

    usernameError.textContent = "";

    usernameError.classList.remove(
        "show"
    );

}


/* =========================================================
   USERNAME VALIDATION
   ========================================================= */

function validateUsername(showError = true) {

    const value = username.value;


    /* Empty username */

    if (value.length === 0) {

        if (showError) {

            showUsernameError(
                "Please enter your username."
            );

        }

        return false;
    }


    /* Username too long */

    if (
        value.length >
        MAX_USERNAME_LENGTH
    ) {

        if (showError) {

            showUsernameError(
                "Username cannot exceed 10 characters."
            );

        }

        return false;
    }


    /* Username valid */

    clearUsernameError();

    return true;

}


/* =========================================================
   USERNAME INPUT
   ========================================================= */

username.addEventListener(
    "input",
    function () {

        /*
         * Convert uppercase letters
         * to lowercase.
         *
         * Remove spaces.
         *
         * Remove special characters.
         *
         * Allow only:
         *
         * a-z
         * 0-9
         *
         * Maximum 10 characters.
         */

        username.value =
            username.value
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "")
                .slice(
                    0,
                    MAX_USERNAME_LENGTH
                );


        /*
         * Show error when empty.
         */

        if (
            username.value.length === 0
        ) {

            showUsernameError(
                "Please enter your username."
            );

        } else {

            clearUsernameError();

        }


        /*
         * Clear server message
         * when user starts typing.
         */

        clearMessage();


        /*
         * Update button.
         */

        updateLoginButton();

    }
);


/* =========================================================
   USERNAME FOCUS
   ========================================================= */

username.addEventListener(
    "focus",
    function () {

        if (
            username.value.length === 0
        ) {

            showUsernameError(
                "Please enter your username."
            );

        }

    }
);


/* =========================================================
   USERNAME BLUR
   ========================================================= */

username.addEventListener(
    "blur",
    function () {

        validateUsername(true);

        updateLoginButton();

    }
);


/* =========================================================
   PASSWORD ERROR
   ========================================================= */

function showPasswordError(text) {

    password.classList.add(
        "is-invalid"
    );

    passwordError.textContent = text;

    passwordError.classList.add(
        "show"
    );

}


/* =========================================================
   CLEAR PASSWORD ERROR
   ========================================================= */

function clearPasswordError() {

    password.classList.remove(
        "is-invalid"
    );

    passwordError.textContent = "";

    passwordError.classList.remove(
        "show"
    );

}


/* =========================================================
   PASSWORD VALIDATION
   ========================================================= */

function validatePassword(showError = true) {

    const value = password.value;


    /* Empty password */

    if (value.length === 0) {

        if (showError) {

            showPasswordError(
                "Please enter your password."
            );

        }

        return false;
    }


    /* Password too long */

    if (
        value.length >
        MAX_PASSWORD_LENGTH
    ) {

        if (showError) {

            showPasswordError(
                "Password cannot exceed 100 characters."
            );

        }

        return false;
    }


    /* Password valid */

    clearPasswordError();

    return true;

}


/* =========================================================
   PASSWORD INPUT
   ========================================================= */

password.addEventListener(
    "input",
    function () {
        this.value = this.value.replace(/\s/g, ""); 

        /*
         * Maximum password length.
         */

        if (
            password.value.length >
            MAX_PASSWORD_LENGTH
        ) {

            password.value =
                password.value.slice(
                    0,
                    MAX_PASSWORD_LENGTH
                );

        }


        /*
         * Show error when empty.
         */

        if (
            password.value.length === 0
        ) {

            showPasswordError(
                "Please enter your password."
            );

        } else {

            clearPasswordError();

        }


        /*
         * Clear server message.
         */

        clearMessage();


        /*
         * Update button.
         */

        updateLoginButton();

    }
);


/* =========================================================
   PASSWORD FOCUS
   ========================================================= */

password.addEventListener(
    "focus",
    function () {

        if (
            password.value.length === 0
        ) {

            showPasswordError(
                "Please enter your password."
            );

        }

    }
);


/* =========================================================
   PASSWORD BLUR
   ========================================================= */

password.addEventListener(
    "blur",
    function () {

        validatePassword(true);

        updateLoginButton();

    }
);


/* =========================================================
   UPDATE LOGIN BUTTON
   ========================================================= */

function updateLoginButton() {

    /*
     * Username must contain
     * 1 to 10 characters.
     */

    const usernameValid =
        username.value.length >= 1 &&
        username.value.length <=
            MAX_USERNAME_LENGTH;


    /*
     * Password must contain
     * 1 to 100 characters.
     */

    const passwordValid =
        password.value.length >= 1 &&
        password.value.length <=
            MAX_PASSWORD_LENGTH;


    /*
     * Enable only when
     * both are valid.
     */

    loginButton.disabled =
        !(
            usernameValid &&
            passwordValid
        );

}


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

showPassword.addEventListener(
    "click",
    function () {

        const isPassword =
            password.type === "password";


        /*
         * Change input type.
         */

        password.type =
            isPassword
                ? "text"
                : "password";


        /*
         * Change icon.
         */

        showPassword.innerHTML =
            isPassword
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';


        /*
         * Update accessibility label.
         */

        showPassword.setAttribute(
            "aria-label",
            isPassword
                ? "Hide password"
                : "Show password"
        );


        /*
         * Update accessibility state.
         */

        showPassword.setAttribute(
            "aria-pressed",
            isPassword
                ? "true"
                : "false"
        );

    }
);


/* =========================================================
   RESET LOGIN FORM
   ========================================================= */

function resetLoginForm() {

    /*
     * Clear username.
     */

    username.value = "";


    /*
     * Clear password.
     */

    password.value = "";


    /*
     * Clear validation errors.
     */

    clearUsernameError();

    clearPasswordError();


    /*
     * Reset password visibility.
     */

    password.type = "password";


    /*
     * Reset password eye icon.
     */

    showPassword.innerHTML =
        '<i class="bi bi-eye"></i>';


    /*
     * Reset accessibility label.
     */

    showPassword.setAttribute(
        "aria-label",
        "Show password"
    );


    /*
     * Reset accessibility state.
     */

    showPassword.setAttribute(
        "aria-pressed",
        "false"
    );


    /*
     * Disable login button.
     */

    updateLoginButton();

}


/* =========================================================
   LOGIN SUBMIT
   ========================================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* =============================================
           CLEAR PREVIOUS MESSAGE
           ============================================= */

        clearMessage();


        /* =============================================
           FINAL VALIDATION
           ============================================= */

        const usernameValid =
            validateUsername(true);

        const passwordValid =
            validatePassword(true);


        /* =============================================
           USERNAME INVALID
           ============================================= */

        if (!usernameValid) {

            username.focus();

            updateLoginButton();

            return;
        }


        /* =============================================
           PASSWORD INVALID
           ============================================= */

        if (!passwordValid) {

            password.focus();

            updateLoginButton();

            return;
        }


        /* =============================================
           GET VALUES
           ============================================= */

        const usernameValue =
            username.value;

        const passwordValue =
            password.value;


        /* =============================================
           DISABLE BUTTON
           ============================================= */

        loginButton.disabled = true;

        loginButton.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Logging in...';


        try {

            /* =========================================
               SEND LOGIN REQUEST
               ========================================= */

            const response =
                await fetch(
                    "http://localhost:8080/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body: JSON.stringify({
                            username:
                                usernameValue,

                            password:
                                passwordValue
                        })
                    }
                );


            /* =========================================
               READ RESPONSE
               ========================================= */

            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            let data = {};


            if (
                contentType.includes(
                    "application/json"
                )
            ) {

                data =
                    await response.json();

            } else {

                const text =
                    await response.text();

                data = {
                    message: text
                };

            }


            /* =========================================
               LOGIN SUCCESS
               ========================================= */

            if (
                response.ok &&
                data.success === true
            ) {

                showMessage(
                    "Login successful!",
                    "success"
                );


                /*
                 * Clear old login values
                 * immediately after successful login.
                 */

                resetLoginForm();


                /*
                 * Keep button disabled
                 * while redirecting.
                 */

                loginButton.disabled = true;


                /*
                 * Redirect to dashboard.
                 */

                setTimeout(
                    function () {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );


                return;
            }


            /* =========================================
               LOGIN FAILED
               ========================================= */

            showMessage(
                data.message ||
                "Invalid username or password.",
                "error"
            );

        }


        catch (error) {

            console.error(
                "Login error:",
                error
            );


            showMessage(
                "Unable to connect to the server. Please try again.",
                "error"
            );

        }


        finally {

            /*
             * Restore button text.
             */

            loginButton.textContent =
                "Login";


            /*
             * IMPORTANT:
             *
             * Clear the old username and
             * password after the login
             * request has completed.
             *
             * This fixes the issue where
             * previous login details remain
             * in the input fields.
             */

            resetLoginForm();


            /*
             * Recalculate button state.
             *
             * Both fields are now empty,
             * therefore Login remains disabled.
             */

            updateLoginButton();

        }

    }
);


/* =========================================================
   INITIAL BUTTON STATE
   ========================================================= */

/*
 * Page loads with:
 *
 * Username = empty
 * Password = empty
 *
 * Therefore:
 *
 * Login button = DISABLED
 */

updateLoginButton();
