class AuthorizationService {
    users = [];
    
    registerUser = (login, password) => {
        this.users.push({ login, password});
    };

    isKeyValid = (key) => {
        const [ login ] = key.split('-');
        const user = this.users.find((item) => item.login === login);
        return user.key === key;
    };

    getUser = (login, password) => {
        const showuser = this.users.find((item) => item.password === password && item.login === login);
        return showuser;
    };

    loginUser = (login, password) => {
        const key = crypto.randomBytes(10).toString('hex');
        
        const idx = this.users.findIndex((item) => item.password === password && item.login === login);
        const hashpassword = crypto.createHash('sha256')
            .update(this.users[idx].password)
            .digest('hex');

        this.users[idx].password = hashpassword;
        this.users[idx].key = `${this.users[idx].login}-${key}`;

        const result = this.users[idx];
        console.log(result);

        if (!result) {
            console.log('THROWING ERROR');
            throw new Error('NOT_FOUND');
        }
        return result;
    };

    logoutUser = (login, password) => {
        const idx = this.users.findIndex((item) => item.password === password && item.login === login);
        delete this.users[idx].key;
        return this.users[idx]; 
    };
}

module.exports = { AuthorizationService }