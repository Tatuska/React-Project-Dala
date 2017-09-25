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
        const item = this.props.horseId;
        const key = this.props.newKey;
        e.preventDefault();
        db.ref(`Horses/${key}/posts`).push({value: this.state.value});

this.setState({value:''})


    }


    render() {
        const user = firebase.auth().currentUser;
        //console.log('user is',user)
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