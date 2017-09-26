/**
 * Created by siryog on 17-09-26.
 */
import React, { Component } from 'react';
//import styles from 'styles' ;
import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar,Thumbnail,FormGroup } from 'react-bootstrap';

import firebase from '.././firebase';

const db = firebase.database();
export default class LikeButton extends Component {

    like=(e)=>{
        e.preventDefault();
        const key = this.props.newKey;
        const user = firebase.auth().currentUser;
        const currentEmail = user.email;
        let userKey;
        const horseName = this.props.name;
        const horseId = this.props.horseId;

        db.ref(`Horses/${key}/likes`).push({
            date: (new Date()).toLocaleString(),
            author: currentEmail
        });

        const keys = user.key;

        db.ref(`users`).on('value', (snapshot)=> {
            console.log(snapshot.val());
            snapshot.forEach(item=> {

                if(item.val().email==currentEmail){
                    userKey = item.key;
                }


            })


        })
        db.ref(`users/${userKey}/likes`).push({

            horseName: horseName,
            HorseId: horseId,
            date: (new Date()).toLocaleString()
        })
    }
    render(){
        return(
            <button onClick={this.like}>Like</button>
        )
    }
}
