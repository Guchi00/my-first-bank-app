import { readTable, writeToTable } from '../database/index';
import { updateAccount } from './balance.model';
import { Transaction } from '../types';

const TABLE_NAME = 'transactions';

export const sendMoney = (from: number, to: number, amount: number, description: string): Transaction => {
  const transferDescription = description
    ? description
    : `Transfer from ${from} to ${to}`;

  const newTransaction: Transaction = {
    reference: generateReference(),
    senderAccount: from,
    receiverAccount: to,
    amount,
    transferDescription,
    createdAt: new Date().toISOString()
  };

  updateAccount(from, -amount); // debit sender
  updateAccount(to, amount); // credit receiver

  const transactions = readTable(TABLE_NAME);
  transactions.push(newTransaction);
  writeToTable(TABLE_NAME, transactions);

  return newTransaction;
};

const generateReference = (): string => {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
};
