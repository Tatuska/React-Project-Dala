import React, { Component } from 'react';
import firebase from './firebase';



import FirstLogin from './Components/firstLogin';
import LoginForm from './Components/LoginForm/LoginForm.js';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import MainPage from './Components/MainPage/MainPage.js';
import LoadGallery from './Components/LoadGallery/LoadGallery'
import PropTypes from 'prop-types';



const db=firebase.database();
const storage = firebase.storage().ref();


export default class App extends Component {

state={
    user:'',
    uid:''

}
    getChildContext() {
        return {
           user: this.state.user

        };
    }

    componentDidMount(){
        firebase.auth()
            .onAuthStateChanged((user)=>{
                if (user){
                    this.setState({user:user});

                }else{
                    this.setState({user:''})

                }

            });
    }

  render() {
      console.log(this.state.user);
      return (
              <div>
                  {this.state.user ? <MainPage user={this.state.user}></MainPage>: <FirstLogin ></FirstLogin>}


              </div>)

  }


  }

App.childContextTypes = {
    user: PropTypes.object
}


