"use client";
import { storeUser, deleteUsers, updateUser } from "./lib/action";
import { useState, useTransition } from "react";

export default function UserForm({ users }) {
  const [modeEdit, setModeEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [name, setName] = useState("");
  const [hewan, setHewan] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleEdit = (u) => {
    setModeEdit(true);
    setIdEdit(u.id);
    setName(u.name);
    setHewan(u.namaPeliharaan);
  };

  const handleCancel = () => {
    setModeEdit(false);
    setIdEdit(null);
    setName("");
    setHewan("");
  };

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      if (modeEdit) {
        await updateUser(formData);
      } else {
        await storeUser(formData);
      }
      handleCancel(); // reset form setelah submit
    });
  };

  return (
    <div>
      {/* form tambah / edit */}
      <div className="mb-6">
        <h2 className="text-xl text-pink-500 font-bold mb-2">
          {modeEdit ? "Edit User" : "Tambah User"}
        </h2>
        <form action={handleSubmit} className="space-y-2">
          {modeEdit && <input type="hidden" name="id" value={idEdit} />}
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 p-2 border-pink-400 w-full rounded outline-none text-pink-400 placeholder-pink-400"
            required
          />
          <input
            type="text"
            name="hewan"
            placeholder="Nama Peliharaan"
            value={hewan}
            onChange={(e) => setHewan(e.target.value)}
            className="border-2 p-2 border-pink-400 w-full rounded outline-none text-pink-400 placeholder-pink-400"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded"
            >
              {modeEdit ? "Update" : "Simpan"}
            </button>
            {modeEdit && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* tabel user */}
      <div>
        <h2 className="text-xl font-bold mb-2 text-pink-500">Daftar User</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-pink-600">
              <th className="border-2 text-white p-2">ID</th>
              <th className="border-2 text-white p-2">Nama</th>
              <th className="border-2 text-white p-2">Peliharaan</th>
              <th className="border-2 text-white p-2">Modify</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="border-2 text-pink-400 p-2">{u.id}</td>
                <td className="border-2 text-pink-400 p-2">{u.name}</td>
                <td className="border-2 text-pink-400 p-2">
                  {u.namaPeliharaan}
                </td>
                <td className="border-2 text-pink-400 p-2 flex gap-2 justify-center">
                  {/* tombol delete */}
                  <form action={deleteUsers}>
                    <input type="hidden" name="id" value={u.id} />
                    <button className="px-2 py-1 bg-pink-500 text-white rounded text-sm">
                      Delete
                    </button>
                  </form>
                  {/* tombol edit */}
                  <button
                    onClick={() => handleEdit(u)}
                    className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="border p-2 text-center text-gray-500"
                >
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
