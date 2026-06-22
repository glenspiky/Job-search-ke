"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

import TechLogo from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "@/context/AuthContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  // Show only these when logged out
  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  // Show these when logged in
  const privateLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Jobs", href: "/jobs" },
    { name: "Apply", href: "/apply" },
  ];

  const links = user ? privateLinks : publicLinks;

  // Prevent flickering while checking auth
  if (loading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent text-white z-50">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="text-3xl md:text-4xl">
          <TechLogo />
        </div>

        {/* Right Container: Holds links, auth states, and mobile elements on the right side */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Button
                  key={link.href}
                  variant="link"
                  asChild
                  className={`text-xl cursor-pointer rounded-none transition-all pb-1 h-auto border-b-2 ${
                    isActive
                      ? "border-emerald-500 text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              );
            })}

            {/* Desktop Logged Out Auth Buttons */}
            {!user && (
              <div className="flex items-center gap-4 ml-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="text-lg  rounded-sm px-4 py-2 h-9"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="text-lg bg-emerald-500 hover:bg-emerald-600 text-black rounded-sm px-4 py-2 h-9">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Avatar Dropdown (Visible on both desktop & mobile if user exists) */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52 h-62 cursor-pointer">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="text-lg cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-lg cursor-pointer">
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-lg cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-lg cursor-pointer"
                    variant="destructive"
                    onClick={logout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center gap-4">
            {!user ? (
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
                  Login
                </Button>
              </Link>
            ) : (
              /* Hamburger Menu - Sits perfectly next to the avatar */
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-zinc-900"
                  >
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="bg-zinc-950 text-white border-zinc-900 w-[280px]"
                >
                  <SheetHeader className="text-left mb-8">
                    <SheetTitle className="text-white">
                      <TechLogo />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-5">
                    {links.map((link) => {
                      const isActive = pathname === link.href;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-2xl ml-5 font-medium transition-colors ${
                            isActive
                              ? "text-emerald-400"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}

                    <hr className="border-zinc-900 my-2" />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
