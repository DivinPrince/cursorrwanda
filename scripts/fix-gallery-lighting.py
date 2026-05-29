#!/usr/bin/env python3
"""Balance harsh lighting and apply a warm cinematic grade to gallery photos."""

from __future__ import annotations

import argparse
from pathlib import Path

import cv2
import numpy as np


def smooth_mask(values: np.ndarray, sigma: float) -> np.ndarray:
    return cv2.GaussianBlur(values.astype(np.float32), (0, 0), sigma)


def fix_lighting(image: np.ndarray, *, shadow_lift: float = 0.22) -> np.ndarray:
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab)

    l = l_channel.astype(np.float32)

    clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
    l = clahe.apply(np.clip(l, 0, 255).astype(np.uint8)).astype(np.float32)

    highlight = smooth_mask(np.clip((l - 175.0) / 70.0, 0.0, 1.0), 18.0)
    l = l - highlight * np.maximum(l - 168.0, 0.0) * 0.72

    shadow = smooth_mask(np.clip((92.0 - l) / 92.0, 0.0, 1.0), 22.0)
    l = l + shadow * (98.0 - l) * shadow_lift

    l = 128.0 + (l - 128.0) * 1.06
    l = np.clip(l, 0, 255).astype(np.uint8)

    merged = cv2.merge([l, a_channel, b_channel])
    result = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)
    return cv2.bilateralFilter(result, d=7, sigmaColor=28, sigmaSpace=28)


def apply_cinematic_grade(
    image: np.ndarray,
    *,
    grade_power: float = 1.14,
    vignette_strength: float = 0.32,
    vignette_min: float = 0.58,
    l_boost: float = 0.0,
) -> np.ndarray:
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab)

    l = l_channel.astype(np.float32)
    a = a_channel.astype(np.float32)
    b = b_channel.astype(np.float32)
    lum = l / 255.0

    # Darker base with richer mids, similar to the site palette.
    l_norm = np.clip(0.5 + (lum - 0.5) * 1.1, 0.0, 1.0)
    l_norm = np.power(l_norm, grade_power)
    l = l_norm * 255.0 + l_boost

    highlights = smooth_mask(np.clip((lum - 0.48) / 0.52, 0.0, 1.0), 12.0)
    shadows = smooth_mask(np.clip((0.4 - lum) / 0.4, 0.0, 1.0), 16.0)
    mids = np.clip(1.0 - np.maximum(highlights, shadows), 0.0, 1.0)

    # Warm orange lift in mids and highlights.
    a = a + highlights * 9.0 + mids * 5.5 + 1.5
    b = b + highlights * 13.0 + mids * 7.0 + 2.0

    # Cool teal shadows for contrast.
    a = a - shadows * 7.0
    b = b - shadows * 9.0

    l = np.clip(l, 0, 255).astype(np.uint8)
    a = np.clip(a, 0, 255).astype(np.uint8)
    b = np.clip(b, 0, 255).astype(np.uint8)

    graded = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)

    hsv = cv2.cvtColor(graded, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.06, 0, 255)
    graded = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

    rows, cols = graded.shape[:2]
    y, x = np.indices((rows, cols))
    cx, cy = cols / 2.0, rows / 2.0
    dist = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
    vignette = np.clip(1.0 - dist * vignette_strength, vignette_min, 1.0)
    graded = (graded.astype(np.float32) * vignette[:, :, np.newaxis]).astype(np.uint8)

    return graded


def remove_bulb_flares(image: np.ndarray) -> np.ndarray:
    """Remove starburst streaks from bright ceiling bulbs."""
    height, _width = image.shape[:2]
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    luminance = lab[:, :, 0]

    top = int(height * 0.34)
    region = np.zeros((height, luminance.shape[1]), np.uint8)
    region[:top, :] = 255

    bright = cv2.threshold(luminance, 212, 255, cv2.THRESH_BINARY)[1]
    bright = cv2.bitwise_and(bright, region)
    opened = cv2.morphologyEx(
        bright,
        cv2.MORPH_OPEN,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13)),
    )
    mask = cv2.subtract(bright, opened)

    bright_soft = cv2.threshold(luminance, 198, 255, cv2.THRESH_BINARY)[1]
    bright_soft = cv2.bitwise_and(bright_soft, region)
    opened_soft = cv2.morphologyEx(
        bright_soft,
        cv2.MORPH_OPEN,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)),
    )
    mask = cv2.bitwise_or(mask, cv2.subtract(bright_soft, opened_soft))
    mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2)), iterations=1)

    if np.count_nonzero(mask) == 0:
        return image

    return cv2.inpaint(image, mask, 3, cv2.INPAINT_TELEA)


IMAGE_PROFILES: dict[str, dict[str, float | bool]] = {
    "38319.jpg": {
        "remove_flares": True,
        "shadow_lift": 0.26,
        "grade_power": 1.1,
        "vignette_strength": 0.24,
        "vignette_min": 0.68,
        "l_boost": 0.0,
    },
}


def process_image(image: np.ndarray, profile: dict[str, float | bool] | None = None) -> np.ndarray:
    profile = profile or {}
    if profile.get("remove_flares"):
        image = remove_bulb_flares(image)
    balanced = fix_lighting(image, shadow_lift=float(profile.get("shadow_lift", 0.22)))
    return apply_cinematic_grade(
        balanced,
        grade_power=float(profile.get("grade_power", 1.14)),
        vignette_strength=float(profile.get("vignette_strength", 0.32)),
        vignette_min=float(profile.get("vignette_min", 0.58)),
        l_boost=float(profile.get("l_boost", 0.0)),
    )


def process_file(path: Path, output: Path | None = None) -> None:
    image = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if image is None:
        raise RuntimeError(f"Could not read image: {path}")

    profile = IMAGE_PROFILES.get(path.name)
    fixed = process_image(image, profile)
    target = output or path
    if not cv2.imwrite(str(target), fixed, [int(cv2.IMWRITE_JPEG_QUALITY), 92]):
        raise RuntimeError(f"Could not write image: {target}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "paths",
        nargs="*",
        default=[Path("public/gallery")],
        type=Path,
        help="Image files or directories to process",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Optional output file when processing a single image",
    )
    args = parser.parse_args()

    files: list[Path] = []
    for entry in args.paths:
        if entry.is_dir():
            files.extend(sorted(entry.glob("*.jpg")))
            files.extend(sorted(entry.glob("*.jpeg")))
        else:
            files.append(entry)

    if not files:
        raise SystemExit("No images found to process.")

    if args.output and len(files) != 1:
        raise SystemExit("--output can only be used with a single input image.")

    for file_path in files:
        process_file(file_path, args.output)
        print(f"Processed {file_path}")


if __name__ == "__main__":
    main()
