import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
// @ts-ignore
import Account from '../../model/Account.ts';
// @ts-ignore
import { IObserver } from '../IObserver.ts';
// @ts-ignore
import CheckObserver from './CheckObserver.ts';
// @ts-ignore
import { IObservable } from '../IObservable.ts';

const observers = [new CheckObserver()];

export default class CreateObserver implements IObserver {
    observable: IObservable;

    on = (action: string, ...info: any[]) => {
      if (action === 'create') {
        if (info[0] && info[1]) {
          const {
            username,
            email,
            password,
            github,
          } = info[0];
          const SALT_ROUND = 11;

          bcrypt.genSalt(SALT_ROUND, (err, salt) => {
            bcrypt.hash(password, salt, async (_err, hash) => {
              const data: any = {
                username,
                email,
                password: hash,
                github,
              };

              const schema = Yup.object().shape({
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
                github: Yup.string(),
              });

              await schema.validate(data, {
                abortEarly: false,
              });

              const accountsRepository = getRepository(Account);

              observers.forEach((observer) => {
                observer.on('checkAccount', email, info[1]);
              });

              const account = accountsRepository.create(data);

              await accountsRepository.save(account);

              return info[1].status(201).json(data);
            });
          });
        }
      }
    }
}
