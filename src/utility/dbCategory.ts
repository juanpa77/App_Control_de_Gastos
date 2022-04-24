import { IDBPDatabase, openDB } from "idb";

export class DbCategory {
    db: IDBPDatabase<unknown> | undefined;

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
    
    async add(newCategory: string) {
        this.db?.add('category', newCategory)
    }
    
    async get() {
        this.openDb()
        const categoryList: Promise<string[]> | undefined = this.db?.getAll('category');
        return categoryList
    }
}