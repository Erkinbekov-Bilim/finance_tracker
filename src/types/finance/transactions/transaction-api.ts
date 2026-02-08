import type { ITransactionMutation } from './transactiion-mutation';

export interface ITransactionApi {
  [key: string]: ITransactionMutation;
}
