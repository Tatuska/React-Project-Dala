/**
 * Created by siryog on 17-09-25.
 */
import React, { Component } from 'react';

export default class ShowComments extends Component{

render(){
    const postArray=this.props.postArray;
    const commentList = postArray.map((item)=>
            <li>{item}</li>
    );
    return(
   <div><ul>{commentList}</ul></div>
    )
}
}