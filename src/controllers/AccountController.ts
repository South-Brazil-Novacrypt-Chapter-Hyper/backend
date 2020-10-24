import { Request, Response } from 'express'
import { IObserver } from '../observers/IObserver';
import AccountFactory from '../Factory/AccountFactory';

let observers: IObserver[] = [AccountFactory("create"), AccountFactory("login")];

export default {
    async login(request: Request, response: Response) {
        observers.forEach(observer => {
            observer.on("login", request.params, response)
        })
    },

    async create(request: Request, response: Response) {
        observers.forEach(observer => {
            observer.on("create", request.body, response)
        })
    }
};