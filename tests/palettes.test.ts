import { describe, expect, it } from "vitest";

import { PALETTES, PALETTE_NAMES, paletteStyle } from "../src/palettes";

describe("Tana-style palette roles", () => {
  it("uses the sampled high-chroma dark anchors", () => {
    expect(PALETTES.pink.dark).toMatchObject({
      background: "#780044",
      foreground: "#f24f9e",
    });
    expect(PALETTES.yellow.dark).toMatchObject({
      background: "#453702",
      foreground: "#d1c234",
    });
    expect(PALETTES.blue.dark).toMatchObject({
      background: "#03305e",
      foreground: "#2f91d3",
    });
  });

  it("uses the foreground for bullets and a translucent version for rings", () => {
    for (const palette of PALETTE_NAMES) {
      for (const theme of [PALETTES[palette].light, PALETTES[palette].dark]) {
        expect(theme.bullet).toBe(theme.foreground);
        expect(theme.ring).toBe(`${theme.foreground}4d`);
      }
    }
  });

  it("emits light and dark CSS variables", () => {
    expect(paletteStyle("pink")).toContain("--block-tags-bg-light:#ffd8eb");
    expect(paletteStyle("pink")).toContain("--block-tags-bg-dark:#780044");
  });
});
