import { toastController } from '@ionic/core';
import { Component, h, State, Watch } from '@stencil/core';
import Peer from 'peerjs';
import randomWords from 'random-words';
import globalState from '../../global/app-state';
import { generateHash } from '../../helpers/utils';

@Component({
    tag: "new-call-page",
    styleUrl: "new-call-page.css"
})
export class NewCallPage {
    @State() roomName: string = randomWords({exactly: 2, maxLength: 4, join: "-"});
    @State() mute: boolean = false;
    @State() peer: Peer;
    @State() currentState: "INIT" | "WAITING" | "INCALL" = "INIT";
    @State() localStream: MediaStream;
    @State() remoteStream: MediaStream;

    onCallStart(){
        if(this.currentState === "INCALL"){
            const audio = (document.getElementById("bifrost-audio-stream") as HTMLAudioElement);
            audio.srcObject = this.remoteStream;
            audio.muted = false;
            console.log("remote");
            console.log(this.remoteStream);
        }
    }

    randomizeRoomName = () => {
        this.roomName = randomWords({exactly: 2, maxLength: 4, join: "-"});
    }

    copyToClipboard = async () => {
        const currentUrl = location.href;
        try{
            await navigator.clipboard.writeText(currentUrl.replace("/start", "/call/"+this.roomName));
            let toast = await toastController.create({
                message: 'Sucessfully copied to the cipboard!',
                duration: 2000,
                color:"success"
            });
            toast.present();
        }
        catch{
            let toast = await toastController.create({
                message: 'Failed to copy to the clipboard!',
                duration: 2000,
                color:"danger"
            });
            toast.present();
        }
    }

    toggleMute = () => {
        this.mute = !this.mute;
    }

    init = async () => {
        const hash = await generateHash("bifrost-"+this.roomName);
        let newPeer = new Peer("bifrost-"+ hash,{
            debug: 3
        });
        await this.getLocalStream();
        this.peer = newPeer;
        console.log(this.peer);
        this.currentState = "WAITING";
        this.peer.on("connection", (conn)=>{
            console.log("connected!!");
            console.log(conn);
        });
        this.peer.on("call", (call)=>{
            console.log("New call here!");
            const answerCall = true;
            if(answerCall){
                call.answer(this.localStream);
                call.on("stream", (stream)=>{
                    this.remoteStream = stream;
                });
                this.currentState = "INCALL";
            }else{
                alert("Call reected");
            }
        });
        this.peer.on("error", (error)=>{
            alert(error);
        })
    }

    getLocalStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
        this.localStream = stream;
    }

    getRenderingContent = () => {
        if(this.currentState === "INIT"){
            return(
                <ion-card-content>
                    <div class="NewPageCardContent">
                        <ion-text color="primary"><h1><b>Initializing...</b></h1></ion-text>
                        <ion-spinner />
                    </div>
                </ion-card-content>
            )
        }
        else if (this.currentState === "WAITING"){
            return(
                <ion-card-content>
                    <div class="NewPageCardContent">
                        <ion-text color="primary"><h1><b>Waiting for peer...</b></h1></ion-text>
                        <div>No one here yet</div>
                    </div>
                </ion-card-content>
            )
        }
        else{
            return(
                <ion-card-content>
                    <div class="NewPageCardContent">
                        <ion-text color="primary"><h1><b>In call:</b></h1></ion-text>
                        <audio muted={true} id="bifrost-audio-stream" autoPlay/>
                    </div>
                </ion-card-content>
            )
        }
    }

    componentDidLoad(){
        this.init();
    }

    componentDidUpdate(){
        this.onCallStart();
    }

    render(){
        return(
            <div class="NewCallPageRoot">
                <ion-card class="DarkModeShadow MainPageCard">
                    {this.getRenderingContent()}
                </ion-card>
                {this.currentState === "INIT" ? null : <div class="ControlBar">
                    <div class="CallPageRoomName" onClick={this.copyToClipboard}>
                        <ion-text color={globalState.darkmode ? "light" : "dark"}><h3><b>{this.roomName}</b></h3></ion-text>
                        <ion-icon class="CallPageCopyButton" color={globalState.darkmode ? "light" : "dark"} name="copy-outline" size="large" ></ion-icon>
                    </div>
                    <ion-fab-button onClick={this.toggleMute} class="MuteButton" color={this.mute ? "danger": (globalState.darkmode ? "dark":"light")}>
                        <ion-icon color={globalState.darkmode ? "light" : "dark"} name={this.mute ? "mic-off":"mic" } ></ion-icon>
                    </ion-fab-button>
                    <ion-button class="ExitCallButton" color="danger" shape="round">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path></svg>
                    </ion-button>
                </div>}
            </div>
        )
    }
}