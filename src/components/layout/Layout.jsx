import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden xl:flex fixed left-0 top-0 h-full z-10">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 xl:hidden">
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow z-30">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col ${mobileOpen ? "overflow-hidden" : ""} xl:ml-64`}
      >
        <Navbar toggleMobile={() => setMobileOpen((prev) => !prev)} />
        <main className="p-3 md:p-6 overflow-y-auto h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
