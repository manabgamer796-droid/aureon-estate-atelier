import hero from "@/assets/hero.jpg";
import penthouse from "@/assets/p-penthouse.jpg";
import villa from "@/assets/p-villa.jpg";
import tower from "@/assets/p-tower.jpg";
import kitchen from "@/assets/p-kitchen.jpg";
import bedroom from "@/assets/p-bedroom.jpg";
import desert from "@/assets/p-desert.jpg";
import townhouse from "@/assets/p-townhouse.jpg";
import downtown from "@/assets/p-downtown.jpg";
import detail from "@/assets/detail.jpg";
import meeting from "@/assets/meeting.jpg";
import founder from "@/assets/founder.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";

export const images = { hero, penthouse, villa, tower, kitchen, bedroom, desert, townhouse, downtown, detail, meeting, founder, team1, team2 };

export type PropertyType = "Penthouse" | "Villa" | "Apartment" | "Townhouse";

export interface Property {
  id: string;
  title: string;
  location: string;
  type: PropertyType;
  price: number;
  beds: number;
  baths: number;
  area: number;
  yield: number;
  status: "Ready" | "Off-plan";
  image: string;
  gallery: string[];
  summary: string;
  features: string[];
}

export const properties: Property[] = [
  { id: "sky-penthouse-downtown", title: "The Sky Penthouse", location: "Downtown Dubai", type: "Penthouse", price: 18500000, beds: 4, baths: 5, area: 6200, yield: 5.8, status: "Ready", image: penthouse, gallery: [penthouse, kitchen, bedroom, downtown], summary: "A full-floor residence above the Boulevard with uninterrupted views of the Burj Khalifa, private elevator lobby and a wraparound terrace.", features: ["Private elevator", "Wraparound terrace", "Smart home", "Concierge", "Wine cellar", "Valet parking"] },
  { id: "palm-frond-villa", title: "Frond Signature Villa", location: "Palm Jumeirah", type: "Villa", price: 42000000, beds: 6, baths: 7, area: 11800, yield: 4.9, status: "Ready", image: villa, gallery: [villa, bedroom, kitchen, penthouse], summary: "A beachfront villa with an infinity pool facing the Arabian Gulf, landscaped palm gardens and a private beach.", features: ["Private beach", "Infinity pool", "Staff quarters", "Home cinema", "Gym", "Boat mooring"] },
  { id: "marina-crest-residence", title: "Marina Crest Residence", location: "Dubai Marina", type: "Apartment", price: 4750000, beds: 2, baths: 3, area: 1850, yield: 7.2, status: "Ready", image: tower, gallery: [tower, bedroom, kitchen], summary: "A refined two-bedroom residence in a travertine-clad tower with marina views and five-star amenities.", features: ["Marina view", "Infinity pool", "Spa", "Concierge", "Gym", "Covered parking"] },
  { id: "emirates-hills-estate", title: "Olive Court Estate", location: "Emirates Hills", type: "Villa", price: 36500000, beds: 7, baths: 8, area: 14500, yield: 4.5, status: "Ready", image: desert, gallery: [desert, kitchen, bedroom, villa], summary: "A stone courtyard estate framed by centuries-old olive trees, a heated pool and skyline views across the golf course.", features: ["Courtyard pool", "Golf views", "Library", "Majlis", "Six-car garage", "Staff wing"] },
  { id: "dubai-hills-townhouse", title: "Parkside Townhouse", location: "Dubai Hills Estate", type: "Townhouse", price: 6900000, beds: 4, baths: 4, area: 3400, yield: 6.4, status: "Off-plan", image: townhouse, gallery: [townhouse, kitchen, bedroom], summary: "A contemporary family townhouse opening onto landscaped parkland, minutes from Dubai Hills Mall and leading schools.", features: ["Private garden", "Park access", "Roof terrace", "Maid's room", "Community pool", "2026 handover"] },
  { id: "boulevard-sky-residence", title: "Boulevard Sky Residence", location: "Downtown Dubai", type: "Apartment", price: 8200000, beds: 3, baths: 4, area: 2900, yield: 6.1, status: "Off-plan", image: downtown, gallery: [downtown, penthouse, bedroom, kitchen], summary: "A three-bedroom residence with a formal dining room looking straight onto the Burj Khalifa and Dubai Fountain.", features: ["Burj views", "Formal dining", "Private lobby", "Residents' lounge", "Spa", "2027 handover"] },
];

export const formatAED = (n: number) =>
  "AED " + (n >= 1_000_000 ? (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2).replace(/\.?0+$/, "") + "M" : n.toLocaleString("en-US"));

export interface Article { slug: string; title: string; category: string; date: string; read: string; image: string; excerpt: string; body: string[] }

export const articles: Article[] = [
  { slug: "dubai-prime-market-outlook", title: "The 2027 Outlook for Dubai's Prime Residential Market", category: "Market", date: "October 2026", read: "6 min", image: hero, excerpt: "Why limited waterfront supply continues to support values at the very top of the market.", body: ["Dubai's prime residential segment has matured from a speculative frontier into one of the world's most liquid luxury markets.", "Waterfront supply on Palm Jumeirah and in Downtown remains structurally limited, while demand from relocating families and private offices continues to broaden.", "For buyers, the opportunity lies in selectivity: completed, well-managed buildings with distinctive views tend to hold value through every cycle."] },
  { slug: "materials-of-quiet-luxury", title: "Travertine, Brass and the Materials of Quiet Luxury", category: "Design", date: "September 2026", read: "4 min", image: detail, excerpt: "How the finest residences now favour natural stone and warm metals over spectacle.", body: ["The new generation of Dubai residences speaks softly. Honed travertine, brushed brass and oiled walnut have replaced high-gloss surfaces.", "These materials age gracefully and reward close inspection — the hallmark of architecture designed to last."] },
  { slug: "yield-strategy-off-plan", title: "Building a Yield Strategy with Off-Plan Residences", category: "Investment", date: "August 2026", read: "7 min", image: townhouse, excerpt: "Payment plans, handover timing and rental demand — a framework for disciplined investors.", body: ["Off-plan purchases allow investors to stage capital over construction, often with attractive developer payment plans.", "The key is underwriting rental demand at handover rather than today, and choosing developers with a record of on-time delivery."] },
];

export const team = [
  { name: "Alexander Vane", role: "Founder & Managing Director", image: founder, bio: "Twenty years advising private clients on prime property across London, Monaco and Dubai." },
  { name: "Isabelle Laurent", role: "Director, Private Clients", image: team1, bio: "Leads acquisitions for family offices and relocating executives." },
  { name: "Omar Haddad", role: "Head of Investment Advisory", image: team2, bio: "Structures yield-focused portfolios across ready and off-plan assets." },
];
