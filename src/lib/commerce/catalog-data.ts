import { ProductDetail } from "./use-commerce";

// Real Pilot Catalog Assets
const imgSalwarSage = "/images/salwar-suit-sage.jpg";
const imgSalwarBerry = "/images/salwar-suit-berry-front.jpg";
const imgSalwarBerryAngle = "/images/salwar-suit-berry-angle.jpg";
const imgSalwarBerryBack = "/images/salwar-suit-berry-back.jpg";
const imgSalwarBerryDetail = "/images/salwar-suit-berry-detail.jpg";
const imgSalwarEmerald = "/images/salwar-suit-emerald.jpg";
const imgSalwarDetail = "/images/salwar-fabric-detail.jpg";
const imgKurtaMustard = "/images/kurta-set-mustard.jpg";
const imgDressRose = "/images/modest-dress-rose.jpg";
const imgHijabOat = "/images/daily-hijab-oat.jpg";
const imgAbayaStone = "/images/everyday-abaya-stone.jpg";
const imgMenKurta = "/images/men-kurta-ivory-front.jpg";
const imgMenKurtaAngle = "/images/men-kurta-ivory-angle.jpg";
const imgMenKurtaBack = "/images/men-kurta-ivory-back.jpg";
const imgMenKurtaDetail = "/images/men-kurta-ivory-detail.jpg";
const imgPrayer = "/images/prayer-mat-set.jpg";
const imgChildKurta = "/images/kids-kurta-mustard-front.jpg";
const imgChildKurtaLifestyle = "/images/kids-kurta-mustard-lifestyle.jpg";
const imgHabitBoard = "/images/children-habit-board.jpg";
const imgBakhoor = "/images/brass-bakhoor-burner.jpg";
const imgBakhoorWarm = "/images/brass-bakhoor-burner-warm.jpg";
const imgGiftBox = "/images/serene-gift-box.jpg";

/**
 * Sukoon House Pilot Master Catalog
 * Real products, real SKUs, real prices, real specs, and real photography.
 */
