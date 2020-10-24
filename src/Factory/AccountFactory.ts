import CreateObserver from "../observers/Login/CreateObserver";
import LoginObserver from "../observers/Login/LoginObserver";

const types: any = { "create": new CreateObserver(), "login": new LoginObserver() }

export default function AccountFactory(type: string) { return types[type] }