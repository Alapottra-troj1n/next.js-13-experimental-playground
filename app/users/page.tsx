import getAllUsers from "@/lib/getAllUsers";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Users() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  const content = (
    <article>
      {users.map((user) => {
        return (
            <p className="underline" key={user.id}>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </p>
        );
      })}
    </article>
  );

  return (
    <div className="h-screen flex justify-center items-center">{content}</div>
  );
}
