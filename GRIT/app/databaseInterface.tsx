export class databaseInterface {
    ids = [
            "3KtWQJuRSmI",
            "Ll0RattR1DE",
            "t34muYc261o",
            "dQw4w9WgXcQ",
            "M7FIvfx5J10"
        ];
    pointer = 0;
    size: number;

    //eslint says this is a useless constructor
    constructor() {
        // Set size to database table size
        this.size = this.ids.length;
    }



    public getNextVideoId(upwards: boolean): string
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