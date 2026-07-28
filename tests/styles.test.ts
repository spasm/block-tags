import { describe, expect, it } from "vitest";

const { readFileSync } = process.getBuiltinModule("node:fs");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

describe("tag label alignment", () => {
  it("uses a centered line box with balanced vertical padding", () => {
    expect(styles).toMatch(
      /\.block-tags-editor-tag,\s*\.block-tags-reading-tag\s*\{[^}]*align-items: center;[^}]*display: inline-flex;[^}]*line-height: 1;[^}]*padding-block: 0\.2em;/s,
    );
  });

  it("keeps CodeMirror's nested hashtag spans in the outer line box", () => {
    expect(styles).toMatch(
      /\.block-tags-editor-tag > \.cm-hashtag\s*\{[^}]*line-height: inherit !important;[^}]*padding: 0 !important;/s,
    );
  });

  it("neutralizes theme borders and border-like shadows on owned tag elements", () => {
    expect(styles).toMatch(
      /\.block-tags-editor-tag,\s*\.block-tags-editor-tag > \.cm-hashtag,\s*a\.tag\.block-tags-reading-tag\s*\{[^}]*border: 0 !important;[^}]*box-shadow: none !important;/s,
    );
  });
});
