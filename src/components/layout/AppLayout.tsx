import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <MobileNav />
      <AppSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pt-16 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
}
