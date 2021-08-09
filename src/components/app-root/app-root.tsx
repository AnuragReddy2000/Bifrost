import { Component, h } from '@stencil/core';
import globalState from '../../global/app-state';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  changeGlobalPath = (newPath: string) => {
    globalState.path = newPath;
    return true;
  }

  render() {
    return (
      <ion-app>
        <app-header></app-header>
        <ion-content class="ion-padding">
          <div class="PageBackground">
            <ion-router useHash={false}>
              <ion-route url="/" component="app-home" beforeEnter={()=>this.changeGlobalPath("/")}/>
              <ion-route url="/profile" component="app-profile" beforeEnter={()=>this.changeGlobalPath("/profile")}/>
            </ion-router>
            <ion-nav />
          </div>
        </ion-content>
      </ion-app>
    );
  }
}