export const MASTER_CATALOG: Record<string, ProductDetail> = {
  // 1. Pure Cambric Cotton Salwar Suit Set (Sage Green)
  "pure-cambric-cotton-set": {
    id: "pure-cambric-cotton-set",
    sku: "SH-WCS-014-SG",
    kind: "apparel",
    name: "Pure Cambric Cotton Salwar Suit Set",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Salwar Suit Sets"],
    price: 1499,
    mrp: 1799,
    rating: "4.9",
    reviewCount: 38,
    description:
      "A breathable three-piece salwar suit in pure 60s cambric cotton featuring an attached opaque cotton voil lining, semi-elasticated pants, and pure malmal dupatta. Designed with 2-inch inner tailoring margins for modest comfort.",
    gallery: [
      { src: imgSalwarSage, alt: "Sage green pure cambric cotton salwar suit set with dupatta", position: "object-center" },
      { src: imgSalwarDetail, alt: "Macro detail of pure 60s cambric cotton weave, embroidery and attached voil lining", position: "object-top" },
    ],
    colors: [{ name: "Sage Green", swatch: "bg-primary" }],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
      { name: "XXL", stock: "sold-out" },
    ],
    modelNote: 'Model is 5\'6" wearing Size M (Garment Bust 38", Kurta Length 44")',
    specifications: [
      ["Top Fabric", "Pure 60s Cambric Cotton (Breathable plain weave)"],
      ["Bottom", "Matching pure cotton pants with semi-elasticated waist & pockets"],
      ["Dupatta", "Soft lightweight pure cotton malmal (2.25 meters)"],
      ["Lining", "Attached pure cotton voil inner across torso (Sleeves unlined)"],
      ["Stitch Quality", "Interlock reinforced seams with 2-inch tailoring margins"],
    ],
    genericName: "Women's 3-Piece Stitched Salwar Suit Set",
    netQuantity: "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin: "India (Surat)",
  },

  // 2. Berry Floral Print Cambric Salwar Suit Set (Resolves Blue Floral Mismatch to Product Truth)
  "blue-floral-salwar-suit": {
    id: "blue-floral-salwar-suit",
    sku: "SH-WCS-001-BR",
    kind: "apparel",
    name: "Berry Floral Print Cambric Salwar Suit Set",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Salwar Suit Sets"],
    price: 1499,
    mrp: 1799,
    rating: "4.8",
    reviewCount: 28,
    description:
      "A breathable three-piece salwar suit in pure 60s cambric cotton featuring delicate hand-block floral motifs in rich berry maroon, fully lined with soft cotton voil for guaranteed everyday modesty.",
    gallery: [
      { src: imgSalwarBerry, alt: "Full front view of Indian Muslim woman wearing rich berry floral printed cambric cotton salwar suit with draped dupatta", position: "object-center" },
      { src: imgSalwarBerryAngle, alt: "Three-quarter side profile view showing garment silhouette, sleeve cuffs, and draped dupatta fall", position: "object-center" },
      { src: imgSalwarBerryBack, alt: "Back view showing graceful dupatta drape, clean tailored back cut, and matching salwar pants", position: "object-center" },
      { src: imgSalwarBerryDetail, alt: "Macro detail shot of fine zari neckline embroidery, floral block print, and 60s cambric cotton weave", position: "object-top" },
    ],
    colors: [{ name: "Berry Plum", swatch: "bg-[#7B243B]" }],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    modelNote: 'Model is 5\'6" wearing Size M (Garment Bust 38", Kurta Length 44")',
    specifications: [
      ["Top Fabric", "Pure 60s Cambric Cotton (Hand-block floral print in Berry/Maroon)"],
      ["Bottom", "Matching cotton straight pants with side pockets"],
      ["Dupatta", "Soft lightweight pure cotton malmal (2.25 meters)"],
      ["Lining", "Attached pure cotton voil inner across torso"],
      ["Tailoring Margins", "2-inch inner tailoring margins"],
    ],
    genericName: "Women's 3-Piece Stitched Salwar Suit Set",
    netQuantity: "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin: "India (Surat)",
  },

  // 3. Emerald Paisley Cambric Salwar Suit Set
  "emerald-paisley-cambric-salwar-suit": {
    id: "emerald-paisley-cambric-salwar-suit",
    sku: "SH-WCS-002-EM",
    kind: "apparel",
    name: "Emerald Paisley Cambric Salwar Suit Set",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Salwar Suit Sets"],
    price: 1599,
    mrp: 1899,
    rating: "4.9",
    reviewCount: 42,
    description:
      "Vibrant jewel-tone emerald green cambric cotton salwar suit with detailed zari embroidery along the neckline, matching pants, and lightweight printed dupatta.",
    gallery: [
      { src: imgSalwarEmerald, alt: "Emerald green paisley cambric salwar suit with dupatta on model", position: "object-center" },
      { src: imgSalwarDetail, alt: "Intricate zari embroidery and fabric texture detail", position: "object-top" },
    ],
    colors: [{ name: "Emerald Green", swatch: "bg-primary" }],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "in-stock" },
      { name: "XXL", stock: "low" },
    ],
    modelNote: 'Model is 5\'7" wearing Size M (Garment Bust 38", Kurta Length 45")',
    specifications: [
      ["Top Fabric", "Pure 60s Cambric Cotton with Zari Neck Embroidery"],
      ["Bottom", "Emerald cotton trousers with semi-elastic waist"],
      ["Dupatta", "Chanderi-blend lightweight printed dupatta"],
      ["Lining", "Attached pure cotton voil inner"],
      ["Tailoring Margins", "2-inch inner margins on side seams"],
    ],
    genericName: "Women's 3-Piece Stitched Salwar Suit Set",
    netQuantity: "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin: "India (Surat)",
  },

  // 4. Mustard & Coral Cotton Kurta Set
  "everyday-block-print-cotton-kurta": {
    id: "everyday-block-print-cotton-kurta",
    sku: "SH-WKS-003-MC",
    kind: "apparel",
    name: "Mustard & Coral Cotton Kurta Set",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Kurtas & Kurtis"],
    price: 1299,
    mrp: 1599,
    rating: "4.8",
    reviewCount: 56,
    description:
      "Comfortable everyday cotton kurta set featuring mustard floral motifs, delicate neckline embroidery, contrast coral pants, and lightweight dupatta.",
    gallery: [
      { src: imgKurtaMustard, alt: "Mustard yellow embroidered kurta set with coral pants on model", position: "object-center" },
      { src: imgSalwarDetail, alt: "Neckline embroidery and cotton weave detail", position: "object-top" },
    ],
    colors: [{ name: "Mustard Yellow", swatch: "bg-clay" }],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    modelNote: 'Model is 5\'5" wearing Size S (Kurta Length 44", Sleeves 19")',
    specifications: [
      ["Fabric", "100% Breathable Jaipur Cotton"],
      ["Sleeve Length", "Three-Quarter Sleeves (19 inches)"],
      ["Neckline", "Modest Round Neck with subtle split"],
      ["Tailoring Margin", "1.5-inch inner margins on side seams"],
    ],
    genericName: "Women's Stitched Cotton Kurta Set",
    netQuantity: "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin: "India (Jaipur)",
  },

  // 5. Dusty Rose Tiered Modest Dress
  "dusty-rose-tiered-modest-dress": {
    id: "dusty-rose-tiered-modest-dress",
    sku: "SH-WDR-005-DR",
    kind: "apparel",
    name: "Dusty Rose Tiered Modest Dress",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Modest Dresses"],
    price: 1899,
    mrp: 2199,
    rating: "4.8",
    reviewCount: 31,
    description:
      "Flowing modest maxi dress crafted from soft jacquard textured fabric with multi-tiered silhouette, cuffed sleeves, and full cotton lining.",
    gallery: [
      { src: imgDressRose, alt: "Dusty rose tiered modest maxi dress with hijab on model", position: "object-center" },
    ],
    colors: [{ name: "Dusty Rose", swatch: "bg-clay" }],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    specifications: [
      ["Fabric", "Jacquard Textured Cotton-Blend"],
      ["Lining", "Full cotton voil inner (torso & skirt)"],
      ["Length", "Full Length Ankle Silhouette (54 inches)"],
      ["Cuffs", "Comfort elasticated modest cuffs for easy wudhu"],
    ],
    genericName: "Women's Modest Long Dress",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Surat)",
  },

  // 6. Micro-Modal Silk Daily Hijab
  "micro-modal-silk-daily-hijab": {
    id: "micro-modal-silk-daily-hijab",
    sku: "SH-WHJ-003-OT",
    kind: "non-apparel",
    name: "Micro-Modal Silk Daily Hijab",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Hijabs & Accessories"],
    price: 499,
    mrp: 599,
    rating: "4.9",
    reviewCount: 84,
    description:
      "Ultra-soft modal silk hijab with a fluid drape that stays securely in place without pins or hair pulling.",
    gallery: [
      { src: imgHijabOat, alt: "Oat micro-modal silk hijab draped gracefully on model", position: "object-center" },
    ],
    colors: [
      { name: "Oat", swatch: "bg-secondary" },
      { name: "Sage Green", swatch: "bg-primary" },
      { name: "Mocha", swatch: "bg-clay" },
    ],
    specifications: [
      ["Dimensions", "190 × 75 cm"],
      ["Material", "95% Micro-Modal, 5% Mulberry Silk Blend"],
      ["Texture", "Matte crepe finish, non-slip"],
      ["Care", "Gentle cold hand wash or machine delicate cycle"],
    ],
    genericName: "Women's Daily Modest Hijab Wrap",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Surat)",
  },

  // 7. Stone & Aubergine Everyday Nida Abaya
  "premium-nida-everyday-abaya": {
    id: "premium-nida-everyday-abaya",
    sku: "SH-WAB-004-ST",
    kind: "apparel",
    name: "Stone & Aubergine Everyday Nida Abaya",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Abayas"],
    price: 1899,
    mrp: 2299,
    rating: "4.8",
    reviewCount: 47,
    description:
      "Korean-weave Nida abaya featuring a fluid A-line flare, contrast aubergine lapel trim, hidden side pockets, and snap button cuffs for wudhu convenience.",
    gallery: [
      { src: imgAbayaStone, alt: "Stone grey and aubergine trim everyday abaya on model", position: "object-center" },
    ],
    colors: [{ name: "Stone Grey", swatch: "bg-mineral" }],
    sizes: [
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    specifications: [
      ["Fabric", "Premium Korean Nida (Zero cling, wrinkle resistant)"],
      ["Pockets", "Two deep hidden side pockets"],
      ["Cuffs", "Modest snap button cuffs for wudhu roll-up"],
      ["Cut", "Flared modest A-line silhouette"],
    ],
    genericName: "Women's Stitched Modest Abaya",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Surat)",
  },

  // 8. Classic Friday Handloom Cotton Kurta
  "classic-friday-cotton-kurta": {
    id: "classic-friday-cotton-kurta",
    sku: "SH-MK-001",
    kind: "apparel",
    name: "Classic Friday Handloom Cotton Kurta",
    category: "Men's Apparel",
    categoryTrail: ["Men's Apparel", "Kurtas"],
    price: 899,
    mrp: 1099,
    rating: "4.8",
    reviewCount: 93,
    description:
      "Pure breathable handloom cotton kurta with relaxed fit, mandarin collar, coconut buttons, and deep pockets. Ideal for Friday prayers and daily wear.",
    gallery: [
      { src: imgMenKurta, alt: "Full front view of Indian Muslim man wearing ivory handloom cotton kurta with mandarin collar", position: "object-center" },
      { src: imgMenKurtaAngle, alt: "Three-quarter side profile view showing fit, length, and slub fabric texture", position: "object-center" },
      { src: imgMenKurtaBack, alt: "Back view showing shoulder yoke, straight back cut, and side hem slits", position: "object-center" },
      { src: imgMenKurtaDetail, alt: "Macro detail shot of handloom cotton slub weave and coconut shell button", position: "object-top" },
    ],
    colors: [{ name: "Ivory", swatch: "bg-secondary" }],
    sizes: [
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "in-stock" },
      { name: "XXL", stock: "low" },
    ],
    specifications: [
      ["Fabric", "100% Breathable Handloom Cotton (Slub Weave)"],
      ["Collar", "Tailored Mandarin Collar (1.25 inches)"],
      ["Buttons", "Natural polished coconut shell buttons"],
      ["Pockets", "Two deep side seam pockets (fits phone & keys)"],
    ],
    genericName: "Men's Cotton Kurta",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Ahmedabad)",
  },

  // 9. The Stillness Prayer Mat & Rehal Set
  "the-stillness-set": {
    id: "the-stillness-set",
    sku: "SH-PRY-021",
    kind: "non-apparel",
    name: "The Stillness Orthopaedic Memory Foam Prayer Mat & Rehal Set",
    category: "Prayer & Worship",
    categoryTrail: ["Prayer & Worship", "Memory Foam Mats"],
    price: 1499,
    mrp: 1799,
    rating: "4.9",
    reviewCount: 38,
    description:
      "A softly woven linen-cotton prayer mat with 20mm orthopaedic memory foam and solid beech folding rehal, made for quiet daily devotion.",
    gallery: [
      { src: imgPrayer, alt: "Orthopaedic memory foam prayer mat and solid beech folding rehal set", position: "object-center" },
    ],
    colors: [
      { name: "Olive", swatch: "bg-primary" },
      { name: "Oat", swatch: "bg-secondary" },
    ],
    specifications: [
      ["Dimensions", "115 × 70 cm"],
      ["Core", "20mm Orthopaedic High-Density Memory Foam"],
      ["Cover", "Washable Linen-Cotton Blend Musalla"],
      ["Rehal", "Solid Beech Wood with smooth clear matte varnish"],
    ],
    genericName: "Prayer Mat and Rehal Gift Set",
    netQuantity: "1 Set (Prayer Mat: 1 N, Solid Rehal: 1 N)",
    countryOfOrigin: "India (Panipat & Saharanpur)",
  },

  // 10. Boys' Festive Handloom Cotton Kurta Set
  "boys-festive-cotton-kurta-set": {
    id: "boys-festive-cotton-kurta-set",
    sku: "SH-CBK-010-MU",
    kind: "apparel",
    name: "Boys' Festive Handloom Cotton Kurta Set",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Boys' Ethnic Sets"],
    price: 899,
    mrp: 1099,
    rating: "4.8",
    reviewCount: 22,
    description:
      "Comfortable 100% cotton printed kurta with white pyjama for boys. Features modest round neckline with embroidery and soft elasticated waistband.",
    gallery: [
      { src: imgChildKurta, alt: "Indian boy wearing mustard yellow printed cotton kurta with white pajama pants", position: "object-center" },
      { src: imgChildKurtaLifestyle, alt: "Young boy in mustard yellow festive kurta smiling in a warm sunlit home living room", position: "object-center" },
    ],
    colors: [{ name: "Mustard Yellow", swatch: "bg-clay" }],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    specifications: [
      ["Fabric", "100% Pre-Washed Breathable Cotton"],
      ["Pajama", "Pure white cotton pajama with soft elastic waist"],
      ["Care", "Machine wash cold with like colors"],
    ],
    genericName: "Boys' Ethnic Kurta Pajama Set",
    netQuantity: "1 Set (Kurta: 1 N, Pajama: 1 N)",
    countryOfOrigin: "India (Delhi-NCR)",
  },

  // 11. My Daily Salah Wooden Magnetic Habit Board
  "first-forms-set": {
    id: "first-forms-set",
    sku: "SH-KDS-008-NT",
    kind: "non-apparel",
    name: "My Daily Salah Wooden Magnetic Habit Board",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Salah Habit Trackers"],
    price: 899,
    mrp: 1199,
    rating: "4.8",
    reviewCount: 24,
    description:
      "Natural beechwood and birch habit tracker with 35 magnetic tokens to encourage children in daily prayer habits and tarbiyah routines.",
    gallery: [
      { src: imgHabitBoard, alt: "Natural wooden magnetic daily prayer habit tracker board", position: "object-center" },
    ],
    colors: [{ name: "Natural Birch", swatch: "bg-secondary" }],
    specifications: [
      ["Material", "Certified Sustainable Birch Wood with Child-Safe Finish"],
      ["Tokens", "35 Wooden Magnetic Prayer & Good Deed Discs"],
      ["Mounting", "Built-in table stand and wall-hanging cord"],
    ],
    genericName: "Children's Wooden Educational Learning Set",
    netQuantity: "1 Set (Board + 35 Magnetic Tokens)",
    countryOfOrigin: "India (Delhi-NCR)",
  },

  // 12. Cast Brass Charcoal Bakhoor Burner
  "cast-brass-charcoal-bakhoor-burner": {
    id: "cast-brass-charcoal-bakhoor-burner",
    sku: "SH-HBB-022-BR",
    kind: "non-apparel",
    name: "Cast Brass Charcoal Bakhoor Burner",
    category: "Home & Ambiance",
    categoryTrail: ["Home & Ambiance", "Bakhoor Burners"],
    price: 899,
    mrp: 1099,
    rating: "4.7",
    reviewCount: 33,
    description:
      "Handcrafted solid cast brass charcoal incense burner with pierced floral lattice dome lid on walnut tray for fragrant home ambiance and peaceful gathering.",
    gallery: [
      { src: imgBakhoor, alt: "Handcrafted solid cast brass charcoal incense burner with pierced floral lattice dome lid on walnut tray", position: "object-center" },
      { src: imgBakhoorWarm, alt: "Warm ambient setting with rising aromatic bakhoor smoke and natural sunlight", position: "object-center" },
    ],
    colors: [{ name: "Antique Brass", swatch: "bg-clay" }],
    specifications: [
      ["Material", "100% Solid Cast Brass"],
      ["Finish", "Hand-Polished Antique Brass with heat-resistant coating"],
      ["Includes", "Brass tongs and perforated charcoal mesh tray"],
    ],
    genericName: "Brass Charcoal Incense Burner",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Moradabad)",
  },

  // 13. The Serene Prayer Sanctuary Gift Box
  "the-serene-prayer-sanctuary-gift-box": {
    id: "the-serene-prayer-sanctuary-gift-box",
    sku: "SH-GBX-025-PR",
    kind: "non-apparel",
    name: "The Serene Prayer Sanctuary Gift Box",
    category: "Milestone Gifts",
    categoryTrail: ["Milestone Gifts", "Nikah & Milestone Sets"],
    price: 2499,
    mrp: 2899,
    rating: "4.9",
    reviewCount: 29,
    description:
      "Curated milestone gift set featuring 20mm orthopaedic memory foam prayer mat, solid beech wood rehal, 99-bead natural stone tasbih, and 12ml non-alcoholic attar in presentation box.",
    gallery: [
      { src: imgGiftBox, alt: "Luxury milestone gift box presentation with prayer mat and rehal", position: "object-center" },
    ],
    colors: [{ name: "Sanctuary Gift Set", swatch: "bg-primary" }],
    specifications: [
      ["Contents", "20mm Orthopaedic Mat, Beech Rehal, Agate Tasbih, 12ml Attar"],
      ["Packaging", "Rigid Gold-Foil Embossed Gift Box with Ribbon"],
      ["Occasion", "Ideal for Nikah, Housewarming, and Eid Gifting"],
    ],
    genericName: "Curated Islamic Lifestyle Gift Box",
    netQuantity: "1 Gift Box (Mat, Rehal, Tasbih, Attar)",
    countryOfOrigin: "India",
  },
};

