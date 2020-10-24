/* eslint import/no-unresolved: [2, { ignore: ['\.ts$'] }] */
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
// @ts-ignore
import Account from '../../model/Account.ts';
// @ts-ignore
import { IObserver } from '../IObserver.ts';
// @ts-ignore
import { IObservable } from '../IObservable.ts';

export default class LoginObserver implements IObserver {
  observable: IObservable;

  // eslint-disable-next-line consistent-return
  on = async (action: string, ...info: any[]) => {
    if (action === 'login' && (info[0] && info[1])) {
      const {
        email,
        password,
      } = info[0];

      const accountsRepository = getRepository(Account);

      const account: Account = await accountsRepository.findOne({ where: { email } });

      if (account) {
        bcrypt.compare(password, account.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ account }, 'hyperinitiative');
            return info[1].status(200).json(token);
          }
          return info[1].status(401).json({ msg: 'Incorrect password' });
        });
      } else {
        return info[1].status(403).json({ msg: "This account don't exist" });
      }
    }
  }
}
