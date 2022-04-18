import { Idb } from "../../utility/IDB";
import { TransactionData } from "../add-new-transaction/add-Transaction";

export class TransactionListDb {
    db: Idb;
    
    constructor(db:Idb) {
        this.db = db;
    }

    async get(store: string, filter: string): Promise<TransactionData[]> {
        await this.db.openDB();
        const result: TransactionData[] = await this.db.db.getAllFromIndex(store, 'date');
        const resultFilter = result.filter(transaction => transaction.type === filter);
        return resultFilter
    }
}