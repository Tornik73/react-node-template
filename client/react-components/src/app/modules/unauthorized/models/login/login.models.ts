export class UserLogin {
    email: string = '';
    password: string = '';
}
export class UserTokenImg {
    token: string;
    img: string;

    constructor(token: string, img: string) {
        this.token = token;
        this.img = img;
    }
}
