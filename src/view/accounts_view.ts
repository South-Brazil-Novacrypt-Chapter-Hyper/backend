import Account from '../model/Account';

export default {
    render(account: Account) {
        return {
            id: account.id,
            username: account.username,
            email: account.email,
            password: account.password,
            github: account.github
        }
    },

    renderMany(accounts: Account[]) {
        return accounts.map(account => this.render(account));
    }
}