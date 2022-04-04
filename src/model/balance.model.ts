import { readTable, writeToTable } from '../database/index';
import { Balance } from '../types';

const TABLE_NAME = 'balances';

export const getAccounts = (): Balance[]  => {
  const accounts = readTable(TABLE_NAME) as Balance[];
  return accounts; // return db data parsed as JSON //when there's already something in the database from creating a post
};

export const getAccount = (accountNumber: number): Balance | undefined => {
  const accounts = getAccounts();
  const account = accounts.find(b => b.account === accountNumber);
  return account;
};

export const accountExists = (accountNumber: number): boolean => {
  const accounts = getAccounts();
  const index = accounts.findIndex(b => b.account === accountNumber);
  return index !== -1;
}

export const checkAccountBalance = (accountNumber: number): number => {
  const account = getAccount(accountNumber) as Balance;
  return account.balance;
}

export const createAccount = (balance: number): Balance => {
  const newAccount = {
    account: generateAccountNumber(),
    balance,
    createdAt: new Date().toISOString()
  };

  const accounts = getAccounts();
  accounts.push(newAccount);
  writeToTable(TABLE_NAME, accounts);

  return newAccount;
};

export const updateAccount = (accountNumber: number, amount: number): void => {
  const account = getAccount(accountNumber);
  
  if (!account) throw new Error(`Account ${accountNumber} does not exist`);
  
  account.balance += amount;

  const accounts = getAccounts();

  const updateAccounts = accounts.map(acc => {
    if (acc.account === accountNumber) {
      return account;
    }
    return acc;
  });

  writeToTable(TABLE_NAME, updateAccounts);
};

const generateAccountNumber = (): number => {
  const accounts = getAccounts();
  const accountsLength = accounts.length;
  return +`${1000000000}${accountsLength + 1}`;
};
