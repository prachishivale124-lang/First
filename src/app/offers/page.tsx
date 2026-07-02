import Link from "next/link";
import { Tag, Clock, Zap, Gift } from "lucide-react";

export const metadata = {
  title: "Offers & Deals | BHISHMA",
  description: "Exclusive deals and offers on fresh organic produce",
};

const offers = [
  {
    title: "Weekend Mega Sale",
    subtitle: "Up to 40% off on all vegetables",
    badge: "LIMITED TIME",
    badgeColor: "bg-red-500",
    gradient: "from-emerald-900 to-emerald-600",
    icon: Zap,
    code: "WEEKEND40",
    expiry: "Valid till Sunday midnight",
    href: "/products?offer=weekend",
  },
  {
    title: "First Order Discount",
    subtitle: "Get ₹100 off on your first order above ₹499",
    badge: "NEW USER",
    badgeColor: "bg-blue-500",
    gradient: "from-blue-900 to-blue-600",
    icon: Gift,
    code: "FIRSTBUY",
    expiry: "For new customers only",
    href: "/products",
  },
  {
    title: "Organic Bundle Deal",
    subtitle: "Buy any 5 items, get 1 free",
    badge: "BUNDLE",
    badgeColor: "bg-amber-500",
    gradient: "from-amber-800 to-amber-500",
    icon: Tag,
    code: "BUNDLE6",
    expiry: "No expiry",
    href: "/products?offer=bundle",
  },
  {
    title: "Flash Sale – Fruits",
    subtitle: "Fresh seasonal fruits at ₹29/kg",
    badge: "FLASH SALE",
    badgeColor: "bg-purple-500",
    gradient: "from-purple-900 to-purple-600",
    icon: Clock,
    code: "FLASH29",
    expiry: "Today only",
    href: "/products?category=fruits",
  },
];

export default function OffersPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Exclusive <span className="text-primary">Offers</span> & Deals
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Fresh discounts every day on the freshest organic produce from Bhishma farms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.code}
                className={`bg-gradient-to-br ${offer.gradient} text-white rounded-3xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300`}
              >
                <div className="p-8">
                  <span className={`${offer.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                    {offer.badge}
                  </span>
                  <div className="mt-5 flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{offer.title}</h2>
                      <p className="text-white/80 text-sm mb-4">{offer.subtitle}</p>
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                          <p className="text-xs text-white/70 mb-0.5">Coupon Code</p>
                          <p className="font-bold text-lg tracking-widest">{offer.code}</p>
                        </div>
                      </div>
                      <p className="text-white/60 text-xs mt-3 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {offer.expiry}
                      </p>
                    </div>
                    <Icon className="w-16 h-16 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>
                  <Link
                    href={offer.href}
                    className="mt-6 inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors text-sm"
                  >
                    Shop Now →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
