import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getCurrentAccount } from "@/lib/auth/session";
export default async function Page(){if(await getCurrentAccount())redirect("/");return <AuthForm mode="login"/>}
