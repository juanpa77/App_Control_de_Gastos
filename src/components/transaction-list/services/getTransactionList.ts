import { Filters } from "..";
import { Idb } from "../../../utility/IDB";
import { TransactionData } from "../../transaction-form/useTransaction";
import filterData from './filterDate'
export class TransactionListDb {
  db: Idb;

  constructor(db: Idb) {
    this.db = db;
  }

  async get(filters: Filters): Promise<TransactionData[]> {
    console.log(filters)
    await this.db.openDB();
    const result: TransactionData[] = await this.db.db.getAllFromIndex(
      filters.month,
      "date"
    )
    return filterData(result, filters)
  }
}
