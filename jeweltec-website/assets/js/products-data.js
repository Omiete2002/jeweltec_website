/* =========================================================================
   JEWELTEC — PRODUCT CATALOG
   -------------------------------------------------------------------------
   This is the ONLY place you need to edit to add, remove, or update a
   product. Every page (home, products, product detail, admin dashboard,
   cart) reads from this same array, so a change here updates the whole
   site instantly.

   HOW TO ADD A NEW PRODUCT
   1. Copy an existing object below (the { ... } block) and paste it at
      the end of the PRODUCTS array, just before the closing "];".
   2. Give it a unique "id" (just increase the number by 1).
   3. Update every field. Prices are plain numbers in Nigerian Naira
      (no commas, no ₦ symbol — the site adds formatting automatically).
   4. Upload your product photos into assets/images/products/ and point
      "image" and "gallery" at the filenames you used.
   5. Save the file. That's it — no build step, no database.

   HOW TO REMOVE A PRODUCT
   Delete its whole { ... } object from the array (including the comma
   that follows it).

   HOW TO MARK SOMETHING SOLD / FEATURE IT ON THE HOMEPAGE
   Change "available" to false, or "featured" to true / false.
   ========================================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Royal Woko Gold Necklace",
    category: "WOKO",
    price: 385000,
    available: true,
    featured: true,
    image: "assets/images/products/product-01.jpg",
    gallery: [
      "assets/images/products/product-01.jpg",
      "assets/images/products/product-03.jpg",
      "assets/images/products/product-07.jpg"
    ],
    shortDescription: "A ceremonial multi-strand gold necklace inspired by traditional Woko regalia.",
    description: "Handcrafted in our Port Harcourt workshop, the Royal Woko Gold Necklace layers multiple strands of fine gold links into a single ceremonial piece. Inspired by the traditional regalia worn by titled chiefs and brides across the Niger Delta, it is built to be the centrepiece of a milestone occasion — a wedding, a chieftaincy title, or a landmark birthday.",
    materials: "18k solid gold, hand-linked chains",
    occasions: "Traditional weddings, chieftaincy ceremonies, milestone birthdays",
    care: "Store flat in a lined box, avoid contact with perfume and lotion, polish gently with a soft gold cloth."
  },
  {
    id: 2,
    name: "Coral Accent Gold Bangle Set",
    category: "ETIBO",
    price: 145000,
    available: true,
    featured: true,
    image: "assets/images/products/product-02.jpg",
    gallery: [
      "assets/images/products/product-02.jpg",
      "assets/images/products/product-13.jpg"
    ],
    shortDescription: "A set of five gold bangles finished with coral-toned accent stones.",
    description: "This set of five hand-finished gold bangles pairs warm coral-toned accent stones with a polished gold band, echoing the coral jewelry long treasured across West African royal courts. Wear the full set stacked for occasions, or individually for everyday elegance.",
    materials: "18k gold-plated brass, coral-tone glass accents",
    occasions: "Traditional ceremonies, engagement events, everyday luxury",
    care: "Remove before washing hands or swimming; wipe with a dry soft cloth after wear."
  },
  {
    id: 3,
    name: "Ancestral Coin Necklace",
    category: "DON",
    price: 260000,
    available: true,
    featured: true,
    image: "assets/images/products/product-03.jpg",
    gallery: [
      "assets/images/products/product-03.jpg",
      "assets/images/products/product-01.jpg",
      "assets/images/products/product-12.jpg"
    ],
    shortDescription: "Layered coin-motif gold chains that honour a heritage of hand-poured goldsmithing.",
    description: "Each disc in the Ancestral Coin Necklace is individually cast and polished by hand, then layered across graduated chains for a look of quiet abundance. A modern heirloom piece built on techniques passed down through generations of Jeweltec goldsmiths.",
    materials: "18k solid gold",
    occasions: "Traditional weddings, cultural festivals, formal portraits",
    care: "Store separately to avoid tangling; have clasps checked annually at our workshop."
  },
  {
    id: 4,
    name: "Golden Radiance Pendant Necklace",
    category: "GOLD BEADS",
    price: 95000,
    available: true,
    featured: false,
    image: "assets/images/products/product-04.jpg",
    gallery: [
      "assets/images/products/product-04.jpg",
      "assets/images/products/product-17.jpg"
    ],
    shortDescription: "A single-strand gold chain finished with a hand-set radiant pendant.",
    description: "Understated and versatile, the Golden Radiance Pendant Necklace pairs a fine gold chain with a single hand-set pendant. Designed for daily wear that still carries the weight of fine craftsmanship — equally at home at the office or an evening out.",
    materials: "18k solid gold",
    occasions: "Everyday wear, office, dinner engagements",
    care: "Wipe after wear with a soft cloth; avoid contact with chlorine and perfume."
  },
  {
    id: 5,
    name: "Coral & Gold Heritage Necklace",
    category: "OTHER TRADITIONAL SET",
    price: 210000,
    available: true,
    featured: false,
    image: "assets/images/products/product-05.jpg",
    gallery: ["assets/images/products/product-05.jpg"],
    shortDescription: "Hand-strung coral-tone beads bordered in gold, a nod to royal Niger Delta regalia.",
    description: "Coral beading has long signified status and heritage across Nigeria's coastal kingdoms. Our Heritage Necklace hand-strings coral-toned beads and borders them in gold link work, honouring that tradition in a piece made for today's celebrations.",
    materials: "18k gold accents, coral-tone beads",
    occasions: "Traditional weddings, coronation and title ceremonies",
    care: "Keep away from direct sunlight for extended periods; store in the provided pouch."
  },
  {
    id: 6,
    name: "Layered Gold Bead Necklace",
    category: "WOKO",
    price: 130000,
    available: true,
    featured: false,
    image: "assets/images/products/product-06.jpg",
    gallery: ["assets/images/products/product-06.jpg", "assets/images/products/product-16.jpg"],
    shortDescription: "Three graduated strands of hand-rolled gold beads.",
    description: "Three graduated strands of hand-rolled gold beads combine for a necklace with real presence but a comfortable, everyday weight. A favourite for customers wanting one statement piece that pairs with almost anything.",
    materials: "18k solid gold beads",
    occasions: "Church, parties, family gatherings",
    care: "Store flat to keep strands from tangling; polish monthly with a gold cloth."
  },
  {
    id: 7,
    name: "Grand Ceremonial Gold Necklace",
    category: "ETIBO",
    price: 450000,
    available: true,
    featured: true,
    image: "assets/images/products/product-07.jpg",
    gallery: ["assets/images/products/product-07.jpg", "assets/images/products/product-09.jpg"],
    shortDescription: "Our most elaborate hand-built ceremonial piece, layered across six strands.",
    description: "Our most elaborate ceremonial piece, the Grand Ceremonial Gold Necklace layers six strands of fine gold link work into a single commanding silhouette. Reserved for once-in-a-lifetime occasions — traditional weddings, coronations, and milestone celebrations — and typically made to order.",
    materials: "18k solid gold, hand-assembled",
    occasions: "Traditional weddings, coronations, milestone celebrations",
    care: "Professional cleaning recommended after each wear; store in a lined case."
  },
  {
    id: 8,
    name: "Classic Gold Pendant Chain",
    category: "DON",
    price: 68000,
    available: true,
    featured: false,
    image: "assets/images/products/product-08.jpg",
    gallery: ["assets/images/products/product-08.jpg"],
    shortDescription: "A timeless fine gold chain with a delicate drop pendant.",
    description: "A timeless fine gold chain finished with a delicate drop pendant — the kind of piece meant to be worn every day and passed down when the day comes. Simple, well-made, and endlessly wearable.",
    materials: "18k solid gold",
    occasions: "Everyday wear, gifting",
    care: "Remove before sleeping or exercising; wipe clean after each wear."
  },
  {
    id: 9,
    name: "Ile-Oba Traditional Gold Set",
    category: "GOLD BEADS",
    price: 320000,
    available: true,
    featured: false,
    image: "assets/images/products/product-09.jpg",
    gallery: ["assets/images/products/product-09.jpg", "assets/images/products/product-11.jpg"],
    shortDescription: "A regal layered set named for the royal households it was designed to echo.",
    description: "Named for the royal households ('Ile-Oba') whose regalia inspired it, this layered gold set is built for brides and titled guests who want a traditional silhouette with contemporary polish. Comes beautifully boxed, ready for gifting or presentation.",
    materials: "18k solid gold",
    occasions: "Traditional weddings, chieftaincy title events",
    care: "Have clasps and links inspected at our workshop after the first year of wear."
  },
  {
    id: 10,
    name: "Medallion Statement Necklace",
    category: "OTHER TRADITIONAL SET",
    price: 175000,
    available: true,
    featured: false,
    image: "assets/images/products/product-10.jpg",
    gallery: ["assets/images/products/product-10.jpg"],
    shortDescription: "A bold gold medallion suspended from a layered chain.",
    description: "A bold circular medallion, hand-engraved and suspended from a layered gold chain, gives this necklace real presence without ceremonial scale. A strong choice for portraits, parties, and evening wear.",
    materials: "18k solid gold",
    occasions: "Parties, portraits, evening wear",
    care: "Avoid contact with perfume; store separately from other chains."
  },
  {
    id: 11,
    name: "Adaeze Gold Jewelry Set",
    category: "WOKO",
    price: 240000,
    available: true,
    featured: true,
    image: "assets/images/products/product-11.jpg",
    gallery: ["assets/images/products/product-11.jpg", "assets/images/products/product-09.jpg"],
    shortDescription: "A matching necklace and earring set fit for a princess bride.",
    description: "'Adaeze' means 'daughter of a king' — a fitting name for this matching necklace and earring set, hand-finished to complement a traditional bridal look from every angle. Sold as a complete two-piece set.",
    materials: "18k solid gold",
    occasions: "Traditional weddings, bridal showers",
    care: "Store the set together in its box; clean gently with a jewelry cloth before big events."
  },
  {
    id: 12,
    name: "Coin Cascade Necklace",
    category: "ETIBO",
    price: 155000,
    available: true,
    featured: false,
    image: "assets/images/products/product-12.jpg",
    gallery: ["assets/images/products/product-12.jpg", "assets/images/products/product-03.jpg"],
    shortDescription: "Cascading rows of miniature gold coin discs.",
    description: "Cascading rows of miniature hand-cast coin discs give this piece movement and light with every step. A modern take on a heritage motif, finished entirely by hand in our Port Harcourt studio.",
    materials: "18k solid gold",
    occasions: "Parties, cultural events, gifting",
    care: "Polish gently with a soft cloth; avoid tangling by storing flat."
  },
  {
    id: 13,
    name: "Classic Gold Bangle Set",
    category: "DON",
    price: 120000,
    available: true,
    featured: false,
    image: "assets/images/products/product-13.jpg",
    gallery: ["assets/images/products/product-13.jpg", "assets/images/products/product-02.jpg"],
    shortDescription: "A stackable set of six polished gold bangles.",
    description: "A stackable set of six polished gold bangles, sized for a comfortable everyday fit. Wear the full set for a bold look, or split them across both wrists for something more subtle.",
    materials: "18k gold-plated brass",
    occasions: "Everyday wear, casual outings, gifting",
    care: "Remove before washing hands; store in a dry, lined box."
  },
  {
    id: 14,
    name: "Sovereign Gold & Ruby Necklace",
    category: "GOLD BEADS",
    price: 295000,
    available: true,
    featured: false,
    image: "assets/images/products/product-14.jpg",
    gallery: ["assets/images/products/product-14.jpg"],
    shortDescription: "A layered gold necklace accented with deep ruby-toned stones.",
    description: "Deep ruby-toned stones punctuate a layered gold chain design for a necklace that reads as regal without tipping into ceremonial scale — ideal for galas, receptions, and formal portraits.",
    materials: "18k solid gold, ruby-tone accent stones",
    occasions: "Galas, receptions, formal portraits",
    care: "Avoid knocking the stone settings against hard surfaces; store in the provided pouch."
  },
  {
    id: 15,
    name: "Signature Gold Ring Collection",
    category: "OTHER TRADITIONAL SET",
    price: 85000,
    available: true,
    featured: true,
    image: "assets/images/products/product-15.jpg",
    gallery: ["assets/images/products/product-15.jpg"],
    shortDescription: "Hand-finished gold rings, available individually or as a curated set.",
    description: "Our Signature Ring Collection covers everything from slim stacking bands to statement signet-style pieces, all hand-finished in-house. Visit our showroom or message us on WhatsApp with a size and style preference and we will confirm availability.",
    materials: "18k solid gold",
    occasions: "Engagements, gifting, everyday wear",
    care: "Remove before manual work or swimming; have prongs checked annually."
  },
  {
    id: 16,
    name: "Heritage Bead Pendant Necklace",
    category: "WOKO",
    price: 110000,
    available: true,
    featured: false,
    image: "assets/images/products/product-16.jpg",
    gallery: ["assets/images/products/product-16.jpg", "assets/images/products/product-06.jpg"],
    shortDescription: "Hand-rolled gold beads finished with a central heritage pendant.",
    description: "Hand-rolled gold beads lead down to a central pendant inspired by traditional motifs passed through generations of Jeweltec goldsmiths. A meaningful gift piece as much as a personal one.",
    materials: "18k solid gold",
    occasions: "Gifting, church, family celebrations",
    care: "Wipe with a soft cloth after wear; store away from direct sunlight."
  },
  {
    id: 17,
    name: "Elegance Gold Drop Necklace",
    category: "ETIBO",
    price: 78000,
    available: true,
    featured: false,
    image: "assets/images/products/product-17.jpg",
    gallery: ["assets/images/products/product-17.jpg", "assets/images/products/product-04.jpg"],
    shortDescription: "A slender gold chain finished with a graceful drop pendant.",
    description: "A slender gold chain finished with a graceful drop pendant, designed for effortless everyday elegance. Lightweight enough for all-day wear, refined enough for evening.",
    materials: "18k solid gold",
    occasions: "Everyday wear, office, date nights",
    care: "Avoid contact with lotion and perfume; store flat to prevent kinking."
  },
  {
    id: 18,
    name: "Timeless Gold Chain Necklace",
    category: "DON",
    price: 89000,
    available: false,
    featured: false,
    image: "assets/images/products/product-18.jpg",
    gallery: ["assets/images/products/product-18.jpg"],
    shortDescription: "A classic layered gold chain — currently sold, restocking soon.",
    description: "A classic layered gold chain built for versatility, dressing up or down with equal ease. This particular piece has been sold; a similar design can be commissioned through our custom jewelry service.",
    materials: "18k solid gold",
    occasions: "Everyday wear, layering piece",
    care: "Wipe clean after wear; store separately to avoid scratching."
  }
];

/* Categories are derived automatically from the product list above so this
   list never needs to be updated by hand — but you can override the order
   here if you want specific categories to appear first in the filter bar. */
const CATEGORY_ORDER = ["WOKO", "ETIBO", "DON", "GOLD BEADS", "OTHER TRADITIONAL SET"];

function getAllCategories() {
  const present = [...new Set(PRODUCTS.map(p => p.category))];
  return CATEGORY_ORDER.filter(c => present.includes(c))
    .concat(present.filter(c => !CATEGORY_ORDER.includes(c)));
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function getRelatedProducts(product, limit = 4) {
  return PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

function getFeaturedProducts(limit = 6) {
  return PRODUCTS.filter(p => p.featured).slice(0, limit);
}
