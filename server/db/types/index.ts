export type ProductType = {
    _id: string,
    name: string,
    description: string,
    image: string,
    Category: String,
    price: number,
    quantity: number
}

export type UserType = {
    _id: string,
    name: string,
    pass: string,
    email: string,
    cart: {
        items:{
            productId: string,
            productName: string,
            quantity: number,
            total_price: number,
        }[],
    },
}

export type ProductLine = {
    productId: string,
    productName: string,
    quantity: number,
    total_price: number
}