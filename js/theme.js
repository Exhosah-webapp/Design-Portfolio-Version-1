/* theme.js — light and dark mode.
   Loaded in the <head> (right after content.js) so the right colours are
   applied before the page paints. Colours come from SITE.theme in content.js.

   Behaviour:
   - First visit: follows the visitor's device setting (or SITE.theme.defaultMode).
   - After they press the toggle: their choice is remembered in the browser.
   - Set SITE.theme.darkMode = false to remove dark mode and the toggle. */
(function () {
  "use strict";

  const S = typeof SITE !== "undefined" ? SITE : {};
  const T = S.theme || {};
  const root = document.documentElement;
  const KEY = "pf-theme";

  const DEFAULT_DARK = {
    paper: "#0c0e16", surface: "#161926", ink: "#eef0f7",
    muted: "#9aa0b4", line: "#262b3c", accent: "#8b9bff"
  };
  const dk = Object.assign({}, DEFAULT_DARK, T.dark || {});
  const vars = obj => Object.keys(obj).filter(k => obj[k]).map(k => `--${k}:${obj[k]}`).join(";");
  const lightVars = vars({ paper: T.paper, surface: T.surface, ink: T.ink, muted: T.muted, line: T.line, accent: T.accent });

  /* colours for both modes, applied through CSS variables */
  const style = document.createElement("style");
  style.textContent =
    `:root{${lightVars};color-scheme:light}` +
    (T.darkMode === false ? "" : `:root[data-theme="dark"]{${vars(dk)};color-scheme:dark}`);
  document.head.appendChild(style);

  if (T.darkMode === false) { root.setAttribute("data-theme", "light"); return; }

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mql = matchMedia("(prefers-color-scheme: dark)");

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  const pref = (saved === "light" || saved === "dark") ? saved
    : (T.defaultMode === "light" || T.defaultMode === "dark") ? T.defaultMode : "system";
  let followSystem = pref === "system";
  let cur = pref === "system" ? (mql.matches ? "dark" : "light") : pref;

  /* browser toolbar colour on phones */
  const meta = document.querySelector('meta[name="theme-color"]') || document.createElement("meta");
  meta.name = "theme-color";
  if (!meta.parentNode) document.head.appendChild(meta);
  const paperFor = m => (m === "dark" ? dk.paper : (T.paper || "#ffffff"));

  root.setAttribute("data-theme", cur);
  meta.content = paperFor(cur);

  const listeners = [];

  function apply(next, byUser, origin) {
    const run = () => {
      cur = next;
      root.setAttribute("data-theme", next);
      meta.content = paperFor(next);
    };

    if (origin && !reduced && typeof document.startViewTransition === "function") {
      /* circular wipe growing out of the toggle button */
      const x = origin.left + origin.width / 2, y = origin.top + origin.height / 2;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const t = document.startViewTransition(run);
      t.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.2,.7,.1,1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(() => {});
    } else run();

    listeners.forEach(fn => fn(next, !!byUser));
  }

  mql.addEventListener && mql.addEventListener("change", e => {
    if (followSystem) apply(e.matches ? "dark" : "light", false);
  });

  window.PFTheme = {
    get: () => cur,
    onChange: fn => { listeners.push(fn); },
    set: (mode, origin) => {
      followSystem = false;
      try { localStorage.setItem(KEY, mode); } catch (e) {}
      apply(mode, true, origin);
    },
    toggle: origin => window.PFTheme.set(cur === "dark" ? "light" : "dark", origin)
  };
})();
