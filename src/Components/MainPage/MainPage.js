/**
 * Created by siryog on 17-09-16.
 */
import React, { Component } from 'react';
//import styles from 'styles' ;
import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar,Thumbnail } from 'react-bootstrap';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import LoginForm from './../LoginForm/LoginForm';
import CommentBox from '../CommentBox/CommentBox'

import NavigationBar from './../NavigationBar/NavigationBar';
import LoadGallery from './../LoadGallery/LoadGallery'
import ShowComments from './../ShowComments'

const db = firebase.database();

class MainPage extends Component {

    state = {
        dbHorse: '',//horrse db
        arrHorse: '',//db trarnsferred to arrrray
        toDisplay: '',//db alrerady rerady to be displayed
        postArray: '',//the array of the the element'
        commentList: ''//saving a comment for the current horse
    }

    componentDidMount() {
        db.ref().on('value', (snapshot)=> {
            const dbHorse = snapshot.val();

            this.setState({dbHorse: dbHorse});
            //console.log('object',dbHorse);
            const arrHorse = [];
            for (var item in dbHorse.Horses) {
                arrHorse.push({key: item, value: dbHorse.Horses[item]});
            }

            this.setState({arrHorse: arrHorse});
            const toDisplay = this.Display(arrHorse);
            this.setState({toDisplay: toDisplay});
            //console.log('shitttt',arrHorse);


        })

    }
    //
    //componentWillMount() {
    //    db.ref().on('value', (snapshot)=> {
    //        const dbHorse = snapshot.val();
    //
    //        this.setState({dbHorse: dbHorse});
    //
    //        const arrHorse = [];
    //        for (var item in dbHorse.Horses) {
    //            arrHorse.push({key: item, value: dbHorse.Horses[item]});
    //        }
    //
    //        this.setState({arrHorse: arrHorse});
    //        const toDisplay = this.Display(arrHorse);
    //        this.setState({toDisplay: toDisplay});
    //    })
    //}

//FOR NOW THE QUESTION IS THAT AFTER FILTERING IT IS NOT SHOWING THE COMMENTS:BUT I AM USING THE SAME
    //toDisplay method to show the list of horses

    Display(arrHorse) {
//consoling the array so can see it
console.log(arrHorse);
        const toDisplay = arrHorse.map((item)=> {
            //can see it in console but the page tell me type
            //console.log(item.value);
            const horseId = item.value.horseId;
            const newKey = item.key;
            let postArray = [];

            db.ref(`Horses/${newKey}/posts`).on('value', (snapshot)=> {

                snapshot.forEach(item=> {
                    postArray.push(item.val().value);
                    //console.log('lilio',postArray);
                })


            })

            this.setState({postArray: postArray})
            //console.log(postArray);

            return ( <Col xs={6} md={3}>

                <Thumbnail href="#" alt="171x180" src={item.value.image}/>

                <CommentBox horseId={item.value.horseId} newKey={item.key} arrHorse={this.state.arrHorse}></CommentBox>

                <p>{item.value.type}</p>

                <ShowComments postArray={this.state.postArray}></ShowComments>
            </Col>)
        })
        return toDisplay;

    }


//filteirng the horrse depends of the type probably can be used the filter method of js
    filter = (type)=> {
        let toDisplay;
        const arrHorse = this.state.arrHorse;
        if (type == 'all') {
            toDisplay = this.Display(arrHorse);
        }
        else {
            //const filteredHorse = [];
         let filteredHorse=arrHorse.map((item)=> {
                //(item.value.type == type) ? filteredHorse.push(item) : '';

             if(item.value.type == type)
             return item;
            })
//consolgin the array and can see filtered array of objects
//            console.log('filter is',filteredHorse);

            toDisplay = this.Display(filteredHorse);
        }
        this.setState({toDisplay: toDisplay});

    }

    profile = ()=> {
        const user = this.props.user;

        const show = <Col xs={6} md={3}>
            <p>{user.email}</p>

            <p>{user.uid}</p>
            /*need to fix and add prrofile details*/
        </Col>;
        this.setState({toDisplay: show});
    }

    render() {
        const st = {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',

        }




        return (

            <div>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={12} lg={12} sm={12}> <img style={st} src={require('../../img/sixHorses.png')}
                                                                   alt=""/></Col>

                    </Row>


                </Grid>
                <NavigationBar filter={this.filter} profile={this.profile}></NavigationBar>
                {this.state.toDisplay}

            </div>

        )
    }

}
export default  MainPage;

MainPage.contextTypes = {
    user: PropTypes.object
}