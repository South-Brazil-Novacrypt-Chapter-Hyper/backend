import { getRepository } from "typeorm";
import Account from "../../model/Account";
import { IObserver } from "../IObserver";

export default class CheckObserver implements IObserver {
    observable: IObservable;

    on = async function (action: string, ...info: any[]) {
        if (action === "checkAccount" && (info[0] && info[1])) {
            const accountsRepository = getRepository(Account)

            const accountFound = await accountsRepository.findOne({ where: { "email": info[0] } }) ? true : false;
            if (accountFound) {
                return info[1].status(400).json({ msg: "This email is already registered" })
            }
        }
    }
}