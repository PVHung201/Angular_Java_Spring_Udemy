export class Product {
    // public id: number;
    // sku?: string,
    // name?: string
    // description?: string;
    // unitPrice?: number;
    // imageUrl?: string;
    // active?: boolean;
    // unitsInStock?: number;
    // dateCreated?: Date;
    // lastUpdated?: Date;
    constructor(
        public id: number,
        public sku: string,
        public name: string,
        public description: string,
        public unitPrice: number,
        public imageUrl: string,
        public active: boolean,
        public unitsInStock: number,
        public dateCreated: Date,
        public lastUpdated: Date
    ){

    }
    
}
