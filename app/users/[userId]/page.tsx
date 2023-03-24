import getAllUsers from "@/lib/getAllUsers";
import getUser from "@/lib/getUser";
import getUserPost from "@/lib/getUserPost";
import { Metadata } from "next";
import { Suspense } from "react";
import UserPost from "./UserPost";
import { notFound } from "next/navigation";

type Params = {
  params: {
    userId: string;
  };
};

//dynamic meta data

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;
  if (!user.name) {
    return {
      title: "User Not Found",
    };
  }
  return {
    title: user.name,
    description: `This is a page of ${user.name}`,
  };
}

export default async function User({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId); // returning the fetch promise from the getUser's fetch function
  const userPostsData: Promise<Post[]> = getUserPost(userId);
  // const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData; // awaiting here to get the user data from the promise that was return from the function above.

  if (!user.name) return notFound();

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <Suspense fallback={<h2>Loading...</h2>}>
          {/* @ts-expect-error Async Server Component */}
          <UserPost promise={userPostsData} />
        </Suspense>
      </div>
    </>
  );
}

//SSG

export async function generateStaticParams() {
  const allUsers: Promise<User[]> = getAllUsers();
  const users = await allUsers;
  return users.map((user) => ({ userId: user.id.toString() }));
}
