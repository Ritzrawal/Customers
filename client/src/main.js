import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import ListProfile from './listProfile'
import Update from './update'
const Main = () => (
  <Switch>
    <Route exact path="/" component={ListProfile} />
    <Route path="/Profile" component={Profile} />
    <Route path="/update" render={props => <Update {...props} />} />
   
  </Switch>
)

export default Main;