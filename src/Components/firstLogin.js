/**
 * Created by siryog on 17-09-14.
 */
import React, { Component } from 'react';
import LoginForm from './LoginForm/LoginForm';

import { Grid, Form, FormControl, Navbar, Glyphicon,
    Nav, NavItem, Well, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import ImageResponsive, {Source} from 'react-image-responsive';


export default class FirstLogin extends Component {
    render() {

        const st = {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '100px'
        }

        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={12} lg={12}> <img style={st} src={require("./dalaLogo.jpg")}
                                                           alt="Logo image with dala horses"/></Col>


                        <LoginForm ></LoginForm>

                    </Row>
                </Grid>
            </div>
        )
    }
}