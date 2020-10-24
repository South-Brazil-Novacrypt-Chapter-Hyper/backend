import { getRepository } from 'typeorm';
// @ts-ignore
import Account from '../../model/Account.ts';
// @ts-ignore
import { IObserver } from '../IObserver.ts';
// @ts-ignore
import { IObservable } from '../IObservable.ts';

export default class CheckObserver implements IObserver {
    observable: IObservable;

    // eslint-disable-next-line consistent-return
    on = async (action: string, ...info: any[]) => {
      if (action === 'checkAccount' && (info[0] && info[1])) {
        const accountsRepository = getRepository(Account);

        const accountFound = !!await accountsRepository.findOne({ where: { email: info[0] } });
        if (accountFound) {
          return info[1].status(400).json({ msg: 'This email is already registered' });
        }
      }
    }
}
