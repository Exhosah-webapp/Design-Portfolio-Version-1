#!/usr/bin/env python3
"""
optimize_images.py — turn any screenshots or photos into web-ready WebP files.

Usage (from inside the portfolio-site folder):

    python3 tools/optimize_images.py path/to/my/raw-images

Every PNG / JPG / JPEG / WEBP in that folder is resized to at most 1800 px wide,
converted to WebP and saved into the "images" folder with a tidy lowercase name
(for example "Dr. Becky's Shop.png" becomes "dr-beckys-shop.webp").
Then point a project at it in js/content.js:

    images: ["images/dr-beckys-shop.webp"]

Needs Pillow once:  pip install pillow
"""
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is missing. Install it with:  pip install pillow")

MAX_WIDTH = 1800
QUALITY = 86
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def slug(name: str) -> str:
    name = re.sub(r"[’']", "", name.lower())
    name = re.sub(r"[^a-z0-9]+", "-", name).strip("-")
    return name or "image"


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)

    src = Path(sys.argv[1]).expanduser()
    if not src.is_dir():
        sys.exit(f"Folder not found: {src}")

    out = Path(__file__).resolve().parent.parent / "images"
    out.mkdir(exist_ok=True)

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXTS)
    if not files:
        sys.exit(f"No images found in {src}")

    for f in files:
        im = Image.open(f).convert("RGB")
        if im.width > MAX_WIDTH:
            im = im.resize((MAX_WIDTH, round(im.height * MAX_WIDTH / im.width)), Image.LANCZOS)
        target = out / f"{slug(f.stem)}.webp"
        im.save(target, "WEBP", quality=QUALITY, method=6)
        print(f"{f.name:45s} -> images/{target.name}  ({target.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
