import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AmbientBackground from './AmbientBackground';
import PageShell from './PageShell';
import PageTransition from './flow/PageTransition';

const skeletonMap = {
  '/dashboard': 'dashboard',
  '/dashboard/masim': 'default',
  '/dashboard/therapy': 'default',
  '/dashboard/parent': 'default',
  '/dashboard/agents': 'default',
};

function getSkeletonVariant(pathname) {
  if (skeletonMap[pathname]) return skeletonMap[pathname];
  if (pathname.startsWith('/dashboard')) return 'default';
  return 'default';
}

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg flex relative">
      <AmbientBackground />

      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <motion.button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 relative z-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <PageShell skeleton={getSkeletonVariant(location.pathname)}>
                <Outlet />
              </PageShell>
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
