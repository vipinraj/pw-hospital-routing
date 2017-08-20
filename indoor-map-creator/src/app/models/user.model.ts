
export class User {
    // user id available in database
    userId: string;
    // user's google account id, for client side use only
    googleAccountId: string;

    constructor(params: { userId: string, googleAccountId?: string }) {
        this.userId = params.userId;
        this.googleAccountId = params.googleAccountId;
    }
}