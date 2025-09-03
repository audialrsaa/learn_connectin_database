import connection from "./database"

export async function getProducts() {
    const [products] = await connection.query(
        `SELECT * FROM products`
    ) //bisa juga execute di connection.query

    return products 
}

export async function getUsers() {
    
    const [users] = await connection.query(
        `SELECT * FROM users`
    )

    return users
}