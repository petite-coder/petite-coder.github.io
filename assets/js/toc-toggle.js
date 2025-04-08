document.addEventListener("DOMContentLoaded", function () {
    const tocToggle = document.querySelector(".toc-toggle");
    const tocNav = document.querySelector(".post-toc");
    const sidebar = document.querySelector(".sidebar");
    const tocText = document.querySelector(".toc-text");
  
    if (tocToggle && tocNav) {
      tocToggle.addEventListener("click", function () {
        tocNav.classList.toggle("active");
        sidebar.classList.toggle("expanded");
        tocToggle.classList.toggle("expanded")
        // ✅ 버튼 클릭 시 "Table of Contents" 텍스트 추가/제거
        if (sidebar.classList.contains("expanded")) {
            tocText.textContent = "Table of Contents";
        } else {
            tocText.textContent = "";
        }
      });
    }
  });
  