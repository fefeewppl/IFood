"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative w-32 h-10">
            <Image
              src="/ifood-logo.svg"
              alt="iFood"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Entrar</Button>
          <Button>Criar conta</Button>
        </div>
      </div>
    </header>
  );
}