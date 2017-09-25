/**
 * Created by siryog on 17-09-13.
 */
import React,{ Component } from 'react';
export default class InputField extends Component{
    render(){
        return(
            <input type="text" name="name" value={this.props.value}
                   onChange={this.props.handleChange}/>
        );
    }
}
