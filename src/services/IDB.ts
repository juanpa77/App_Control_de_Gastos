
import { IDBPDatabase, openDB } from "idb";
import { TransactionData } from "../components/add-new-transaction/add-Transaction";
import { TransactionListDb } from "../components/transaction-list/transactionList";
import { Category, Config } from "./dbCategory";

export interface fechDb{
    store: string
    data: TransactionData
}
export class Idb {
    db!: IDBPDatabase<unknown>;
    transactionList: TransactionListDb;
    config: Config;
    
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.db;
        this.transactionList = new TransactionListDb(this);
        this.config = new Config();
    }

    async openDB() {
        this.db = await openDB('Month',1, {
            upgrade(db){
                //crea un store de objetos
                db.createObjectStore('category', {autoIncrement: true});
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
        this.openDB()
        if (transaction) await this.db.delete(transaction.store, transaction.data.id)
    }
    
    async updateIncome(transaction: fechDb) {
        this.openDB()
        await this.db.put(transaction.store, transaction.data)
    }

    async addIncome(transaction: fechDb) {
        this.openDB();
        await this.db.add(transaction.store, transaction.data);
    }
    
    async addExpenses(transaction: fechDb) {
        this.openDB();
        await this.db.add(transaction.store, transaction.data);
    }

    async getAmount (store: string, dataRange: string, type: string, categories: Category[]) {
        await this.openDB();
        return await this.cursor(store, dataRange, type, categories);
    }
    
    async cursor(store: string, rangeDate: string, type: string, categories: Category[]) {
        let accumulatorSaldoFixed = 0;
        let accumulator = 0; 
        let cursor = await this.db.transaction(store).store.openCursor();
        
        while (cursor) {
            const objetTransaction: TransactionData = cursor.value;  
            if (type === objetTransaction.type) {
                let amount:any = this.filterByDate(rangeDate, objetTransaction);
                if (this.isCredit(objetTransaction, categories)) {
                    accumulatorSaldoFixed +=parseInt(amount);
                    amount = 0;
                }
                accumulator += parseInt(amount);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions            
            cursor = await cursor.continue();
         }
        return [accumulator, accumulatorSaldoFixed]
    }

    isCredit (transaction: TransactionData, categories: Category[]) { 
        return categories.some((category)=> (transaction.category === category.name  ) && (category.isRecurring))        
    }

    filterByDate(dataRange: string, transaction: TransactionData): number {
        let transactionDate = this.calcDate(dataRange, new Date(transaction.date), 'transactionDate');
        if (dataRange === 'Semanal') {
            let dataFilter = this.filterWeek();
            const result = dataFilter.filter(date=> date === transactionDate);
            return result[0]? transaction.amount: 0;
        }
        let dataFilter: number | number[] = this.calcDate(dataRange, new Date());
        return transactionDate !== dataFilter ? 0 : transaction.amount;
    }
    
    calcDate(rangeDate: string ,date: Date, type?: string) {
        if(rangeDate === 'Mensual') return date.getMonth(); 
        if(rangeDate === 'Semanal') return type === 'transactionDate'? date.getDate()+1 : date.getDate(); 
        if(rangeDate === 'Diario') return type === 'transactionDate'? date.getDate() : date.getDate(); 
        return 0
        }

    filterWeek() {
        const selectedDayOneTheWeek = 1// 1 para que la semana empiese el lunes/ 2 para que empiese el martes...
        const date = new Date(); 
        const calcDayOneTheWeek = date.getDate()-date.getDay() + selectedDayOneTheWeek;
        const arrayDate = [];
        for (let i = 0; i < 7 ; i++) {
            arrayDate.push(calcDayOneTheWeek + i)            
        }        
        return arrayDate
    }
} 
