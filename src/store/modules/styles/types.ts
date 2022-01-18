export type CHANGE_THEME_TYPE = 'change-theme';
export type SUPPORTED_THEMES = 'theme-default' | 'theme-dark';

export const CHANGE_THEME: CHANGE_THEME_TYPE = 'change-theme';
export const DEFAULT_THEME: SUPPORTED_THEMES = "theme-default";

export interface StyleAction {
    payload: SUPPORTED_THEMES,
    type: CHANGE_THEME_TYPE;
}