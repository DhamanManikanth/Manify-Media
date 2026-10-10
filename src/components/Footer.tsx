import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-8 bg-[#050505] border-t border-[#242424] text-center">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Manify Media Logo"
          width={32}
          height={32}
          className="w-auto h-6 opacity-80 brightness-0 invert"
        />
        <p className="text-[#A3A3A3] text-sm">
          © 2026 Manify Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
