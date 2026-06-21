import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Contact Us | BHISHMA",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="text-primary">Touch</span></h1>
          <p className="text-muted-foreground">Have questions about our products or your order? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glassmorphism p-8 rounded-2xl border border-border/50 soft-shadow">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input type="text" placeholder="Your name" className="w-full bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" className="w-full bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="button" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-gold">Customer Support</h3>
              <p className="text-muted-foreground mb-4">Our dedicated team is available Monday through Saturday to assist you with any inquiries.</p>
              <div className="space-y-2">
                <p className="flex items-center gap-3"><span className="font-semibold w-20">Email:</span> support@bhishma.com</p>
                <p className="flex items-center gap-3"><span className="font-semibold w-20">Phone:</span> +1 (800) 123-4567</p>
                <p className="flex items-center gap-3"><span className="font-semibold w-20">Hours:</span> Mon-Sat, 9am - 6pm</p>
              </div>
            </div>
            
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="text-lg font-bold mb-2 text-primary">Farm Partnerships</h3>
              <p className="text-sm text-muted-foreground">Are you an organic farmer interested in partnering with us? Reach out to our sourcing team at farmers@bhishma.com.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
