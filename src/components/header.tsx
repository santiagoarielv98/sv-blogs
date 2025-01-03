"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Blocks,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  PenSquare,
  Tags,
  User,
  UserPlus,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  variant?: "auth" | "blog";
}

const Header = ({ variant = "blog" }: HeaderProps) => {
  const { data: session } = useSession();
  const isAuth = variant === "auth";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${isAuth ? "bg-white shadow-sm" : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"}`}
    >
      <nav className="container max-w-4xl mx-auto flex h-14 items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Blocks className="h-5 w-5" />
            <span>SV Blogs</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!isAuth && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden md:inline">Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/tags" className="flex items-center gap-2">
                  <Tags className="h-4 w-4" />
                  <span className="hidden md:inline">Tags</span>
                </Link>
              </Button>
            </>
          )}

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={session.user.image ?? undefined} />
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/new" className="flex items-center gap-2">
                    <PenSquare className="h-4 w-4" />
                    Create Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline">Login</span>
                </Link>
              </Button>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden md:inline">Register</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
