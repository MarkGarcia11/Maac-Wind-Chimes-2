/**
 * SEED DATA — content scraped from the original maacwindchimes.com
 * (product names, prices, SKUs, descriptions, event details, contact info)
 * plus clearly-marked placeholders where client input is still needed.
 * Images were retrieved from the original site and live in /public/images.
 */

export const SPEC_LINE =
  "Cars are die cast 1:40th scale and chime is 24\u2033 long. Cars may vary in color.";

type SeedProduct = {
  slug: string;
  name: string;
  priceCents: number;
  sku: string;
  category: string;
  era: string;
  description: string;
  image: string;
  availability?: string;
  featured?: boolean;
};

const img = (f: string) => `/images/products/${f}`;

export const seedCategories = [
  {
    slug: "classic-chevys",
    name: "Classic Chevys",
    tagline: "Bel Airs, Nomads, Camaros and the tri-fives everyone remembers.",
    image: img("1957-chevy.jpg"),
    sort: 1,
  },
  {
    slug: "mustangs-corvettes",
    name: "Mustangs & Corvettes",
    tagline: "America's two long-running love affairs, tuned to sing.",
    image: img("1957-corvette.jpg"),
    sort: 2,
  },
  {
    slug: "trucks-tow-trucks",
    name: "Trucks & Tow Trucks",
    tagline: "Workhorses and wreckers from the golden age of chrome.",
    image: img("1953-tow-trucks.jpg"),
    sort: 3,
  },
  {
    slug: "volkswagens",
    name: "Volkswagens",
    tagline: "Bugs and buses — some with surfboards, some with peace signs.",
    image: img("1967-volkswagens.jpg"),
    sort: 4,
  },
  {
    slug: "police-emergency",
    name: "Police & Emergency",
    tagline: "For the folks who keep us safe, in classic black and white.",
    image: img("1967-vw-police.jpg"),
    sort: 5,
  },
  {
    slug: "movie-character",
    name: "Movie & Character",
    tagline: "Storybook friends and cape-wearing heroes, made to hang around.",
    image: img("101-dalmatians.jpg"),
    sort: 6,
  },
  {
    slug: "street-rods",
    name: "Street Rods",
    tagline: "Hot rods and street rods with flames on the fenders.",
    image: img("1934-street-rod.jpg"),
    sort: 7,
  },
  {
    slug: "sports-teams",
    name: "Sports Teams",
    tagline: "Helmets and colors for Saturdays and Sundays.",
    image: img("alabama-crimson-tide.jpg"),
    sort: 8,
  },
  {
    slug: "gifts-whimsy",
    name: "Gifts & Whimsy",
    tagline: "Acrylic critters and hearts — easy gifts that always land.",
    image: img("acrylic-hearts.jpg"),
    sort: 9,
  },
];

const S = SPEC_LINE;

