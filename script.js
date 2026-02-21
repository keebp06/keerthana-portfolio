// script.js
document.documentElement.classList.add("js");
// footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

/* =========================
   HERO: subtle float motion on outlines
   ========================= */
const outlines = document.querySelectorAll(".outline");
let t = 0;

function animateOutlines(){
  t += 0.012;
  outlines.forEach((el, i) => {
    const y = Math.sin(t + i) * 6;
    const x = Math.cos(t + i) * 4;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(animateOutlines);
}
animateOutlines();

/* =========================
   HERO: rotating tagline (dynamic)
   ========================= */
const rotator = document.getElementById("rotator");
const phrases = [
  "AI-driven software systems",
  "scalable data pipelines",
  "production-ready backend services",
  "cloud-native Azure deployments"
];

let idx = 0;

function rotateText(){
  if (!rotator) return;
  rotator.classList.remove("pop");
  rotator.textContent = phrases[idx];
  // force reflow to restart animation
  void rotator.offsetWidth;
  rotator.classList.add("pop");
  idx = (idx + 1) % phrases.length;
}

rotateText();
setInterval(rotateText, 2400);

/* =========================
   NAV: active link highlight (scroll spy)
   ========================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.remove("active"));
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (active) active.classList.add("active");
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((s) => navObs.observe(s));

/* =========================
   Reveal on scroll
   ========================= */
const revealEls = document.querySelectorAll(".card, .quote, .section-head, .contact-card, .skill-item");
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("reveal");
  });
}, { threshold: 0.1 });

revealEls.forEach((el) => revealObs.observe(el));

/* =========================
   EXPERIENCE: filter chips
   ========================= */
const chips = document.querySelectorAll(".chip");
const expCards = document.querySelectorAll("#experience .card");

if (chips.length && expCards.length) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const f = chip.dataset.filter;
      expCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
        const show = f === "all" || tags.includes(f);
        card.style.display = show ? "" : "none";
      });
    });
  });
}
