import { HelpCircle, Phone, Mail, UserCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Help Center | BHISHMA",
};

export default function HelpPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help <span className="text-primary">Center</span></h1>
          <p className="text-muted-foreground text-lg">Find answers to your questions or reach out to our dedicated support.</p>
        </div>

        <div className="bg-card p-8 md:p-12 rounded-3xl border border-border/50 soft-shadow mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">Dedicated Support Representative</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Support Lead</p>
                  <p className="font-bold text-lg text-foreground">Prachi Shivale</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call/WhatsApp</p>
                  <p className="font-bold text-lg text-foreground">+91 9561865706</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-bold text-lg text-foreground">prachishivale124@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-bold text-lg mb-2">Seller Approvals</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have registered as a seller and are waiting for your account to be approved, please contact Prachi directly to expedite the process and pay the required seller registration charge.
              </p>
              <Link href="/contact" className="text-primary font-medium hover:underline text-sm">
                Send a direct message &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
