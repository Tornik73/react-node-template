export interface AuthReducerState {
    isUserAuthenticated: boolean;
    userState: User;
}

export interface User {
    user_id: string;
    email: string;
    name: string;
    lastname: string;
    username: string;
    telephone: string;
    age: number | null;
    country: string;
    gender: string;
    isAdmin: boolean;
    img: string;
    token: string;
}
