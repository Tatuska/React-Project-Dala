import React, { Component } from 'react';
//import styles from 'styles' ;
import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar,Thumbnail,FormGroup } from 'react-bootstrap';

import firebase from '../../firebase';
import PropTypes from 'prop-types';
const db = firebase.database();
export default class CommentBox extends Component {

    state = {
        value: '',
        key: '',
        placeholder: '...',

    }


    handleChange = (e)=> {
        e.preventDefault();
        this.setState({value: e.target.value});

        const item = this.props.horseId;
        const key = this.props.newKey;
        //console.log('zibil',item,key);

    }

    handleSubmit = (e)=> {
        const horseName = this.props.name;
        const item = this.props.horseId;
        const key = this.props.newKey;
        let userKey;
        const user = firebase.auth().currentUser;

        const currentEmail = user.email;
        e.preventDefault();
        db.ref(`Horses/${key}/posts`).push({
            value: this.state.value,
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
                //let email = snapshot.val()[userKey].email;


            })


        })
        db.ref(`users/${userKey}/posts`).push({
            posts: this.state.value,
            horseName: horseName,
            HorseId: item,
            date: (new Date()).toLocaleString()
        })

        this.setState({value: ''})
    }


    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder={this.state.placeholder}
                            onChange={this.handleChange}
                            />
                    </FormGroup>
                </form>

            </div>
        );
    }
}

CommentBox.contextTypes = {
    user: PropTypes.object
}