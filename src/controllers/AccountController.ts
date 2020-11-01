import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
// @ts-ignore
import { IObserver } from '../observers/IObserver.ts';
// @ts-ignore
import AccountFactory from '../Factory/AccountFactory.ts';
// @ts-ignore
import Account from '../model/Account.ts';

const observers: IObserver[] = [AccountFactory('create'), AccountFactory('login')];

export default {
  async login(request: Request, response: Response) {
    observers.forEach((observer) => {
      observer.on('login', request.params, response);
    });
  },

  async getAccountUsingId(id: number) {
    const accountsRepository = getRepository(Account);

    const account = await accountsRepository.findOneOrFail(id);

    return account;
  },

  async create(request: Request, response: Response) {
    observers.forEach((observer) => {
      observer.on('create', request.body, response);
    });
  },
};
