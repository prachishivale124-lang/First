import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Users, Store, CheckCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  // In a real app we'd verify session.user.role === "ADMIN"
  
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  const pendingSellers = users.filter(u => u.role === "USER"); // Mocking logic: we can assume all USERs want to be sellers for this demo, or add a specific status

  async function approveSeller(formData: FormData) {
    "use server";
    const userId = formData.get("userId") as string;
    await prisma.user.update({
      where: { id: userId },
      data: { role: "SELLER" }
    });
    revalidatePath("/admin/dashboard");
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, approve sellers, and monitor platform health.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-2xl border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Sellers</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === "SELLER").length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/50 text-muted-foreground text-sm">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium text-foreground">{user.name || "N/A"}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-red-500/10 text-red-600' :
                        user.role === 'SELLER' ? 'bg-gold/10 text-gold-foreground' :
                        'bg-blue-500/10 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      {user.role === "USER" && (
                        <form action={approveSeller}>
                          <input type="hidden" name="userId" value={user.id} />
                          <button type="submit" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Approve Seller
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
