import { IDBPDatabase, openDB } from "idb";

export interface Category {
    name: string
    isRecurring: boolean
}

export class Config {
    db!: IDBPDatabase<unknown>;

    constructor() {
        // this.db;
    }

    async openDb() {
        this.db = await openDB('Config', 1, {
            upgrade(db) {
                db.createObjectStore('category', {autoIncrement: true})
            }
        })
    }
    
    async addCategory(newCategory: Category) {
        this.db?.add('category', newCategory)
    }
    
    async getCategory(): Promise<Category[]> {
        await this.openDb()
        return await this.db.getAll('category');
    }
/* 
    async deletCategory(category: string) {
        this.openDb()
        if (category) await this.db.delete('category', transaction.data.id)
    }
    
    async updatCategory(category: string) {
        this.openDb()
        await this.db.put('category', transaction.data)
    } */
}