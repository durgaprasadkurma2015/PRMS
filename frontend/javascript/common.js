document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER
       ===================================================== */

    const header =
        document.getElementById("common-header");

    if (header) {

        header.innerHTML = `

            <div class="system-header">

                <div class="sbi-logo">

                    <img
                        src="../images/sbi-logo.png"
                        alt="SBI Logo">

                </div>

                <h1>
                    SBI VENDOR RESOURCE ONBOARDING SYSTEM
                </h1>

            </div>

        `;
    }


    /* =====================================================
       FOOTER
       ===================================================== */

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


    /* =====================================================
       SIDEBAR
       ===================================================== */

    const sidebar =
        document.getElementById("common-sidebar");


    if (!sidebar) {
        return;
    }


    sidebar.innerHTML = `

        <aside class="sidebar">

            <!-- SIDEBAR TITLE -->

            <h4 class="sidebar-title">

                <i class="bi bi-bank2 me-2"></i>

                PRMS

            </h4>


            <ul class="nav nav-pills flex-column gap-2">


                <!-- =================================================
                     DASHBOARD
                     ================================================= -->

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


                <!-- =================================================
                     ACCOUNT CREATION
                     ================================================= -->

                <li class="nav-item">


                    <!-- ACCOUNT CREATION BUTTON -->

                    <a
                        href="#accountCreationMenu"
                        id="accountCreationLink"
                        class="nav-link d-flex align-items-center"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="accountCreationMenu">

                        <i
                            class="bi bi-person-plus me-2">
                        </i>

                        <span>
                            Account Creation
                        </span>

                        <i
                            id="accountCreationArrow"
                            class="bi bi-chevron-down ms-auto">
                        </i>

                    </a>


                    <!-- ACCOUNT CREATION SUBMENU -->

                    <div
                        id="accountCreationMenu"
                        class="collapse">


                        <ul
                            class="nav flex-column ms-3 mt-1">


                            <!-- =================================================
                                 CREATION OF ROLES
                                 ================================================= -->

                            <li class="nav-item">

                                <a
                                    href="register.html"
                                    class="nav-link submenu-link"
                                    data-page="register">

                                    <i
                                        class="bi bi-shield-plus me-2">
                                    </i>

                                    Creation of Roles

                                </a>

                            </li>


                            <!-- =================================================
                                 DELETION
                                 ================================================= -->

                            <li class="nav-item">

                                <a
                                    href="#"
                                    class="nav-link submenu-link"
                                    data-page="deletion">

                                    <i
                                        class="bi bi-person-dash me-2">
                                    </i>

                                    Deletion

                                </a>

                            </li>


                            <!-- =================================================
                                 MODIFICATION
                                 ================================================= -->

                            <li class="nav-item">

                                <a
                                    href="#"
                                    class="nav-link submenu-link"
                                    data-page="modification">

                                    <i
                                        class="bi bi-person-gear me-2">
                                    </i>

                                    Modification

                                </a>

                            </li>


                        </ul>

                    </div>

                </li>


                <!-- =================================================
                     EMPLOYEE CREATION
                     ================================================= -->

                <li class="nav-item">

                    <a
                        href="employee.html"
                        class="nav-link"
                        data-page="employee">

                        <i
                            class="bi bi-people me-2">
                        </i>

                        Employee Creation

                    </a>

                </li>


                <!-- =================================================
                     USERS
                     ================================================= -->

                <li class="nav-item">

                    <a
                        href="#"
                        class="nav-link"
                        data-page="users">

                        <i
                            class="bi bi-person-lines-fill me-2">
                        </i>

                        Users

                    </a>

                </li>


                <!-- =================================================
                     REPORTS
                     ================================================= -->

                <li class="nav-item">

                    <a
                        href="#"
                        class="nav-link"
                        data-page="reports">

                        <i
                            class="bi bi-file-earmark-text me-2">
                        </i>

                        Reports

                    </a>

                </li>


             



            </ul>

        </aside>

    `;


    /* =====================================================
       ACCOUNT CREATION ELEMENTS
       ===================================================== */

    const accountMenu =
        document.getElementById(
            "accountCreationMenu"
        );


    const accountLink =
        document.getElementById(
            "accountCreationLink"
        );


    const accountArrow =
        document.getElementById(
            "accountCreationArrow"
        );


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "");


    if (!currentPage) {

        currentPage = "dashboard";

    }


    /* =====================================================
       ACCOUNT CREATION PAGES
       ===================================================== */

    const accountPages = [

        "register",
        "deletion",
        "modification"

    ];


    /* =====================================================
       REMOVE ALL ACTIVE STATES
       ===================================================== */

    document
        .querySelectorAll(
            "#common-sidebar .nav-link"
        )
        .forEach(function (link) {

            link.classList.remove("active");

        });


    /* =====================================================
       FIND CURRENT PAGE LINK
       ===================================================== */

    const activeLink =
        document.querySelector(
            '#common-sidebar .nav-link[data-page="' +
            currentPage +
            '"]'
        );


    /* =====================================================
       MAKE CURRENT PAGE ACTIVE
       ===================================================== */

    if (activeLink) {

        activeLink.classList.add("active");

    }


    /* =====================================================
       IF ACCOUNT CREATION PAGE
       KEEP SUBMENU OPEN
       ===================================================== */

    if (
        accountPages.includes(currentPage)
    ) {


        /* Account Creation BLUE */

        accountLink.classList.add(
            "active"
        );


        /* Open submenu */

        accountMenu.classList.add(
            "show"
        );


        /* Bootstrap state */

        accountLink.setAttribute(
            "aria-expanded",
            "true"
        );


        /* Arrow UP */

        accountArrow.classList.remove(
            "bi-chevron-down"
        );

        accountArrow.classList.add(
            "bi-chevron-up"
        );

    }


    /* =====================================================
       ACCOUNT CREATION OPEN
       ===================================================== */

    accountMenu.addEventListener(
        "shown.bs.collapse",
        function () {


            /* Parent BLUE */

            accountLink.classList.add(
                "active"
            );


            /* Arrow UP */

            accountArrow.classList.remove(
                "bi-chevron-down"
            );

            accountArrow.classList.add(
                "bi-chevron-up"
            );

        }
    );


    /* =====================================================
       ACCOUNT CREATION CLOSE
       ===================================================== */

    accountMenu.addEventListener(
        "hidden.bs.collapse",
        function () {


            /*
             * Don't remove blue if the current
             * page belongs to Account Creation.
             */

            if (
                !accountPages.includes(
                    currentPage
                )
            ) {

                accountLink.classList.remove(
                    "active"
                );

            }


            /* Arrow DOWN */

            accountArrow.classList.remove(
                "bi-chevron-up"
            );

            accountArrow.classList.add(
                "bi-chevron-down"
            );

        }
    );

});
