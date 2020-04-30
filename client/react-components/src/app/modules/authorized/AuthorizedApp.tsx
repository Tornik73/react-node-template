import React from 'react'
import {Sidebar} from "./components";
import {Container} from "./AuthorizedApp.styles";
import AuthRoutes, {ROUTES} from "./Auth.routes";
import Header from "./components/Header/Header";

const AUTH_ROUTE = '/auth';

const AuthorizedApp = () => (
  <>
      <Header/>
      <Container>
          <Sidebar match={`${AUTH_ROUTE}/`} pages={ROUTES}/>
          <AuthRoutes match={AUTH_ROUTE} />
      </Container>

  </>
)
export default AuthorizedApp;
