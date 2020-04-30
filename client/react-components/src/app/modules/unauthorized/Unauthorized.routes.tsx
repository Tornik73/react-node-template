import {Switch, Route, Redirect} from 'react-router-dom'
import React from 'react'
import {connect} from "react-redux";
import {Navigation} from "../../shared/models/navigation";
import Login from "./pages/Login/Login";
import {AuthReducerState} from "../../redux/";

interface Props {
    isUserAuthenticated: boolean;
}

interface MapStateToProps {
    authReducer: AuthReducerState;
}

export const ROUTES: Navigation[] = [
    {
        path: 'login',
        label: 'Login',
        component: Login
    },
];
const DefaultRedirectTo = '/auth/';
class UnauthorizedRoutes extends React.Component<any, any> {

    render() {
        return (
            <Switch>
                {
                    ROUTES.map(({path, component, ...rest}) => (
                            <ProtectedRoute key={path}
                                            path={`/${path}`}
                                            authed={this.props.isUserAuthenticated}
                                            component={component}/>
                        )
                    )
                }
            </Switch>
        )
    }
}



// @ts-ignore
const ProtectedRoute  = ({ component: Component, authed, ...rest }) => {
    return (
        <Route {...rest} render={(props: any) => (
            authed ?
                <Redirect to={{
                    pathname: DefaultRedirectTo,
                    state: { from: props.location }
                }} />

                : <Component {...props} />
        )} />
    )
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        isUserAuthenticated: state.authReducer.isUserAuthenticated,
    }
};

export default connect(
    mapStateToProps,
    null,
)(UnauthorizedRoutes)

