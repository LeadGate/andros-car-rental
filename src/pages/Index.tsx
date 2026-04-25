import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import AffiliateWidget from "@/components/AffiliateWidget";
import Section from "@/components/Section";
import ImageDivider from "@/components/ImageDivider";
import DataTable from "@/components/DataTable";
import { InfoBox, WarningBox } from "@/components/InfoBox";
import CompanyCard from "@/components/CompanyCard";
import { Car, DollarSign, Shield } from "lucide-react";

const Index = () => {
  const breadcrumbSchema =
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://andros-car-rental.com"
      }
    ]
  };

  const websiteSchema =
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Andros Car Rental",
    "url": "https://andros-car-rental.com"
  };

  const organizationSchema =
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Andros Car Rental",
    "url": "https://andros-car-rental.com",
    "logo": "https://andros-car-rental.com/favicon-512x512.png",
    "description": "Independent car rental comparison guide for Andros. Compare deals from local and international providers.",
    "areaServed": {
      "@type": "Place",
      "name": "Andros"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@andros-car-rental.com",
      "url": "https://andros-car-rental.com/contact"
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Andros Car Rental — Compare Local Deals 2026"
        description="Andros car rental works best when you book a local operator in advance at Gavrio Port, because Andros has no airport and most ferry arrivals from Rafina"
        canonical="https://andros-car-rental.com"
        jsonLd={[breadcrumbSchema, websiteSchema, organizationSchema]}
      />

      <HeroSection
        title="Andros Island Car Hire: Local Rates, Pickup Points, and Rules"
        subtitle={<><p className="text-white drop-shadow-md">Andros car rental works best when you book a local operator in advance at Gavrio Port, because Andros has no airport and most ferry arrivals from Rafina port reach the island in tight windows. A compact manual such as a Fiat Panda or Hyundai i10 usually costs €25–€60 per day in shoulder season and €40–€80 per day in peak season, while automatic cars and 4WD models cost more. See the Gavrio port pickup walkthrough for the full walkthrough.</p></>}
        image="/1.webp"
        imageAlt="Car rental in Andros"
        ctaText="Compare Car Rental Deals"
        ctaHref="#compare"
      />

      <AffiliateWidget id="compare" />

      <Section
        icon={<DollarSign className="w-6 h-6" />}
        title="How Much Does Car Rental Cost on Andros?"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Andros rental prices depend on season, vehicle class, transmission, and insurance terms such as CDW, SCDW, FDW, excess/deductible, franchise, and zero excess coverage. Local agencies including Avance, Andros Car Rental, Andros Rent a Car, Escape in Andros, Andros Car Hire, George's Rent-A-Car, Paradise Andros Cars, Colours Rent A Car, Captains Holidays, Drive + Ride, Tassos Rent a Car, and Euro Rent a Car (Anna Vrettou) commonly quote the lowest rates for compact cars like the Fiat Panda, Toyota Aygo, Hyundai i10, Nissan Micra, Peugeot 208, Renault Clio, VW Polo, and Skoda Octavia.</p>
          <DataTable headers={["Car group", "Example models", "Winter (Nov\u2013Mar)", "Shoulder (May\u2013Jun, Sep\u2013Oct)", "Peak (Jul\u2013mid-Sep)"]} rows={[["Economy", "Fiat Panda, Toyota Aygo, Hyundai i10, Nissan Micra", "\u20ac20\u2013\u20ac35/day", "\u20ac25\u2013\u20ac60/day", "\u20ac40\u2013\u20ac80/day"], ["Compact", "Peugeot 208, Renault Clio, VW Polo, Hyundai Accent", "\u20ac30\u2013\u20ac45/day", "\u20ac40\u2013\u20ac70/day", "\u20ac60\u2013\u20ac95/day"], ["Crossovers", "Suzuki Ignis, Dacia Sandero Stepway, Citro\u00ebn C4", "\u20ac45\u2013\u20ac60/day", "\u20ac55\u2013\u20ac85/day", "\u20ac80\u2013\u20ac120/day"], ["4WD / SUV", "Suzuki Jimny, Suzuki Vitara, Dacia Duster 4WD, Audi Q3 4WD, Ford Kuga 4WD", "\u20ac55\u2013\u20ac75/day", "\u20ac70\u2013\u20ac100/day", "\u20ac95\u2013\u20ac150+/day"]]} />
          <InfoBox><p>💡 <strong>Tip:</strong> For a 3–5 day Andros itinerary in May or June, a Fiat Panda or Hyundai i10 usually balances price and road access best, because many beaches and villages are reachable on paved roads from Gavrio.</p></InfoBox>
          <p className="text-gray-700 mb-4 leading-relaxed">Verified local pricing points help anchor the table: a 2024 traveller quote reported €40/day for an Andros Car Rental compact car in October, and older seasonal quotes for Colours Rent A Car showed €25/day in mid-June and €35/day in mid-August. Fuel also changes the budget: island unleaded 95 octane has been reported at €2.15–€2.22 per litre, versus roughly €2.05 on the mainland.</p>
          <WarningBox><p>⚠️ <strong>Warning:</strong> If a rental quote includes “zero excess,” check whether the agency is actually selling full coverage or only reducing the deductible, because some Andros contracts still keep a franchise for glass, tyres, underbody, or lost-key damage.</p></WarningBox>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="[Gavrio Port Pickup](/gavrio-port-pickup) and Island Rental Agencies"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Most Andros rentals begin at Gavrio Port, because the ferry from Rafina port arrives there and local agents usually meet passengers in the port area with a name sign. During summer, Andros can receive multiple ferries within a short window, so pre-booking matters for the handover time and for the car class you actually want. The route from Gavrio to Batsi, Chora, and Korthi follows the EO Andros provincial road, so the pickup point is also the best place to inspect tyres, brakes, and air-conditioning before leaving the port.</p>
          <CompanyCard><p><strong>Avance:</strong> Avance combines a national brand structure with local delivery at Gavrio Port, and the practical value is a wider support system plus familiar insurance wording such as CDW, SCDW, and preauthorisation on the card.</p></CompanyCard>
          <CompanyCard><p><strong>Andros Car Rental:</strong> Andros Car Rental focuses on island-specific advice, and the main advantage is route guidance for Stenies, Apoikia, Mesathouri, Menites, and Chora, where road width and gradients can affect what car class is sensible.</p></CompanyCard>
          <CompanyCard><p><strong>Andros Rent a Car:</strong> Andros Rent a Car, often linked with Colours Rent A Car, usually competes on shoulder-season value, and the strongest offer is often a budget Fiat Panda, Hyundai i10, or Peugeot 208 delivered close to the port.</p></CompanyCard>
          <CompanyCard><p><strong>Escape in Andros:</strong> Escape in Andros is the more terrain-oriented option, and the key selling point is access to Suzuki Jimny, Suzuki Vitara, and Dacia Duster 4WD models for Achla, Vori, and rough coastal tracks.</p></CompanyCard>
          <CompanyCard><p><strong>George's Rent-A-Car:</strong> George's Rent-A-Car is a useful local fallback for short stays, and the typical advantage is flexible port pickup plus compact models such as the Toyota Aygo or Renault Clio.</p></CompanyCard>
          <CompanyCard><p><strong>Paradise Andros Cars:</strong> Paradise Andros Cars is positioned for beach-focused itineraries, and the practical offer is often a crossover such as a Suzuki Ignis or Dacia Sandero Stepway for dirt-road endings near Vitali or Zorkos.</p></CompanyCard>
          <CompanyCard><p><strong>Captains Holidays:</strong> Captains Holidays is relevant for ferry-day arrivals, and the useful detail is that larger cars such as the Skoda Octavia or Citroën Grand Picasso can be arranged for family luggage.</p></CompanyCard>
          <CompanyCard><p><strong>Drive + Ride:</strong> Drive + Ride suits travellers who want a simple handover near Gavrio, and the fleet commonly includes compact hatchbacks such as the VW Polo or Citroën C4.</p></CompanyCard>
          <CompanyCard><p><strong>Tassos Rent a Car:</strong> Tassos Rent a Car is a local name worth checking for longer rentals, and the value point is sometimes a better weekly rate for a manual economy car.</p></CompanyCard>
          <CompanyCard><p><strong>Euro Rent a Car (Anna Vrettou):</strong> Euro Rent a Car (Anna Vrettou) is another island-based operator, and the practical advantage is a direct local contact for insurance questions, mileage rules, and card preauthorisation.</p></CompanyCard>
          <InfoBox><p>💡 <strong>Tip:</strong> Ask every Andros operator whether the contract includes CDW, SCDW, FDW, or a true zero excess policy, because the difference between a deductible and full coverage changes the real trip cost.</p></InfoBox>
      </Section>

      <ImageDivider src="/2.webp" alt="Andros car rental" />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Which Car Type Fits Andros Roads?"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">A small 2WD car is enough for most visitors, because the paved network links Gavrio, Batsi, Chora, Korthi, Chrissi Ammos, Agios Petros, Fellos, Kypri, and many monastery stops. The best everyday options are usually a Fiat Panda, Hyundai i10, Toyota Aygo, Nissan Micra, Peugeot 208, Renault Clio, VW Polo, or Hyundai Accent, because these cars are easy to park in Chora and inexpensive to run on Andros’ winding roads.</p>
          <DataTable headers={["Trip type", "Best model examples", "Why it works"]} rows={[["Port-to-town stays", "Fiat Panda, Hyundai i10, Toyota Aygo", "Low cost, easy parking, good fuel economy"], ["Mixed village and beach use", "Peugeot 208, Renault Clio, VW Polo, Hyundai Accent", "Better comfort on EO Andros provincial road"], ["Gravel-end beaches", "Suzuki Ignis, Dacia Sandero Stepway, Citro\u00ebn C4", "Higher clearance for rough final access"], ["Remote or steep tracks", "Suzuki Jimny, Suzuki Vitara, Dacia Duster 4WD, Ford Kuga 4WD, Audi Q3 4WD", "Better traction for Achla and Vori routes"]]} />
          <p className="text-gray-700 mb-4 leading-relaxed">Achla Beach is the clearest case for 4WD use, because the road from Vourkoti crosses rough terrain near the Petalo–Kouvara–Profitis Ilias massif and can be unsuitable for a low-clearance rental. Vori Beach also rewards a 4WD or a very careful driver, while Vitali, Zorkos, and Ateni are often reachable with a crossover if the final track is dry. See <a href="/choosing-the-right-car" className="text-primary underline hover:text-accent">our 2WD vs 4×4 destination matrix</a> for the full walkthrough.</p>
          <WarningBox><p>⚠️ <strong>Warning:</strong> Some insurers exclude damage on unpaved roads, so a 2WD rental that reaches Achla or Vori may leave the driver responsible for repairs even when CDW or SCDW is purchased.</p></WarningBox>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Where to Drive from Gavrio in Under an Hour"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Andros is the second-largest Cycladic island, so <a href="/day-trips-from-andros" className="text-primary underline hover:text-accent">day trips</a> from Gavrio require realistic timing even when the distance looks short. The island sits in the South Aegean, and the road network bends through hills, valleys, and villages such as Stenies, Mesathouri, Menites, Apoikia, Aprovato, Aidonia, Kochylou, and Sineti.</p>
          <DataTable headers={["Destination", "Distance from Gavrio", "Typical drive time", "Surface / access note"]} rows={[["Batsi", "8 km", "10 min", "Paved"], ["Chrissi Ammos", "7 km", "12 min", "Paved"], ["Chora", "33 km", "35 min", "Paved, winding mountain road"], ["Korthi", "50 km", "55 min", "Paved"], ["Vitali", "15 km", "45 min", "Paved, final section rough"], ["Vourkoti", "28 km", "50 min", "Paved, then dirt toward Achla trailhead"]]} />
          <p className="text-gray-700 mb-4 leading-relaxed">The most useful short drives also include Sariza spring in Apoikia, the Tower of Agios Petros near Gavrio, Pano Kastro / Castle of Faneromeni above Chora, Dipotamata gorge near the south-east, Tourlitis lighthouse in the Chora harbour area, and the Goulandris Museum in Chora. For travellers planning multiple stops, Gavrio to Chora to Menites to Apoikia is a practical half-day loop, while Gavrio to Batsi to Agios Petros to Fellos works well for beach time.</p>
          <InfoBox><p>💡 <strong>Tip:</strong> Build one route around a beach and one route around a village or landmark, because Andros roads are scenic but slow and a “short” 30-kilometre drive can easily take 40–60 minutes.</p></InfoBox>
      </Section>

      <ImageDivider src="/3.webp" alt="Andros car rental" />

      <Section
        icon={<Shield className="w-6 h-6" />}
        title="Driving Rules, Insurance, and Ferry Risks"
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Greek rental cars on Andros usually require a card preauthorisation for the excess or deductible, and the exact hold depends on the agency, the model, and the cover selected. Many local contracts reference CDW as the basic collision waiver, SCDW as reduced excess, FDW as fuller protection, and “zero excess” only when tyres, glass, underbody, and key loss are all explicitly included. Under Greek law, Law 4850/2021 Article 25 §3 and Government Gazette A 208 (5 Nov 2021) are relevant to licence recognition for some non-EU visitors, while KOK September 2025 changes also matter for residential speed limits and alcohol enforcement.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">Ferry travel adds a separate insurance question: many mainland rentals charge a ferry fee or refuse sea-crossing cover, and a vehicle brought from Athens can be more expensive than a local pickup at Gavrio Port. Rafina port remains the practical departure point for Andros, and delays can stack up when the meltemi strengthens and the Beaufort scale reaches force 7 or higher.</p>
          <WarningBox><p>⚠️ <strong>Warning:</strong> If the contract says insurance is void on ferries or unsealed roads, the driver should not assume CDW or full coverage will automatically pay out after damage on the crossing or on dirt access roads.</p></WarningBox>
      </Section>

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Why Andros-Car-Rental.com Focuses on Local Operators"
        alt
      >
          <p className="text-gray-700 mb-4 leading-relaxed">Andros-Car-Rental.com compares local agencies rather than generic island-wide search results, and that makes the pricing more useful for travellers who need a compact Fiat Panda, a family-size Citroën Grand Picasso, or a 4WD such as a Suzuki Vitara or Ford Kuga 4WD. The site also focuses on practical island questions like where to collect a car at Gavrio Port, whether Batsi hotels can receive delivery, and which model suits the EO Andros provincial road rather than the rough track to Achla.</p>
          <p className="text-gray-700 mb-4 leading-relaxed">Compared with large brokers, a local comparison helps travellers judge the real cost of CDW, SCDW, FDW, and excess reduction, plus the practical risk of ferry crossings from Rafina port. For Andros itineraries that include Chora, Korthi, Stenies, Apoikia, Menites, and the north-beach circuit, a local operator often gives the clearest advice because the agency knows which cars fit the road and which roads suit the car.</p>
          <InfoBox><p>💡 <strong>Tip:</strong> If your itinerary includes only Gavrio, Batsi, Chora, and a few beaches, a compact manual from Andros Car Rental or Andros Rent a Car is usually enough; if your plan includes Achla or Vori, ask specifically for a Suzuki Jimny or Dacia Duster 4WD.</p></InfoBox>
          <WarningBox><p>⚠️ <strong>Warning:</strong> Do not rely on a generic mainland booking quote for Andros, because ferry fees, insurance exclusions, and port timing often change the final price more than the daily rental headline rate.</p></WarningBox>
      </Section>

      <ImageDivider src="/4.webp" alt="Andros car rental" />

      <Section
        icon={<Car className="w-6 h-6" />}
        title="Andros Car Rental FAQ"
      >
          <h3 className="text-xl font-bold mt-6 mb-3">Do I need a car on Andros?</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Yes, a car is the most practical way to explore Andros because the island’s KTEL bus network is limited to the Gavrio–Batsi–Chora corridor. A published timetable typically shows only 4–5 daily departures, and many beaches, villages, and trailheads such as Achla, Vori, and Vitali are not efficiently served. The main exception is a very short stay in Batsi or Chora with no intention of leaving town.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Where should I pick up a rental car on Andros?</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">Gavrio Port is the standard pickup point for Andros rentals because the ferries from Rafina port dock there. Local agencies often meet arrivals at the quay or just outside the port area, and summer arrivals can overlap within 15–30 minutes. The exception is a hotel-delivery booking that has been confirmed in writing by the agency.</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Can I bring a mainland rental to Andros by ferry?</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">A mainland rental is usually a poor choice because the ferry fee, cross-sea restrictions, and insurance exclusions often erase any savings. Some rental policies add daily ferry surcharges or void CDW, SCDW, and FDW during sea crossings, so a local Andros pickup is typically safer and cheaper. The exception is a written contract that clearly allows ferry transport and keeps the same excess terms.</p>
      </Section>
    </Layout>
  );
};

export default Index;
