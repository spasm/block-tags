import type { Extension } from "@codemirror/state";
import { Plugin } from "obsidian";

import { createBlockTagsEditorExtension } from "./editor-extension";
import { decorateRenderedRoot } from "./reading-view";
import { BlockTagsSettingTab } from "./settings-tab";
import { sanitizeSettings } from "./tag-rules";
import type { BlockTagsSettings } from "./types";

export default class BlockTagsPlugin extends Plugin {
  settings: BlockTagsSettings = { rules: [] };
  private readonly editorExtensions: Extension[] = [];

  async onload(): Promise<void> {
    await this.loadSettings();
    this.updateEditorExtension();
    this.registerEditorExtension(this.editorExtensions);
    this.registerMarkdownPostProcessor((element) => {
      decorateRenderedRoot(element, this.settings.rules);
    });
    this.addSettingTab(new BlockTagsSettingTab(this.app, this));
  }

  async loadSettings(): Promise<void> {
    this.settings = sanitizeSettings(await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
    this.updateEditorExtension();
    this.refreshReadingViews();
  }

  private updateEditorExtension(): void {
    this.editorExtensions.length = 0;
    this.editorExtensions.push(createBlockTagsEditorExtension(this.settings.rules));
    this.app.workspace.updateOptions();
  }

  private refreshReadingViews(): void {
    for (const root of document.querySelectorAll<HTMLElement>(".markdown-preview-view")) {
      decorateRenderedRoot(root, this.settings.rules);
    }
  }
}
