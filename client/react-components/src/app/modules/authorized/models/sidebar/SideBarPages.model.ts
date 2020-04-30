import {Component} from "react";

export interface SideBarPagesModel {
    name: string;
    label: string;
    component: Component<any, any>
}
