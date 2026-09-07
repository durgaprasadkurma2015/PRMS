



    const registerForm =
        document.getElementById("registerForm");

    const message =
        document.getElementById("message");


    /* =========================
       SHOW MESSAGE
       ========================= */

    function showMessage(text, type) {

        message.textContent = text;

        message.className =
            "message mb-3 " + type;

    }


    /* =========================
       RESET MESSAGE
       ========================= */

    registerForm.addEventListener(
        "reset",
        function () {

            setTimeout(function () {

                message.textContent = "";

                message.className =
                    "message mb-3";

            }, 0);

        }
    );


    /* =========================
       CLOSE BUTTON
       ========================= */

    document
        .getElementById("closeBtn")
        .addEventListener(
            "click",
            function () {

                window.location.href =
                    "login.html";

            }
        );


    /* =========================
       REGISTRATION
       ========================= */

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const dob =
                document
                    .getElementById("dob")
                    .value;


            const role =
                document
                    .getElementById("role")
                    .value;


            const module =
                document
                    .getElementById("module")
                    .value;


            const contact =
                document
                    .getElementById("contact")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const prmsId =
                document
                    .getElementById("prmsId")
                    .value
                    .trim();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const genderElement =
                document.querySelector(
                    'input[name="gender"]:checked'
                );


            const gender =
                genderElement
                    ? genderElement.value
                    : "";


            /* =========================
               API CALL
               ========================= */

            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name:
                                    name,

                                dob:
                                    dob,

                                role:
                                    role,

                                module:
                                    module,

                                contact:
                                    contact,

                                email:
                                    email,

                                prmsId:
                                    prmsId,

                                username:
                                    username,

                                gender:
                                    gender

                            })

                        }
                    );


                const data =
                    await response.json();


                if (data.success === "true") {

                    showMessage(
                        data.message ||
                        "Registration successful.",
                        "success"
                    );

                    registerForm.reset();

                } else {

                    showMessage(
                        data.message ||
                        "Registration failed.",
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

