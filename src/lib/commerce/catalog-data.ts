import imgModest from "@/assets/product-modest-set.jpg";
import imgMenKurta from "@/assets/product-men-kurta.jpg";
import imgPrayer from "@/assets/product-prayer-set.jpg";
import imgChild from "@/assets/product-child-set.jpg";
import imgBundle from "@/assets/product-bundle.jpg";
import editorialHome from "@/assets/editorial-home-calm.jpg";
import { ProductDetail } from "./use-commerce";

export const MASTER_CATALOG: Record<string, ProductDetail> = {
  // 1. Pure Cambric Cotton Salwar Suit Set
  "pure-cambric-cotton-salwar-suit-set": {
    id: "pure-cambric-cotton-salwar-suit-set",
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
      "A breathable three-piece salwar suit in pure 60s cambric cotton, fully lined with soft cotton voil for guaranteed everyday modesty.",
    gallery: [
      { src: imgModest, alt: "Sage and stone cotton salwar suit fabric set", position: "object-center" },
      { src: imgModest, alt: "Close view of soft cambric cotton texture and stitching", position: "object-top" },
      { src: editorialHome, alt: "Pure cotton set styled in a calm home setting", position: "object-center" },
    ],
    colors: [
      { name: "Sage Green", swatch: "bg-primary" },
      { name: "Natural Sand", swatch: "bg-secondary" },
      { name: "Stone Grey", swatch: "bg-mineral" },
    ],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "low" },
      { name: "XL", stock: "in-stock" },
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
    countryOfOrigin: "India (Handcrafted in Surat / Bengaluru)",
  },

  // 2. Everyday Block Print Cotton Kurta
  "everyday-block-print-cotton-kurta": {
    id: "everyday-block-print-cotton-kurta",
    sku: "SH-WKT-002-IN",
    kind: "apparel",
    name: "Everyday Block Print Cotton Kurta",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Kurtas & Kurtis"],
    price: 799,
    mrp: 999,
    rating: "4.7",
    reviewCount: 112,
    description:
      "Comfortable daily-wear straight cotton kurta with natural indigo block prints, round split neckline, and deep pockets.",
    gallery: [
      { src: imgModest, alt: "Everyday block print cotton kurta", position: "object-center" },
      { src: editorialHome, alt: "Indigo kurta in daylight", position: "object-center" },
    ],
    colors: [
      { name: "Indigo Blue", swatch: "bg-mineral" },
      { name: "Madder Red", swatch: "bg-clay" },
    ],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
      { name: "XXL", stock: "in-stock" },
    ],
    modelNote: 'Model is 5\'5" wearing Size S (Kurta Length 44", Sleeves 19")',
    specifications: [
      ["Fabric", "100% Breathable Jaipur Block Print Cotton"],
      ["Sleeve Length", "Three-Quarter Sleeves (19 inches)"],
      ["Neckline", "Modest Round Neck with 5.5-inch slit"],
      ["Tailoring Margin", "1.5-inch inner margins on side seams"],
    ],
    genericName: "Women's Stitched Cotton Kurta",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Handcrafted in Sanganer / Rajasthan)",
  },

  // 3. Micro-Modal Silk Daily Hijab
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
    reviewCount: 208,
    description:
      "Ultra-soft modal silk hijab with a fluid drape that stays securely in place without pins or hair pulling.",
    gallery: [
      { src: imgModest, alt: "Oat modal silk hijab draped neatly", position: "object-center" },
    ],
    colors: [
      { name: "Oat", swatch: "bg-secondary" },
      { name: "Mocha", swatch: "bg-clay" },
      { name: "Slate", swatch: "bg-mineral" },
    ],
    specifications: [
      ["Dimensions", "190 × 75 cm"],
      ["Material", "95% Micro-Modal, 5% Mulberry Silk Blend"],
      ["Texture", "Matte crepe finish, zero slip"],
      ["Care", "Gentle machine wash with mild detergent"],
    ],
    genericName: "Women's Daily Modest Hijab Wrap",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Surat)",
  },

  // 4. Premium Nida Everyday Abaya
  "premium-nida-everyday-abaya": {
    id: "premium-nida-everyday-abaya",
    sku: "SH-WAB-004-ST",
    kind: "apparel",
    name: "Premium Nida Everyday Abaya",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Abayas"],
    price: 1899,
    mrp: 2199,
    rating: "4.8",
    reviewCount: 47,
    description:
      "Korean-weave Nida abaya featuring a fluid A-line flare, hidden side pockets, and snap button cuffs for wudhu convenience.",
    gallery: [
      { src: imgModest, alt: "Stone grey Nida everyday abaya", position: "object-center" },
    ],
    colors: [
      { name: "Stone Grey", swatch: "bg-mineral" },
      { name: "Pure Midnight", swatch: "bg-primary" },
    ],
    sizes: [
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    specifications: [
      ["Fabric", "Premium Matte Korean Nida (100% Polyester Microfiber)"],
      ["Length", "54 inches (Size M), 56 inches (Size L), 58 inches (Size XL)"],
      ["Sleeve Cuffs", "Concealed snap buttons for easy wudhu roll-up"],
      ["Opacity", "100% Opaque (No slip required)"],
    ],
    genericName: "Women's Full-Length Abaya Dress",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Mumbai)",
  },

  // 5. Chanderi Tiered Modest Dress
  "chanderi-tiered-modest-dress": {
    id: "chanderi-tiered-modest-dress",
    sku: "SH-WDR-005-DR",
    kind: "apparel",
    name: "Chanderi Tiered Modest Dress",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Modest Dresses"],
    price: 2299,
    mrp: 2699,
    rating: "4.6",
    reviewCount: 21,
    description:
      "Handloom Chanderi silk-cotton tiered maxi dress with woven zari borders and full cotton voil lining.",
    gallery: [
      { src: imgModest, alt: "Chanderi tiered modest dress in dusty rose", position: "object-center" },
    ],
    colors: [
      { name: "Dusty Rose", swatch: "bg-clay" },
      { name: "Sage", swatch: "bg-primary" },
    ],
    sizes: [
      { name: "S", stock: "sold-out" },
      { name: "M", stock: "sold-out" },
      { name: "L", stock: "sold-out" },
    ],
    specifications: [
      ["Outer Fabric", "Chanderi Silk-Cotton Blend (Handwoven)"],
      ["Inner Lining", "100% Breathable Cotton Voil full length"],
      ["Fit", "Tiered empire waist with gathered volume"],
    ],
    genericName: "Women's Ethnic Festive Maxi Dress",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Chanderi / Madhya Pradesh)",
  },

  // 6. Classic Friday Handloom Cotton Kurta
  "classic-friday-handloom-cotton-kurta": {
    id: "classic-friday-handloom-cotton-kurta",
    sku: "SH-MK-001-IV",
    kind: "apparel",
    name: "Classic Friday Handloom Cotton Kurta",
    category: "Men's Apparel",
    categoryTrail: ["Men's Apparel", "Kurtas"],
    price: 899,
    mrp: 1099,
    rating: "4.8",
    reviewCount: 93,
    description:
      "Crisp, breathable long-staple handloom cotton kurta with mandarin collar, mother-of-pearl buttons, and deep side pockets for Jummah and gatherings.",
    gallery: [
      { src: imgMenKurta, alt: "Soft white handloom cotton kurta with mandarin collar", position: "object-center" },
      { src: imgMenKurta, alt: "Close view of weave and buttons", position: "object-top" },
    ],
    colors: [
      { name: "Soft White", swatch: "bg-secondary" },
      { name: "Warm Ivory", swatch: "bg-clay" },
      { name: "Mist Grey", swatch: "bg-mineral" },
    ],
    sizes: [
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
      { name: "XXL", stock: "in-stock" },
    ],
    modelNote: 'Model is 5\'11" wearing Size L (Chest 42", Kurta Length 42")',
    specifications: [
      ["Fabric", "100% Pure Handloom Long-Staple Cotton"],
      ["Collar", "Structured Mandarin Collar with top stitch"],
      ["Buttons", "Natural mother-of-pearl buttons"],
      ["Pockets", "Dual functional side-seam pockets (fits 6.7\" phone)"],
    ],
    genericName: "Men's Handloom Cotton Kurta",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Handcrafted in Ahmedabad / Gujarat)",
  },

  // 7. Stitched Kurta-Pajama Set
  "stitched-kurta-pajama-set": {
    id: "stitched-kurta-pajama-set",
    sku: "SH-MKP-007-MG",
    kind: "apparel",
    name: "Stitched Kurta-Pajama Set",
    category: "Men's Apparel",
    categoryTrail: ["Men's Apparel", "Kurta-Pajama Sets"],
    price: 1299,
    mrp: 1499,
    rating: "4.7",
    reviewCount: 58,
    description:
      "A complete two-piece ethnic set in fine cambric cotton with matching drawstring churidar pajama.",
    gallery: [
      { src: imgMenKurta, alt: "Mist grey stitched kurta-pajama set", position: "object-center" },
    ],
    colors: [
      { name: "Mist Grey", swatch: "bg-mineral" },
      { name: "Natural Ivory", swatch: "bg-secondary" },
    ],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    specifications: [
      ["Kurta Fabric", "Pure 60s Cambric Cotton"],
      ["Pajama Fabric", "Matching Cotton with cotton drawstring"],
      ["Care", "Machine wash cold, warm iron"],
    ],
    genericName: "Men's 2-Piece Kurta Pajama Set",
    netQuantity: "1 Set (Kurta: 1 N, Pajama: 1 N)",
    countryOfOrigin: "India (Surat)",
  },

  // 8. Linen-Cotton Pathani Suit
  "linen-cotton-pathani-suit": {
    id: "linen-cotton-pathani-suit",
    sku: "SH-MPS-008-OL",
    kind: "apparel",
    name: "Linen-Cotton Pathani Suit",
    category: "Men's Apparel",
    categoryTrail: ["Men's Apparel", "Pathani Suits"],
    price: 1599,
    mrp: 1899,
    rating: "4.6",
    reviewCount: 34,
    description:
      "Relaxed-fit olive Pathani suit with classic shirt collar, shoulder epaulettes, and roomy salwar bottom.",
    gallery: [
      { src: imgMenKurta, alt: "Linen-cotton pathani suit in olive", position: "object-center" },
    ],
    colors: [
      { name: "Olive", swatch: "bg-primary" },
      { name: "Charcoal", swatch: "bg-mineral" },
    ],
    sizes: [
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
      { name: "XXL", stock: "in-stock" },
    ],
    specifications: [
      ["Fabric", "55% European Linen, 45% Organic Cotton Blend"],
      ["Details", "Flap chest pockets with box pleat & shoulder flaps"],
      ["Salwar", "Traditional loose-cut pleated salwar with drawstring"],
    ],
    genericName: "Men's 2-Piece Pathani Salwar Suit",
    netQuantity: "1 Set (Kurta: 1 N, Salwar: 1 N)",
    countryOfOrigin: "India (Delhi / NCR)",
  },

  // 9. Breathable Knit Kufi Prayer Cap
  "breathable-knit-kufi-prayer-cap": {
    id: "breathable-knit-kufi-prayer-cap",
    sku: "SH-MPC-009-WH",
    kind: "non-apparel",
    name: "Breathable Knit Kufi Prayer Cap",
    category: "Men's Apparel",
    categoryTrail: ["Men's Apparel", "Prayer Caps"],
    price: 299,
    mrp: 399,
    rating: "4.5",
    reviewCount: 76,
    description:
      "Stretchable 100% mercerized cotton crochet kufi with open ventilation holes for all-day comfort.",
    gallery: [
      { src: imgBundle, alt: "Breathable knit kufi prayer cap in white", position: "object-center" },
    ],
    colors: [
      { name: "White", swatch: "bg-secondary" },
      { name: "Black", swatch: "bg-primary" },
    ],
    specifications: [
      ["Sizing", "One size fits all (circumference stretches 54–60 cm)"],
      ["Yarn", "100% Combed Mercerized Cotton"],
      ["Knit", "Traditional open-mesh dome"],
    ],
    genericName: "Men's Crochet Prayer Cap (Kufi)",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Hyderabad)",
  },

  // 10. Boys' Festive Cotton Kurta Set
  "boys-festive-cotton-kurta-set": {
    id: "boys-festive-cotton-kurta-set",
    sku: "SH-CBK-010-SD",
    kind: "apparel",
    name: "Boys' Festive Cotton Kurta Set",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Boys' Wear"],
    price: 799,
    mrp: 999,
    rating: "4.8",
    reviewCount: 41,
    description:
      "Soft skin-friendly cotton kurta and elasticated pajama set designed specifically for boys aged 2 to 10.",
    gallery: [
      { src: imgChild, alt: "Boys festive cotton kurta set in sand", position: "object-center" },
    ],
    colors: [
      { name: "Sand", swatch: "bg-secondary" },
      { name: "Sage", swatch: "bg-primary" },
    ],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "low" },
    ],
    specifications: [
      ["Age Range", "Size S (2–4 yrs), Size M (5–7 yrs), Size L (8–10 yrs)"],
      ["Fabric", "100% Pre-Washed Hypoallergenic Cotton"],
      ["Waistband", "Soft fully encased elastic waistband"],
    ],
    genericName: "Boys' Ethnic Kurta Pajama Set",
    netQuantity: "1 Set (Kurta: 1 N, Pajama: 1 N)",
    countryOfOrigin: "India (Jaipur)",
  },

  // 11. Girls' Cotton Sharara Suit
  "girls-cotton-sharara-suit": {
    id: "girls-cotton-sharara-suit",
    sku: "SH-CGK-011-BL",
    kind: "apparel",
    name: "Girls' Cotton Sharara Suit",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Girls' Wear"],
    price: 999,
    mrp: 1199,
    rating: "4.9",
    reviewCount: 29,
    description:
      "Blush pink pure cotton short kurta, flared tiered sharara pants, and soft net dupatta with pompom lace.",
    gallery: [
      { src: imgChild, alt: "Girls cotton sharara suit in blush pink", position: "object-center" },
    ],
    colors: [
      { name: "Blush Pink", swatch: "bg-clay" },
      { name: "Mint Green", swatch: "bg-primary" },
    ],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
    ],
    specifications: [
      ["Age Suitability", "Size S (3–5 yrs), Size M (6–9 yrs)"],
      ["Fabric", "100% Breathable Malmal Cotton"],
      ["Lining", "Fully lined with soft cotton voil"],
    ],
    genericName: "Girls' 3-Piece Festive Sharara Suit",
    netQuantity: "1 Set (Kurta: 1 N, Sharara: 1 N, Dupatta: 1 N)",
    countryOfOrigin: "India (Surat)",
  },

  // 12. My Daily Salah Magnetic Habit Board
  "my-daily-salah-magnetic-habit-board": {
    id: "my-daily-salah-magnetic-habit-board",
    sku: "SH-CLH-012-BR",
    kind: "non-apparel",
    name: "My Daily Salah Magnetic Habit Board",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Habit Boards"],
    price: 899,
    mrp: 999,
    rating: "4.9",
    reviewCount: 152,
    description:
      "Solid birch framed magnetic board with 35 wooden milestone tokens and daily prayer checkpoints for positive tarbiyah.",
    gallery: [
      { src: imgChild, alt: "Children magnetic salah habit board with wooden tokens", position: "object-center" },
    ],
    colors: [
      { name: "Birch Wood", swatch: "bg-secondary" },
    ],
    specifications: [
      ["Dimensions", "A3 Size (42 × 29.7 cm)"],
      ["Components", "1 Wooden Framed Magnetic Board, 35 Beech Magnets, 1 Dry-Erase Pen"],
      ["Safety", "CE certified non-toxic water-based paints and rounded magnetic edges"],
    ],
    genericName: "Children's Salah Magnetic Habit Tracker",
    netQuantity: "1 Kit",
    countryOfOrigin: "India (Channapatna / Bengaluru)",
  },

  // 13. Arabic Alphabet Wooden Tracing Board
  "arabic-alphabet-wooden-tracing-board": {
    id: "arabic-alphabet-wooden-tracing-board",
    sku: "SH-CLT-013-BC",
    kind: "non-apparel",
    name: "Arabic Alphabet Wooden Tracing Board",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Learning Toys"],
    price: 649,
    mrp: 799,
    rating: "4.7",
    reviewCount: 67,
    description:
      "Double-sided grooved beechwood board with wooden stylus for tactile Arabic letter formation and early literacy.",
    gallery: [
      { src: imgChild, alt: "Arabic alphabet wooden tracing board with stylus", position: "object-center" },
    ],
    colors: [
      { name: "Natural Beech", swatch: "bg-clay" },
    ],
    specifications: [
      ["Dimensions", "30 × 24 × 1.5 cm"],
      ["Wood", "FSC-certified solid steamed European beechwood"],
      ["Finish", "Organic food-safe walnut oil"],
    ],
    genericName: "Wooden Arabic Letter Tracing Board with Stylus",
    netQuantity: "1 Board + 1 Stylus",
    countryOfOrigin: "India (Saharanpur)",
  },

  // 14. First Forms Wooden Learning Set
  "first-forms-set": {
    id: "first-forms-set",
    sku: "SH-KDS-008-NT",
    kind: "non-apparel",
    name: "First Forms Wooden Learning Set",
    category: "Children & Tarbiyah",
    categoryTrail: ["Children & Tarbiyah", "Learning & Habit Sets"],
    price: 1999,
    mrp: 2299,
    rating: "4.8",
    reviewCount: 24,
    description:
      "Natural beechwood tactile forms and organic cotton wrap for calm, low-noise sensory learning and tarbiyah.",
    gallery: [
      { src: imgChild, alt: "Natural wooden forms and cotton blanket", position: "object-center" },
    ],
    colors: [
      { name: "Natural Beech", swatch: "bg-clay" },
    ],
    specifications: [
      ["Age Suitability", "3 to 8 Years"],
      ["Piece Count", "6 Solid Beechwood Nesting Elements + 1 Organic Wrap"],
      ["Wood Finish", "Food-safe, non-toxic natural beeswax coating"],
    ],
    genericName: "Children's Wooden Educational Learning Set",
    netQuantity: "1 Set (6 Elements + Wrap)",
    countryOfOrigin: "India (Channapatna / Karnataka)",
  },

  // 15. The Stillness Prayer Mat & Rehal Set
  "the-stillness-set": {
    id: "the-stillness-set",
    sku: "SH-PRY-021-OL",
    kind: "non-apparel",
    name: "The Stillness Prayer Mat & Rehal Set",
    category: "Prayer & Worship",
    categoryTrail: ["Prayer & Worship", "Prayer Mats & Rehals"],
    price: 3499,
    mrp: 3999,
    rating: "4.9",
    reviewCount: 38,
    description:
      "A softly woven linen-cotton prayer mat with 15mm orthopaedic memory foam and solid beech folding rehal, made for quiet daily devotion.",
    gallery: [
      { src: imgPrayer, alt: "Olive prayer mat with solid beech rehal", position: "object-center" },
      { src: editorialHome, alt: "Stillness set in a calm prayer corner", position: "object-center" },
    ],
    colors: [
      { name: "Olive", swatch: "bg-primary" },
      { name: "Oat", swatch: "bg-secondary" },
      { name: "Mineral", swatch: "bg-mineral" },
    ],
    specifications: [
      ["Prayer Mat Dimensions", "115 × 70 cm"],
      ["Cushioning Core", "15mm High-Density Orthopaedic Memory Foam"],
      ["Folded Rehal", "28 × 19 × 4 cm (FSC-certified solid European beech wood)"],
      ["Set Weight", "Approximately 1.35 kg"],
    ],
    genericName: "Prayer Mat and Rehal Gift Set",
    netQuantity: "1 Set (Prayer Mat: 1 N, Solid Rehal: 1 N)",
    countryOfOrigin: "India (Handcrafted in Saharanpur & Panipat)",
  },

  // 16. Ergonomic Memory Foam Prayer Mat
  "ergonomic-memory-foam-prayer-mat": {
    id: "ergonomic-memory-foam-prayer-mat",
    sku: "SH-PMF-016-OL",
    kind: "non-apparel",
    name: "Ergonomic Memory Foam Prayer Mat",
    category: "Prayer & Worship",
    categoryTrail: ["Prayer & Worship", "Memory Foam Mats"],
    price: 1299,
    mrp: 1599,
    rating: "4.9",
    reviewCount: 241,
    description:
      "Orthopaedic 20mm memory foam prayer rug wrapped in silky soft velvet with non-slip base for knee and joint relief during sujood.",
    gallery: [
      { src: imgPrayer, alt: "Olive velvet memory foam prayer mat in daylight", position: "object-center" },
    ],
    colors: [
      { name: "Olive", swatch: "bg-primary" },
      { name: "Stone Grey", swatch: "bg-mineral" },
      { name: "Dusty Sand", swatch: "bg-secondary" },
    ],
    specifications: [
      ["Dimensions", "115 × 65 cm"],
      ["Thickness", "20mm Dual-Layer Orthopaedic Foam"],
      ["Base", "Embossed anti-skid rubber dotting"],
    ],
    genericName: "Orthopaedic Velvet Memory Foam Prayer Rug",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Panipat / Haryana)",
  },

  // 17. Water-Resistant Pocket Travel Mat
  "water-resistant-pocket-travel-mat": {
    id: "water-resistant-pocket-travel-mat",
    sku: "SH-PPT-017-NV",
    kind: "non-apparel",
    name: "Water-Resistant Pocket Travel Mat",
    category: "Prayer & Worship",
    categoryTrail: ["Prayer & Worship", "Pocket Travel Mats"],
    price: 399,
    mrp: 499,
    rating: "4.6",
    reviewCount: 88,
    description:
      "Ultra-compact waterproof pocket prayer mat with corner steel weights to prevent flyaway during outdoor prayers.",
    gallery: [
      { src: imgPrayer, alt: "Folded pocket travel prayer mat with pouch", position: "object-center" },
    ],
    colors: [
      { name: "Navy Blue", swatch: "bg-mineral" },
      { name: "Forest Green", swatch: "bg-primary" },
    ],
    specifications: [
      ["Unfolded Size", "100 × 60 cm"],
      ["Pouch Size", "15 × 10 cm (Fits in pocket)"],
      ["Fabric", "Ripstop 210D Waterproof Polyester"],
    ],
    genericName: "Pocket Travel Prayer Rug with Weighted Corners",
    netQuantity: "1 Mat + 1 Pouch",
    countryOfOrigin: "India (Delhi)",
  },

  // 18. Ergonomic Bentwood Quran Stand Rehal
  "ergonomic-bentwood-quran-stand-rehal": {
    id: "ergonomic-bentwood-quran-stand-rehal",
    sku: "SH-PRH-018-WN",
    kind: "non-apparel",
    name: "Ergonomic Bentwood Quran Stand Rehal",
    category: "Prayer & Worship",
    categoryTrail: ["Prayer & Worship", "Bentwood Rehals"],
    price: 899,
    mrp: 1099,
    rating: "4.8",
    reviewCount: 73,
    description:
      "Smooth curved bentwood folding Quran stand with walnut stain, ergonomically angled to relieve neck strain while reading.",
    gallery: [
      { src: imgPrayer, alt: "Bentwood folding rehal in walnut stain", position: "object-center" },
    ],
    colors: [
      { name: "Walnut", swatch: "bg-clay" },
      { name: "Natural Beech", swatch: "bg-secondary" },
    ],
    specifications: [
      ["Dimensions", "30 × 20 × 16 cm (Open)"],
      ["Wood", "Multi-ply engineered beech bentwood"],
      ["Finish", "Satin polyurethane smooth touch"],
    ],
    genericName: "Ergonomic Folding Wooden Book Stand (Rehal)",
    netQuantity: "1 Unit",
    countryOfOrigin: "India (Saharanpur / UP)",
  },

  // 19. 99-Bead Natural Agate Stone Tasbih
  "99-bead-natural-agate-stone-tasbih": {
    id: "99-bead-natural-agate-stone-tasbih",
    sku: "SH-PTS-019-AG",
    kind: "non-apparel",
    name: "99-Bead Natural Agate Stone Tasbih",
    category: "Prayer & Worship",
    categoryTrail: ["Prayer & Worship", "Stone Tasbihs"],
    price: 599,
    mrp: 699,
    rating: "4.7",
    reviewCount: 55,
    description:
      "Naturally cool 8mm banded agate gemstones hand-strung on high-tensile braided nylon cord with handmade silk tassel.",
    gallery: [
      { src: imgPrayer, alt: "Natural agate stone tasbih beads with tassel", position: "object-center" },
    ],
    colors: [
      { name: "Grey Agate", swatch: "bg-mineral" },
      { name: "Moss Agate", swatch: "bg-primary" },
    ],
    specifications: [
      ["Bead Size", "8mm Spherical natural stones"],
      ["Count", "99 Beads with 2 division markers & imam bead"],
      ["Cord", "Military-grade braided nylon thread (unbreakable)"],
    ],
    genericName: "Natural Stone Prayer Rosary Beads (Tasbih)",
    netQuantity: "1 String",
    countryOfOrigin: "India (Khambhat / Gujarat)",
  },

  // 20. Daily Dua & Hadith 50-Card Family Deck
  "daily-dua-hadith-50-card-family-deck": {
    id: "daily-dua-hadith-50-card-family-deck",
    sku: "SH-LCD-020-DK",
    kind: "non-apparel",
    name: "Daily Dua & Hadith 50-Card Family Deck",
    category: "Learning & Books",
    categoryTrail: ["Learning & Books", "Card Decks"],
    price: 499,
    mrp: 599,
    rating: "4.9",
    reviewCount: 134,
    description:
      "Bilingual daily reflection cards featuring Arabic text, English transliteration, authentic meaning, and discussion prompts for dinner and bedtime.",
    gallery: [
      { src: imgChild, alt: "Daily dua card deck in premium keepsake box", position: "object-center" },
    ],
    colors: [
      { name: "Sage Edition", swatch: "bg-primary" },
    ],
    specifications: [
      ["Card Count", "50 Heavyweight 350 GSM cards"],
      ["Coating", "Scratch-resistant matte lamination"],
      ["Box", "Sturdy magnetic closure gift box"],
    ],
    genericName: "Islamic Dua & Hadith Family Discussion Flashcards",
    netQuantity: "1 Box (50 Cards)",
    countryOfOrigin: "India (New Delhi)",
  },

  // 21. Illustrated Bedtime Quran Stories Book
  "illustrated-bedtime-quran-stories-book": {
    id: "illustrated-bedtime-quran-stories-book",
    sku: "SH-LBK-021-HB",
    kind: "non-apparel",
    name: "Illustrated Bedtime Quran Stories Book",
    category: "Learning & Books",
    categoryTrail: ["Learning & Books", "Story Books"],
    price: 450,
    mrp: 550,
    rating: "4.8",
    reviewCount: 98,
    description:
      "Hardcover storybook with 96 richly illustrated pages telling stories of the Prophets in gentle, child-friendly prose.",
    gallery: [
      { src: imgChild, alt: "Hardcover bedtime Quran stories book open on table", position: "object-center" },
    ],
    colors: [
      { name: "Hardcover", swatch: "bg-clay" },
    ],
    specifications: [
      ["Binding", "Thread-sewn Hardcover with foil stamping"],
      ["Pages", "96 Art Paper full-colour pages"],
      ["Language", "English with Arabic Prophet names"],
    ],
    genericName: "Children's Illustrated Hardcover Storybook",
    netQuantity: "1 Book",
    countryOfOrigin: "India (New Delhi)",
  },

  // 22. Cast Brass Charcoal Bakhoor Burner
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
    reviewCount: 39,
    description:
      "Hand-finished solid cast brass burner with perforated dome lid and insulated wooden base for clean oudh and frankincense burning.",
    gallery: [
      { src: imgBundle, alt: "Solid cast brass bakhoor burner with intricate lid", position: "object-center" },
    ],
    colors: [
      { name: "Antique Gold", swatch: "bg-clay" },
      { name: "Matte Black Brass", swatch: "bg-mineral" },
    ],
    specifications: [
      ["Material", "100% Solid Cast Brass"],
      ["Height", "14 cm, Base Diameter 8 cm"],
      ["Accessories", "Includes brass mesh charcoal holder and mini tongs"],
    ],
    genericName: "Solid Cast Brass Incense Burner (Mabkhara)",
    netQuantity: "1 Set (Burner + Mesh + Tongs)",
    countryOfOrigin: "India (Handcrafted in Moradabad / UP)",
  },

  // 23. Laser-Cut Ayatul Kursi Metal Wall Art
  "laser-cut-ayatul-kursi-metal-wall-art": {
    id: "laser-cut-ayatul-kursi-metal-wall-art",
    sku: "SH-HWA-023-MG",
    kind: "non-apparel",
    name: "Laser-Cut Ayatul Kursi Metal Wall Art",
    category: "Home & Ambiance",
    categoryTrail: ["Home & Ambiance", "Wall Art"],
    price: 1499,
    mrp: 1799,
    rating: "4.8",
    reviewCount: 26,
    description:
      "Precision laser-cut mild steel circular calligraphy of Ayatul Kursi finished in electro-static matte gold powder coating.",
    gallery: [
      { src: imgBundle, alt: "Ayatul Kursi circular metal wall art in matte gold", position: "object-center" },
    ],
    colors: [
      { name: "Matte Gold", swatch: "bg-clay" },
      { name: "Matte Black", swatch: "bg-primary" },
    ],
    specifications: [
      ["Diameter", "60 cm (24 inches)"],
      ["Thickness", "2mm Mild Steel with 1.5 cm wall standoff spacers"],
      ["Mounting", "Pre-installed single center hanging hook with drywall anchor included"],
    ],
    genericName: "Decorative Islamic Metal Calligraphy Wall Art",
    netQuantity: "1 Piece",
    countryOfOrigin: "India (Moradabad)",
  },

  // 24. Sandalwood & Amber Non-Alcoholic Attar
  "sandalwood-amber-non-alcoholic-attar": {
    id: "sandalwood-amber-non-alcoholic-attar",
    sku: "SH-HAT-024-SW",
    kind: "non-apparel",
    name: "Sandalwood & Amber Non-Alcoholic Attar",
    category: "Home & Ambiance",
    categoryTrail: ["Home & Ambiance", "Attars"],
    price: 499,
    mrp: 599,
    rating: "4.6",
    reviewCount: 61,
    description:
      "Pure hydro-distilled sandalwood and golden amber fragrance oil. 100% alcohol-free, concentrated 12ml roll-on formulation.",
    gallery: [
      { src: imgBundle, alt: "12ml glass bottle of sandalwood and amber attar", position: "object-center" },
    ],
    colors: [
      { name: "Golden Amber", swatch: "bg-secondary" },
    ],
    specifications: [
      ["Volume", "12 ml"],
      ["Formula", "100% Non-Alcoholic concentrated perfume oil (Attar)"],
      ["Notes", "Mysore Sandalwood, Warm Golden Amber, Sweet Musk"],
    ],
    genericName: "Non-Alcoholic Concentrated Perfume Oil (Attar)",
    netQuantity: "1 Bottle (12 ml)",
    countryOfOrigin: "India (Kannauj / UP)",
  },

  // 25. The Serene Prayer Sanctuary Gift Box
  "the-serene-prayer-sanctuary-gift-box": {
    id: "the-serene-prayer-sanctuary-gift-box",
    sku: "SH-GBX-025-PR",
    kind: "non-apparel",
    name: "The Serene Prayer Sanctuary Gift Box",
    category: "Milestone Gifts",
    categoryTrail: ["Milestone Gifts", "Gift Boxes"],
    price: 2499,
    mrp: 2899,
    rating: "4.9",
    reviewCount: 44,
    description:
      "A complete spiritual gifting box containing an orthopaedic memory foam prayer mat, 99-bead natural agate tasbih, and 12ml sandalwood attar in a foil-stamped gift case.",
    gallery: [
      { src: imgBundle, alt: "Serene prayer sanctuary gift box open showing contents", position: "object-center" },
    ],
    colors: [
      { name: "Olive & Gold", swatch: "bg-primary" },
    ],
    specifications: [
      ["Contents", "1 Memory Foam Prayer Mat, 1 Natural Stone Tasbih, 1 Sandalwood Attar (12ml)"],
      ["Packaging", "Rigid keepsake gift box with golden foil embossing and ribbon tie"],
    ],
    genericName: "Spiritual Gift Hamper Box Set",
    netQuantity: "1 Set (3 Items + Gift Box)",
    countryOfOrigin: "India",
  },

  // 26. The Eid Family Celebration Hamper
  "the-eid-family-celebration-hamper": {
    id: "the-eid-family-celebration-hamper",
    sku: "SH-GHM-026-ED",
    kind: "non-apparel",
    name: "The Eid Family Celebration Hamper",
    category: "Milestone Gifts",
    categoryTrail: ["Milestone Gifts", "Hampers"],
    price: 2199,
    mrp: 2599,
    rating: "4.8",
    reviewCount: 32,
    description:
      "A six-piece festive hamper featuring brass bakhoor burner, natural oudh chips, prayer beads, greeting envelopes, and artisanal medjool dates.",
    gallery: [
      { src: imgBundle, alt: "Eid celebration hamper arrangement in handcrafted basket", position: "object-center" },
    ],
    colors: [
      { name: "Festive Gold", swatch: "bg-clay" },
    ],
    specifications: [
      ["Contents", "Cast brass burner, 50g Royal Oudh bakhoor, 2 Silk prayer caps, 5 Eid envelopes, Medjool dates box"],
      ["Basket", "Handwoven natural willow wicker basket with organza wrap"],
    ],
    genericName: "Artisanal Festival Gift Hamper",
    netQuantity: "1 Hamper (6 Items)",
    countryOfOrigin: "India",
  },

  // 27. Blue Floral Salwar Suit (Milestone A Acceptance Product)
  "blue-floral-salwar-suit": {
    id: "blue-floral-salwar-suit",
    sku: "BFSS-BLU-S",
    kind: "apparel",
    name: "Blue Floral Salwar Suit",
    category: "Women's Ethnic & Modest",
    categoryTrail: ["Women's Ethnic & Modest", "Salwar Suit Sets"],
    price: 1499,
    mrp: 1799,
    rating: "4.9",
    reviewCount: 28,
    description:
      "A breathable three-piece salwar suit in pure 60s cambric cotton featuring delicate hand-block floral motifs, fully lined with soft cotton voil for guaranteed everyday modesty.",
    gallery: [
      { src: imgModest, alt: "Blue floral salwar suit styled on linen", position: "object-center" },
      { src: editorialHome, alt: "Blue floral suit in soft daylight", position: "object-center" },
    ],
    colors: [
      { name: "Blue", swatch: "bg-mineral" },
    ],
    sizes: [
      { name: "S", stock: "in-stock" },
      { name: "M", stock: "in-stock" },
      { name: "L", stock: "in-stock" },
      { name: "XL", stock: "low" },
    ],
    modelNote: 'Model is 5\'6" wearing Size M (Garment Bust 38", Kurta Length 44")',
    specifications: [
      ["Top Fabric", "Pure 60s Cambric Cotton (Hand-block floral print)"],
      ["Bottom", "Matching pure cotton pants with semi-elasticated waist & pockets"],
      ["Dupatta", "Soft lightweight pure cotton malmal (2.25 meters)"],
      ["Lining", "Attached pure cotton voil inner across torso"],
      ["Stitch Quality", "Interlock reinforced seams with 2-inch tailoring margins"],
    ],
    genericName: "Women's 3-Piece Stitched Salwar Suit Set",
    netQuantity: "1 Set (Kurta: 1 N, Pant: 1 N, Dupatta: 1 N)",
    countryOfOrigin: "India (Handcrafted in Surat)",
  },
};