// Dual-key support for catalog truth: both new canonical berry handle and legacy handle resolve identically
MASTER_CATALOG["berry-floral-cambric-salwar-suit"] = MASTER_CATALOG["blue-floral-salwar-suit"];

// Aliases mapping common or alternative slugs to canonical catalog keys
const SLUG_ALIASES: Record<string, string> = {
  // Salwar suit aliases
  "pure-cambric-cotton-salwar-suit-set": "pure-cambric-cotton-set",
  "cotton-salwar-suit": "pure-cambric-cotton-set",
  "the-everyday-pair": "pure-cambric-cotton-set",
  "berry-floral-cambric-salwar-suit": "blue-floral-salwar-suit",

  // Men's kurta aliases
  "classic-friday-handloom-cotton-kurta": "classic-friday-cotton-kurta",
  "men-cotton-kurta": "classic-friday-cotton-kurta",

  // Prayer mat aliases
  "the-stillness-prayer-mat-rehal-set": "the-stillness-set",
  "the-stillness-prayer-mat": "the-stillness-set",
  "ergonomic-memory-foam-prayer-mat": "the-stillness-set",

  // Children aliases
  "salah-habit-board": "first-forms-set",
  "my-daily-salah-magnetic-habit-board": "first-forms-set",
  "first-forms-wooden-learning-set": "first-forms-set",

  // Gift box aliases
  "serene-prayer-sanctuary-gift-box": "the-serene-prayer-sanctuary-gift-box",
  // Women's apparel aliases & catalog truth mapping
  "berry-floral-salwar-suit": "blue-floral-salwar-suit",
  "berry-floral-print-cambric-salwar-suit-set": "blue-floral-salwar-suit",

  // Medusa product IDs (prod_01M...)
  "prod-01m39bvmfz576j1p2my4207n2p": "blue-floral-salwar-suit",
  "prod-01m39bvn8359w3kst442xb9jms": "pure-cambric-cotton-set",
  "prod-01m39bvnyxfd09gyc6w2k3gb2s": "the-stillness-set",
  "prod-01m39bvpnz996vnwcs77zmqr8e": "classic-friday-cotton-kurta",
  "prod-01m39bvqajcsjbnsdjzdzwdr64": "first-forms-set",
  "prod-01m3kjhbqpwysvtk517a4y199d": "emerald-paisley-cambric-salwar-suit",
  "prod-01m3kjhcj7bs4z1kap2x615hrn": "everyday-block-print-cotton-kurta",
  "prod-01m3kjhcytmvxrkar3araef8tx": "dusty-rose-tiered-modest-dress",
  "prod-01m3kjhd9hax3x6xsbv2e95px5": "micro-modal-silk-daily-hijab",
  "prod-01m3kjhdmdjwgqgxjxprke20ee": "premium-nida-everyday-abaya",
  "prod-01m3kjhe6e1wr7bxw0qttw48dq": "boys-festive-cotton-kurta-set",
  "prod-01m3kjhepsrxv565e6epwz0svv": "cast-brass-charcoal-bakhoor-burner",
  "prod-01m3kjhf0na1twa9zrdthe8sjx": "the-serene-prayer-sanctuary-gift-box",
};

/**
 * Looks up a catalog product by slug/handle/alias without inventing a fallback.
 * Returns null when the handle is unknown — safe for image preference logic.
 */
export function findCatalogProduct(slug: string): ProductDetail | null {
  if (!slug) return null;

  const clean = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (MASTER_CATALOG[clean]) {
    return MASTER_CATALOG[clean];
  }

  const aliased = SLUG_ALIASES[clean];
  if (aliased && MASTER_CATALOG[aliased]) {
    return MASTER_CATALOG[aliased];
  }

  const keys = Object.keys(MASTER_CATALOG);
  const foundKey = keys.find((k) => clean.includes(k) || k.includes(clean));
  if (foundKey) {
    return MASTER_CATALOG[foundKey];
  }

  return null;
}

/**
 * Resolves ANY slug or product ID to its authentic ProductDetail.
 */
export function resolveProductBySlug(slug: string): ProductDetail {
  return findCatalogProduct(slug) ?? MASTER_CATALOG["pure-cambric-cotton-set"];
}
