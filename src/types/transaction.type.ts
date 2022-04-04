export type Transaction = {
  reference: string;
  senderAccount: number;
  amount: number;
  receiverAccount: number;
  transferDescription: string;
  createdAt: string;
};
