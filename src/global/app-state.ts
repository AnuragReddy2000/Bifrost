import { createStore } from "@stencil/store";
import { randomString } from "../helpers/utils";

interface AppState{
    darkmode: boolean;
    username: string;
    avatar: string;
    path: string;
    deviceWidth: number;
    deviceHeight: number;
}

const defaultDarkMode = window.localStorage.getItem('darkmode') ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultUserName = window.localStorage.getItem('username') ?? "user-"+String(Math.floor(100000 + Math.random() * 900000));
const defaultAvatar = window.localStorage.getItem('avatar') ?? randomString();

window.localStorage.setItem('darkmode', String(defaultDarkMode));
window.localStorage.setItem('username', defaultUserName);
window.localStorage.setItem('avatar', defaultAvatar);

const { state, onChange } = createStore<AppState>({
    darkmode: (defaultDarkMode==="true"),
    username: defaultUserName,
    avatar: defaultAvatar,
    path: window.location.pathname,
    deviceWidth: window.innerWidth,
    deviceHeight: window.innerHeight
});

onChange("darkmode", value => {
    window.localStorage.setItem('darkmode', String(value));
    document.body.classList.toggle('dark', value);
});

onChange("username", value => {
    window.localStorage.setItem('username', value);
});

onChange("avatar", value => {
    window.localStorage.setItem('avatar', value);
});

window.addEventListener("resize", function () {
    if(state.deviceWidth !== window.innerWidth){
        state.deviceWidth = window.innerWidth;
    }
    if(state.deviceHeight !== window.innerHeight){
        state.deviceHeight = window.innerHeight;
    }
});

export default state;