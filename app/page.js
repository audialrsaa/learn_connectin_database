import { getUsers } from "./lib/action";
import UserForm from "./UserForm";

export default async function Home() {
  const users = await getUsers();

  return (
    <div className="min-h-screen p-6 bg-white">
      <UserForm users={users} />
    </div>
  );
}
