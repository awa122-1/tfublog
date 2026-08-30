/* =====================================================
   芙酱awa Personal Website
===================================================== */


/* =====================================================
   打字机效果
===================================================== */

const typingElement = document.getElementById("typing");

const texts = [
    "Developer",
    "Game Modder",
    "Programmer",
    "Gamer",
    "Rhythm Game Player",
    "AUR 简体中文汉化者",
    "正在折腾一些奇怪的东西..."
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentText = texts[textIndex];

    if (!deleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex >= currentText.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;
        }

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex <= 0) {

            deleting = false;

            textIndex++;

            if (textIndex >= texts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );
}


if (typingElement) {
    typeEffect();
}



/* =====================================================
   深色 / 浅色模式
===================================================== */

const themeToggle =
    document.getElementById("theme-toggle");


function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

        if (themeToggle) {

            themeToggle.textContent = "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "切换到深色模式"
            );

            themeToggle.setAttribute(
                "title",
                "切换到深色模式"
            );
        }

    } else {

        document.body.classList.remove("light");

        if (themeToggle) {

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "切换到浅色模式"
            );

            themeToggle.setAttribute(
                "title",
                "切换到浅色模式"
            );
        }
    }


    try {

        localStorage.setItem(
            "theme",
            theme
        );

    } catch (error) {

        console.warn(
            "无法保存主题设置",
            error
        );

    }
}



/* =====================================================
   读取保存的主题
===================================================== */

let savedTheme = "dark";


try {

    const storedTheme =
        localStorage.getItem("theme");

    if (
        storedTheme === "light" ||
        storedTheme === "dark"
    ) {

        savedTheme = storedTheme;
    }

} catch (error) {

    console.warn(
        "无法读取主题设置",
        error
    );
}


setTheme(savedTheme);



/* =====================================================
   点击主题按钮
===================================================== */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isLight =
                document.body.classList.contains("light");

            if (isLight) {

                setTheme("dark");

            } else {

                setTheme("light");

            }

        }
    );

}



/* =====================================================
   手机菜单
===================================================== */

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


if (menuToggle && navMenu) {


    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("active");

            const isOpen =
                navMenu.classList.contains("active");


            if (isOpen) {

                menuToggle.textContent = "✕";

                menuToggle.setAttribute(
                    "aria-label",
                    "关闭菜单"
                );

            } else {

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "打开菜单"
                );

            }

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuToggle.textContent = "☰";

                    menuToggle.setAttribute(
                        "aria-label",
                        "打开菜单"
                    );

                }
            );

        });

}



/* =====================================================
   返回顶部
===================================================== */

const backTop =
    document.getElementById("back-top");


if (backTop) {


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        },
        {
            passive: true
        }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}



/* =====================================================
   滚动显示动画
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".project-card, " +
        ".interest, " +
        ".skill-category, " +
        ".stat-card, " +
        ".friend-card, " +
        ".friend-note, " +
        ".friend-link"
    );


revealElements.forEach(
    function (element) {

        element.classList.add("reveal");

    }
);



/* =====================================================
   IntersectionObserver
===================================================== */

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );


} else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}



/* =====================================================
   外部链接安全
===================================================== */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(
        function (link) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );



/* =====================================================
   页面加载完成
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);