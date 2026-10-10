/* main.js — builds the page from the SITE object in content.js.
   You normally don't need to edit this file. */
(function(){
  const S = SITE, T = S.theme, P = S.person;
  const root = document.documentElement;

  /* theme + font */
  [["paper","--paper"],["surface","--surface"],["ink","--ink"],["muted","--muted"],["line","--line"],["accent","--accent"]]
    .forEach(([k,v]) => T[k] && root.style.setProperty(v, T[k]));
  if (T.font) {
    root.style.setProperty("--font", `"${T.font}","Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif`);
    const fam = encodeURIComponent(T.font).replace(/%20/g, "+");
    [["preconnect","https://fonts.googleapis.com"],["preconnect","https://fonts.gstatic.com","anonymous"]].forEach(([rel,href,co]) => {
      const l = document.createElement("link"); l.rel = rel; l.href = href; if (co) l.crossOrigin = co; document.head.appendChild(l);
    });
    const css = document.createElement("link"); css.rel = "stylesheet";
    css.href = `https://fonts.googleapis.com/css2?family=${fam}:wght@${T.fontWeights || "400;500;600;700"}&display=swap`;
    document.head.appendChild(css);
  }

  /* meta */
  document.title = S.meta.title;
  const md = document.querySelector('meta[name="description"]'); if (md) md.content = S.meta.description;

  /* helpers */
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const hue = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 360; };
  const words = t => esc(t).split(/\s+/).filter(Boolean).map((w,i) => `<span class="w"><span class="wi" style="--i:${i}">${w}</span></span>`).join(" ");
  const heading = (tag, cls, text, attr = "data-reveal") =>
    `<${tag} class="${cls}" ${attr} aria-label="${esc(text)}"><span aria-hidden="true">${words(text)}</span></${tag}>`;
  const roll = t => `<span class="roll"><span class="roll-a">${esc(t)}</span><span class="roll-b" aria-hidden="true">${esc(t)}</span></span>`;
  const fill = (a, w) => { if (!a.length) return a; let o = [...a]; while (o.length * w < 4200) o = o.concat(a); return o; };

  function media(src, alt, label, key) {
    const ph = `<div class="ph" style="--h:${hue(key)}"><span>${esc(label)}</span></div>`;
    if (!src) return ph;
    return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-ph="${esc(ph)}" onerror="this.outerHTML=this.dataset.ph">`;
  }
  function gallery(list, name, i) {
    if (!list.length) return media("", "", `Add images: work.projects[${i}].images`, name);
    const slides = list.map((src, n) =>
      `<img class="slide${n === 0 ? " on" : ""}" src="${esc(src)}" alt="${esc(name)}, image ${n + 1} of ${list.length}" loading="${i < 2 ? "eager" : "lazy"}"
        data-ph="${esc(`<div class="ph" style="--h:${hue(name)}"><span>Image not found: ${esc(src)}</span></div>`)}" onerror="this.outerHTML=this.dataset.ph">`).join("");
    const ui = list.length > 1 ? `
      <div class="gal" role="group" aria-label="${esc(name)} images">
        <button type="button" data-dir="-1" aria-label="Previous image">‹</button>
        <span class="count" aria-live="polite">1 / ${list.length}</span>
        <button type="button" data-dir="1" aria-label="Next image">›</button>
      </div>` : "";
    return slides + ui;
  }
  function avatar(item) {
    const h = hue(item.company);
    return item.logo
      ? `<img class="av" src="${esc(item.logo)}" alt="" style="--h:${h}">`
      : `<span class="av" style="--h:${h}" aria-hidden="true">${esc(item.company.trim().charAt(0).toUpperCase())}</span>`;
  }

  /* marquee builders */
  function marquee(listHtml, itemPx, speed, rev) {
    const n = listHtml.length, dur = Math.round(n * itemPx / speed);
    const g = listHtml.join("");
    return `<div class="marquee${rev ? " rev" : ""}"><div class="track" style="--dur:${dur}s">
      <ul class="group">${g}</ul><ul class="group" aria-hidden="true">${g}</ul></div></div>`;
  }
  const pill = e => `<li class="pill">${avatar(e)}<span><b>${esc(e.company)}</b><small>${esc(e.role)}</small></span></li>`;

  /* ---------- build ---------- */
  const stickerList = (S.effects && S.effects.stickers === false) ? [] : (S.hero.stickers || []);
  const stickers = stickerList.length
    ? `<div class="stickers" aria-hidden="true">${stickerList.map(t => `<div class="sticker"><span><i></i>${esc(t)}</span></div>`).join("")}</div>`
    : "";
  const stats = (S.about.stats || []).length
    ? `<div class="stats">${S.about.stats.map(t =>
        `<div class="stat"><b data-count="${esc(t.value)}" data-suffix="${esc(t.suffix || "")}">${esc(t.value)}${esc(t.suffix || "")}</b><span>${esc(t.label)}</span></div>`).join("")}</div>`
    : "";

  const exp = S.experience.items;
  const pillsA = fill(exp, 240).map(pill);
  const pillsB = fill([...exp].reverse(), 240).map(pill);
  const quotes = fill(S.impact.items, 352).map(q => `<li class="quote"><p>${esc(q.text)}</p><small>${esc(q.source)}</small></li>`);

  const nav = `
  <header class="nav" id="nav"><div class="wrap nav-in">
    <a class="brand" href="#top">${esc(P.nickname || P.name)}</a>
    <nav aria-label="Primary">
      <a href="#work">${roll("Work")}</a>
      <a href="#about">${roll("About")}</a>
      <a href="#experience">${roll("Experience")}</a>
      <a class="btn btn-sm" href="mailto:${esc(P.email)}">Email me</a>
    </nav>
  </div></header>`;

  const hero = `
  <section id="top" class="hero wrap">
    ${stickers}
    ${heading("h1", "display", S.hero.headline, "data-hero")}
    <div class="hero-foot">
      <p class="lead">${esc(S.hero.intro)}</p>
      <div class="cta">
        <a class="btn" href="#work">${esc(S.hero.primaryCta)}</a>
        <a class="btn ghost" href="mailto:${esc(P.email)}">${esc(S.hero.secondaryCta)}</a>
      </div>
    </div>
  </section>
  <div class="marquees" aria-label="Teams and products I have designed for">
    ${marquee(pillsA, 240, 45, false)}
    ${marquee(pillsB, 240, 38, true)}
  </div>`;

  const cards = S.work.projects.filter(p => p.show !== false).map((p, i) => {
    const imgs = p.images || (p.image ? [p.image] : []);
    return `
    <article class="card">
      <div class="card-media" data-gallery>${gallery(imgs, p.name, i)}</div>
      <div class="card-top"><h3>${esc(p.name)}</h3>${p.year ? `<span class="year">${esc(p.year)}</span>` : ""}</div>
      <p class="kind">${esc(p.kind)}</p>
      <p class="sum">${esc(p.summary)}</p>
      <p class="tags">${(p.tags || []).map(esc).join(", ")}</p>
      ${p.link ? `<a class="out" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.linkLabel || "View project")}</a>` : ""}
    </article>`;
  }).join("");

  const work = `
  <section id="work" class="sec wrap">
    <div class="sec-head">${heading("h2", "h2", S.work.heading)}<p>${esc(S.work.intro)}</p></div>
    <div class="grid">${cards}</div>
  </section>`;

  const impact = `
  <section id="results" class="sec" style="padding-top:0" aria-label="${esc(S.impact.heading)}">
    <div class="wrap sec-head">${heading("h2", "h2", S.impact.heading)}</div>
    ${marquee(quotes, 352, 40, false)}
  </section>`;

  const facts = S.about.details.map(d => `
    <div class="fact"><dt>${esc(d.label)}</dt><dd><ul>${d.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></dd></div>`).join("");
  const about = `
  <section id="about" class="sec wrap">
    <div class="about">
      <div class="portrait">${media(P.portrait, P.name, "Add image: person.portrait", P.name)}</div>
      <div>
        ${heading("h2", "h2", S.about.heading)}
        <p class="about-lead">${esc(S.about.lead)}</p>
        ${stats}
        <dl class="facts">${facts}</dl>
      </div>
    </div>
  </section>`;

  const xps = exp.map((e, i) => `
    <details class="xp"${i === 0 ? " open" : ""}>
      <summary>
        <span class="xp-date">${esc(e.dates)}</span>
        <span class="xp-main"><b>${esc(e.company)}</b><span>${esc(e.role)}${e.location ? ", " + esc(e.location) : ""}</span></span>
        <span class="xp-icon" aria-hidden="true"></span>
      </summary>
      <div class="xp-body"><ul>${e.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul></div>
    </details>`).join("");
  const experience = `
  <section id="experience" class="sec wrap" style="padding-top:0">
    <div class="sec-head">${heading("h2", "h2", S.experience.heading)}</div>
    <div class="xps">${xps}</div>
  </section>`;

  const footer = `
  <footer id="contact" class="foot wrap">
    ${heading("h2", "display", S.contact.heading)}
    <a class="mail" href="mailto:${esc(P.email)}">${roll(P.email)}</a>
    <div class="foot-links">${P.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${roll(l.label)}</a>`).join("")}</div>
    <p class="fine">© ${new Date().getFullYear()} ${esc(P.name)}</p>
  </footer>`;

  document.getElementById("app").innerHTML = nav + `<main>${hero}${work}${impact}${about}${experience}</main>` + footer;

  /* ---------- motion ---------- */
  // Headings reveal word by word as they scroll into view
  const targets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); setTimeout(() => e.target.classList.add("done"), 1800); io.unobserve(e.target); }
    }), { threshold: .3, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(t => io.observe(t));
  } else targets.forEach(t => t.classList.add("in"));

  // Page-load sequence: headline words, then intro, then marquees (waits for the font)
  const go = () => requestAnimationFrame(() => {
    document.body.classList.add("loaded");
    const h = document.querySelector("[data-hero]"); if (h) { h.classList.add("in"); setTimeout(() => h.classList.add("done"), 2000); }
  });
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1200))]).then(go);

  // Project image slideshows
  document.querySelectorAll("[data-gallery]").forEach(box => {
    const slides = [...box.querySelectorAll(".slide")], count = box.querySelector(".count");
    if (slides.length < 2) return;
    let cur = 0;
    box.addEventListener("click", e => {
      const btn = e.target.closest("button[data-dir]"); if (!btn) return;
      slides[cur].classList.remove("on");
      cur = (cur + Number(btn.dataset.dir) + slides.length) % slides.length;
      slides[cur].classList.add("on");
      count.textContent = `${cur + 1} / ${slides.length}`;
    });
  });

  // Hairline under the nav once you scroll
  const navEl = document.getElementById("nav");
  const onScroll = () => navEl.classList.toggle("scrolled", window.scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();
