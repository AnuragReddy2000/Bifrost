import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  
  render() {
    return [
      <app-header></app-header>,
      <ion-content class="ion-padding MainPageContent">
        <div class="MainPageCenterContent">
          <ion-card class="DarkModeShadow MainPageCard">
            <ion-card-content>
              <div class="MainPageCardContent">
                <ion-row class="MainPageCardContentRow">
                  <img src="/assets/logo-bifrost.png" height={100}></img>
                  <div class="MainPagecardTextBox">
                    <ion-text color="primary"><h1>Welcome to Bifrost!</h1></ion-text>
                    <ion-text color="medium"><p>A peer to peer secure voice call app </p></ion-text>
                  </div>
                </ion-row>
                <ion-row class="MainPageCardContentRow">
                  <ion-button>Start a call</ion-button>
                  <ion-button>Join a call</ion-button>
                </ion-row>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>,
    ];
  }
}
