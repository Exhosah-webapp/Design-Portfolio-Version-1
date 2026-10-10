# Exhosah — Portfolio Website

A fast, static portfolio site. No build step, no frameworks: open `index.html` and it works.

## What's in the folder

```
portfolio-site/
├── index.html            Page shell. Loads the files below.
├── css/
│   └── style.css         All styling and animation.
├── js/
│   ├── content.js        YOUR TEXT, IMAGES, COLOURS. The file you edit most.
│   ├── main.js           Builds the page from content.js.
│   └── play.js           Interactions and the progress game (optional).
├── images/               Project screenshots and your portrait (WebP).
├── tools/
│   └── optimize_images.py  Turns raw images into web-ready WebP.
└── README.md
```

## Preview it

Double-click `index.html`. Your browser needs internet once so the Google Font can load.

For a more realistic preview, run this inside the folder and open http://localhost:8000:

```
python3 -m http.server 8000
```

## Edit your content (js/content.js)

Everything lives in one object called `SITE`. Change what's inside the quotes.

| To change | Edit |
| --- | --- |
| Your name, email, links, portrait photo | `person` |
| Headline, intro text, hero stickers | `hero` |
| Projects (title, description, tags, images, link) | `work.projects` |
| Result cards that scroll across the page | `impact.items` |
| About text, counting stats, skills, education | `about` |
| Jobs and bullet points | `experience.items` |
| Closing headline | `contact` |
| Colours and font | `theme` |

### Add a project

Copy a whole `{ ... },` block inside `work.projects`, paste it where you want it, and change the text.

```js
{
  name: "My New Project",
  kind: "What it is in a few words",
  year: "2026",              // "" hides the year
  tags: ["Mobile", "Fintech"],
  images: ["images/my-new-project.webp"],
  summary: "Two sentences about the project.",
  link: "", linkLabel: ""    // optional live link
},
```

To hide a project without deleting it, add `show: false`.

### Images

- Put image files in the `images` folder and list them in a project's `images: [...]`.
- The first image is the cover. With two or more, the card gets a slideshow with arrows.
- Covers are shown in a 16:10 frame, aligned to the top. Keep the important part of each screen near the top.
- Your portrait uses a 4:5 frame (`person.portrait`).
- An empty list `[]` shows a coloured placeholder that names the field to fill.

**Prepare new images with Python (optional):**

```
pip install pillow
python3 tools/optimize_images.py path/to/my/raw-images
```

This resizes everything to 1800 px wide, converts to WebP and drops the files into `images/` with tidy names.

### Colours and font

In `theme`: `font` accepts any Google Font name (for example `"Inter Tight"` or `"Instrument Sans"`), and the colour values are plain hex codes. `accent` is used for hover states, the progress bar and the game.

## Motion and the progress game

Interactions are in `js/play.js`, switched on or off in `SITE.effects`:

- **progressBar**: thin bar at the top that fills as you scroll.
- **cursor**: trailing ring that grows over links (mouse only).
- **magnetic**: buttons lean toward the cursor.
- **tilt**: project covers tilt with a light glare.
- **stickers**: draggable stickers beside the hero headline (desktop only).
- **scrollSpeed**: the scrolling pill rows speed up while you scroll.
- **countUp**: stats count up when they come into view.
- **game**: progress ring and achievements, bottom-left.

Set any of them to `false` to turn it off. They also switch off by themselves on touch screens and for visitors who set "reduce motion" in their system.

**The game.** Visitors "explore" six sections (intro, work, results, about, experience, contact) and unlock achievements along the way, with a small confetti burst. Progress is remembered in their browser. The final level invites them to email you. Rename levels and achievements in `SITE.game`. Two achievements are secret: one for scrolling fast, and one for the Konami code (↑ ↑ ↓ ↓ ← → ← → B A).

To remove all of it, delete the `<script src="js/play.js">` line in `index.html`.

## Put it online

Drag the whole `portfolio-site` folder (keep the `images` folder inside it) onto one of:

- **Netlify Drop**: app.netlify.com/drop
- **Vercel**, or **GitHub Pages** (upload the folder as a repository)

## Troubleshooting

- **Images don't show.** Check that the file name in `content.js` matches the file in `images/` exactly, including capitals, and that the `images` folder sits next to `index.html`.
- **The font looks different.** The Google Font loads over the internet. Offline, the page falls back to your system font.
- **Page is blank.** There's probably a missing comma or quote in `js/content.js`. Open the browser console (F12) to see which line.
- **Want to start the game over.** Open the progress panel and press "Reset progress".

## Notes on the content

- The descriptions for projects without a year (VitaLink, Mycaban, SurePlugs, Flex Living, Bclics, BeckyShops, Prepora, AI Document Verification) were written from the screenshots. Add your role, year and results.
- Five projects from the CV are hidden with `show: false` because they have no images yet (Medical consultation platform, Artivio, AI Interview Preparation Platform, PalsConnect, Orello Tracker). All of them still appear under Experience.
