/*
This plugin file is generated by esbuild. To view the source, please visit the 
github repository of this plugin.
*/

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true,
configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(
        from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(
mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod,
  enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }),
mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);
var fs = __toESM(require("fs"), 1);
var path2 = __toESM(require("path"), 1);
var import_obsidian5 = require("obsidian");

// src/settings/defaults.ts
var DEFAULT_SETTINGS = {
  repositoryDirIgnore: ["node_modules", ".git"],
  repositoryDirLink: ["docs"],
  repositoryIgnore: [],
  repositoryInclude: [],
  isWhitelist: true,
  shouldSymlinkOnStart: true
};

// src/settings/Tab.ts
var import_obsidian4 = require("obsidian");

// src/settings/controllers/Base.ts
var SymlinkSettingController = class {
  /**
   * Assign class properties from provided arguments.
   *
   * @param obj - Class properties required for controller.
   * @param obj.title - Title string for rendering controller.
   * @param obj.description - Description string for rendering controller.
   * @param obj.container - Container to append controller to when mounting.
   * @param obj.plugin - Current instance of symlink obsidian plugin.
   */
  constructor({ title, description, container, plugin }) {
    // Class properties set in constructor using object assign.
    __publicField(this, "title");
    __publicField(this, "description");
    __publicField(this, "container");
    __publicField(this, "plugin");
    Object.assign(this, { title, description, container, plugin });
  }
  /**
   * Create default controller wrapper with title and description elements
   * which may be added to by the `createController` method of extended
   * classes.
   *
   * @returns Wrapper containing title and description elements of controller.
   */
  createWrapper() {
    const title = document.createElement("div");
    title.appendChild(document.createTextNode(this.title));
    title.classList.add("symlink-setting-title");
    const description = document.createElement("div");
    description.appendChild(document.createTextNode(this.description));
    const wrapper = document.createElement("div");
    wrapper.classList.add("symlink-setting-controller");
    wrapper.append(title, description);
    return wrapper;
  }
  /**
   * Create controller element required for viewing and updating a given
   * plugin setting in the settings tab. For each type of setting controller
   * implemented by extended classes (dropdowns, toggles etc.), the extended
   * class must implement this template method.
   *
   * @returns Div with elements for viewing and updating plugin settings.
   */
  createController() {
    return this.createWrapper();
  }
  /**
   * Call `createController` method (implemented by each extended class), and
   * mount returned element to parent settings tab container.
   */
  mount() {
    this.container.appendChild(this.createController());
  }
};

// src/settings/controllers/Dropdown.ts
var import_obsidian2 = require("obsidian");

