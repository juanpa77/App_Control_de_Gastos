import { IDBPDatabase, openDB } from "idb";

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
    
    async addCategory(newCategory: string) {
        this.db?.add('category', newCategory)
    }
    
    async getCategory(): Promise<string[]> {
        await this.openDb()
        return await this.db.getAll('category');
    }
}