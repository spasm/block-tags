import { isPaletteName, PALETTES, PALETTE_NAMES } from "./palettes";
import type { BlockTagsSettings, PaletteName, TagMatch, TagStyleRule } from "./types";

const TAG_PATTERN = /#([\p{L}\p{N}_/-]+)/gu;
const VALID_BOUNDARY = /[\s([\]{},.!?;:'">]/u;
const HEX_COLOR = /^#[0-9a-f]{6}$/iu;

export const DEFAULT_SETTINGS: BlockTagsSettings = {
  rules: [
    {
      id: "idea",
      tag: "Idea",
      enabled: true,
      palette: "amber",
    },
  ],
};

export function createRule(): TagStyleRule {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    tag: "",
    enabled: true,
    palette: "blue",
  };
}

export function normalizeTag(tag: string): string {
  return tag.trim().replace(/^#+/u, "").toLocaleLowerCase();
}

export function isValidTag(tag: string): boolean {
  const normalized = normalizeTag(tag);
  return normalized.length > 0 && /^[\p{L}\p{N}_/-]+$/u.test(normalized);
}

export function isListItemSourceLine(text: string): boolean {
  return /^\s*(?:[-+*]|\d+[.)])\s+/u.test(text);
}

export function findTagMatches(text: string, rules: TagStyleRule[]): TagMatch[] {
  const enabledRules = new Map<string, TagStyleRule>();

  for (const rule of rules) {
    const normalized = normalizeTag(rule.tag);
    if (rule.enabled && isValidTag(normalized) && !enabledRules.has(normalized)) {
      enabledRules.set(normalized, rule);
    }
  }

  const matches: TagMatch[] = [];
  TAG_PATTERN.lastIndex = 0;

  for (const match of text.matchAll(TAG_PATTERN)) {
    const matchIndex = match.index;
    const fullMatch = match[0];
    const tagName = match[1];
    if (matchIndex === undefined || fullMatch === undefined || tagName === undefined) {
      continue;
    }

    if (matchIndex > 0) {
      const previousCharacter = text[matchIndex - 1];
      if (previousCharacter === "\\" || (previousCharacter && !VALID_BOUNDARY.test(previousCharacter))) {
        continue;
      }
    }

    const rule = enabledRules.get(normalizeTag(tagName));
    if (rule) {
      matches.push({
        from: matchIndex,
        to: matchIndex + fullMatch.length,
        rule,
      });
    }
  }

  return matches;
}

export function sanitizeSettings(data: unknown): BlockTagsSettings {
  if (!isRecord(data) || !Array.isArray(data.rules)) {
    return structuredClone(DEFAULT_SETTINGS);
  }

  const rules = data.rules.map(sanitizeRule).filter((rule): rule is TagStyleRule => rule !== null);
  return { rules };
}

function sanitizeRule(value: unknown): TagStyleRule | null {
  if (!isRecord(value)) {
    return null;
  }

  return {
    id: typeof value.id === "string" && value.id.length > 0 ? value.id : createRule().id,
    tag: typeof value.tag === "string" ? value.tag.replace(/^#+/u, "") : "",
    enabled: typeof value.enabled === "boolean" ? value.enabled : true,
    palette: isPaletteName(value.palette) ? value.palette : inferLegacyPalette(value.tagBackground),
  };
}

function inferLegacyPalette(value: unknown): PaletteName {
  if (typeof value !== "string" || !HEX_COLOR.test(value)) {
    return "amber";
  }

  const source = hexToRgb(value);
  let closest: PaletteName = "amber";
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const palette of PALETTE_NAMES) {
    const candidate = hexToRgb(PALETTES[palette].light.bullet);
    const distance =
      (source.red - candidate.red) ** 2 +
      (source.green - candidate.green) ** 2 +
      (source.blue - candidate.blue) ** 2;
    if (distance < closestDistance) {
      closest = palette;
      closestDistance = distance;
    }
  }

  return closest;
}

function hexToRgb(hex: string): { red: number; green: number; blue: number } {
  return {
    red: Number.parseInt(hex.slice(1, 3), 16),
    green: Number.parseInt(hex.slice(3, 5), 16),
    blue: Number.parseInt(hex.slice(5, 7), 16),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
