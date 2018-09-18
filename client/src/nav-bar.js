import React, { Component } from 'react';
import { Header, Navigation } from 'react-mdl';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static" style={{ backgroundColor: '#39424e' }}>
                    <Toolbar>
                        <Header className="header-color" style={{ backgroundColor: '#39424e' }}
                            title={
                               
                                <div style={{ textDecoration: 'none', color: 'white' }} to="/">
                                    <i class="cicon"></i>
                                  Customer Book
                                    </div>
                             
                            } scroll>
                            <Navigation>
                                <Link to="/Profile"style={{color:'white',padding:'250px'}}>ADD</Link>
                                <Link to="/"style={{color:'white',padding:'50px'}}>Customer</Link>
                             
                            </Navigation>
                        </Header>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }
}