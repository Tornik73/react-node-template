import {Switch, Route, Redirect} from 'react-router-dom'
import React, { Component } from 'react'
import {Home, BooksForm} from "./pages";
import {connect} from "react-redux";
import {LayoutComponent} from "./components/Layout/styles";
import {Navigation} from "../../shared/models/navigation";
import BooksTable from "./pages/Books-table/BooksTable";
import {Chat} from "./pages/";

export const ROUTES: Navigation[] = [
    {
        path: 'home',
        label: 'Home',
        component: Home
    },
    {
        path: 'books',
        label: 'Books',
        component: BooksTable
    },
    {
        path: 'createBook',
        label: 'Create Book',
        component: BooksForm
    },
    {
        path: 'chat',
        label: 'Chat',
        component: Chat
    },
]

interface Props {
    isUserAuthenticated: boolean;
    match: string;
}
interface State {
}
class AuthRoutes extends React.Component<Props, State> {

    render(): JSX.Element {
        const {match, isUserAuthenticated} = this.props;
        return (
            <LayoutComponent>
                <Switch>
                    <Redirect from='/' to={`${match}/home`} exact/>
                    <Redirect from={`${match}/`} to={`${match}/home`} exact/>
                    {
                        ROUTES.map(({path, component}) => (
                                <ProtectedRoute key={path}
                                                path={`${match}/${path}`}
                                                authed={isUserAuthenticated}
                                                component={component}/>
                            )
                        )
                    }
                </Switch>
            </LayoutComponent>
        )
    }
}

class ProtectedRoute extends React.Component<any, any> {
    render(): JSX.Element {
        return (
            <Route {...this.props} render={
                (props: any) => (

                    props.authed
                        ? <Component {...this.props} />
                        : <Redirect to='/login'/>
                )
            }/>
        )
    }



}

const mapStateToProps = (state: any) => {
    return {
        isUserAuthenticated: state.authReducer.isUserAuthenticated,
    }
};

export default connect(
    mapStateToProps,
)(AuthRoutes)

