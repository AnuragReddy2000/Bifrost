import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: "text-field",
    styleUrl: "text-field.css",
    shadow: true
})
export class TextField{
    @Prop() value: string;
    @Prop() onChangeCallback: (value: string) => void;

    render(){
        return(
            <ion-input class="AppTextField" value={this.value} onIonChange={(event)=>this.onChangeCallback(event.detail.value)}></ion-input>
        );
    }
}