
import { IDBPDatabase, openDB } from "idb";
import { TransactionType } from "../components/add-new-transaction/add-Transaction";
import { TransactionListDb } from "../components/transaction-list/transactionList";
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
                const expenseStore = db.createObjectStore('Income',{autoIncrement: true});
                const incomeStore = db.createObjectStore('Expenses', {autoIncrement: true});
                expenseStore.createIndex('date', 'date');
                incomeStore.createIndex('date', 'date');
            },
        });
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
            const amount:any = this.dateRange(rangeDate, objetStore, this.calcDate);
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
    
    dateRange(dataRange: string, transaction: TransactionType, calcDate: (rangeDate: string ,date: Date)=>number ): number {
        const date = new Date();
        let currentDate: number | number[] = calcDate(dataRange, new Date());
        // se agrega 1 a transactionDate xq cuando recupera la fecha de la bd lo hace con un dia menos
        let transactionDate = calcDate(dataRange, new Date(transaction.date))+1;
         if (dataRange === 'Semanal') {
             currentDate = this.filterWeek(date.getDate()-date.getDay());
             const result = currentDate.filter(date=> date === transactionDate)
             return result[0]? transaction.amount: 0;
            }
        return transactionDate !== currentDate ? 0 : transaction.amount;
    }
    
    calcDate(rangeDate: string ,date: Date) {
        if (rangeDate === 'Diario') return date.getDate();
        if (rangeDate === 'Semanal') return date.getDate();
        return date.getMonth();
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
