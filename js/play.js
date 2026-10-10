/* play.js — interactions and the progress game.
   Reads SITE.effects and SITE.game from content.js.
   Optional: delete the <script src="js/play.js"> line in index.html and the
   site still works, just without these extras. */
(function () {
  "use strict";

  const S = typeof SITE !== "undefined" ? SITE : {};
  const FX = Object.assign({
    progressBar: true, cursor: true, magnetic: true, tilt: true,
    stickers: true, scrollSpeed: true, countUp: true, game: true
  }, S.effects || {});
  const G = S.game || {};

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2f4bff";

  /* The game needs unlock() to exist before other features call it. */
  let unlock = () => {};

  /* ---------------------------------------------------------------------
     Scroll progress bar
     --------------------------------------------------------------------- */
  if (FX.progressBar) {
    const bar = document.createElement("div");
    bar.className = "scroll-bar";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  }

  /* ---------------------------------------------------------------------
     Trailing cursor ring (mouse only)
     --------------------------------------------------------------------- */
  if (FX.cursor && fine && !reduced) {
    const ring = document.createElement("div");
    ring.className = "cursor";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
    let x = -100, y = -100, cx = x, cy = y, seen = false;

    addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!seen) { cx = x; cy = y; seen = true; ring.classList.add("on"); }
      ring.classList.toggle("hot", !!(e.target.closest && e.target.closest("a, button, summary, .sticker")));
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => ring.classList.remove("on"));
    document.documentElement.addEventListener("mouseenter", () => seen && ring.classList.add("on"));

    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------------------------------------------------------------
     Magnetic buttons and links
     --------------------------------------------------------------------- */
  if (FX.magnetic && fine && !reduced) {
    $$(".btn, .mail, .foot-links a, .brand").forEach(el => {
      el.classList.add("mag");
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------------------
     Project cover tilt + glare
     --------------------------------------------------------------------- */
  if (FX.tilt && fine && !reduced) {
    $$(".card-media").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg");
        el.style.setProperty("--ry", (px * 9).toFixed(2) + "deg");
        el.style.setProperty("--mx", ((px + 0.5) * 100).toFixed(1) + "%");
        el.style.setProperty("--my", ((py + 0.5) * 100).toFixed(1) + "%");
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Count-up numbers
     --------------------------------------------------------------------- */
  if (FX.countUp && !reduced && "IntersectionObserver" in window) {
    const targets = $$("[data-count]");
    targets.forEach(el => { el.textContent = "0" + (el.dataset.suffix || ""); });
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, end = Number(el.dataset.count) || 0, suf = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1400;
      (function step(now) {
        const t = clamp((now - t0) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(end * eased) + suf;
        if (t < 1) requestAnimationFrame(step);
      })(t0);
    }), { threshold: 0.6 });
    targets.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------------------
     Draggable hero stickers
     --------------------------------------------------------------------- */
  $$(".sticker").forEach(el => {
    let sx = 0, sy = 0, ox = 0, oy = 0, down = false, moved = false;
    el.addEventListener("pointerdown", e => {
      down = true; moved = false; sx = e.clientX; sy = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.classList.add("held");
    });
    el.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      el.style.setProperty("--dx", (ox + dx) + "px");
      el.style.setProperty("--dy", (oy + dy) + "px");
    });
    const end = e => {
      if (!down) return;
      down = false;
      el.classList.remove("held");
      ox = parseFloat(el.style.getPropertyValue("--dx")) || ox;
      oy = parseFloat(el.style.getPropertyValue("--dy")) || oy;
      if (moved) {
        if (!reduced) el.firstElementChild.animate(
          [{ scale: 1 }, { scale: 0.88 }, { scale: 1.08 }, { scale: 1 }],
          { duration: 450, easing: "ease-out" });
        unlock("play");
      }
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
  });

  /* ---------------------------------------------------------------------
     Marquees speed up while you scroll
     --------------------------------------------------------------------- */
  if (FX.scrollSpeed && !reduced && typeof document.getAnimations === "function") {
    let anims = [];
    const grab = () => { anims = document.getAnimations().filter(a => a.animationName === "slide"); };
    requestAnimationFrame(grab);
    setTimeout(grab, 800);
    let last = scrollY, rate = 1, fired = false;
    (function tick() {
      const dy = Math.abs(scrollY - last);
      last = scrollY;
      rate += ((1 + Math.min(dy * 0.14, 6)) - rate) * 0.1;
      if (rate < 1.005) rate = 1;
      for (const a of anims) a.playbackRate = rate;
      if (rate > 4 && !fired) { fired = true; unlock("speed"); }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------------------------------------------------------------------
     Confetti
     --------------------------------------------------------------------- */
  const COLORS = () => [accent(), "#ffb020", "#2bd4a7", "#ff5d8f", "#7a5cff"];
  function burst(x, y, n = 26) {
    if (reduced) return;
    const colors = COLORS();
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      p.className = "confetti";
      p.style.background = colors[i % colors.length];
      p.style.left = x + "px"; p.style.top = y + "px";
      document.body.appendChild(p);
      const ang = Math.random() * Math.PI * 2, v = 60 + Math.random() * 150;
      const dx = Math.cos(ang) * v, dy = Math.sin(ang) * v - 70;
      p.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy + 140}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 600, easing: "cubic-bezier(.15,.7,.3,1)" }).onfinish = () => p.remove();
    }
  }
  function rain() {
    if (reduced) return;
    const colors = COLORS();
    for (let i = 0; i < 90; i++) {
      setTimeout(() => {
        const p = document.createElement("i");
        p.className = "confetti";
        p.style.background = colors[i % colors.length];
        p.style.left = Math.random() * innerWidth + "px"; p.style.top = "-20px";
        document.body.appendChild(p);
        const sway = Math.random() * 120 - 60;
        p.animate([
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: `translate(${sway}px, ${innerHeight + 40}px) rotate(${Math.random() * 900}deg)`, opacity: 1 }
        ], { duration: 1800 + Math.random() * 1400, easing: "ease-in" }).onfinish = () => p.remove();
      }, i * 18);
    }
  }

  /* ---------------------------------------------------------------------
     Progress game: sections explored + achievements
     --------------------------------------------------------------------- */
  if (FX.game) {
    const SECTIONS = ["top", "work", "results", "about", "experience", "contact"];
    const LEVELS = G.levels || ["Newcomer", "Explorer", "Insider", "Almost there", "Collaborator"];
    const ACH = G.achievements || {};
    const KEY = "pf-progress-v1";

    let st = { sections: [], ach: [] };
    try { const raw = localStorage.getItem(KEY); if (raw) st = Object.assign(st, JSON.parse(raw)); } catch (e) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

    const pct = () => Math.round(st.sections.length / SECTIONS.length * 100);
    const levelName = () => LEVELS[pct() >= 100 ? 4 : Math.min(3, Math.floor(pct() / 25))] || "";

    /* --- HUD --- */
    const email = (S.person && S.person.email) || "";
    const hud = document.createElement("div");
    hud.className = "hud";
    hud.innerHTML = `
      <button class="hud-btn" type="button" aria-expanded="false" aria-controls="hud-panel">
        <svg class="ring" viewBox="0 0 34 34" aria-hidden="true"><circle class="bg" cx="17" cy="17" r="15"/><circle class="fg" cx="17" cy="17" r="15"/></svg>
        <span class="hud-txt"><b></b><small></small></span>
      </button>
      <div class="hud-panel" id="hud-panel" role="region" aria-label="Your progress">
        <h3>Your progress</h3>
        <p class="lv"></p>
        <ul class="ach"></ul>
        <div class="hud-done" hidden></div>
        <button class="hud-reset" type="button">Reset progress</button>
      </div>`;
    document.body.appendChild(hud);
    const toasts = document.createElement("div");
    toasts.id = "toasts"; toasts.setAttribute("role", "status"); toasts.setAttribute("aria-live", "polite");
    document.body.appendChild(toasts);

    const btn = $(".hud-btn", hud), panel = $(".hud-panel", hud);

    function render() {
      const p = pct();
      $(".ring", hud).style.setProperty("--p", (p / 100).toFixed(2));
      $(".hud-txt b", hud).textContent = levelName();
      $(".hud-txt small", hud).textContent = `${p}% explored`;
      btn.setAttribute("aria-label", `Progress: ${levelName()}, ${p}% explored. Open achievements`);
      $(".lv", hud).textContent = `${levelName()} · ${st.ach.length} of ${Object.keys(ACH).length} achievements`;
      $(".ach", hud).innerHTML = Object.entries(ACH).map(([id, a]) => {
        const ok = st.ach.includes(id);
        const d = a.secret && !ok ? "Hidden achievement" : a.desc;
        return `<li class="${ok ? "ok" : ""}"><span class="chk" aria-hidden="true"></span><span><b>${esc(a.secret && !ok ? "???" : a.title)}</b><small>${esc(d)}</small></span></li>`;
      }).join("");
      const done = $(".hud-done", hud);
      if (p >= 100) {
        done.hidden = false;
        done.innerHTML = `<p>${esc(G.completeMessage || "You've seen it all.")}</p>` +
          (email ? `<a class="btn btn-sm" href="mailto:${esc(email)}">Email me</a>` : "");
      } else done.hidden = true;
    }

    const setOpen = open => {
      hud.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", () => setOpen(!hud.classList.contains("open")));
    addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", e => { if (!hud.contains(e.target)) setOpen(false); });
    $(".hud-reset", hud).addEventListener("click", () => {
      st = { sections: ["top"], ach: [] };
      save(); render();
    });

    /* --- toasts --- */
    const queue = []; let showing = false;
    const STAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.2 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';
    function nextToast() {
      const id = queue.shift();
      if (!id) { showing = false; return; }
      showing = true;
      const a = ACH[id] || { title: id, desc: "" };
      const el = document.createElement("div");
      el.className = "toast";
      el.innerHTML = `<span class="toast-ico">${STAR}</span><span><small>Achievement unlocked</small><b>${esc(a.title)}</b><span class="d">${esc(a.desc)}</span></span>`;
      toasts.appendChild(el);
      requestAnimationFrame(() => el.classList.add("in"));
      const r = el.getBoundingClientRect();
      burst(r.left + 30, r.top + 30, 26);
      setTimeout(() => { el.classList.remove("in"); setTimeout(() => { el.remove(); nextToast(); }, 450); }, 3800);
    }

    /* --- state changes --- */
    unlock = function (id) {
      if (!ACH[id] || st.ach.includes(id)) return;
      st.ach.push(id); save(); render();
      queue.push(id); if (!showing) nextToast();
    };
    function markSection(id) {
      if (!SECTIONS.includes(id) || st.sections.includes(id)) return;
      st.sections.push(id); save(); render();
      if (id === "work") unlock("work");
      if (st.sections.length >= SECTIONS.length) unlock("all");
    }

    render();
    markSection("top");

    /* sections count as explored when they cross the middle of the screen */
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) markSection(e.target.id); }),
        { rootMargin: "-45% 0px -45% 0px" });
      SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
    addEventListener("scroll", () => {
      if (scrollY > innerHeight * 0.5) unlock("start");
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) markSection("contact");
    }, { passive: true });

    /* clicks: gallery arrows, experience entries, contact links */
    let opened = 0;
    document.addEventListener("click", e => {
      const t = e.target;
      if (t.closest(".gal button")) unlock("gallery");
      const sum = t.closest("summary");
      if (sum && sum.parentElement && !sum.parentElement.open && ++opened >= 2) unlock("fine");
      if (t.closest('a[href^="mailto:"], .foot-links a')) unlock("hello");
    });

    /* dark mode switch (only counts when the visitor presses the toggle) */
    if (window.PFTheme) PFTheme.onChange((mode, byUser) => { if (byUser && mode === "dark") unlock("night"); });

    /* secret: the Konami code */
    const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let pos = 0;
    addEventListener("keydown", e => {
      const k = (e.key || "").toLowerCase();
      pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
      if (pos === seq.length) { pos = 0; rain(); unlock("konami"); }
    });
  }
})();
