import type { SymlinkSettings } from "../types"

const DEFAULT_SETTINGS: SymlinkSettings = {
	repositoryDirIgnore: ["node_modules", ".git"],
    repositoryDirLink: ["docs"],
    repositoryIgnore: [],
    repositoryInclude: [],
    isWhitelist: true
}

// @exports
export { DEFAULT_SETTINGS }