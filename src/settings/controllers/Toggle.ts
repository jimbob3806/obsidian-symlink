import { Setting } from "obsidian"

import { SymlinkSettingController } from "./Base"

import type { SymlinkSettings } from "../../types"
import type { Symlink } from "../../main"

class SymlinkSettingToggleController extends SymlinkSettingController {
    input: { name: string, description: string }
    setting: keyof Pick<SymlinkSettings, "isWhitelist">

    constructor(
        { title, description, container, plugin, input, setting }: {
            title: string,
            description: string,
            container: HTMLElement,
            plugin: Symlink,
            input: { name: string, description: string }
            setting: keyof Pick<SymlinkSettings, "isWhitelist">
    }) {
        super({ title, description, container, plugin })
        Object.assign(this, { input, setting })
        // container.appendChild(this.createController())
    }

    //
    createController(): HTMLDivElement {        
        //
        const wrapper = this.createWrapper()

        //
        let isToggled: boolean = this.plugin.settings[this.setting]
        new Setting(wrapper)
			.setName(this.input.name)
			.setDesc(this.input.description)
            .addToggle(toggle => {
                toggle.setValue(isToggled)
                    .onChange(async boolean => {
                        isToggled = boolean
                        this.plugin.settings[this.setting] = isToggled
                        await this.plugin.saveSettings().then(() => {
                            this.plugin.updateRepos()
                            this.plugin.highlightTree()
                        })
                    })
            })

        return wrapper
    }
}

export { SymlinkSettingToggleController }