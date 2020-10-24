import { Request, Response } from 'express';
// @ts-ignore
import { IObserver } from '../observers/IObserver.ts';
// @ts-ignore
import AccountFactory from '../Factory/AccountFactory.ts';

const observers: IObserver[] = [AccountFactory('create'), AccountFactory('login')];

export default {
  async login(request: Request, response: Response) {
    observers.forEach((observer) => {
      observer.on('login', request.params, response);
    });
  },

  async create(request: Request, response: Response) {
    observers.forEach((observer) => {
      observer.on('create', request.body, response);
    });
  },
};
