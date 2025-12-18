export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  avatarImg: "/images/avatar.png",
  backgroundImg: "/images/bg-screen.png",
};

export const THEMES = {
  BASIC: "BASIC",
  FUTURISTIC: "FUTURISTIC",
  STANDARD: "STANDARD",
  RETRO: "RETRO",
};

export const THEME_ASSETS = {
  [THEMES.RETRO]: {},
  [THEMES.STANDARD]: {
    backgroundImg: "/images/bg-screen.png",
  },
  [THEMES.FUTURISTIC]: {},
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};
export const MAIN_SCREEN = "MAIN_SCREEN";
export const END_SCREEN = "END_SCREEN";