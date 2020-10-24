export interface IObserver {
    observable: IObservable
    on: IOnFunction
}

interface IOnFunction {
    (action: string, ...info: any[]) : void
}