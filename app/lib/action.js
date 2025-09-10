"use server";
import connectDB from "./database";
import { revalidatePath } from "next/cache";

// ambil semua user
export async function getUsers() {
  const db = await connectDB();
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
}

// tambah user
export async function storeUser(formData) {
  const name = formData.get("name");
  const hewan = formData.get("hewan");

  const db = await connectDB();
  await db.execute(
    "INSERT INTO users (name, namaPeliharaan) VALUES (?, ?)",
    [name, hewan]
  );

  revalidatePath("/");
}

// update user
export async function updateUser(formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const hewan = formData.get("hewan");

  const db = await connectDB();
  await db.execute(
    "UPDATE users SET name = ?, namaPeliharaan = ? WHERE id = ?",
    [name, hewan, id]
  );

  revalidatePath("/");
}

// hapus user
export async function deleteUsers(formData) {
  const id = formData.get("id");

  const db = await connectDB();
  await db.execute("DELETE FROM users WHERE id = ?", [id]);

  revalidatePath("/");
}
