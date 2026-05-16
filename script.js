// ---------- Live clock ----------
function tickClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}
tickClock();
setInterval(tickClock, 30000);

// ---------- Projects data ----------
const projects = [
  {
    n: "01",
    name: "Fintech Dashboard",
    desc: "A modern fintech dashboard with clean analytics, responsive layouts, and intuitive UI for tracking financial data.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://joyce-d3v.github.io/fintech-dashboard/",
  },
  {
    n: "02",
    name: "Task Manager",
    desc: "A productivity-focused task app that helps users organize, track, and manage daily tasks efficiently.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://joyce-d3v.github.io/Task-Manager/",
  },
  {
    n: "03",
    name: "Joddbot",
    desc: "An interactive AI chatbot interface designed for smooth, engaging conversational experiences with a modern UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://chat-bot-git-master-eadafe-davids-projects.vercel.app",
  },
  {
    n: "04",
    name: "SizzleBox UI Replica",
    desc: "A polished UI recreation inspired by SizzleBox — focused on responsive layouts and pixel-perfect styling.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://joyce-d3v.github.io/sizzlebox/",
  },
];

function renderProjects() {
  const wrap = document.getElementById("projects");
  if (!wrap) return;
  wrap.innerHTML = projects
    .map(
      (p) => `
    <a class="project reveal" href="${p.link}" target="_blank" rel="noreferrer">
      <span class="project-num">${p.n}</span>
      <h3 class="project-name">${p.name}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="tech">${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <span class="project-arrow">↗</span>
    </a>
  `
    )
    .join("");
  observeReveals();
}

// ---------- Reveal on scroll ----------
function observeReveals() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "-50px" }
  );
  els.forEach((el) => io.observe(el));
}

renderProjects();
observeReveals();