// src/settings/controllers/List.ts
var path = __toESM(require("path"), 1);
var import_obsidian = require("obsidian");
var SymlinkSettingListController = class extends SymlinkSettingController {
  /**
   * Call super, and assign class properties from provided arguments.
   *
   * @param obj - Class properties required for controller and super.
   * @param obj.title - Title string for rendering controller.
   * @param obj.description - Description string for rendering controller.
   * @param obj.container - Container to append controller to when mounting.
   * @param obj.plugin - Current instance of symlink obsidian plugin.
   * @param obj.input - Name and description shown next to input field.
   * @param obj.setting - Symlink setting key which class instance controls.
   */
  constructor({ title, description, container, plugin, input, setting }) {
    super({ title, description, container, plugin });
    // Class properties set in constructor using object assign.
    __publicField(this, "input");
    __publicField(this, "setting");
    __publicField(this, "settingSet");
    __publicField(this, "list");
    // Class properties *not* set in constructor.
    __publicField(this, "pathname");
    __publicField(this, "button");
    Object.assign(this, { input, setting });
    this.settingSet = new Set(this.plugin.settings[this.setting]);
    this.list = this.createList();
    for (const pathname of this.plugin.settings[this.setting]) {
      const item = this.createListItem(pathname);
      this.list.appendChild(item);
    }
  }
  /**
   * Create controller wrapper element with title and description elements,
   * and a list of existing settings.
   *
   * @returns Controller wrapper element.
   */
  createWrapper() {
    const wrapper = super.createWrapper();
    wrapper.appendChild(this.list);
    return wrapper;
  }
  /**
   * Create list setting controller rendering name and description of setting,
   * an input field for new settings, and a list of existing settings above
   * the dropdown.
   *
   * @returns Div with elements for viewing and updating plugin settings.
   */
  createController() {
    const wrapper = this.createWrapper();
    new import_obsidian.Setting(wrapper).setName(this.input.name).setDesc(this.input.
    description).addText((textComponent) => {
      textComponent.setPlaceholder("Enter directory name...").onChange((textValue) => {
        this.pathname = textValue ? (0, import_obsidian.normalizePath)(textValue) :
        void 0;
        this.updateButton();
      });
    }).addButton((buttonComponent) => {
      this.button = buttonComponent;
      this.updateButton();
      buttonComponent.setButtonText("Add").onClick(async () => {
        await this.mountListItem();
      });
    });
    return wrapper;
  }
  /**
   * Create wrapper element for list of existing settings.
   *
   * @returns Wrapper element for list of existing settings.
   */
  createList() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("symlink-setting-list");
    return wrapper;
  }
  /**
   * Create list item element with span of existing setting pathname, and a
   * delete icon for removing each setting from the list and deleting it form
   * the stored plugin settings.
   *
   * @param pathname - Pathname which will be in the span of the list item.
   * @returns List item div.
   */
  createListItem(pathname = this.pathname) {
    const pathnameSpan = document.createElement("span");
    pathnameSpan.classList.add("mobile-option-setting-item-name");
    pathnameSpan.appendChild(document.createTextNode(pathname));
    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add(
      "clickable-icon",
      "mobile-option-setting-item-option-icon"
    );
    deleteIcon.setAttribute("aria-label", "Delete");
    (0, import_obsidian.setIcon)(deleteIcon, "x");
    const wrapper = document.createElement("div");
    wrapper.classList.add("mobile-option-setting-item");
    wrapper.append(pathnameSpan, deleteIcon);
    deleteIcon.addEventListener("click", async () => {
      this.settingSet.delete(pathname);
      this.plugin.settings[this.setting] = Array.from(this.settingSet);
      await this.plugin.saveSettings().then(() => {
        wrapper.remove();
        this.updateButton();
        this.plugin.updateRepos();
        this.plugin.highlightTree();
      });
    });
    return wrapper;
  }
  /**
   * Update local and plugin settings with pathname in input field. Save this
   * new setting to disk, and then create and mount a new item to the list of
   * existing settings.
   */
  async mountListItem() {
    const shouldMount = this.shouldMount();
    if (!shouldMount) {
      return;
    }
    this.settingSet.add(this.pathname);
    this.plugin.settings[this.setting] = Array.from(this.settingSet);
    await this.plugin.saveSettings().then(() => {
      const item = this.createListItem();
      this.list.appendChild(item);
      this.updateButton();
      this.plugin.updateRepos();
      this.plugin.highlightTree();
    });
  }
  /**
   * Determine if a given new setting should be saved and mounted to the list
   * element. A setting should not be mounted if it is either invalid, or if
   * the setting already exists in the user settings array.
   *
   * @returns Boolean reflecting if setting should be added to existing list.
   */
  shouldMount() {
    return !this.getButtonTooltip();
  }
  /**
   * Updates tooltip and class names for styling of controller `add` button.
   */
  updateButton() {
    if (!this.button) {
      return;
    }
    this.button.buttonEl.removeClasses([
      "symlink-enabled-button",
      "symlink-disabled-button"
    ]);
    const tooltip = this.getButtonTooltip();
    this.button.setTooltip(tooltip);
    if (tooltip) {
      this.button.setClass("symlink-disabled-button");
    } else {
      this.button.setClass("symlink-enabled-button");
    }
  }
  /**
   * Get tooltip string for setting `add` button. If the setting is valid
   * (i.e. if it is a valid path string, and does not already exist in the
   * user settings array for this setting), then <empty string> will be
   * returned. Obsidian `setTooltip` method on an element will not render
   * anything to the user if the tooltip is <empty string>.
   *
   * @returns Tooltip string.
   */
  getButtonTooltip() {
    let tooltip = "";
    if (!this.pathname) {
      tooltip = "Enter path";
    } else if (this.settingSet.has(this.pathname)) {
      tooltip = "Already exists";
    } else if (path.extname(this.pathname)) {
      tooltip = "Enter a valid directory, not a path to a file";
    }
    return tooltip;
  }
};

