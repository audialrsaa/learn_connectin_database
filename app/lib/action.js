import connection from "./database"

function getProducts() {
    const [products] = connection.query(
        `SELECT * FROM products`
    ) //bisa juga execute

    return products 
}