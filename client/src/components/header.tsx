import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountResType } from "@/schemaValidations/account.schema";
import Link from "next/link";

type User = AccountResType["data"];

const Header = async ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-row justify-between w-full">
      <ul>
        <ol>
          <Link href={"/products"}>Product</Link>
        </ol>
      </ul>
      <div className="flex gap-10">
        {!user ? (
          <div className="flex gap-10">
            <ol>
              <Link href={"/login"}>Login</Link>
            </ol>
            <ol>
              <Link href={"/register"}>Register</Link>
            </ol>
          </div>
        ) : (
          <div className="flex">
            <ol>
              <Link href={"/me"}>
                <span>{user.name}</span>
              </Link>
            </ol>
            <ol>
              <ButtonLogout />
            </ol>
          </div>
        )}

        <ol>
          <ModeToggle />
        </ol>
      </div>
    </div>
  );
};

export default Header;
