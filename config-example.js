//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  //backgroundImg: "NONE", //background can be "NONE" or a URL.
  userName: "User Name", //Specify the user name to be displayed
  // avatarImg: "/images/Profile_avatar_placeholder_large.png", //Specify the avatar image URL
  hint: "Enter your PIN to access the system", //Specify a hint message to be displayed
  // endScreenVideo: "", //Specify a video URL to be played in the end screen

  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};
