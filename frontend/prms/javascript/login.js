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
    loginForm.querySelector(
        'button[type="submit"]'
    );

const showPassword =
    document.getElementById("showPassword");


/* =========================================================
   CONFIGURATION
   ========================================================= */

const MAX_USERNAME_LENGTH = 10;

const MIN_PASSWORD_LENGTH = 6;

const MAX_PASSWORD_LENGTH = 100;


/* =========================================================
   GENERAL MESSAGE
   ========================================================= */

function showMessage(text, type) {

    message.textContent = text;

    message.className =
        `message mb-3 ${type}`;

}


/* =========================================================
   USERNAME ERROR
   ========================================================= */

function showUsernameError(text) {

    username.classList.add("is-invalid");

    usernameError.textContent = text;

    usernameError.classList.add("show");

}


/* =========================================================
   CLEAR USERNAME ERROR
   ========================================================= */

function clearUsernameError() {

    username.classList.remove("is-invalid");

    usernameError.textContent = "";

    usernameError.classList.remove("show");

}


/* =========================================================
   USERNAME VALIDATION
   ========================================================= */

function validateUsername() {

    const value =
        username.value;


    /* Empty */

    if (value.length === 0) {

        showUsernameError(
            "Please enter your username."
        );

        return false;
    }


    /*
     * Username must be exactly 10 characters.
     *
     * No error message is shown for
     * less than 10 characters.
     */

    if (value.length !== MAX_USERNAME_LENGTH) {

        return false;
    }


    clearUsernameError();

    return true;

}


/* =========================================================
   USERNAME INPUT
   ========================================================= */

username.addEventListener(
    "input",
    () => {

        /*
         * Convert uppercase → lowercase
         *
         * Remove spaces
         *
         * Remove special characters
         *
         * Allow only a-z and 0-9
         *
         * Maximum 10 characters
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
         * If username becomes empty,
         * show the empty tooltip.
         *
         * Otherwise hide the tooltip.
         */

        if (username.value.length === 0) {

            showUsernameError(
                "Please enter your username."
            );

        } else {

            clearUsernameError();

        }


        updateLoginButton();

    }
);


/* =========================================================
   USERNAME FOCUS
   ========================================================= */

username.addEventListener(
    "focus",
    () => {

        if (username.value.length === 0) {

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
    () => {

        /*
         * Only show tooltip when empty.
         */

        if (username.value.length === 0) {

            showUsernameError(
                "Please enter your username."
            );

        } else {

            clearUsernameError();

        }

        updateLoginButton();

    }
);


/* =========================================================
   PASSWORD ERROR
   ========================================================= */

function showPasswordError(text) {

    password.classList.add("is-invalid");

    passwordError.textContent = text;

    passwordError.classList.add("show");

}


/* =========================================================
   CLEAR PASSWORD ERROR
   ========================================================= */

function clearPasswordError() {

    password.classList.remove("is-invalid");

    passwordError.textContent = "";

    passwordError.classList.remove("show");

}


/* =========================================================
   PASSWORD VALIDATION
   ========================================================= */

function validatePassword() {

    const value =
        password.value;


    /* Empty */

    if (value.length === 0) {

        showPasswordError(
            "Please enter your password."
        );

        return false;
    }


    /*
     * Password length is checked,
     * but no tooltip is displayed.
     */

    if (
        value.length < MIN_PASSWORD_LENGTH ||
        value.length > MAX_PASSWORD_LENGTH
    ) {

        return false;
    }


    clearPasswordError();

    return true;

}


/* =========================================================
   PASSWORD INPUT
   ========================================================= */

password.addEventListener(
    "input",
    () => {

        /*
         * Show tooltip only when empty.
         */

        if (password.value.length === 0) {

            showPasswordError(
                "Please enter your password."
            );

        } else {

            clearPasswordError();

        }


        updateLoginButton();

    }
);


/* =========================================================
   PASSWORD FOCUS
   ========================================================= */

password.addEventListener(
    "focus",
    () => {

        if (password.value.length === 0) {

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
    () => {

        /*
         * Only show tooltip when empty.
         */

        if (password.value.length === 0) {

            showPasswordError(
                "Please enter your password."
            );

        } else {

            clearPasswordError();

        }

        updateLoginButton();

    }
);


/* =========================================================
   UPDATE LOGIN BUTTON
   ========================================================= */

function updateLoginButton() {

    const usernameValid =
        username.value.length === MAX_USERNAME_LENGTH;

    const passwordValid =
        password.value.length >= MIN_PASSWORD_LENGTH &&
        password.value.length <= MAX_PASSWORD_LENGTH;


    /*
     * Login enabled only when
     * BOTH fields are valid.
     */

    loginButton.disabled =
        !(usernameValid && passwordValid);

}


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

showPassword.addEventListener(
    "click",
    () => {

        const isPassword =
            password.type === "password";


        password.type =
            isPassword
                ? "text"
                : "password";


        showPassword.innerHTML =
            isPassword
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';


        showPassword.setAttribute(
            "aria-label",
            isPassword
                ? "Hide password"
                : "Show password"
        );

    }
);


/* =========================================================
   LOGIN SUBMIT
   ========================================================= */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        /* Clear previous message */

        message.textContent = "";

        message.className =
            "message mb-3";


        /* Final validation */

        const usernameValid =
            validateUsername();


        const passwordValid =
            validatePassword();


        if (!usernameValid) {

            username.focus();

            return;
        }


        if (!passwordValid) {

            password.focus();

            return;
        }


        /* Get values */

        const usernameValue =
            username.value;

        const passwordValue =
            password.value;


        /* Disable button */

        loginButton.disabled = true;

        loginButton.innerHTML =
            `
            <span
                class="spinner-border
                       spinner-border-sm
                       me-2">
            </span>
            Logging in...
            `;


        try {

            const response =
                await fetch(
                    "http://localhost:8080/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
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


            const data =
                await response.json();


            /* =================================================
               LOGIN SUCCESS
               ================================================= */

            if (
                response.ok &&
                data.success === true
            ) {

                showMessage(
                    "Login successful!",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "dashboard.html";

                    },
                    1000
                );


                return;
            }


            /* =================================================
               LOGIN FAILED
               ================================================= */

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

            loginButton.disabled = false;

            loginButton.textContent =
                "Login";

            /*
             * Re-check button state after request.
             */

            updateLoginButton();

        }

    }
);


/* =========================================================
   INITIAL BUTTON STATE
   ========================================================= */

updateLoginButton();
