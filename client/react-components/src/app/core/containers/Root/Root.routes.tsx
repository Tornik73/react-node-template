import { Route} from "react-router-dom";
import React from "react";
import AuthorizedApp from "../../../modules/authorized/AuthorizedApp";
import UnauthorizedApp from "../../../modules/unauthorized/UnathorizedApp";

const RootRoutes = () => {
    return (
        <>
            <Route exact path='/' component={AuthorizedApp}/>
            <Route path='/auth/' component={AuthorizedApp}/>
            <Route path='/login/' component={UnauthorizedApp}/>

        </>
    )
}
export default RootRoutes;
