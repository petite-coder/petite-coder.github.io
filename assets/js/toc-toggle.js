document.addEventListener("DOMContentLoaded", function () {
  const tocToggle = document.querySelector(".toc-toggle");
  const tocNav = document.querySelector(".post-toc");
  const sidebar = document.querySelector(".sidebar");
  const tocText = document.querySelector(".toc-text");
  const header = document.querySelector("header") || document.querySelector(".site-header");
  const tocLinks = document.querySelectorAll(".post-toc a");

  // ✅ TOC 열고 닫기
  if (tocToggle && tocNav) {
    tocToggle.addEventListener("click", function () {
      tocNav.classList.toggle("active");
      sidebar.classList.toggle("expanded");
      tocToggle.classList.toggle("expanded");

      tocText.textContent = sidebar.classList.contains("expanded")
        ? "Table of Contents"
        : "";
    });
  }

  // ✅ TOC 항목 클릭 시 헤더 보정 후 부드럽게 스크롤 이동
  if (tocLinks.length) {
    tocLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = decodeURIComponent(this.getAttribute("href").slice(1));
        const target = document.getElementById(targetId);
        if (!target) return;

        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const offset = targetTop - headerHeight;

        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      });
    });
  }

  // ✅ 현재 스크롤 위치에 따라 TOC 항목 강조
  const headings = Array.from(tocLinks).map(link => {
    const id = decodeURIComponent(link.getAttribute("href").slice(1));
    return document.getElementById(id);
  });

  function onScroll() {
    const scrollY = window.scrollY + 100; // 여유값
    const marginOffset = 110;

    let activeIndex = -1;
    headings.forEach((heading, index) => {
      
      if (heading && scrollY >= heading.offsetTop - marginOffset) {
        activeIndex = index;
      }
    });

    // ✅ 추가: 페이지 바닥에 가까우면 마지막 항목 강제 강조
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
    if (nearBottom) {
      activeIndex = headings.length - 1;
    }

    tocLinks.forEach(link => link.classList.remove("active"));
    if (activeIndex !== -1) {
      tocLinks[activeIndex].classList.add("active");

      console.log("강조된 TOC 링크:", tocLinks[activeIndex]);
      console.log("등록된 headings:", headings);
      console.log("등록된 tocLinks:", tocLinks);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // 첫 로딩 시도
});
