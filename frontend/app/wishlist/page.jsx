import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import WishlistPage from "./wishlist";

const Page = async () => {

  const session = await getServerSession(authOptions);
  // Redirect to login if user is not authenticated
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <>
      <WishlistPage session={session} />
    </>
  )
}

export default Page