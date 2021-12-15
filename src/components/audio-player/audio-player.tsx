import { Component, h, Prop, State} from '@stencil/core';

@Component({
    tag: "audio-player"
})
export class AudioPlayer{
    @Prop() mediaStream : MediaStream;
    @State() audioPlayer: HTMLAudioElement;

    componentDidRender(){
        if(this.audioPlayer){
            this.audioPlayer.srcObject = this.mediaStream;
            this.audioPlayer.autoplay = true;
            this.audioPlayer.muted = false;
        }
    }

    render(){
        return(
            <audio ref={(el) => this.audioPlayer = el as HTMLAudioElement} muted={false} id="bifrost-audio-stream" autoPlay/>
        )
    };
}