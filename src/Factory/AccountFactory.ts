// @ts-ignore
import CreateObserver from '../observers/Login/CreateObserver.ts';
// @ts-ignore
import LoginObserver from '../observers/Login/LoginObserver.ts';

const types: any = { create: new CreateObserver(), login: new LoginObserver() };

export default function AccountFactory(type: string) { return types[type]; }
