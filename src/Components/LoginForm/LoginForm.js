import React, { Component } from 'react';
import firebase from '../../firebase';

import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';


import loginForm from './loginForm.css'



const db = firebase.database();

class LoginForm extends Component {

    state = {
        username: '',
        password: '',
        user: '',
        errorText: ''
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.username, this.state.password)
            .then((user)=> {
                const newUser = {

                    email: user.email,
                    posts:'',
                    likes:''
                }
                db.ref('users').push(newUser)
            })
            .catch((error)=> {
                this.setState({errorText: error.message})
            });
        //.catch(error=>console.log(error.message));

        if (this.state.username && this.state.password) {
            this.setState({error: false})
        } else {
            this.setState({error: true});
        }
    };

    signIn = ()=> {

        firebase.auth()
            .signInWithEmailAndPassword(this.state.username, this.state.password)
            .catch((error)=> {
                console.log(error.message + 'vazfe');
                this.setState({errorText: error.message})
            })
    }


    render() {

        const errorMessage = this.state.error ? <p> Please enter username and password! </p> : '';
        const hasError = this.state.error ? 'has-danger' : '';
        const errorText = this.state.errorText
        return (
            <div style={{maxWidth: "40%", margin: "5rem auto"}}>

                <form onSubmit={this.onSubmit}>

                    {errorText}
                    { errorMessage }
                    <div className={`form-group ${hasError}`}>
                        <label htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.onChange}
                            value={this.state.username}/>
                        { this.state.error &&
                        <div className="form-control-feedback"> Error! You failed!</div>
                        }
                    </div>
                    <div className={`form-group ${hasError}`}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.onChange}
                            value={this.state.password}/>
                    </div>


                    <input type="submit"
                           className="btn btn-primary registerButton"
                           value="Register"/>

                </form>
                <button className="btn btn-primary loginButton" onClick={this.signIn}>Sign in</button>


            </div>
        );
    }
}

export default LoginForm;