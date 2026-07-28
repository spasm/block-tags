import type { PaletteName } from "./types";

interface ThemePaletteTokens {
  background: string;
  foreground: string;
  bullet: string;
  ring: string;
}

export interface PaletteTokens {
  light: ThemePaletteTokens;
  dark: ThemePaletteTokens;
}

export const PALETTE_OPTIONS: Record<PaletteName, string> = {
  gray: "Gray",
  red: "Red",
  orange: "Orange",
  amber: "Amber",
  yellow: "Yellow",
  green: "Green",
  teal: "Teal",
  cyan: "Cyan",
  blue: "Blue",
  purple: "Purple",
  pink: "Pink",
};

export const PALETTE_NAMES = Object.keys(PALETTE_OPTIONS) as PaletteName[];

/**
 * High-chroma, Tana-inspired tag colors. Pink, Yellow, and Blue are
 * anchored to user-supplied visual references; the remaining hues follow
 * the same dark saturated surface and bright same-family foreground model.
 */
export const PALETTES: Record<PaletteName, PaletteTokens> = {
  gray: makePalette("#e1e5ea", "#3f464f", "#34383e", "#c8cdd3"),
  red: makePalette("#ffd9dd", "#a51424", "#690817", "#ef5260"),
  orange: makePalette("#ffe0ca", "#b84f00", "#672600", "#f07a2f"),
  amber: makePalette("#ffebbd", "#956000", "#5b3900", "#e8a528"),
  yellow: makePalette("#fff2a6", "#6d5e00", "#453702", "#d1c234"),
  green: makePalette("#cef5dc", "#08733f", "#064a2a", "#35ca7d"),
  teal: makePalette("#c9f3eb", "#007567", "#005047", "#2bc7af"),
  cyan: makePalette("#c9f0f7", "#006b80", "#004759", "#2ab9d2"),
  blue: makePalette("#d4ebff", "#005ea8", "#03305e", "#2f91d3"),
  purple: makePalette("#eddcff", "#7134a1", "#421064", "#ac65dc"),
  pink: makePalette("#ffd8eb", "#a5005c", "#780044", "#f24f9e"),
};

export function isPaletteName(value: unknown): value is PaletteName {
  return typeof value === "string" && PALETTE_NAMES.includes(value as PaletteName);
}

export function paletteStyle(palette: PaletteName): string {
  const tokens = PALETTES[palette];
  return [
    `--block-tags-bg-light:${tokens.light.background}`,
    `--block-tags-fg-light:${tokens.light.foreground}`,
    `--block-tags-bullet-light:${tokens.light.bullet}`,
    `--block-tags-ring-light:${tokens.light.ring}`,
    `--block-tags-bg-dark:${tokens.dark.background}`,
    `--block-tags-fg-dark:${tokens.dark.foreground}`,
    `--block-tags-bullet-dark:${tokens.dark.bullet}`,
    `--block-tags-ring-dark:${tokens.dark.ring}`,
  ].join(";");
}

export function applyPaletteVariables(style: CSSStyleDeclaration, palette: PaletteName): void {
  const tokens = PALETTES[palette];
  style.setProperty("--block-tags-bg-light", tokens.light.background);
  style.setProperty("--block-tags-fg-light", tokens.light.foreground);
  style.setProperty("--block-tags-bullet-light", tokens.light.bullet);
  style.setProperty("--block-tags-ring-light", tokens.light.ring);
  style.setProperty("--block-tags-bg-dark", tokens.dark.background);
  style.setProperty("--block-tags-fg-dark", tokens.dark.foreground);
  style.setProperty("--block-tags-bullet-dark", tokens.dark.bullet);
  style.setProperty("--block-tags-ring-dark", tokens.dark.ring);
}

export function clearPaletteVariables(style: CSSStyleDeclaration): void {
  for (const property of [
    "--block-tags-bg-light",
    "--block-tags-fg-light",
    "--block-tags-bullet-light",
    "--block-tags-ring-light",
    "--block-tags-bg-dark",
    "--block-tags-fg-dark",
    "--block-tags-bullet-dark",
    "--block-tags-ring-dark",
  ]) {
    style.removeProperty(property);
  }
}

function makePalette(
  lightBackground: string,
  lightForeground: string,
  darkBackground: string,
  darkForeground: string,
): PaletteTokens {
  return {
    light: themeTokens(lightBackground, lightForeground),
    dark: themeTokens(darkBackground, darkForeground),
  };
}

function themeTokens(background: string, foreground: string): ThemePaletteTokens {
  return {
    background,
    foreground,
    bullet: foreground,
    ring: `${foreground}4d`,
  };
}
