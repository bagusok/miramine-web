"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Anime Tidak Ditemukan</h1>
      <Button onClick={() => router.push("/")}>Kembali ke Home</Button>
    </div>
  );
}
