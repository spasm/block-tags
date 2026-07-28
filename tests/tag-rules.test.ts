import { describe, expect, it } from "vitest";

import {
  DEFAULT_SETTINGS,
  findTagMatches,
  isListItemSourceLine,
  isValidTag,
  normalizeTag,
  sanitizeSettings,
} from "../src/tag-rules";
import type { TagStyleRule } from "../src/types";

const ideaRule: TagStyleRule = {
  ...DEFAULT_SETTINGS.rules[0]!,
};

describe("normalizeTag", () => {
  it("accepts a leading hash and ignores case", () => {
    expect(normalizeTag("  #Idea ")).toBe("idea");
  });
});

describe("isValidTag", () => {
  it("supports nested Obsidian tags", () => {
    expect(isValidTag("idea/later")).toBe(true);
    expect(isValidTag("idea later")).toBe(false);
  });
});

describe("isListItemSourceLine", () => {
  it("recognizes unordered, ordered, and nested list items", () => {
    expect(isListItemSourceLine("- Idea #Idea")).toBe(true);
    expect(isListItemSourceLine("  1. Idea #Idea")).toBe(true);
    expect(isListItemSourceLine("Paragraph #Idea")).toBe(false);
  });
});

describe("findTagMatches", () => {
  it("finds a configured tag and returns its source range", () => {
    const matches = findTagMatches("- Revisit this #Idea", [ideaRule]);
    expect(matches).toEqual([{ from: 15, to: 20, rule: ideaRule }]);
  });

  it("does not match URL fragments, escaped hashes, or longer tags", () => {
    expect(findTagMatches("site.test/#Idea \\#Idea #Ideas", [ideaRule])).toEqual([]);
  });

  it("ignores disabled rules", () => {
    expect(findTagMatches("#Idea", [{ ...ideaRule, enabled: false }])).toEqual([]);
  });
});

describe("sanitizeSettings", () => {
  it("migrates a legacy custom color to the nearest Radix family", () => {
    const settings = sanitizeSettings({
      rules: [{ id: "idea", tag: "Idea", enabled: true, tagBackground: "#f59f00" }],
    });
    expect(settings.rules[0]?.palette).toBe("orange");
  });

  it("provides the default rule when no saved settings exist", () => {
    expect(sanitizeSettings(null)).toEqual(DEFAULT_SETTINGS);
  });

  it("preserves an intentionally empty rule list", () => {
    expect(sanitizeSettings({ rules: [] })).toEqual({ rules: [] });
  });
});
