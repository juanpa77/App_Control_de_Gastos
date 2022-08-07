import { Idb } from "../../../utility/IDB";
import { TransactionData } from "../../transaction-form/useTransaction";
import filterData from './filterDate'
export class TransactionListDb {
  db: Idb;

  constructor(db: Idb) {
    this.db = db;
  }

  async get(store: string, filterType: string, filterWeek: string): Promise<TransactionData[]> {
    await this.db.openDB();
    const result: TransactionData[] = await this.db.db.getAllFromIndex(
      store,
      "date"
    )
    if (filterWeek === 'todas') return result.filter(transaction => transaction.type === filterType)
    return result.filter(transaction => filterData(transaction, filterWeek, filterType))
    // return resultFilter;
  }
}
