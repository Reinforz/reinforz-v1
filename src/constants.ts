import { OptionsObject } from "notistack";

export const REINFORZ_GLOBAL_SETTINGS_LS_KEY = 'reinforz.global.settings';
export const REINFORZ_PLAY_SETTINGS_LS_KEY = 'reinforz.play.settings';
export const REINFORZ_REPORT_SETTINGS_LS_KEY = 'reinforz.report.settings';
export const REINFORZ_REPO_URL = 'https://github.com/Devorein/reinforz';
export const REINFORZ_DOCS_URL = 'https://docs.reinforz.xyz';
// IS: Ignore Space, IC: Ignore Case
// TODO: Add modifier IP: Ignore pluralization
export const VALID_MODIFIERS = new Set(["IS", "IC"])
export const MAX_QUESTION_TIME = 120;
export const MIN_QUESTION_TIME = 10;
export const NUMBER_OPERATORS = ["=", "<=", "<>", ">=", "<", ">", "!", "><"] as const;

export const NotistackOptions = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject;