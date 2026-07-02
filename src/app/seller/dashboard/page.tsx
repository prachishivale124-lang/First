"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  PlusCircle, 
  Package, 
  TrendingUp, 
  Menu, 
  X, 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

// Dummy data to replace Prisma calls for the frontend redesign
const dummyProducts = [
  { id: "1", name: "Fresh Organic Tomato", price: 60, quantity: 120, status: "Active" },
  { id: "2", name: "Farm Fresh Potato", price: 45, quantity: 200, status: "Active" },
  { id: "3", name: "Crunchy Sweet Carrot", price: 80, quantity: 50, status: "Low Stock" },
  { id: "4", name: "Fresh Green Spinach", price: 30, quantity: 80, status: "Active" },
];

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-20 md:pt-24 pb-20 md:pb-0">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-16 z-30">
        <h1 className="text-lg font-bold text-card-foreground">Seller Dashboard</h1>
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
          <Link href="/seller/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/seller/products" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
            <Package className="w-5 h-5" /> My Products
          </Link>
          <Link href="/seller/orders" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
            <ShoppingBag className="w-5 h-5" /> Orders
          </Link>
          <Link href="/seller/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
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
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="hidden md:block">
              <h1 className="text-3xl font-bold mb-2 text-foreground">Dashboard Overview</h1>
              <p className="text-muted-foreground">Manage your products, inventory, and view sales analytics.</p>
            </div>
            
            <Link href="/seller/products/new" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto">
              <PlusCircle className="w-5 h-5" />
              Add New Product
            </Link>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">{dummyProducts.length}</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales (₹)</p>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">₹12,450</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl md:text-3xl font-extrabold text-foreground">5</p>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-4 md:p-6 border-b border-border flex justify-between items-center bg-muted/30">
              <h2 className="text-lg md:text-xl font-bold text-card-foreground">Recent Products</h2>
              <button className="text-primary text-sm font-bold flex items-center hover:underline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Stock</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {dummyProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="p-4 flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted/20 border border-border shrink-0">
                          <Image src="/product-demo.png" alt={product.name} fill className="object-contain p-1" />
                        </div>
                        <span className="font-bold text-foreground line-clamp-1">{product.name}</span>
                      </td>
                      <td className="p-4 font-bold text-foreground">₹{product.price}</td>
                      <td className="p-4 text-muted-foreground">{product.quantity}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          product.status === 'Active' ? 'bg-green-500/10 text-green-700' : 'bg-amber-500/10 text-amber-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-primary hover:text-primary/80 font-bold px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors">
                          Edit
                        </button>
                      </td>
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
