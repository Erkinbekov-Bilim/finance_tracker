import type { ITransactionData } from "./transaction-data";


export interface ITransactionApi {
  [key: string]: ITransactionData;
}
