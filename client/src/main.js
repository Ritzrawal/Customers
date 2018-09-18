import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCogs,faBars,faPlus,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import ListProfile from './listProfile'
import Update from './update'
library.add(faCogs);
library.add(faBars);
library.add(faPlus);
library.add(faTrash);
library.add(faEdit);
const Main = () => (
  <Switch>
    <Route exact path="/" component={ListProfile} />
    <Route path="/Profile" component={Profile} />
    <Route path="/update" render={props => <Update {...props} />} />
   
  </Switch>
)

export default Main;