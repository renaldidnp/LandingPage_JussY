#!/usr/bin/env python3
"""Feather the outer edges of a transparent product PNG.

Artwork that is cropped exactly at the canvas edge shows a hard, straight
cut line in the hero. This script fades the alpha channel to zero near the
canvas border (smoothstep) so the product dissolves instead of looking like
a box, while keeping the canvas size and the visible pixels unchanged.

Usage:
    python3 scripts/soften-edges.py public/ProdukUtama.png
    python3 scripts/soften-edges.py public/ProdukUtama.png --fade 80
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
from PIL import Image


def smoothstep(t: np.ndarray) -> np.ndarray:
    t = np.clip(t, 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def soften(path: Path, fade: int) -> None:
    source = Image.open(path)
    metadata = {
        key: source.info[key]
        for key in ("icc_profile", "dpi")
        if key in source.info
    }
    image = source.convert("RGBA")
    pixels = np.asarray(image).astype(np.float32)
    height, width = pixels.shape[:2]

    y, x = np.mgrid[0:height, 0:width].astype(np.float32)
    edge_x = np.minimum(x, width - 1 - x)
    edge_y = np.minimum(y, height - 1 - y)

    alpha = smoothstep(edge_x / fade) * smoothstep(edge_y / fade)
    pixels[:, :, 3] *= alpha

    result = Image.fromarray(np.clip(pixels, 0, 255).astype(np.uint8), "RGBA")
    result.save(path, "PNG", optimize=True, **metadata)
    print(f"{path}: feathered {fade}px borders ({width}x{height})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("image", type=Path, help="transparent PNG to soften in place")
    parser.add_argument("--fade", type=int, default=64, help="fade distance in pixels")
    args = parser.parse_args()

    if args.fade < 1:
        parser.error("--fade must be at least 1")

    soften(args.image, args.fade)


if __name__ == "__main__":
    main()
