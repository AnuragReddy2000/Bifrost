import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: "text-field",
    styleUrl: "text-field.css"
})
export class TextField{
    @Prop() value: string;
    @Prop() onChangeCallback: (value: string) => void;

    render(){
        return(
            <input class="AppTextField" value={this.value} onChange={(event)=>this.onChangeCallback((event.target as HTMLInputElement).value)}></input>
        );
    }
}