import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import RecoverPassword from '../pages/RecoverPassword';
import ChangePassword from '../pages/ChangePassword';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/recovery" exact component={RecoverPassword} />
      <Route path="/change/:token?" component={ChangePassword} />
      <Route path="/error/:id?" component={Error} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}
