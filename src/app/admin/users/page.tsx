import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Users } from "lucide-react";

const prisma = new PrismaClient();

export const metadata = { title: "User Management | Admin | BHISHMA" };

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") redirect("/login?callbackUrl=/admin/users");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true, isVerified: true },
  });

  const roleColors: Record<string, string> = {
    ADMIN:  "bg-purple-100 text-purple-700",
    SELLER: "bg-amber-100 text-amber-700",
    USER:   "bg-green-100 text-green-700",
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">User Management</h1>
          <p className="text-muted-foreground">View and manage all registered users</p>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border/50">
            <Users className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No users yet</h2>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground">{users.length} total users</p>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-xs">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Verified</th>
                  <th className="p-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{u.name || "—"}</td>
                    <td className="p-4 text-muted-foreground">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[u.role] || roleColors.USER}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.isVerified ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {u.isVerified ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
