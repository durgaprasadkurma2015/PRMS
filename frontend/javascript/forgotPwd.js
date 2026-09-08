

        const resetForm =
            document.getElementById("resetForm");

        const username =
            document.getElementById("username");

        const password =
            document.getElementById("password");

        const confirmPassword =
            document.getElementById("confirmPassword");

        const message =
            document.getElementById("message");


        /* =========================
           MESSAGE
           ========================= */

        function showMessage(text, type) {

            message.textContent = text;

            message.className =
                "message mb-3 " + type;

        }


        /* =========================
           SHOW / HIDE PASSWORD
           ========================= */
document.querySelectorAll(".password-eye").forEach(function (button) {

    button.addEventListener("click", function () {

        const targetId = button.getAttribute("data-target");
        const target = document.getElementById(targetId);
        const icon = button.querySelector("i");

        if (target.type === "password") {

            target.type = "text";

            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            target.type = "password";

            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

});




        /* =========================
           RESET PASSWORD
           ========================= */

        resetForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const usernameValue =
                    username.value.trim();

                const passwordValue =
                    password.value;

                const confirmValue =
                    confirmPassword.value;


                /* Username */

                if (usernameValue === "") {

                    showMessage(
                        "Please enter your username.",
                        "error"
                    );

                    username.focus();

                    return;
                }


                /* New Password */

                if (passwordValue === "") {

                    showMessage(
                        "Please enter your new password.",
                        "error"
                    );

                    password.focus();

                    return;
                }


                /* Password Length */

                if (passwordValue.length < 6) {

                    showMessage(
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    password.focus();

                    return;
                }


                /* Confirm Password */

                if (passwordValue !== confirmValue) {

                    showMessage(
                        "Passwords do not match.",
                        "error"
                    );

                    confirmPassword.focus();

                    return;
                }


                try {

                    const response = await fetch(
                        "http://localhost:8080/api/auth/reset-password",
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
                                    passwordValue,

                                confirmPassword:
                                    confirmValue

                            })
                        }
                    );


                    const data =
                        await response.json();


                    if (data.success === "true") {

                        showMessage(
                            data.message ||
                            "Password reset successfully.",
                            "success"
                        );


                        resetForm.reset();


                    } else {

                        showMessage(
                            data.message ||
                            "Unable to reset password.",
                            "error"
                        );

                    }


                } catch (error) {

                    console.error(error);

                    showMessage(
                        "Unable to connect to the server.",
                        "error"
                    );

                }

            }
        );

 