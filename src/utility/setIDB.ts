
import { IDBPDatabase, openDB } from "idb";
import { TransactionType } from "../components/transaction";


export class Idb {
    db!: IDBPDatabase<unknown>;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.db;
    }

    openDB = async ()=> {
        this.db = await openDB('Transactions-store',1, {
            upgrade(db){
                //crea un store de objetos
                db.createObjectStore('transaction',{autoIncrement: true});
            }
        });
    }

     async add(transaction: TransactionType) {
        await this.db.add('transaction', transaction)
    }

    async cursor() {
        let cursor = await this.db.transaction('transaction').store.openCursor();
        let accumulator = 0; 
        while (cursor) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            
            if(cursor.value.type === 'Ingreso') {
                const amount = parseInt(cursor.value.amount);
                accumulator += amount;
            }
            cursor = await cursor.continue();
        }
        return accumulator
    }
} 




export const setTransactionBD = async (transaction: TransactionType)=> {
    const db = await openDB('Transactions-store',1, {
        upgrade(db){
            //crea un store de objetos
            db.createObjectStore('transaction',{autoIncrement: true});
        }
    });
    await db.add('transaction', transaction)
}