export const seedProducts: SeedProduct[] = [
  {
    slug: "1957-chevys",
    name: "1957 Chevy",
    priceCents: 2500,
    sku: "3r57c",
    category: "classic-chevys",
    era: "1950s",
    description:
      "3 Ring 1957 Chevy Wind Chime. Remember your first '57? The fins, the chrome, the way the whole street turned to look. This one hangs quietly and sings when the wind picks up.",
    image: img("1957-chevy.jpg"),
    featured: true,
  },
  {
    slug: "1957-corvette-cars",
    name: "1957 Corvette Cars",
    priceCents: 2500,
    sku: "3r57v",
    category: "mustangs-corvettes",
    era: "1950s",
    description:
      "3 Ring 1957 Corvette Wind Chime. The one you dreamed about in the showroom window — now it lives on your porch.",
    image: img("1957-corvette.jpg"),
    featured: true,
  },
  {
    slug: "1964-half-mustangs",
    name: "1964\u00BD Mustangs",
    priceCents: 2500,
    sku: "3r64m",
    category: "mustangs-corvettes",
    era: "1960s",
    description:
      "3 Ring 1964\u00BD Mustang Wind Chime. The car that started it all, cast small and hung to catch the breeze.",
    image: img("1964-mustang.jpg"),
    featured: true,
  },
  {
    slug: "101-dalmatians",
    name: "101 Dalmatians",
    priceCents: 2500,
    sku: "3r101d",
    category: "movie-character",
    era: "Storybook",
    description:
      "3 Ring 101 Dalmatians Wind Chime. A porch full of puppies — without the feeding schedule. A favorite gift for grandkids.",
    image: img("101-dalmatians.jpg"),
    featured: true,
  },
  {
    slug: "1955-chevy-nomads",
    name: "1955 Chevy Nomad Cars",
    priceCents: 2500,
    sku: "3r55n",
    category: "classic-chevys",
    era: "1950s",
    description:
      "3 Ring 1955 Chevy Nomad Wind Chime. Two doors, a long roof, and every family road trip you can remember.",
    image: img("1955-chevy-nomad.jpg"),
    featured: true,
  },
  {
    slug: "1953-tow-trucks",
    name: "1953 Tow Trucks",
    priceCents: 2500,
    sku: "3r53t",
    category: "trucks-tow-trucks",
    era: "1950s",
    description:
      "3 Ring 1953 Tow Truck Wind Chime. For the one who always showed up when somebody's car wouldn't.",
    image: img("1953-tow-trucks.jpg"),
    featured: true,
  },
  {
    slug: "1956-ford-pickup",
    name: "1956 Ford Pickup",
    priceCents: 2500,
    sku: "3r56f",
    category: "trucks-tow-trucks",
    era: "1950s",
    description:
      "3 Ring 1956 Ford Pickup Wind Chime. The truck that worked all week and washed up nice on Sunday.",
    image: img("1956-ford-pickup.jpg"),
    featured: true,
  },
  {
    slug: "1967-volkswagens",
    name: "1967 Volkswagens",
    priceCents: 2500,
    sku: "3r67v",
    category: "volkswagens",
    era: "1960s",
    description:
      "3 Ring 1967 Volkswagen Wind Chime. Small car, big personality, and an engine note you could pick out anywhere.",
    image: img("1967-volkswagens.jpg"),
    featured: true,
  },
  {
    slug: "1934-street-rod-cars",
    name: "1934 Street Rod Cars",
    priceCents: 2500,
    sku: "3r34s",
    category: "street-rods",
    era: "1930s",
    description:
      "3 Ring 1934 Street Rod Wind Chime. Chopped, channeled, and lowered into a breeze-catcher.",
    image: img("1934-street-rod.jpg"),
  },
  {
    slug: "1967-volkswagen-police-cars",
    name: "1967 Volkswagen Police Cars",
    priceCents: 2500,
    sku: "3r67p",
    category: "police-emergency",
    era: "1960s",
    description:
      "3 Ring 1967 Volkswagen Police Car Wind Chime. A gentle way to say thank you to someone who served.",
    image: img("1967-vw-police.jpg"),
  },
  {
    slug: "1967-volkswagen-cars",
    name: "1967 Volkswagen Cars",
    priceCents: 2500,
    sku: "3r67vc",
    category: "volkswagens",
    era: "1960s",
    description:
      "3 Ring 1967 Volkswagen Wind Chime. The classic bug, Die cast and humming in the wind.",
    image: img("1967-volkswagen.jpg"),
  },
  {
    slug: "1967-vw-surf-boards",
    name: "1967 Volkswagens / Surf Boards",
    priceCents: 2500,
    sku: "3r67sb",
    category: "volkswagens",
    era: "1960s",
    description:
      "3 Ring 1967 Volkswagen with Surf Boards Wind Chime. Windows down, boards up top, nowhere to be until Monday.",
    image: img("1967-vw-surfboards.jpg"),
  },
  {
    slug: "1955-chevy-pickup-trucks",
    name: "1955 Chevy Pickup Trucks",
    priceCents: 2500,
    sku: "3r55p",
    category: "trucks-tow-trucks",
    era: "1950s",
    description: "3 Ring 1955 Chevy Pickup Truck Wind Chime.",
    image: img("1955-chevy-pickup.jpg"),
  },
  {
    slug: "1967-camaro-cars",
    name: "1967 Camaro Cars",
    priceCents: 2500,
    sku: "3r67c",
    category: "classic-chevys",
    era: "1960s",
    description: "3 Ring 1967 Camaro Wind Chime.",
    image: img("1967-camaro.jpg"),
  },
  {
    slug: "2006-mustang-cars",
    name: "2006 Mustang Cars",
    priceCents: 2500,
    sku: "3r06m",
    category: "mustangs-corvettes",
    era: "2000s",
    description: "3 Ring 2006 Mustang Wind Chime.",
    image: img("2006-mustang.jpg"),
  },
  {
    slug: "34-street-rod-cars",
    name: "34 Street Rod Cars",
    priceCents: 2500,
    sku: "3r34sr",
    category: "street-rods",
    era: "1930s",
    description: "3 Ring '34 Street Rod Wind Chime.",
    image: img("34-street-rod.jpg"),
  },
  {
    slug: "55-chevy-pickup-w-flames",
    name: "55 Chevy Pickup W/ Flames",
    priceCents: 2500,
    sku: "3r55pf",
    category: "trucks-tow-trucks",
    era: "1950s",
    description: "3 Ring '55 Chevy Pickup with Flames Wind Chime.",
    image: img("55-chevy-pickup-flames.jpg"),
  },
  {
    slug: "55-56-57-chevy-gas-pump",
    name: "55-56-57 Chevy Gas Pump",
    priceCents: 3000,
    sku: "3rgp",
    category: "classic-chevys",
    era: "1950s",
    description:
      "3 Ring Tri-Five Chevy with vintage Gas Pump Wind Chime. Full service, check the oil, clean the windshield.",
    image: img("55-56-57-chevy-gas-pump.jpg"),
  },
  {
    slug: "55-6-7-chevys",
    name: "55-6-7 Chevys",
    priceCents: 2500,
    sku: "3r567",
    category: "classic-chevys",
    era: "1950s",
    description: "3 Ring '55, '56 and '57 Chevy Wind Chime. The whole tri-five family on one thread.",
    image: img("55-6-7-chevys.jpg"),
  },
  {
    slug: "57-chevy-taxi-cars",
    name: "57 Chevy Taxi Cars",
    priceCents: 2500,
    sku: "3r57t",
    category: "classic-chevys",
    era: "1950s",
    description: "3 Ring '57 Chevy Taxi Wind Chime.",
    image: img("57-chevy-taxi.jpg"),
  },
  {
    slug: "67-pastel-volkswagen-cars",
    name: "67 Pastel Volkswagen Cars",
    priceCents: 2500,
    sku: "3r67pas",
    category: "volkswagens",
    era: "1960s",
    description: "3 Ring '67 Pastel Volkswagen Wind Chime.",
    image: img("67-pastel-volkswagen.jpg"),
  },
  {
    slug: "67-peace-volkswagen-cars",
    name: "67 Peace Volkswagen Cars",
    priceCents: 2500,
    sku: "3r67pea",
    category: "volkswagens",
    era: "1960s",
    description: "3 Ring '67 Peace Volkswagen Wind Chime.",
    image: img("67-peace-volkswagen.jpg"),
  },
  {
    slug: "67-pink-volkswagen-cars",
    name: "67 Pink Volkswagen Cars",
    priceCents: 2500,
    sku: "3r67pk",
    category: "volkswagens",
    era: "1960s",
    description: "3 Ring '67 Pink Volkswagen Wind Chime.",
    image: img("67-pink-volkswagen.jpg"),
  },
  {
    slug: "67-volkswagen-cars",
    name: "67 Volkswagen Cars",
    priceCents: 2500,
    sku: "3r67vo",
    category: "volkswagens",
    era: "1960s",
    description: "3 Ring '67 Volkswagen Wind Chime.",
    image: img("67-volkswagen-cars.jpg"),
  },
  {
    slug: "acrylic-cats",
    name: "Acrylic Cats",
    priceCents: 2500,
    sku: "3racc",
    category: "gifts-whimsy",
    era: "Anytime",
    description: "3 Ring Acrylic Cats Wind Chime. For the cat person who has everything else.",
    image: img("acrylic-cats.jpg"),
  },
  {
    slug: "acrylic-cows",
    name: "Acrylic Cows",
    priceCents: 1000,
    sku: "1racow",
    category: "gifts-whimsy",
    era: "Anytime",
    description: "Acrylic Cows Wind Chime.",
    image: img("acrylic-cows.jpg"),
  },
  {
    slug: "acrylic-penguin",
    name: "Acrylic Penguin",
    priceCents: 1000,
    sku: "1rapen",
    category: "gifts-whimsy",
    era: "Anytime",
    description: "Acrylic Penguin Wind Chime.",
    image: img("acrylic-penguin.jpg"),
  },
  {
    slug: "acrylic-hearts",
    name: "Acrylic Hearts",
    priceCents: 1000,
    sku: "1rahrt",
    category: "gifts-whimsy",
    era: "Anytime",
    description: "Acrylic Hearts Wind Chime. Small, simple, and says the thing.",
    image: img("acrylic-hearts.jpg"),
  },
  {
    slug: "alabama-crimson-tide",
    name: "Alabama Crimson Tide Helmets (NCAA)",
    priceCents: 2000,
    sku: "2rala",
    category: "sports-teams",
    era: "Game Day",
    description: "2 Ring Alabama Crimson Tide Helmet Wind Chime.",
    image: img("alabama-crimson-tide.jpg"),
  },
  {
    slug: "arkansas-razorbacks",
    name: "Arkansas Razorbacks (NCAA)",
    priceCents: 2500,
    sku: "3rark",
    category: "sports-teams",
    era: "Game Day",
    description: "3 Ring Arkansas Razorbacks Wind Chime.",
    image: img("arkansas-razorbacks.jpg"),
  },
  {
    slug: "atlanta-falcons",
    name: "Atlanta Falcon Helmets (NFL)",
    priceCents: 2000,
    sku: "2ratl",
    category: "sports-teams",
    era: "Game Day",
    description: "2 Ring Atlanta Falcons Helmet Wind Chime.",
    image: img("atlanta-falcons.jpg"),
  },
  {
    slug: "aladdin-figures",
    name: "Aladdin Figures",
    priceCents: 2500,
    sku: "3rala",
    category: "movie-character",
    era: "Storybook",
    description: "3 Ring Aladdin Figures Wind Chime.",
    image: img("aladdin-figures.jpg"),
  },
  {
    slug: "alice-in-wonderland",
    name: "Alice in Wonderland Figures",
    priceCents: 2500,
    sku: "3rali",
    category: "movie-character",
    era: "Storybook",
    description: "3 Ring Alice in Wonderland Figures Wind Chime.",
    image: img("alice-in-wonderland.jpg"),
  },
  {
    slug: "asst-birds",
    name: "Asst. Birds",
    priceCents: 2500,
    sku: "3rbird",
    category: "gifts-whimsy",
    era: "Anytime",
    description: "3 Ring Assorted Birds Wind Chime.",
    image: img("asst-birds.jpg"),
  },
  {
    slug: "bambi-figures",
    name: "Bambi Figures",
    priceCents: 2500,
    sku: "3rbam",
    category: "movie-character",
    era: "Storybook",
    description: "3 Ring Bambi Figures Wind Chime.",
    image: img("bambi-figures.jpg"),
  },
  {
    slug: "batman-cars",
    name: "Batman Cars",
    priceCents: 2500,
    sku: "3rbat",
    category: "movie-character",
    era: "Storybook",
    description: "3 Ring Batman Cars Wind Chime.",
    image: img("batman-cars.jpg"),
  },
  {
    slug: "ford-pickups",
    name: "Ford Pickups",
    priceCents: 2500,
    sku: "3rfordp",
    category: "trucks-tow-trucks",
    era: "1950s",
    description: "3 Ring Ford Pickup Wind Chime.",
    image: img("ford-pickups.jpg"),
  },
].map((p) => ({ specs: S, availability: "in_stock" as string, ...p }));

