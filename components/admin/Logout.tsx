"use client";

import { LogOut } from "lucide-react";

const Logout = () => {
  const handleLogout = async () => {
    const ask = confirm("Are you sure of it to Logout?");
    if (!ask) return;
    await fetch("/api/auth/logout");
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
