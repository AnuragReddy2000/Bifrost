import { Component, h} from '@stencil/core';
import globalState from '../../global/app-state';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {

  componentWillRender(){
    if(globalState.darkmode == true){
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode = () => {
    globalState.darkmode = !globalState.darkmode;
  }

  render() {
    return [
      <ion-header class="HeaderBorder">
        <ion-toolbar >
          <ion-title size="large"><ion-router-link href="/" color={globalState.darkmode ? "light": "dark"} routerDirection="root"><ion-text ><h3>Bifrost</h3></ion-text></ion-router-link> </ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={this.toggleDarkMode} shape={globalState.deviceWidth > 500 ? null : "round"}>
              <ion-icon class="tabIcon" name={globalState.darkmode ? "sunny": "moon"} size={globalState.deviceWidth > 500 ? "small" : "large"} ></ion-icon>
              {globalState.deviceWidth > 500 ? <ion-text>{globalState.darkmode ? "light" : "dark"} mode</ion-text>: null}
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button shape={globalState.deviceWidth > 500 ? null : "round"} href="/profile" disabled={globalState.path==="/profile"}>
              <ion-icon class="tabIcon" src={"https://avatars.dicebear.com/api/gridy/" + globalState.avatar + ".svg"} size={ "large"}></ion-icon>
              {globalState.deviceWidth > 500 ? <ion-text>{globalState.username}</ion-text> : null}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    ];
  }

}
