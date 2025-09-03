import {getUsers} from "../lib/action";

export default async function User() {
  const users = await getUsers()

  // console.log(products)
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {users.map((users) => (
        <div
          key={users.id}
          className="border border-gray-300 rounded-md p-4 mb-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
        >
          <h2 className="text-lg font-semibold text-gray-800">{`${users.id}, ${users.name}, ${users.hewan}`}</h2>
        </div>
      ))}
    </div>
  )
};