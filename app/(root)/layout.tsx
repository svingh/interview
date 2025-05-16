import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button"; // Import Button
import { signOut } from "@/lib/actions/auth.action"; // Import signOut

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav className="flex items-center justify-between"> {/* Added justify-between */}
        <Link href='/' className='flex items-center gap-2'>
          <Image src='logo.svg' alt='Logo' width={38} height={32} />
          <h2 className='text-primary-100'>PrepWise</h2>
        </Link>
        {isUserAuthenticated && (  
          <form action={signOut}>
            <Button className="btn-primary" type="submit" >Logout</Button>
          </form>
        )}
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
