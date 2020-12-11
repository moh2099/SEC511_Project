import React from "react";
//import {Redirect, Route, Switch} from "react-router-dom";
import { Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const InBuiltApps = ({match}) => (
  <Switch>
    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/contacts`}/> */}
    {/* <Route path={`${match.url}/contacts`} component={asyncComponent(() => import('./Contact'))}/>
    <Route path={`${match.url}/chat`} component={asyncComponent(() => import('./Chat/index'))}/> */}
    <Route path={`${match.url}/phishing_simulator`} component={asyncComponent(() => import('./phishing_simulator'))} />
    <Route path={`${match.url}/phishing_test`} component={asyncComponent(() => import('./phishing_test'))} />
    <Route path={`${match.url}/helping_material`} component={asyncComponent(() => import('./helping_material'))}/>

    {/* <Route path={`${match.url}/mail`} component={asyncComponent(() => import('./Mail'))}/> */}
    {/* <Route path={`${match.url}/todo`} component={asyncComponent(() => import('./Todo'))}/>
    <Route path={`${match.url}/notes`} component={asyncComponent(() => import('./Notes'))}/>
    <Route path={`${match.url}/firebase-crud`} component={asyncComponent(() => import('./FirebaseCRUD'))}/> */}
  </Switch>
);

export default InBuiltApps;
