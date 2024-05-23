"use client";

const SidePane = () => {
  return (
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
    </div>
  );
};

export default SidePane;
