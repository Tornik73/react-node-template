

export interface Navigation {
    path: string;
    component?: any,
    children?: Navigation[];
    label?: string;
}
export interface ProtectedRoute {
    component: any;
    [key: string]: any;
}
