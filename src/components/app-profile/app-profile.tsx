import { toastController } from '@ionic/core';
import { Component, h, State } from '@stencil/core';
import globalState from '../../global/app-state';
import { randomString } from '../../helpers/utils';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true
})
export class AppProfile {
  randomizeAvatar = () => {
    this.avatar = randomString();
  }

  saveChanges = async () => {
    if(this.username !== ""){
      globalState.username = this.username;
      globalState.avatar = this.avatar;
      let toast = await toastController.create({
        message: 'Sucessfully saved!',
        duration: 2000,
        color:"success"
      });
      toast.present();
    }
    else{
      let toast = await toastController.create({
        message: 'Please provide a display name!',
        duration: 2000,
        color: "danger"
      });
      toast.present();
    }
  }

  @State() username: string = globalState.username;
  @State() avatar: string = globalState.avatar;

  render() {
    return [
      <div class="ProfilePageRoot">
        <ion-card class="DarkModeShadow MainPageCard">
          <ion-card-content >
            <div class="ProfilePageCardCol">
              <ion-text class="ProfilePageHeader" color="primary"><h1><b>User Profile</b></h1></ion-text>
              <div class="ProfilePageAvatarEdit">
                  <img height="150" src={"https://avatars.dicebear.com/api/gridy/" +this.avatar + ".svg"} alt="User Avatar"></img>
                  <ion-fab-button color={globalState.darkmode ? "primary" : "light"} class="ProfilePageAvatarFAB DarkModeShadow" size="small" onClick={this.randomizeAvatar}>
                    <ion-icon name="refresh-outline"></ion-icon>
                  </ion-fab-button>
                </div>
                <div class="ProfilePageNameEdit">
                  <text-field value={this.username} onChangeCallback={(value: string)=>{this.username = value}}></text-field>
                </div>
              <ion-button onClick={this.saveChanges} expand="block">
                <ion-icon class="MainPageButtonIcon" name="save"></ion-icon>
                Save Changes
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    ];
  }
}
