document.addEventListener("DOMContentLoaded", function () {
    initializeDropdownListeners();
});

// 페이지 이동 후에도 드롭다운 이벤트 리스너가 다시 적용되도록 설정
function initializeDropdownListeners() {
    const menuToggle = document.querySelector(".header__toggle");
    const menu = document.querySelector(".header__links");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });
    }

    // 기존 이벤트 리스너 제거 후 다시 추가 (중복 방지)
    document.querySelectorAll(".dropbtn").forEach(button => {
        button.removeEventListener("click", handleDropdownClick);
        button.addEventListener("click", handleDropdownClick);
    });

    document.querySelectorAll(".arrow").forEach(arrow => {
        arrow.removeEventListener("click", handleArrowClick);
        arrow.addEventListener("click", handleArrowClick);
    });

    // 큰 화면에서는 마우스 오버로 드롭다운 작동
    if (window.innerWidth >= 992) { // 62em = 992px
        document.querySelectorAll(".dropdown").forEach(dropdown => {
            dropdown.removeEventListener("mouseenter", handleMouseEnter);
            dropdown.addEventListener("mouseenter", handleMouseEnter);

            dropdown.removeEventListener("mouseleave", handleMouseLeave);
            dropdown.addEventListener("mouseleave", handleMouseLeave);
        });
    }
}

// 드롭다운 클릭 이벤트 핸들러 (모바일)
function handleDropdownClick(event) {
    event.preventDefault(); // 기본 링크 이동 방지
    const dropdownMenu = this.nextElementSibling;

    if (!dropdownMenu) return; // 해당 요소가 없으면 실행하지 않음

    dropdownMenu.classList.toggle("active");
    this.classList.toggle("active");

    // 화살표 방향 변경
    const arrow = this.querySelector(".arrow");
    if (dropdownMenu.classList.contains("active")) {
        arrow.innerHTML = "&#9660;"; // ▼ (아래 방향)
    } else {
        arrow.innerHTML = "&#9654;"; // ▶ (오른쪽 방향)
    }
}

// 화살표 클릭 이벤트 핸들러
function handleArrowClick(event) {
    event.preventDefault(); // 기본 이벤트 방지
    event.stopPropagation(); // 부모 a 태그 이벤트 방지

    const dropdownMenu = this.parentElement.nextElementSibling;

    if (!dropdownMenu) return; // 해당 요소가 없으면 실행하지 않음

    dropdownMenu.classList.toggle("active");

    // 화살표 방향 변경
    if (dropdownMenu.classList.contains("active")) {
        this.innerHTML = "&#9660;"; // ▼ (아래 방향)
    } else {
        this.innerHTML = "&#9654;"; // ▶ (오른쪽 방향)
    }
}

// 큰 화면(PC)에서는 마우스 오버로 드롭다운 활성화
function handleMouseEnter() {
    this.querySelector(".dropdown-menu").classList.add("active");
}

function handleMouseLeave() {
    this.querySelector(".dropdown-menu").classList.remove("active");
}

// 페이지 이동 후에도 드롭다운 이벤트 리스너를 다시 적용
document.addEventListener("pjax:end", function () {
    initializeDropdownListeners();
});
