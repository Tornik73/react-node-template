import React from "react";
import {HeaderButtonsContainer, HeaderComponent, Title} from "./styles";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import * as AuthActions from "../../../../redux/actions/auth.actions";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
interface Props {
    logout: () => void;
}
 const Header = (props: Props) => {
    let history = useHistory();
    const logout = () => {
        props.logout();
        history.push("/login");
    }
    return (
        <HeaderComponent>
            <Title>React Components</Title>
            <HeaderButtonsContainer>
                <Button variant="contained">
                    Profile
                </Button>
                <Button onClick={() => logout()} variant="contained">
                    <Link to="/login">Log out</Link>
                </Button>
            </HeaderButtonsContainer>
        </HeaderComponent>
    )
}


const mapDispatchToProps = {
    logout: () => AuthActions.logout(),
};
export default  connect(
    null,
    mapDispatchToProps,
)(Header);

