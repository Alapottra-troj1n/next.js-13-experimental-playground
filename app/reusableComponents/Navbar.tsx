import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
  return (
    <nav className="text-white  flex justify-center items-center bg-slate-600  py-4 gap-5">
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/users"}>Users</Link>
      <Link href={"/client"}>Client Component</Link>
      <Search/>
    </nav>
  );
}
