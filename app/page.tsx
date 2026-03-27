import Image from "next/image";
import Admin from "./admin/page"
import { redirect } from "next/navigation";


export default function Home() {
  redirect("/admin/login");
}
