'use client';
import Link from 'next/link';
import { type ReactElement } from 'react';

function UserNav(): ReactElement {
  return (
    <nav>
      <Link href='/auth/signout'>Logout</Link>
    </nav>
  );
}

export default UserNav;
