import { getProducts } from "./lib/action";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 rounded-md p-4 mb-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
        >
          <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        </div>
      ))}
    </div>
  );
}
