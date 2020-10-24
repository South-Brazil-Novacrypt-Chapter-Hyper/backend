import bcrypt from 'bcrypt';
import { response } from 'express';
import { getRepository, Repository } from 'typeorm';
import * as Yup from 'yup';
import Account from '../../model/Account';
import { IObserver } from '../IObserver';
import CheckObserver from './CheckObserver';

async function checkIfAccountExists(repository: Repository<Account>, email: string) {
    return await repository.findOne({ where: { "email": email } })
}

const observers = [new CheckObserver()]

export default class CreateObserver implements IObserver {
    observable: IObservable;

    on = function (action: string, ...info: any[]) {
        if (action === "create") {

            if (info[0] && info[1]) {
                const {
                    username,
                    email,
                    password,
                    github
                } = info[0];
                const SALT_ROUND = 11;

                bcrypt.genSalt(SALT_ROUND, function (err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        const data: any = {
                            username,
                            email,
                            password: hash,
                            github
                        }

                        const schema = Yup.object().shape({
                            username: Yup.string().required(),
                            email: Yup.string().required(),
                            password: Yup.string().required(),
                            github: Yup.string()
                        })

                        await schema.validate(data, {
                            abortEarly: false
                        })

                        const accountsRepository = getRepository(Account)

                        observers.forEach(observer => {
                            observer.on("checkAccount", email, info[1])
                        })

                        const account = accountsRepository.create(data);

                        await accountsRepository.save(account);

                        return info[1].status(201).json(data)
                    });
                });
            }

        }
    }
}