
export class User {
    // user id available in database
    userId: string;
    // user's google account id, for client side use only
    googleAccountId: string;
    email: string;

    constructor(params: { userId: string, googleAccountId?: string, email: string }) {
        this.userId = params.userId;
        this.googleAccountId = params.googleAccountId;
        this.email = params.email;
    }
}