// src/settings/controllers/Dropdown.ts
var SymlinkSettingDropdownController = class extends SymlinkSettingListController {
  /**
   * Call super, and assign class properties from provided arguments.
   *
   * @param obj - Class properties required for controller and super.
   * @param obj.title - Title string for rendering controller.
   * @param obj.description - Description string for rendering controller.
   * @param obj.container - Container to append controller to when mounting.
   * @param obj.plugin - Current instance of symlink obsidian plugin.
   * @param obj.input - Name and description shown next to input field.
   * @param obj.setting - Symlink setting key which class instance controls.
   * @param obj.options - Obsidian dropdown options array for setting values.
   */
  constructor({ title, description, container, plugin, input, setting, options }) {
    super({ title, description, container, plugin, input, setting });
    // Class properties set in constructor using object assign.
    __publicField(this, "options");
    Object.assign(this, { options });
  }
  /**
   * Create dropdown setting controller rendering name and description of
   * setting, a dropdown with available settings, and a list of existing
   * settings above the dropdown.
   *
   * @returns Div with elements for viewing and updating plugin settings.
   */
  createController() {
    var _a;
    const wrapper = this.createWrapper();
    this.pathname = (_a = this.options[0]) == null ? void 0 : _a.value;
    new import_obsidian2.Setting(wrapper).setName(this.input.name).setDesc(this.
    input.description).addDropdown((dropdownComponent) => {
      for (const option of this.options) {
        dropdownComponent.addOption(option.value, option.display);
      }
      dropdownComponent.onChange((dropdownValue) => {
        this.pathname = dropdownValue;
        this.updateButton();
      });
    }).addButton((buttonComponent) => {
      this.button = buttonComponent;
      this.updateButton();
      buttonComponent.setButtonText("Add").onClick(async () => {
        await this.mountListItem();
      });
    });
    return wrapper;
  }
};

// src/settings/controllers/Toggle.ts
var import_obsidian3 = require("obsidian");
var SymlinkSettingToggleController = class extends SymlinkSettingController {
  /**
   * Call super, and assign class properties from provided arguments.
   *
   * @param obj - Class properties required for controller and super.
   * @param obj.title - Title string for rendering controller.
   * @param obj.description - Description string for rendering controller.
   * @param obj.container - Container to append controller to when mounting.
   * @param obj.plugin - Current instance of symlink obsidian plugin.
   * @param obj.input - Name and description shown next to input field.
   * @param obj.setting - Symlink setting key which class instance controls.
   */
  constructor({ title, description, container, plugin, input, setting }) {
    super({ title, description, container, plugin });
    // Class properties set in constructor using object assign.
    __publicField(this, "input");
    __publicField(this, "setting");
    Object.assign(this, { input, setting });
  }
  /**
   * Create toggle setting controller rendering name and description of
   * setting, and a toggle reflecting current state of setting.
   *
   * @returns Div with elements for viewing and updating plugin settings.
   */
  createController() {
    const wrapper = this.createWrapper();
    let isToggled = this.plugin.settings[this.setting];
    new import_obsidian3.Setting(wrapper).setName(this.input.name).setDesc(this.
    input.description).addToggle((toggleComponent) => {
      toggleComponent.setValue(isToggled).onChange(async (toggleValue) => {
        isToggled = toggleValue;
        this.plugin.settings[this.setting] = isToggled;
        await this.plugin.saveSettings().then(() => {
          this.plugin.updateRepos();
          this.plugin.highlightTree();
        });
      });
    });
    return wrapper;
  }
};

