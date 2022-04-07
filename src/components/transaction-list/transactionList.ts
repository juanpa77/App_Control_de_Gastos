import { Idb } from "../../utility/IDB";
import { TransactionType } from "../add-new-transaction/add-Transaction";

export class TransactionListDb {
    db: Idb;
    
    constructor(db:Idb) {
        this.db = db;
    }

    async get(store: string): Promise<TransactionType[]> {
        await this.db.openDB();
        const resultado: TransactionType[] = await this.db.db.getAllFromIndex(store, 'date');
        return resultado
    }
}