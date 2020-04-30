import React from 'react'
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import {SidebarComponent, SidebarLink} from "./styles";
import {Navigation} from "../../../../shared/models/navigation";

interface Props {
    match: string;
    pages: Navigation[];
}

export class Sidebar extends React.Component<Props, any>{

    render() {
        return (
            <SidebarComponent>
                <List disablePadding dense>
                    {this.props.pages.map(({ label, path, component, ...rest }) => (
                        <SidebarLink key={path}>
                          <Link to={`${this.props.match}${path}`}>
                            <ListItem  button {...rest}>
                                        <ListItemText>
                                                {label}
                                        </ListItemText>
                            </ListItem>
                          </Link>
                        </SidebarLink>
                    ))}
                </List>
            </SidebarComponent>

        )
    }


}

