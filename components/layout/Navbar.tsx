import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-14 bg-[#3B1F0A] flex items-center justify-center px-5">
      <Link href="/" className="font-playfair text-[22px] tracking-tight">
        <span className="text-[#FDF6EC]">CUin</span>
        <span className="text-[#E8622A]">Snap</span>
      </Link>
    </nav>
  );
}
