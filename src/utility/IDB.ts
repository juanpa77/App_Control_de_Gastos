
import { IDBPDatabase, openDB } from "idb";
import { TransactionData } from "../components/add-new-transaction/add-Transaction";
import { TransactionListDb } from "../components/transaction-list/transactionList";

export interface fechDb{
store: string
data: TransactionData
}
export class Idb {
    db!: IDBPDatabase<unknown>;
    transactionList: TransactionListDb;
    
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.db;
        this.transactionList = new TransactionListDb(this);
    }

    openDB = async ()=> {
        this.db = await openDB('Month',1, {
            upgrade(db){
                //crea un store de objetos
                for (let i = 1; i < 13; i++) {
                    if (i < 10) {
                        const monthStore = db.createObjectStore( `0${i.toString()}`, {keyPath: 'id'});                           
                        monthStore.createIndex('date', 'date');
                    }else {
                        const monthStore = db.createObjectStore( i.toString(), {keyPath: 'id'});                           
                        monthStore.createIndex('date', 'date');
                    }
                }
            },
        });
    }

    async deletTransaction(transaction: fechDb) {
        if (transaction) await this.db.delete(transaction.store, transaction.data.id)
    }
    
    async updateIncome(transaction: fechDb) {
        await this.db.put(transaction.store, transaction.data)
    }

    async addIncome(transaction: fechDb) {
        await this.db.add(transaction.store, transaction.data)
    }
    
    async addExpenses(transaction: fechDb) {
        await this.db.add(transaction.store, transaction.data)
    }

    async getAmount (store: string, dataRange: string, type: string) {
        await this.openDB();
        return await this.cursor(store, dataRange, type);
    }
    
    async cursor(store: string, rangeDate: string, type: string) {
        let cursor = await this.db.transaction(store).store.openCursor();
        let accumulator = 0; 
        while (cursor) {
            const objetTransaction: TransactionData = cursor.value;
            if (type === this.filterTypeTransaction(objetTransaction)) {
                const amount:any = this.filterTransactionObj(rangeDate, objetTransaction);
                accumulator += parseInt(amount);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions            
            cursor = await cursor.continue();
            }
        return accumulator
        }

    filterTypeTransaction = (transaction: TransactionData)=> transaction.type === "Expenses"? 'Expenses' : 'Income';

    filterTransactionObj(dataRange: string, transaction: TransactionData): number {
        const date = new Date();
        
        let filterDate: number | number[] = this.calcDate(dataRange, new Date());
        let transactionDate = this.calcDate(dataRange, new Date(transaction.date), 'transactionDate');
        
        if (dataRange === 'Semanal') {
            filterDate = this.filterWeek(date.getDate()-date.getDay());
            const result = filterDate.filter(date=> date === transactionDate);
            return result[0]? transaction.amount: 0;
        }
        return transactionDate !== filterDate ? 0 : transaction.amount;
    }
    
   
    
    calcDate(rangeDate: string ,date: Date, type?: string) {
        if(rangeDate === 'Mensual') return date.getMonth(); 
        if(rangeDate === 'Semanal') return type === 'transactionDate'? date.getDate()+1 : date.getDate(); 
        if(rangeDate === 'Diario') return type === 'transactionDate'? date.getDate()+1 : date.getDate(); 
        return 0
        }

    filterWeek(fromDate: number) {
        const fromdate = fromDate - new Date().getDay();
        const arrayDate = [];
        for (let i = 0; i < 7 ; i++) {
            arrayDate.push(fromdate + i)            
        }        
        return arrayDate
    }
} 
