import { Filters } from "..";
import { Idb } from "../../../utility/IDB";
import { TransactionData } from "../../transaction-form/useTransaction";
import filterData from './filterDate'
export class TransactionListDb {
  db: Idb;

  constructor(db: Idb) {
    this.db = db;
  }

  async get(month: string): Promise<TransactionData[]> {
    await this.db.openDB();
    const result: TransactionData[] = await this.db.db.getAllFromIndex(
      month,
      "date"
    )
    return result
  }
}
