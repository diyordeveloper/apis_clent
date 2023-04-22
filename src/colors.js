const LIGHT_THEME = {


    //colors={['#FCB540', '#FDBF5A']}
    //LOADING COLORS 
    LOADING_SCREEN_BACK_COLOR: '#ffffff',
    LOADER_IOS_COLOR: '#FCB540',
    LOADER_ANDROID_COLOR: '#ffffff',


    //NAVBAR COLORS
    NAVBAR_COLOR: 'transparent',
    NAV_TEXT_COLOR: '#ffffff',
    NAV_ICON_COLOR: '#ffffff',


    //PAGE COLORS
    SAFE_TOP_COLOR: '#fbfbfb',
    SAFE_BOTTOM_COLOR: '#fbfbfb',
    PAGE_BACK_COLOR: '#fbfbfb',
    PAGE_CONTENT_BACK_COLOR: '#fbfbfb',

    //TABBAR COLORS
    TABBAR_BACK_COLOR: '#ffffff',
    TABBAR_BORDER_COLOR: '#f9f9f9',

    TAB_ICON_INACTIVE_COLOR: '#acacac',
    TAB_ICON_ACTIVE_COLOR: '#ED6A5A',

    TAB_LABEL_INACTIVE_COLOR: '#acacac',
    TAB_LABEL_ACTIVE_COLOR: '#ED6A5A',

    BAR_STYLE: 'dark-content',
}


const DARK_THEME = {
    //LOADING COLORS 
    LOADING_SCREEN_BACK_COLOR: '#333333',
    LOADER_IOS_COLOR: '#ff9500',
    LOADER_ANDROID_COLOR: '#ffffff',


    //NAVBAR COLORS
    NAVBAR_COLOR: 'transparent',
    NAV_TEXT_COLOR: '#ffffff',
    NAV_ICON_COLOR: '#ffffff',


    //PAGE COLORS
    SAFE_TOP_COLOR: '#ffffff',
    SAFE_BOTTOM_COLOR: '#ffffff',
    PAGE_BACK_COLOR: '#fbfbfb',
    PAGE_CONTENT_BACK_COLOR: '#fbfbfb',

    //TABBAR COLORS
    TABBAR_BACK_COLOR: '#666666',
    TABBAR_BORDER_COLOR: '#777777',

    TAB_ICON_INACTIVE_COLOR: '#808080',
    TAB_ICON_ACTIVE_COLOR: '#ED6A5A',

    TAB_LABEL_INACTIVE_COLOR: '#808080',
    TAB_LABEL_ACTIVE_COLOR: '#ED6A5A',

    BAR_STYLE: 'light-content',
}



// let darkTheme = useDarkMode();
let darkTheme = false;



let COLORS = darkTheme === true ? DARK_THEME : LIGHT_THEME;


let SHADOW = {
    shadowColor: "#000",
    shadowOffset: {
        width: 5,
        height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
}

// eventEmitter.on('currentModeChanged', newMode => {
//     COLORS = (newMode == 'dark') ? DARK_THEME : LIGHT_THEME;
// })

export {
    COLORS,
    SHADOW
};