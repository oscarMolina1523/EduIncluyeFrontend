export default class Token {
    private token:string;
    constructor(token = '') {
        this.token = token;
    }

    static fromJson(json:any) {
        const instance = new Token(json.token || '');
        return instance;
    }
}