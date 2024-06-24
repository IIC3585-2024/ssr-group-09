"use client";

import Link from 'next/link';
import { useSessionStore } from '@/app/providers/session-store-provider';

export const Navbar = () => {
  const { user, logout } = useSessionStore((state) => state);
  console.log(user);

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="font-bold">Series</span>
        </Link>
        <div>
          {(user?.id != 0) ? (
            <>
              <span className="mr-4">{user?.username}</span>
              <Link href="/series/new">
                <span className="mr-4">Agregar Serie</span>
              </Link>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

