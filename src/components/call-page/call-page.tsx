import { alertController} from '@ionic/core';
import { Component, h, Prop, State} from '@stencil/core';
import Peer from 'peerjs';
import globalState from '../../global/app-state';
import { generateHash } from '../../helpers/utils';

@Component({
    tag: "call-page",
    styleUrl: "call-page.css",
    shadow: true
})
export class CallPage{
    @Prop() roomname: string;
    @State() peer: Peer;
    @State() currentState: "CONNECTING" | "INCALL" | "ENDED" = "CONNECTING";
    @State() localStream: MediaStream;
    @State() remoteStream: MediaStream;
    @State() mute: boolean = false;
    @State() callerData: {displayName: string, avatar: string} = {displayName:"", avatar:"default"};

    getRenderingContent = () => {
        if(this.currentState==="CONNECTING"){
            return(
                <ion-card-content>
                    <div class="CallPageCardContent">
                        <ion-text color="primary"><h1><b>Connecting your call...</b></h1></ion-text>
                        <ion-spinner class="LoadingSpinner"/>
                    </div>
                </ion-card-content>
            )
        }
        else if(this.currentState==="INCALL"){
            return(
                <ion-card-content>
                    <div class="CallPageCardContent">
                        <div class="InCallAvatar">
                            <img height="130" src={"https://avatars.dicebear.com/api/gridy/" +this.callerData.avatar + ".svg"} alt="Host Avatar"></img>
                        </div>
                        <ion-text color="primary"><h1><b>In call: {this.callerData.displayName}</b></h1></ion-text>
                        <audio-player mediaStream={this.remoteStream}/>
                    </div>
                </ion-card-content>
                
            )
        }
        else{
            return(
                <ion-card-content>
                    <div class="CallPageCardContent">
                        <ion-text color="primary"><h1><b>The host ended the call.</b></h1></ion-text>
                        <ion-text><h3><b>Returning to home page...</b></h3></ion-text>
                    </div>
                </ion-card-content>
            )
        }
    }

    getLocalStream = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
            this.localStream = stream;
        }
        catch{
            alert("This app needs access to the microphone in order to function. Please enable the same in settings.");
            let ionRouterElement = document.querySelector('ion-router');
            ionRouterElement.push("/", "root");
        }
    }

    init = async () => {
        const hash = await generateHash("bifrost-"+this.roomname);
        await this.getLocalStream();
        let newPeer = new Peer({
            config: {
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302"
                    },
                    {
                        urls: "turn:65.0.177.148:3478",
                        username: "bifrost123-user",
                        credential: "dJSn3Jjdskpzj",
                        credentialType: "password"
                    }
                ]
            }
        });
        this.peer = newPeer;
        this.peer.on("open",(id)=>{
            console.log(id);
            const call = this.peer.call("bifrost-"+hash, this.localStream, {
                metadata: {
                    displayName: globalState.username,
                    avatar: globalState.avatar
                }
            });
            call.on("stream", (stream)=>{
                this.remoteStream = stream;
                this.currentState = "INCALL";
            });
            call.on("error",(error)=>{
                alert(error);
            });
            call.peerConnection.addEventListener("iceconnectionstatechange", ()=>{
                if(call.peerConnection.iceConnectionState == "disconnected"){
                    this.remoteStream = undefined;
                    this.callerData = undefined;
                    this.currentState = 'ENDED';
                    this.callerData = {displayName:"", avatar:"default"}
                    window.setTimeout(()=>{
                        this.peer.destroy();
                        let ionRouterElement = document.querySelector('ion-router');
                        ionRouterElement.push("/", "root");
                    },1000);
                }
            });
            this.peer.on("error", (error)=>{
                alert(error);
            })
        });
        this.peer.on("connection",(dataConnection)=>{
            this.callerData = dataConnection.metadata as {displayName: string, avatar: string};
        });
    }

    endCall = async () => {
        const alert = await alertController.create({
            header: 'End Call?',
            message: 'Do you wish to leave this call?',
            buttons: [{
                text: 'YES',
                handler: ()=>{
                    this.peer.destroy();
                    let ionRouterElement = document.querySelector('ion-router');
                    ionRouterElement.push("/","root");
                }
            }, 'NO']
        });
        await alert.present();
    }

    muteToggle = () => {
        this.mute = !this.mute;
        const currentBool = this.localStream.getAudioTracks()[0].enabled;
        this.localStream.getAudioTracks()[0].enabled = !currentBool;
    }

    componentDidLoad(){
        this.init();
    }
    
    render(){
        return(
            <div class="NewCallPageRoot">
                <ion-card class="DarkModeShadow MainPageCard">
                    {this.getRenderingContent()}
                </ion-card>
                <div class="ControlBar">
                    <div class="CallPageRoomName">
                        <ion-text color={globalState.darkmode ? "light" : "dark"}><h3><b>{this.roomname}</b></h3></ion-text>
                    </div>
                    <ion-fab-button onClick={this.muteToggle} class={this.mute ? "MutedButton":"MuteButton"} color={this.mute ? "danger": (globalState.darkmode ? "dark":"light")}>
                        <ion-icon color={globalState.darkmode ? "light" : "dark"} name={this.mute ? "mic-off":"mic" } ></ion-icon>
                    </ion-fab-button>
                    <ion-button class="ExitCallButton" color="danger" shape="round" onClick={this.endCall}>
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path></svg>
                    </ion-button>
                </div>
            </div>
        )
    }
}