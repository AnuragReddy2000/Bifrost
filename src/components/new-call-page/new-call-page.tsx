import { Component, h, State } from '@stencil/core';

@Component({
    tag: "new-call-page",
    styleUrl: "new-call-page.css"
})
export class NewCallPage {
    @State() roomName: string = "";

    render(){
        return(
            <div class="NewCallPageRoot">
                <ion-card class="DarkModeShadow MainPageCard">
                    <ion-card-content>
                        <div class="NewPageCardContent">
                            <ion-text color="primary"><h1><b>Enter a room name:</b></h1></ion-text>
                            <text-field value={this.roomName} onChangeCallback={(value)=>{this.roomName = value}}></text-field>
                            <ion-text class="NewPageCardContentLines">The room name will uniquely identify this call. You can share the name with others to enable them to join your call.</ion-text>
                            <ion-button class="NewPageCardContentLines" expand="block">
                                <ion-icon class="NewPageCardContentIcon" name="call"></ion-icon>
                                Start call
                            </ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
        )
    }
}