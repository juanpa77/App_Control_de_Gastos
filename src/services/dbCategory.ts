import { IDBPDatabase, openDB } from "idb";

export interface Category {
    id: string
    name: string
    isRecurring: boolean
}

export class Config {
    db!: IDBPDatabase<unknown>;
    
    constructor() {
    }

    async openDb() {
        this.db = await openDB('Config', 1, {
            upgrade(db) {
                db.createObjectStore('category', {keyPath: 'id'})
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

    async deletCategory(category: Category) {
        this.openDb()
        if (category) await this.db.delete('category', category.id)
    }
    
    async updatCategory(category: Category) {
        this.openDb();
        await this.db.put('category', category)
    }
}