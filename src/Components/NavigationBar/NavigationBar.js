
import React,{Component} from 'react';

import firebase from '../../firebase'

import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar,FormGroup,MenuItem,NavDropdown } from 'react-bootstrap';


import navigationBar from './navigationBar.css';


export default class NavigationBar extends Component {


    signOut = ()=> {

        firebase.auth()
            .signOut();

    }


    render() {
        //this is the name of dropDown menu icon
        const navDropdownTitle = (<Glyphicon glyph="glyphicon glyphicon-align-justify"> </Glyphicon>);
        const test = <Navbar onSelect={this.handleSelect}>

            <Nav className={'textStyle'} className={'col-lg-12 col-xs-12 col-md-12'}>
                <NavItem  onClick={()=>this.props.filter('dala')} >Dala Horses</NavItem>
                <NavItem  onClick={()=>this.props.filter('jämtland')} >Jamtländ Horses</NavItem>
                <NavItem  onClick={()=>this.props.filter('staffan')} >Rättvik Horses</NavItem>
                <NavItem  onClick={()=>this.props.filter('antik')} >Antik Horses</NavItem>
                <NavItem  onClick={()=>this.props.filter('all')} >All Horses</NavItem>
                <NavDropdown  title={navDropdownTitle} className={' menuDrop pull-right '}>
                    <MenuItem onClick={this.props.profile} className={'menuItem '}>Profile</MenuItem>
                    <MenuItem onClick={this.props.showPosts} className={'menuItem'}>Posts</MenuItem>
                    <MenuItem onClick={this.props.showLikes} className={'menuItem'}>Likes</MenuItem>
                    <MenuItem  onClick={this.signOut} className={'menuItem'}>Sign Out</MenuItem>

                </NavDropdown>
            </Nav>
        </Navbar>


        return (
            <div>
                {test}

            </div>

        )
    }
}