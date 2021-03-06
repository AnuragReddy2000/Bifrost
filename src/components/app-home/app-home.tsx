import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  navToPpage = (page: string) =>{
    let ionRouterElement = document.querySelector('ion-router');
    ionRouterElement.push(page);
  }
  
  render() {
    return (
      <div class="HomePageRoot">
        <ion-card class="DarkModeShadow MainPageCard">
          <ion-card-content>
            <div class="MainPageCardContent">
              <ion-row class="MainPageCardContentRow">
                <img src="./assets/logo-bifrost.png" height={100} alt="Bifrost logo"></img>
                <div class="MainPagecardTextBox">
                  <ion-text color="primary"><h1><b>Welcome to Bifrost!</b></h1></ion-text>
                  <ion-text color="medium"><p><b>A peer to peer secure voice call app</b></p></ion-text>
                </div>
              </ion-row>
              <ion-row class="MainPageCardContentRow">
                <ion-button expand="block" onClick={()=>{this.navToPpage("/start")}}>
                  <ion-icon class="MainPageButtonIcon" name="call" ></ion-icon>
                  <ion-text>Start a call</ion-text>
                </ion-button>
                <ion-button expand="block" onClick={()=>{this.navToPpage("/join")}}>
                  <ion-icon class="MainPageButtonIcon" name="enter" ></ion-icon>
                  <ion-text>Join a call</ion-text>
                </ion-button>
              </ion-row>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    );
  }
}

