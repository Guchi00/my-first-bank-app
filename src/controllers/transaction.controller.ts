import { Request, Response } from 'express';

import { checkAccountBalance, sendMoney } from '../model';


export const transfer = (req: Request, res: Response): void => {
     const {
         from,
         to,
         amount,
         description
     } = req.body;

     const senderBalance = checkAccountBalance(from);

    if (senderBalance < amount) {
        res.status(400).json({
            message: 'Insufficient funds'
        });
    } else {
        const newTransaction = sendMoney(from, to, amount, description);
     
        res.status(200).json(newTransaction);
    }
};
