import { createStore } from "@stencil/store";

interface AppState{
    darkmode: boolean;
    username: string | undefined;
    deviceWidth: number;
    deviceHeight: number;
}

const { state } = createStore<AppState>({
    darkmode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    username: undefined,
    deviceWidth: window.innerWidth,
    deviceHeight: window.innerHeight
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