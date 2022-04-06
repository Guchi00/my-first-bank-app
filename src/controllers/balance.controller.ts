import { Request, Response } from 'express';

import {
    getAccounts,
    getAccount,
    createAccount
} from '../model';
import { Balance } from '../types';


export const getAll = (req: Request, res: Response): void => {
     const accounts = getAccounts();

    //  console.log(accounts)
     res.status(200).json(accounts);
};

export const get = (req: Request, res: Response): void => {
    const { accountNumber } = req.params;   //to extract query parameters, form parameters, and even files from the request.
    const account = getAccount(Number(accountNumber)) as Balance;
    res.status(200).json(account);
};

 export const create = (req: Request, res: Response): void => {
    const balance = req.body.balance;
    const newAccount = createAccount(balance);
    res.status(201).json(newAccount);
};
