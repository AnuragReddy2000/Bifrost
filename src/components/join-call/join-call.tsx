import { Component, h, State } from '@stencil/core';

@Component({
    tag: "join-call",
    styleUrl: "join-call.css"
})
export class JoinCall{
    @State() callcode: string;

    render(){
        return(
            <div class="NewCallPageRoot">
                <ion-card class="DarkModeShadow MainPageCard">
                    <ion-card-content>
                        <div class="NewPageCardContent">
                            <ion-text color="primary"><h1><b>Join a call:</b></h1></ion-text>
                            <text-field value={this.callcode} onChangeCallback={(value)=>{this.callcode=value}}></text-field>
                            <ion-text class="NewPageCardContentLines">Please enter the call code shared with you to join the call.</ion-text>
                            <ion-button class="NewPageCardContentLines" expand="block" href={"/call/"+this.callcode} disabled={this.callcode===undefined || this.callcode===""}>
                                <ion-icon class="NewPageCardContentIcon" name="enter"></ion-icon>
                                Join
                            </ion-button>
                        </div>
                    </ion-card-content>
                </ion-card>
            </div>
        )
    }
}