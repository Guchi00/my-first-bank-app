import { Router } from 'express';
import { create, get, getAll, transfer } from '../controllers';
import {
  validateGet,
  validateCreate,
  validateTransfer,
  validationResultHandler,
  checkTransferAccountsExists,
  checkGetAccountExists
} from '../validators';

const router = Router();

router.get(
  '/balance/:accountNumber',
  validateGet,
  validationResultHandler,
  checkGetAccountExists,
  get
); // get a specific account

router.get(
  '/balance',
  getAll
); // get all accounts

router.post(
  '/create-account',
  validateCreate,
  validationResultHandler,
  create
); // create an account

router.post(
  '/transfer',
  validateTransfer,
  validationResultHandler,
  checkTransferAccountsExists,
  transfer
); // transfer money

export default router;
