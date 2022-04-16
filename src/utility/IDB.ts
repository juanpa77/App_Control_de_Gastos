
import { IDBPDatabase, openDB } from "idb";
import { transaction, TransactionType } from "../components/add-new-transaction/add-Transaction";
import { TransactionListDb } from "../components/transaction-list/transactionList";

interface fechDb{
store: string
transaction: transaction
}
export class Idb {
    db!: IDBPDatabase<unknown>;
    fromDate: number;
    transactionList: TransactionListDb;
    
    constructor() {
        this.fromDate = new Date().getDate();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.db;
        this.transactionList = new TransactionListDb(this);
    }

    openDB = async ()=> {
        this.db = await openDB('Transactions-store',1, {
            upgrade(db){
                //crea un store de objetos
                const expenseStore = db.createObjectStore('Income', {keyPath: 'id'});
                const incomeStore = db.createObjectStore('Expenses', {keyPath: 'id'});
                expenseStore.createIndex('date', 'date');
                incomeStore.createIndex('date', 'date');
            },
        });
    }

    async deletTransaction(transaction: transaction) {
        if (transaction) await this.db.delete(transaction.type, transaction.id)
    }
    
    async updateIncome(transaction: TransactionType) {
        await this.db.put('Expenses',transaction)
    }

     async addIncome(transaction: TransactionType) {
        await this.db.add('Income', transaction)
    }

    async addExpenses(transaction: TransactionType) {
        await this.db.add('Expenses', transaction)
    }
    
    async cursor(store: string, rangeDate: string) {
        let cursor = await this.db.transaction(store).store.openCursor();
        let accumulator = 0; 
        while (cursor) {
            const objetStore: TransactionType = cursor.value;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions            
            const amount:any = this.dateRange(rangeDate, objetStore);
            accumulator += parseInt(amount);
            cursor = await cursor.continue();
        }
        return accumulator
    }

    async getAmount (store: string, dataRange: string) {
        await this.openDB();
        const total = await this.cursor(store, dataRange);
        return total
    }   
    
    dateRange(dataRange: string, transaction: TransactionType): number {
        const date = new Date();
        let currentDate: number | number[] = this.calcDate(dataRange, new Date());
        let transactionDate = this.calcDate(dataRange, new Date(transaction.date), 'transactionDate');

         if (dataRange === 'Semanal') {
             currentDate = this.filterWeek(date.getDate()-date.getDay());
             const result = currentDate.filter(date=> date === transactionDate)
             return result[0]? transaction.amount: 0;
            }
        return transactionDate !== currentDate ? 0 : transaction.amount;
    }
    
    calcDate(rangeDate: string ,date: Date, type?: string) {
        return rangeDate === 'Mensual' ? 
            date.getMonth() :
                type === 'transactionDate' ? 
                date.getDate()+1 
                : date.getDate();
        }

    filterWeek(fromDate: number) {
        const fromdate = this.fromDate - new Date().getDay();
        const arrayDate = [];
        for (let i = 0; i < 7 ; i++) {
            arrayDate.push(fromdate + i)            
        }        
        return arrayDate
    }
} 