export const seedEvents = [
  {
    slug: "papillion-lavista-south-arts-crafts-festival-2026",
    title: "Papillion-LaVista South High School Arts & Crafts Festival",
    description:
      "Our big fall show. Come say hello, hear the chimes in person, and pick out your car. We'll be at Space #12 — follow the sound.",
    venue: "Papillion-LaVista South High School",
    address: "10799 Hwy 370, Papillion, NE",
    space: "Space #12",
    startAt: new Date("2026-11-14T09:00:00-06:00"),
    endAt: new Date("2026-11-14T15:00:00-06:00"),
    image: img("1934-street-rod.jpg"),
  },
];

/** Placeholder stories — clearly marked until real testimonials are supplied. */
export const seedReviews = [
  {
    productSlug: "1957-chevys",
    author: "A happy customer in Omaha",
    location: "Omaha, NE",
    rating: 5,
    text:
      "Placeholder review — my dad had a '57 when I was little. He hung this on the porch and just sat with it a while. Thank you.",
  },
  {
    productSlug: "1967-volkswagens",
    author: "A daughter in Lincoln",
    location: "Lincoln, NE",
    rating: 5,
    text:
      "Placeholder review — bought the Bug for my mom, who drove one in college. She cried a little. In a good way.",
  },
  {
    productSlug: "1953-tow-trucks",
    author: "A grandpa in Papillion",
    location: "Papillion, NE",
    rating: 5,
    text:
      "Placeholder review — ran a wrecker for thirty years. The grandkids ring it every time they visit.",
  },
];
