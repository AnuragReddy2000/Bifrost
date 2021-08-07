import { Component, h} from '@stencil/core';
import globalState from '../../global/app-state';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {

  toggleDarkMode = () => {
    globalState.darkmode = !globalState.darkmode;
    document.body.classList.toggle('dark', globalState.darkmode);
  }

  render() {
    return [
      <ion-header class="DarkModeShadow">
        <ion-toolbar >
          <ion-title size="large"><ion-text color="primary"><h3>Bifrost</h3></ion-text> </ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={this.toggleDarkMode} slot={globalState.deviceWidth > 500 ? "buton" : "icon-only"}>
              <ion-icon class="tabIcon" name={globalState.darkmode ? "sunny": "moon"} size={globalState.deviceWidth > 500 ? "small" : "large"} ></ion-icon>
              {globalState.deviceWidth > 500 ? <ion-text>{globalState.darkmode ? "light" : "dark"} mode</ion-text>: null}
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button slot={globalState.deviceWidth > 500 ? "buton" : "icon-only"}>
              <ion-icon class="tabIcon" name="person-circle" size={globalState.deviceWidth > 500 ? "small" : "large"}></ion-icon>
              {globalState.deviceWidth > 500 ? <ion-text>User</ion-text> : null}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    ];
  }

}
