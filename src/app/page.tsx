import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/twitter-screenshot-generator");
  return null;
}
