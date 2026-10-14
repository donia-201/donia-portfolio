const nav = document.getElementById("mainNav");
const progress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function handleScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 30);
  backTop.classList.toggle("show", y > 500);

  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (y / height) * 100 : 0}%`;

  let current = "home";
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (y >= top) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("navMenu");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
