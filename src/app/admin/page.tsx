"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Package, 
  ShoppingBag, 
  ShieldCheck, 
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  LogOut
} from "lucide-react";

// Dummy data for UI demonstration
const dummyUsers = [
  { id: "1", name: "Rahul Sharma", email: "rahul@example.com", role: "CUSTOMER", joined: "2024-03-15" },
  { id: "2", name: "Green Valley Farm", email: "farm@greenvalley.com", role: "SELLER", joined: "2024-03-14" },
  { id: "3", name: "Priya Patel", email: "priya@example.com", role: "CUSTOMER", joined: "2024-03-14" },
  { id: "4", name: "Admin User", email: "admin@bhishma.com", role: "ADMIN", joined: "2024-01-01" },
];

const stats = [
  { label: "Total Users", value: 1254, icon: Users, color: "text-blue-600 bg-blue-500/10" },
  { label: "Total Products", value: 342, icon: Package, color: "text-green-600 bg-green-500/10" },
  { label: "Total Orders", value: 890, icon: ShoppingBag, color: "text-purple-600 bg-purple-500/10" },
  { label: "Pending Approvals", value: 12, icon: ShieldCheck, color: "text-amber-600 bg-amber-500/10" },
];

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-20 md:pt-24 pb-20 md:pb-0">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-16 z-30">
        <h1 className="text-lg font-bold text-card-foreground">Admin Dashboard</h1>
        <button onClick={toggleSidebar} className="p-2 bg-muted rounded-md text-foreground">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 md:top-24 left-0 h-screen md:h-[calc(100vh-6rem)] 
        w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 md:hidden flex justify-between items-center border-b border-border">
          <span className="font-bold text-xl text-primary">BHISHMA</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-muted-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Manage Users
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
            <Package className="w-5 h-5" /> Products
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-destructive hover:bg-destructive/10 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8 hidden md:block">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">BHISHMA platform management overview</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-card p-6 rounded-2xl border border-border flex flex-col justify-center shadow-sm hover:border-primary/50 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-extrabold text-foreground mb-1">{s.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Nav */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { href: "/admin/products", label: "Manage Products", sub: "Approve or reject listings", icon: Package },
              { href: "/admin/users",    label: "Manage Users",    sub: "View and manage accounts", icon: Users },
            ].map((l) => {
              const Icon = l.icon;
              return (
                <Link key={l.href} href={l.href} className="flex items-center justify-between bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{l.label}</p>
                      <p className="text-sm text-muted-foreground">{l.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>

          {/* Recent Users */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-4 md:p-6 border-b border-border flex justify-between items-center bg-muted/30">
              <h2 className="font-bold text-lg md:text-xl text-card-foreground">Recent Registrations</h2>
              <Link href="/admin/users" className="text-sm font-bold text-primary hover:underline flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {dummyUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="p-4 font-bold text-foreground">{u.name}</td>
                      <td className="p-4 text-muted-foreground">{u.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                          u.role === "ADMIN" ? "bg-purple-500/10 text-purple-700" : 
                          u.role === "SELLER" ? "bg-amber-500/10 text-amber-700" : 
                          "bg-green-500/10 text-green-700"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground font-medium text-right">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