// src/settings/Tab.ts
var SymlinkSettingsTab = class extends import_obsidian4.PluginSettingTab {
  /**
   * Call obsidian plugin tab super, and set class property reference to the
   * current instance of the symlink plugin.
   *
   * @param app - Instance of obsidian app passed to settings tab manager.
   * @param plugin - Instance of plugin passed to settings tab manager.
   */
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "plugin");
    this.plugin = plugin;
  }
  /**
   * Render required symlink settings controllers to settings tab container.
   */
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const repos = this.plugin.getRepos().map((pathname) => {
      return { value: pathname, display: pathname };
    });
    new SymlinkSettingListController({
      title: "",
      description: "",
      container: containerEl,
      plugin: this.plugin,
      input: {
        name: "Ignored directory paths",
        description: "Directories which will be ignored when                 sym\
linking a repository. All paths are relative to the root of                 each\
 repository. See existing list above."
      },
      setting: "repositoryDirIgnore"
    }).mount();
    new SymlinkSettingListController({
      title: "",
      description: "",
      container: containerEl,
      plugin: this.plugin,
      input: {
        name: "Symlinked directory paths",
        description: "Directories which will be directly linked when            \
     symlinking a repository. All paths are relative to the root of             \
    each repository. See existing list above."
      },
      setting: "repositoryDirLink"
    }).mount();
    new SymlinkSettingDropdownController({
      title: "",
      description: "",
      container: containerEl,
      plugin: this.plugin,
      input: {
        name: "Blacklist repository paths",
        description: "Repositories which will be ignored when                 in\
dexing repositories for symlinking. All paths are relative                 to th\
e parent directory of this vault. See existing list                 above."
      },
      setting: "repositoryIgnore",
      options: repos
    }).mount();
    new SymlinkSettingDropdownController({
      title: "",
      description: "",
      container: containerEl,
      plugin: this.plugin,
      input: {
        name: "Whitelist repository paths",
        description: "Repositories which will be included when                 i\
ndexing repositories for symlinking. All paths are relative                 to t\
he parent directory of this vault. See existing list                 above."
      },
      setting: "repositoryInclude",
      options: repos
    }).mount();
    new SymlinkSettingToggleController({
      title: "",
      description: "",
      container: containerEl,
      plugin: this.plugin,
      input: {
        name: "Whitelist mode",
        description: "Should symlinked repositories be indexed based            \
     on the repository blacklist or whitelist?"
      },
      setting: "isWhitelist"
    }).mount();
    new SymlinkSettingToggleController({
      title: "",
      description: "",
      container: containerEl,
      plugin: this.plugin,
      input: {
        name: "Symlink on start",
        description: "Should repository symlinks be reloaded when               \
  starting obsidian, and or when reloading the window?"
      },
      setting: "shouldSymlinkOnStart"
    }).mount();
  }
};

// src/utils/setBackoff.ts
var setBackoff = (callback, condition, backoffMs, { maxRetries = Infinity, maxMs = Infinity } = {}, retries = 0, startMs = Date.
now()) => {
  retries++;
  if (condition()) {
    return callback();
  }
  if (retries > maxRetries || Date.now() - startMs > maxMs) {
    return;
  }
  setTimeout(() => setBackoff(
    callback,
    condition,
    backoffMs,
    { maxRetries, maxMs },
    retries,
    startMs
  ), backoffMs(retries));
};
var setLinearBackoff = (callback, condition, { startMs = 10, maxRetries = Infinity,
maxMs = Infinity } = {}) => {
  const backoffMs = (retries) => startMs * (1 + retries);
  return setBackoff(callback, condition, backoffMs, { maxRetries, maxMs });
};

