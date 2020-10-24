import { IObserver } from "../IObserver";
import bcrypt from 'bcrypt';
import Account from "../../model/Account";
import { getRepository } from "typeorm";

export default class LoginObserver implements IObserver {
    observable: IObservable;

    on = async function (action: string, ...info: any[]) {
        if (action === "login" && (info[0] && info[1])) {

            const {
                email,
                password
            } = info[0];

            const accountsRepository = getRepository(Account)

            const account = await accountsRepository.findOne({ where: { "email": email } })

            if (account) {
                bcrypt.compare(password, account.password, function (err, result) {
                    if (result) {
                        return info[1].status(200).json(account)
                    } else {
                        return info[1].status(401).json({ msg: "Incorrect password" })
                    }
                })
            } else {
                return info[1].status(403).json({ msg: "This account don't exist" })
            }
        }
    }
}