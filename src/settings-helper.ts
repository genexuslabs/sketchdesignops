import { Settings } from "sketch";
import { SettingKeys } from "./constants";
import { normalize, uuidv4 } from "./utils-new";

let currentActiveProjectName: string;

export function setCurrentProject(name: string) {
    currentActiveProjectName = name.replace('.', '-');
}

export interface SettingsData {

    projectId: string;
    projectName: string;
    userName: string;
    serverUrl: string;
}

export function getSettingsData(): SettingsData{
    return {
        projectId: normalize(Settings.settingForKey(SettingKeys.PROJECT_ID) || uuidv4() + '-' + currentActiveProjectName),
        userName: Settings.settingForKey(SettingKeys.PROJECT_USER_NAME) || '',
        serverUrl: Settings.settingForKey(SettingKeys.SERVER_URL),
        projectName: currentActiveProjectName
    }
}

