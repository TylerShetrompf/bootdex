export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();

    add<T>(key: string, val:T) {
        let entry = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string) {
        if (!this.#cache.get(key)){
            return undefined;
        } else {
            return(this.#cache.get(key));
        }
    }

}