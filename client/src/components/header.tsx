import ButtonLoguot from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex w-full justify-between">
      <ul className="flex gap-10">
        <li>
          <Link href={"/products/add"}>Add new product</Link>
        </li>
        <li>
          <Link href={"/products"}>Product</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <ButtonLoguot />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
};
export default Header;
