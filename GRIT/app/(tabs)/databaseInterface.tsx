export class DatabaseInterface {
    ids = [
            "3KtWQJuRSmI",
            "Ll0RattR1DE",
            "t34muYc261o",
            "dQw4w9WgXcQ",
            "M7FIvfx5J10"
        ];
    pointer = 0;
    size: number;

    constructor() {
        this.size = this.ids.length;
    }

    getNextVideoId(upwards: boolean): string
    {
        if (upwards) {
            this.pointer += 1;
            if (this.pointer >= this.size) {
                this.pointer = 0;
            }
        }
        else {
            this.pointer -= 1;
            if (this.pointer < 0) {
                this.pointer = this.size - 1;
            }
        }
        return this.ids[this.pointer];
    }
}

// singleton instance and named export for convenience
const db = new DatabaseInterface();

export function getNextVideoId(upwards: boolean): string {
    return db.getNextVideoId(upwards);
}

export default db;