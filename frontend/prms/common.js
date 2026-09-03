document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       COMMON HEADER
       ========================= */

    const header =
        document.getElementById("common-header");


    if (header) {

        header.innerHTML = `

            <div class="system-header">

                <div class="sbi-logo">

                    <img
                        src="sbi-logo.png"
                        alt="SBI Logo">

                </div>


                <h1>
                    SBI VENDOR RESOURCE ONBOARDING SYSTEM
                </h1>

            </div>

        `;

    }



    /* =========================
       COMMON FOOTER
       ========================= */

    const footer =
        document.getElementById("common-footer");


    if (footer) {

        footer.innerHTML = `

            <div class="sbi-website">

                <a
                    href="https://onlinesbi.sbi.bank.in/"
                    target="_blank"
                    rel="noopener noreferrer">

                    www.onlinesbi.sbi.bank.in

                </a>

            </div>

        `;

    }



    /* =========================
       COMMON SIDEBAR
       ========================= */

    const sidebar =
        document.getElementById("common-sidebar");


    if (sidebar) {

        sidebar.innerHTML = `

            <aside class="sidebar">


                <!-- Sidebar Title -->

                <h4 class="sidebar-title">

                    <i class="bi bi-speedometer2 me-2"></i>

                    PRMS Admin

                </h4>



                <!-- Navigation -->

                <ul class="nav nav-pills flex-column gap-2">


                    <!-- Dashboard -->

                    <li class="nav-item">

                        <a
                            href="dashboard.html"
                            class="nav-link"
                            data-page="dashboard">

                            <i
                                class="bi bi-house-door me-2">
                            </i>

                            Dashboard

                        </a>

                    </li>



                    <!-- Employee -->

                    <li class="nav-item">

                        <a
                            href="employee.html"
                            class="nav-link"
                            data-page="employee">

                            <i
                                class="bi bi-people me-2">
                            </i>

                            Employee Details

                        </a>

                    </li>



                    <!-- Users -->

                    <li class="nav-item">

                        <a
                            href="users.html"
                            class="nav-link"
                            data-page="users">

                            <i
                                class="bi bi-person-lines-fill me-2">
                            </i>

                            Users

                        </a>

                    </li>



                    <!-- Reports -->

                    <li class="nav-item">

                        <a
                            href="reports.html"
                            class="nav-link"
                            data-page="reports">

                            <i
                                class="bi bi-file-earmark-text me-2">
                            </i>

                            Reports

                        </a>

                    </li>



                    <!-- Settings -->

                    <li class="nav-item">

                        <a
                            href="settings.html"
                            class="nav-link"
                            data-page="settings">

                            <i
                                class="bi bi-gear me-2">
                            </i>

                            Settings

                        </a>

                    </li>



                    <!-- Logout -->

                    <li class="nav-item">

                        <a
                            href="login.html"
                            class="nav-link">

                            <i
                                class="bi bi-box-arrow-right me-2">
                            </i>

                            Logout

                        </a>

                    </li>


                </ul>


            </aside>

        `;



        /* =========================
           ACTIVE MENU
           ========================= */

        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .replace(".html", "");


        /*
         * If URL is empty, consider it dashboard
         */

        if (!currentPage) {

            currentPage = "dashboard";

        }



        /*
         * Remove active from all links
         */

        document
            .querySelectorAll(
                "#common-sidebar .nav-link"
            )
            .forEach(function (link) {

                link.classList.remove("active");

            });



        /*
         * Add active to current page
         */

        const activeLink =
            document.querySelector(
                '#common-sidebar .nav-link[data-page="' +
                currentPage +
                '"]'
            );


        if (activeLink) {

            activeLink.classList.add("active");

        }

    }

});
