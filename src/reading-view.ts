import { applyPaletteVariables, clearPaletteVariables } from "./palettes";
import { normalizeTag } from "./tag-rules";
import type { TagStyleRule } from "./types";

export function decorateRenderedRoot(root: HTMLElement, rules: TagStyleRule[]): void {
  clearDecorations(root);

  const enabledRules = new Map<string, TagStyleRule>();
  for (const rule of rules) {
    if (rule.enabled) {
      const normalized = normalizeTag(rule.tag);
      if (normalized && !enabledRules.has(normalized)) {
        enabledRules.set(normalized, rule);
      }
    }
  }

  const tagElements = root.querySelectorAll<HTMLElement>("a.tag");
  for (const tagElement of tagElements) {
    const rule = enabledRules.get(normalizeTag(tagElement.textContent ?? ""));
    if (!rule) {
      continue;
    }

    tagElement.classList.add("block-tags-reading-tag");
    applyPaletteVariables(tagElement.style, rule.palette);

    const listItem = tagElement.closest<HTMLElement>("li");
    if (listItem && root.contains(listItem) && !listItem.classList.contains("block-tags-reading-list-item")) {
      listItem.classList.add("block-tags-reading-list-item");
      applyPaletteVariables(listItem.style, rule.palette);
    }
  }
}

function clearDecorations(root: HTMLElement): void {
  for (const element of root.querySelectorAll<HTMLElement>(
    ".block-tags-reading-list-item, .block-tags-reading-block",
  )) {
    element.classList.remove("block-tags-reading-list-item");
    element.classList.remove("block-tags-reading-block");
    element.style.removeProperty("--block-tags-block-bg");
    element.style.removeProperty("--block-tags-block-text");
    clearPaletteVariables(element.style);
    if (!element.getAttribute("style")) {
      element.removeAttribute("style");
    }
  }

  for (const element of root.querySelectorAll<HTMLElement>(".block-tags-reading-tag")) {
    element.classList.remove("block-tags-reading-tag");
    element.style.removeProperty("--block-tags-tag-bg");
    element.style.removeProperty("--block-tags-tag-text");
    clearPaletteVariables(element.style);
    if (!element.getAttribute("style")) {
      element.removeAttribute("style");
    }
  }
}
