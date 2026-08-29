const filtersEl = document.querySelector("#filters");
const gridEl = document.querySelector("#portfolioGrid");
const emptyEl = document.querySelector("#emptyState");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const lightboxCaption = document.querySelector("#lightboxCaption");
let currentItems = [];
let currentIndex = 0;

const categories = ["Semua", ...new Set(projects.map(p => p.category).filter(Boolean))];

function renderFilters(active = "Semua") {
  filtersEl.innerHTML = categories.map(cat =>
    `<button class="filter ${cat === active ? "active" : ""}" data-filter="${cat}">${cat}</button>`
  ).join("");
  filtersEl.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      renderFilters(btn.dataset.filter);
      renderProjects(btn.dataset.filter);
    });
  });
}

function renderProjects(filter = "Semua") {
  currentItems = filter === "Semua" ? projects : projects.filter(p => p.category === filter);
  emptyEl.hidden = currentItems.length > 0;
  gridEl.innerHTML = currentItems.map((p, i) => `
    <button class="portfolio-item reveal" data-index="${i}" aria-label="Lihat ${escapeHtml(p.title)}">
      <img src="/assets/portfolio/${encodeURIComponent(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">
      <span class="portfolio-overlay">
        <span><small>${escapeHtml(p.category || "Project")}</small><strong>${escapeHtml(p.title || "GlowingSign")}</strong><em>${escapeHtml(p.location || "")}</em></span>
        <b>↗</b>
      </span>
    </button>
  `).join("");

  gridEl.querySelectorAll(".portfolio-item").forEach(item => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
  });
  observeReveals();
}

function openLightbox(index) {
  if (!currentItems.length) return;
  currentIndex = index;
  const p = currentItems[currentIndex];
  lightboxImg.src = `/assets/portfolio/${encodeURIComponent(p.image)}`;
  lightboxImg.alt = p.title || "Project GlowingSign";
  lightboxCaption.textContent = [p.title, p.category, p.location].filter(Boolean).join(" • ");
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function movePhoto(dir) {
  if (!currentItems.length) return;
  currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
  openLightbox(currentIndex);
}

document.querySelector("#lightboxClose").addEventListener("click", closeLightbox);
document.querySelector("#prevPhoto").addEventListener("click", () => movePhoto(-1));
document.querySelector("#nextPhoto").addEventListener("click", () => movePhoto(1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") movePhoto(-1);
  if (e.key === "ArrowRight") movePhoto(1);
});

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}

const menuBtn = document.querySelector("#menuBtn");
const nav = document.querySelector("#nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.seen)");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("seen"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("seen");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => observer.observe(el));
}

renderFilters();
renderProjects();
observeReveals();
