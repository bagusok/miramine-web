"use client";

import { LayoutGrid } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LayoutGrid className="hover:opacity-80" size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[200px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-xl">Miramine</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col w-full justify-between gap-2 mt-10">
          <div className="flex flex-col mt-1">
            <Link
              href="/"
              className="font-medium hover:opacity-80 border-b border-muted-foreground/20 py-5"
            >
              Home
            </Link>
            <Link
              href="/anime/schedule"
              className="font-medium hover:opacity-80 border-b border-muted-foreground/20 py-5"
            >
              Jadwal
            </Link>
            <Link
              href="/anime/ongoing"
              className="font-medium hover:opacity-80 border-b border-muted-foreground/20 py-5"
            >
              Sedang Tayang
            </Link>
            <Link
              href="/anime"
              className="font-medium hover:opacity-80 border-b border-muted-foreground/20 py-5"
            >
              Semua
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
