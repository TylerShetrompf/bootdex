export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    #reap(){
        for (const [key, entry] of this.#cache) {
            if (Date.now() - entry.createdAt >= this.#interval) {
                this.#cache.delete(key);
            }
        }
    } 

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
            return(this.#cache.get(key)?.val);
        }
    }

}