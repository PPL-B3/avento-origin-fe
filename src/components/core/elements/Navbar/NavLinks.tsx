"use client";
import { useRouter } from "next/navigation";

const NavLinks = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const links = isLoggedIn
    ? [
        { label: "Home", href: "/home" },
        { label: "Upload Document", href: "/upload-document" },
      ]
    : [];

  return (
    <div className="flex gap-8 flex-col md:flex-row text-center md:text-left">
      {links.map((link) => (
        <span
          key={link.href}
          onClick={() => router.push(link.href)}
          className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer"
        >
          {link.label}
        </span>
      ))}
    </div>
  );
};

export default NavLinks;
