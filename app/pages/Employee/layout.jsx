// components/Layout.js
import { AuthProvider } from '@/app/components/Auth-Context';
import Navbar from '@/app/pages/Employee/comps/navbar';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
  <>
    <div className="min-h-screen flex flex-col bg-white rounded-lg shadow-lg">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-400 p-4 text-black">
          <nav>
            <ul>
              <li className="mb-4">
                <Link href="/pages/Employee/pages/Schedule">Schedule</Link>
              </li>
              <li className="mb-4">
                <Link href="/pages/Employee/pages/Preference">Preferences</Link>
              </li>
              <li>
                <Link href="/pages/Employee/pages/Info">Info</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
    </>
  );
};

export default Layout;
