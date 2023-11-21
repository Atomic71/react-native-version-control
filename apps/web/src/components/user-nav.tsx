'use client';
import Link from 'next/link';
import { type ReactElement } from 'react';

function UserNav(): ReactElement {
  return <Link href='/auth/signout'>Logout</Link>;
}

export default UserNav;