// Aliases mapping common or alternative slugs to canonical catalog keys
const SLUG_ALIASES: Record<string, string> = {
  // Salwar suit aliases
  "pure-cambric-cotton-set": "pure-cambric-cotton-salwar-suit-set",
  "cotton-salwar-suit": "pure-cambric-cotton-salwar-suit-set",
  "the-everyday-pair": "pure-cambric-cotton-salwar-suit-set",

  // Men's kurta aliases
  "classic-friday-cotton-kurta": "classic-friday-handloom-cotton-kurta",
  "men-cotton-kurta": "classic-friday-handloom-cotton-kurta",

  // Prayer mat aliases
  "the-stillness-prayer-mat-rehal-set": "the-stillness-set",
  "the-stillness-prayer-mat": "the-stillness-set",
  "memory-foam-mat": "ergonomic-memory-foam-prayer-mat",

  // Children aliases
  "salah-habit-board": "my-daily-salah-magnetic-habit-board",
  "first-forms-wooden-learning-set": "first-forms-set",
};

/**
 * Resolves ANY slug or product ID to its authentic ProductDetail.
 */
export function resolveProductBySlug(slug: string): ProductDetail {
  if (!slug) return MASTER_CATALOG["pure-cambric-cotton-salwar-suit-set"];

  const clean = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // 1. Direct hit
  if (MASTER_CATALOG[clean]) {
    return MASTER_CATALOG[clean];
  }

  // 2. Alias hit
  if (SLUG_ALIASES[clean] && MASTER_CATALOG[SLUG_ALIASES[clean]]) {
    return MASTER_CATALOG[SLUG_ALIASES[clean]];
  }

  // 3. Partial match (e.g. "salwar" matches salwar suit, "kurta" matches kurta)
  const keys = Object.keys(MASTER_CATALOG);
  const foundKey = keys.find((k) => clean.includes(k) || k.includes(clean));
  if (foundKey) {
    return MASTER_CATALOG[foundKey];
  }

  // 4. Fallback default
  return MASTER_CATALOG["pure-cambric-cotton-salwar-suit-set"];
}
