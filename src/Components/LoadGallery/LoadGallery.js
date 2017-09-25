/**
 * Created by siryog on 17-09-17.
 */
import React,{Component} from 'react';
import firebase from '../../firebase';

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar,FormGroup,Thumbnail } from 'react-bootstrap';

const db=firebase.database();
const storage = firebase.storage().ref();
export default class LoadGallery extends Component{

state={
    horse:'',
    thing:''
}

    componentDidMount(){
        db.ref().on('value',(snapshot)=>{
            const horse=snapshot.val();

            //console.log(horse);
            //console.log(horse[0].type);
//getGallery(horse);
this.setState({horse:horse});


        })
    }

getGallery=()=>{
    const horse=this.state.horse;
   //const thing= horse.map((item)=><div><h2>{item.type}</h2>
   //    <img src={item.image} alt=""/></div>);
    const thing= horse.map((item)=>
        <Col xs={6} md={3}>
            <Thumbnail href="#" alt="171x180" src={item.image} />
            <p>{item.type}</p>
        </Col>);
    console.log(thing);
    this.setState({thing:thing});
    return thing;


}
    render(){

        const vay=(horse)=>{
const uf=horse.map((item)=><h2>item.type</h2>);
            console.log('THs uf is this   ' +uf);
            console.log('Tstate is   ' +this.state.horse);
return (<div>
    {uf}

</div>);




        }
        return(<div>
       <button onClick={this.getGallery}>butt</button>
            <div><Grid>
                <Row>{this.state.thing} </Row>
            </Grid></div></div>
        )
    }
}


