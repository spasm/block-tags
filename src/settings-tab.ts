import { App, PluginSettingTab, Setting } from "obsidian";

import type BlockTagsPlugin from "./main";
import { applyPaletteVariables, isPaletteName, PALETTE_OPTIONS } from "./palettes";
import { createRule, isValidTag } from "./tag-rules";
import type { TagStyleRule } from "./types";

export class BlockTagsSettingTab extends PluginSettingTab {
  constructor(app: App, private readonly plugin: BlockTagsPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("block-tags-settings");

    containerEl.createEl("p", {
      text: "Create a rule for each tag. Its color family styles the tag and any bullet that carries it.",
    });

    for (const rule of this.plugin.settings.rules) {
      this.renderRule(containerEl, rule);
    }

    new Setting(containerEl)
      .setName("Add tag rule")
      .setDesc("Tags can include letters, numbers, underscores, hyphens, and forward slashes.")
      .addButton((button) =>
        button
          .setButtonText("Add rule")
          .setCta()
          .onClick(async () => {
            this.plugin.settings.rules.push(createRule());
            await this.plugin.saveSettings();
            this.display();
          }),
      );
  }

  private renderRule(containerEl: HTMLElement, rule: TagStyleRule): void {
    const card = containerEl.createDiv({ cls: "block-tags-rule-card" });
    const heading = new Setting(card)
      .setName(rule.tag ? `#${rule.tag}` : "New tag rule")
      .setHeading()
      .addToggle((toggle) =>
        toggle.setTooltip("Enable this rule").setValue(rule.enabled).onChange(async (value) => {
          rule.enabled = value;
          await this.plugin.saveSettings();
        }),
      )
      .addExtraButton((button) =>
        button
          .setIcon("trash-2")
          .setTooltip("Remove rule")
          .onClick(async () => {
            this.plugin.settings.rules = this.plugin.settings.rules.filter((candidate) => candidate.id !== rule.id);
            await this.plugin.saveSettings();
            this.display();
          }),
      );
    heading.settingEl.addClass("block-tags-rule-heading");

    new Setting(card)
      .setName("Tag")
      .setDesc("Enter the tag with or without the leading #.")
      .addText((text) => {
        text.setPlaceholder("Idea").setValue(rule.tag).onChange(async (value) => {
          rule.tag = value.trim().replace(/^#+/u, "");
          text.inputEl.toggleClass("block-tags-invalid", rule.tag.length > 0 && !isValidTag(rule.tag));
          await this.plugin.saveSettings();
        });
        text.inputEl.toggleClass("block-tags-invalid", rule.tag.length > 0 && !isValidTag(rule.tag));
      });

    const paletteSetting = new Setting(card)
      .setName("Color family")
      .setDesc("Uses coordinated high-chroma shades for light and dark themes.");
    const preview = paletteSetting.controlEl.createSpan({
      cls: "block-tags-palette-preview",
      text: rule.tag ? `#${rule.tag}` : "#Tag",
    });
    applyPaletteVariables(preview.style, rule.palette);
    paletteSetting.addDropdown((dropdown) =>
      dropdown
        .addOptions(PALETTE_OPTIONS)
        .setValue(rule.palette)
        .onChange(async (value) => {
          if (!isPaletteName(value)) {
            return;
          }
          rule.palette = value;
          applyPaletteVariables(preview.style, rule.palette);
          await this.plugin.saveSettings();
        }),
    );
  }
}