// src/main.ts
var Symlink = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "vaultDirname");
    __publicField(this, "localDirname");
    __publicField(this, "settings");
    __publicField(this, "repos");
    __publicField(this, "filteredRepos");
    __publicField(this, "fileTree");
    __publicField(this, "fileTreeObserver");
  }
  /**
   * Setup plugin.
   */
  async onload() {
    this.vaultDirname = this.app.vault.adapter.basePath;
    this.localDirname = path2.join(this.vaultDirname, "../");
    await this.loadSettings();
    this.addSettingTab(new SymlinkSettingsTab(this.app, this));
    this.updateRepos();
    this.addRibbonIcon("folder-symlink", "Symlink repositories", () => {
      this.symlinkRepos();
    });
    this.addCommand({
      id: "obsidian-symlink-repos",
      name: "Symlink repositories",
      callback: () => this.symlinkRepos()
    });
    this.app.workspace.onLayoutReady(() => {
      this.watchTree();
      if (this.settings.shouldSymlinkOnStart) {
        this.symlinkRepos();
      }
    });
  }
  /**
   * Clean up DOM event listeners etc. when the plugin is unloaded. Also save
   * current settings to ensure that the saved settings are synced.
   */
  async onunload() {
    this.unwatchTree();
    await this.saveSettings();
  }
  /**
   * Load settings from plugin data.json file.
   */
  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }
  /**
   * Save settings to plugin data.json file.
   */
  async saveSettings() {
    await this.saveData(this.settings);
  }
  /**
   * Get all available repos from the parent directory of this vault, and
   * update filtered repos based on current user settings.
   */
  updateRepos() {
    this.repos = this.getRepos();
    this.filteredRepos = this.filterRepos();
  }
  /**
   * Index all repository directories within the parent directory of this
   * vault.
   *
   * @param dirname - Parent directory in which to look for git repositories.
   * @returns Array of relative paths from parent directory of this vault to
   *      all repositories found within that directory.
   */
  getRepos(dirname = this.localDirname) {
    const repos = [];
    for (const pathname of fs.readdirSync(dirname)) {
      const absolutePath = path2.join(dirname, pathname);
      if (!fs.existsSync(absolutePath)) {
        continue;
      }
      if (fs.statSync(absolutePath).isFile()) {
        continue;
      }
      if (fs.existsSync(`${absolutePath}/.git`)) {
        repos.push(path2.relative(this.localDirname, absolutePath));
        continue;
      }
      repos.push(...this.getRepos(absolutePath));
    }
    return repos;
  }
  /**
   * Filter indexed repositories based on user settings of repository paths
   * which should be explicitly included/ignored, and based on if whitelist
   * mode is activated.
   *
   * @returns Filtered array of indexed repositories.
   */
  filterRepos() {
    const filteredRepos = [];
    for (const repo of this.repos) {
      if (this.settings.isWhitelist) {
        if (this.settings.repositoryInclude.includes(repo)) {
          filteredRepos.push(repo);
        }
      } else if (!this.settings.repositoryIgnore.includes(repo)) {
        filteredRepos.push(repo);
      }
    }
    return filteredRepos;
  }
  /**
   * Index all markdown files in a given repository, observing the directory
   * ignore list fetched from user settings.
   *
   * @param repo - Relative path to root of repository from parent directory
   *      of this vault.
   * @param searchVault - Should files be indexed from actual repository, or
   *      from the existing symlinked version contained in the vault.
   * @param relativeDirname - Child directory of repository being recursed.
   * @returns Array of markdown file paths relative to root of repository.
   */
  getRepoFiles(repo, searchVault = false, relativeDirname = "") {
    const absoluteDirname = path2.join(
      searchVault ? this.vaultDirname : this.localDirname,
      repo,
      relativeDirname
    );
    const files = [];
    if (!fs.existsSync(absoluteDirname)) {
      return files;
    }
    for (const pathname of fs.readdirSync(absoluteDirname)) {
      const absolutePath = path2.join(absoluteDirname, pathname);
      const relativePath = path2.join(relativeDirname, pathname);
      if (fs.statSync(absolutePath).isFile()) {
        if (path2.extname(absolutePath) === ".md") {
          files.push(relativePath);
        }
        continue;
      }
      let shouldIgnore = false;
      for (const pathname2 of this.settings.repositoryDirIgnore) {
        if (relativePath.includes(pathname2)) {
          shouldIgnore = true;
          break;
        }
      }
      if (shouldIgnore) {
        continue;
      }
      files.push(...this.getRepoFiles(repo, searchVault, relativePath));
    }
    return files;
  }
  /**
   * Refresh vault repo symlinks according to user settings. New repos which
   * should be included will be directly added, existing symlinked vault repos
   * which should be removed will be deleted from the vault, and existing
   * symlinked vault repos which should be kept will be updated.
   */
  symlinkRepos() {
    this.updateRepos();
    const tracer = {
      deletedPaths: /* @__PURE__ */ new Set(),
      cacheDeletedPaths: /* @__PURE__ */ new Set(),
      isComplete: false,
      get isEqual() {
        return this.deletedPaths.size === this.cacheDeletedPaths.size && [...this.
        deletedPaths].every((pathname) => {
          return this.cacheDeletedPaths.has(pathname);
        });
      }
    };
    const event = this.app.vault.on("delete", (file) => {
      tracer.cacheDeletedPaths.add(file.path);
      if (tracer.isComplete && tracer.isEqual) {
        this.app.vault.offref(event);
      }
    });
    for (const repo of this.repos) {
      for (const pathname of this.deleteVaultRepo(repo)) {
        tracer.deletedPaths.add(pathname);
      }
    }
    tracer.isComplete = true;
    setLinearBackoff(
      () => {
        for (const repo of this.filteredRepos) {
          this.symlinkRepo(repo);
        }
      },
      () => tracer.isComplete && tracer.isEqual,
      { maxMs: 10 * 1e3 }
    );
  }
  /**
   * Symlink a specific vault repository.
   *
   * @param repo - Relative path to requested repo from the parent directory
   *      of the vault.
   */
  symlinkRepo(repo) {
    this.addVaultRepo(repo);
    for (const dir of this.settings.repositoryDirLink) {
      this.symlinkRepoDirectory(repo, dir);
    }
    const files = this.getRepoFiles(repo);
    for (const file of files) {
      this.symlinkRepoFile(repo, file);
    }
  }
  /**
   * Remove a specific vault directory.
   *
   * @param repo - Relative path to requested repo from the parent directory
   *      of the vault.
   * @returns Array of deleted resources (paths of files and directories).
   */
  deleteVaultRepo(repo) {
    let vaultPath = path2.join(this.vaultDirname, repo);
    const deletedPaths = [];
    const walkRepo = (relativePath) => {
      const absolutePath = path2.join(this.vaultDirname, relativePath);
      const paths = [relativePath];
      if (fs.statSync(absolutePath).isFile()) {
        return paths;
      }
      const subPathnames = fs.readdirSync(absolutePath);
      for (const pathname of subPathnames) {
        paths.push(...walkRepo(path2.join(relativePath, pathname)));
      }
      return paths;
    };
    if (fs.existsSync(vaultPath)) {
      deletedPaths.push(...walkRepo(repo));
      fs.rmSync(vaultPath, { recursive: true, force: true });
    }
    while (repo) {
      repo = repo.replace(/(\/|^)[^/]*\/?$/, "");
      vaultPath = path2.join(this.vaultDirname, repo);
      if (!fs.existsSync(vaultPath)) {
        continue;
      }
      if (!fs.readdirSync(vaultPath).length) {
        deletedPaths.push(repo);
        fs.rmdirSync(vaultPath);
      }
    }
    return deletedPaths;
  }
  /**
   * Add a specific vault directory.
   *
   * @param repo - Relative path to requested repo from the parent directory
   *      of the vault.
   */
  addVaultRepo(repo) {
    const vaultPath = path2.join(this.vaultDirname, repo);
    if (!fs.existsSync(vaultPath)) {
      fs.mkdirSync(vaultPath, { recursive: true });
    }
  }
  /**
   * Symlink an entire subdirectory of a given repo into the vault repo.
   *
   * @param repo - Relative path to requested repo from the parent directory
   *      of the vault.
   * @param dir - Relative path to requested directory from the root of the
   *      given repository.
   */
  symlinkRepoDirectory(repo, dir) {
    const target = path2.join(this.localDirname, repo, dir);
    if (!fs.existsSync(target)) {
      return;
    }
    const destination = path2.join(this.vaultDirname, repo, dir);
    const parentPath = path2.join(destination, "../");
    if (!fs.existsSync(parentPath)) {
      fs.mkdirSync(parentPath, { recursive: true });
    }
    if (fs.existsSync(destination)) {
      fs.rmdirSync(destination);
    }
    fs.symlinkSync(target, destination);
  }
  /**
   * Symlink a specific file from a given repo into the vault repo.
   *
   * @param repo - Relative path to requested repo from the parent directory
   *      of the vault.
   * @param file - Relative path to requested file from the root of the given
   *      repository.
   */
  symlinkRepoFile(repo, file) {
    const target = path2.join(this.localDirname, repo, file);
    if (!fs.existsSync(target)) {
      return;
    }
    let shouldIgnore = false;
    for (const pathname of this.settings.repositoryDirLink) {
      if (file.includes(pathname)) {
        shouldIgnore = true;
        break;
      }
    }
    if (shouldIgnore) {
      return;
    }
    const destination = path2.join(this.vaultDirname, repo, file);
    const parentPath = path2.join(destination, "../");
    if (!fs.existsSync(parentPath)) {
      fs.mkdirSync(parentPath, { recursive: true });
    }
    if (fs.existsSync(destination)) {
      fs.rmSync(destination);
    }
    fs.symlinkSync(target, destination);
  }
  /**
   * Watch file tree container in nav, and highlight the tree on any change
   * with appropriate additional icons to reflect if the file tree item is
   * a symlinked resource.
   */
  watchTree() {
    const tree = document.querySelector(".nav-files-container");
    if (!tree) {
      return;
    }
    this.fileTree = tree;
    this.highlightTree();
    const options = { childList: true, subtree: true };
    this.fileTreeObserver = new MutationObserver((mutations) => {
      let shouldHighlight = false;
      DATA_PATH_MUTATION:
        for (const mutation of mutations) {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node.querySelector("[data-path]")) {
              shouldHighlight = true;
              break DATA_PATH_MUTATION;
            }
          }
        }
      if (shouldHighlight) {
        this.fileTreeObserver.disconnect();
        this.highlightTree();
        this.fileTreeObserver.observe(this.fileTree, options);
      }
    });
    this.fileTreeObserver.observe(this.fileTree, options);
  }
  /**
   * Dispose of mutation observer on file tree element.
   */
  unwatchTree() {
    if (this.fileTreeObserver) {
      this.fileTreeObserver.disconnect();
    }
  }
  /**
   * Recursively highlight nav file tree with additional icons to indicate if
   * the file tree item is a symlinked file, a symlinked directory, a tracked
   * repository, or an untracked repository which will be removed on the next
   * symlink refresh.
   *
   * @param tree - Parent or nested nav tree container element.
   */
  highlightTree(tree = this.fileTree) {
    var _a;
    if (!tree) {
      return;
    }
    for (const child of Array.from(tree.children)) {
      this.highlightTree(child);
    }
    const dataPath = tree.getAttribute("data-path");
    if (!dataPath) {
      return;
    }
    const absolutePath = path2.join(this.vaultDirname, dataPath);
    if (!fs.existsSync(absolutePath)) {
      return;
    }
    const isFile = fs.statSync(absolutePath).isFile();
    const isSymlink = fs.lstatSync(absolutePath).isSymbolicLink();
    let shouldHighlight = false;
    let isSymlinkChild = false;
    let isIgnored = false;
    let isLinked = true;
    for (const repo of this.filteredRepos) {
      if (dataPath.startsWith(repo)) {
        shouldHighlight = true;
        isLinked = this.settings.repositoryDirLink.includes(
          path2.relative(repo, dataPath)
        );
        isIgnored = this.settings.repositoryDirIgnore.includes(
          path2.relative(repo, dataPath)
        );
        for (const link of this.settings.repositoryDirLink) {
          if (dataPath.startsWith(path2.join(repo, link))) {
            isSymlinkChild = true;
            break;
          }
        }
        break;
      }
    }
    const icon = tree.querySelector(".tree-symlink-icon") || document.createElement(
    "div");
    icon.classList.add("tree-item-icon", "tree-symlink-icon");
    (_a = icon.querySelector("svg")) == null ? void 0 : _a.remove();
    if (isFile && isSymlink && shouldHighlight) {
      (0, import_obsidian5.setIcon)(icon, "file-symlink");
    } else if (isFile && !isSymlinkChild && shouldHighlight) {
      (0, import_obsidian5.setIcon)(icon, "alert-circle");
      icon.style.color = "var(--color-orange)";
    } else if (isSymlink && shouldHighlight) {
      (0, import_obsidian5.setIcon)(icon, "folder-symlink");
      if (!isLinked) {
        icon.style.color = "var(--color-orange)";
      }
    } else if (isIgnored && shouldHighlight) {
      (0, import_obsidian5.setIcon)(icon, "alert-circle");
      icon.style.color = "var(--color-orange)";
    } else {
      if (this.filteredRepos.includes(dataPath)) {
        (0, import_obsidian5.setIcon)(icon, "check-circle-2");
        icon.style.color = "var(--color-green)";
      } else if (this.repos.includes(dataPath)) {
        (0, import_obsidian5.setIcon)(icon, "alert-circle");
        icon.style.color = "var(--color-orange)";
      }
    }
    tree.appendChild(icon);
  }
};
var main_default = Symlink;
