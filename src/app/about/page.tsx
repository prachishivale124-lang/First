import Image from "next/image";

export const metadata = {
  title: "About Us | BHISHMA",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden glassmorphism flex items-center justify-center bg-primary/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply" />
              <h2 className="text-4xl md:text-6xl font-bold text-primary/30 tracking-widest absolute">BHISHMA</h2>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Mission</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              "Bhishma is a modern organic marketplace focused on delivering fresh pesticide-free fruits and vegetables while supporting healthy lifestyles."
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We started with a simple belief: everyone deserves access to pure, untainted food. In a world full of artificial additives and harmful chemicals, we stand as a beacon of natural purity.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Directly sourced from trusted organic farmers
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Rigorous quality and pesticide residue testing
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Sustainable, eco-friendly packaging
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
