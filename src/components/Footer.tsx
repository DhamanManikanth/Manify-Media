import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-8 bg-[#050505] border-t border-[#242424] text-center">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Manify Media Logo"
            width={36}
            height={26}
            className="w-auto h-7 object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
          <span className="text-lg font-bold tracking-tight text-white/90">Manify Media</span>
        </div>
        <p className="text-[#A3A3A3] text-sm">
          © {new Date().getFullYear()} Manify Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
