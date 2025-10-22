import { Search } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Sidebar from "./sidebar";

export default function Header({}) {
  return (
    <header className="flex gap-4 justify-between items-center py-4 px-4 lg:px-10 bg-primary-foreground sticky top-0 left-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <Sidebar />
        <Link href="/" className="text-2xl font-bold">
          Miramine
        </Link>
      </div>
      <div className="flex items-center gap-4"></div>
      <div className="flex gap-4 items-center">
        <Link className="hover:opacity-70" href="/search">
          <Search size={24} />
        </Link>
        <Button className="rounded-full">Masuk</Button>
      </div>
    </header>
  );
}
