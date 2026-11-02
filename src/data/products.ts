import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_fashion_1793376931210.jpg';
export const MENS_TAILORED_IMAGE = '/src/assets/images/mens_tailored_collection_1793376932020.jpg';
export const WOMENS_COUTURE_IMAGE = '/src/assets/images/womens_couture_pret_1793376933223.jpg';
export const LEATHER_BAG_IMAGE = '/src/assets/images/luxury_leather_bag_1793376933990.jpg';
export const FOOTWEAR_IMAGE = '/src/assets/images/luxury_handcrafted_footwear_1793376933724.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // --- DEDICATED LEATHER WALLETS COLLECTION ---
  // ==========================================
  {
    id: 'sjc-wlt-001',
    name: 'Sovereign Full-Grain Calfskin Bifold Wallet',
    sku: 'SJC-WLT-001',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'men',
    description: 'Masterfully crafted from vegetable-tanned full-grain French calfskin with hand-creased edges and burnished seams. Features eight dedicated card slots, dual full-length Pakistani currency compartments, two slip pockets, and a discreetly embossed SJ monogram.',
    details: [
      'Full-grain French calfskin with natural wax finish',
      '8 precision-cut card slots with RFID blocking shield',
      'Dual currency pockets sized specifically for Pakistani Rupee banknotes',
      'Hand-burnished waxed edges for longevity',
      'Presented in a rigid SJ Collections gift box with velour dust pouch'
    ],
    price: 8500,
    salePrice: 7200,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE
    ],
    sizes: ['One Size (11.5cm x 9.5cm)'],
    colors: [
      { name: 'Noir Black', hex: '#161616' },
      { name: 'Antique Espresso', hex: '#38251C' },
      { name: 'Cognac Saddle', hex: '#724227' }
    ],
    materials: ['Full-Grain French Calfskin', 'Moire Silk Lining'],
    dimensions: '11.5cm (W) x 9.5cm (H) x 1.5cm (D)',
    featured: true,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-12',
    rating: 4.9,
    reviewCount: 42,
    variants: [
      { id: 'v-wlt-001-1', sku: 'SJC-WLT-001-BLK', size: 'One Size', color: 'Noir Black', colorHex: '#161616', stock: 14 },
      { id: 'v-wlt-001-2', sku: 'SJC-WLT-001-ESP', size: 'One Size', color: 'Antique Espresso', colorHex: '#38251C', stock: 18 },
      { id: 'v-wlt-001-3', sku: 'SJC-WLT-001-COG', size: 'One Size', color: 'Cognac Saddle', colorHex: '#724227', stock: 10 }
    ]
  },
  {
    id: 'sjc-wlt-002',
    name: 'Sovereign Long Flap Leather Continental Wallet',
    sku: 'SJC-WLT-002',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'women',
    description: 'An architectural continental wallet rendered in supple Italian pebbled calfskin. Features a sculpted envelope flap with brushed gold-tone SJ lock, twelve card slots, expanding bill bellows, and an interior zippered coin sanctum.',
    details: [
      'Italian pebbled full-grain calfskin exterior and smooth nappa interior',
      '12 card slots, 2 expansive banknote dividers, 1 central zip coin purse',
      'Heavy brushed brass turn-lock clasp with micro-engraving',
      'Comfortably holds an iPhone Pro or banknotes without creasing',
      'Complimentary personalization available upon request'
    ],
    price: 14500,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE
    ],
    sizes: ['One Size (19.5cm x 10cm)'],
    colors: [
      { name: 'Warm Ivory & Black', hex: '#F4F0E6' },
      { name: 'Onyx Black', hex: '#1A1A1A' },
      { name: 'Burgundy Wine', hex: '#4E1B24' }
    ],
    materials: ['Italian Pebbled Calfskin', 'Brushed Solid Brass'],
    dimensions: '19.5cm (W) x 10cm (H) x 2.8cm (D)',
    featured: true,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-14',
    rating: 5.0,
    reviewCount: 31,
    variants: [
      { id: 'v-wlt-002-1', sku: 'SJC-WLT-002-IVR', size: 'One Size', color: 'Warm Ivory & Black', colorHex: '#F4F0E6', stock: 8 },
      { id: 'v-wlt-002-2', sku: 'SJC-WLT-002-BLK', size: 'One Size', color: 'Onyx Black', colorHex: '#1A1A1A', stock: 11 },
      { id: 'v-wlt-002-3', sku: 'SJC-WLT-002-BRG', size: 'One Size', color: 'Burgundy Wine', colorHex: '#4E1B24', stock: 6 }
    ]
  },
  {
    id: 'sjc-wlt-003',
    name: 'Executive Slim Epsom Leather Card Case & Cash Sleeve',
    sku: 'SJC-WLT-003',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'unisex',
    description: 'Ultra-thin profile engineered for tailored trouser pockets without causing silhouette bulk. Crafted in scratch-resistant Epsom calf leather with hand-painted tonal edges and central folded cash slip.',
    details: [
      'Genuine embossed Epsom calfskin with scratch-resistant temper',
      '4 card slots (2 front, 2 back) plus central slip pocket for banknotes',
      'Ultra-thin 0.5cm profile designed for bespoke suits',
      'Hand-stitched perimeter with waxed linen cord'
    ],
    price: 5500,
    images: [
      'https://images.unsplash.com/photo-1606503829064-25b746c10565?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size (10cm x 7.5cm)'],
    colors: [
      { name: 'Raven Black', hex: '#141414' },
      { name: 'Olive Bronze', hex: '#4A483E' },
      { name: 'Caramel Tan', hex: '#87512F' }
    ],
    materials: ['Epsom Grain Leather'],
    dimensions: '10cm (W) x 7.5cm (H) x 0.5cm (D)',
    featured: false,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-10',
    rating: 4.8,
    reviewCount: 36,
    variants: [
      { id: 'v-wlt-003-1', sku: 'SJC-WLT-003-BLK', size: 'One Size', color: 'Raven Black', colorHex: '#141414', stock: 22 },
      { id: 'v-wlt-003-2', sku: 'SJC-WLT-003-OLV', size: 'One Size', color: 'Olive Bronze', colorHex: '#4A483E', stock: 15 },
      { id: 'v-wlt-003-3', sku: 'SJC-WLT-003-TAN', size: 'One Size', color: 'Caramel Tan', colorHex: '#87512F', stock: 17 }
    ]
  },
  {
    id: 'sjc-wlt-004',
    name: 'Artisanal Zip-Around Quilted Nappa Leather Wallet',
    sku: 'SJC-WLT-004',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'women',
    description: 'Crafted from glove-grade quilted lambskin leather with diamond top-stitching. Engineered with an antiqued brass three-sided zipper for secure, elegant everyday organization.',
    details: [
      'Glove-soft Italian Nappa lambskin with geometric diamond quilting',
      'Smooth brass perimeter zipper with leather pull tab',
      '8 interior card slots, 2 bill dividers, 1 central zipper pouch',
      'Supplied with removable leather wristlet strap'
    ],
    price: 12500,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE
    ],
    sizes: ['One Size (19cm x 9.5cm)'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F7F5EE' },
      { name: 'Midnight Noir', hex: '#161618' },
      { name: 'Blush Taupe', hex: '#A8978D' }
    ],
    materials: ['Quilted Lambskin Nappa', 'Solid Brass Hardware'],
    dimensions: '19cm (W) x 9.5cm (H) x 2.2cm (D)',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-08',
    rating: 4.9,
    reviewCount: 20,
    variants: [
      { id: 'v-wlt-004-1', sku: 'SJC-WLT-004-IVR', size: 'One Size', color: 'Alabaster Ivory', colorHex: '#F7F5EE', stock: 9 },
      { id: 'v-wlt-004-2', sku: 'SJC-WLT-004-BLK', size: 'One Size', color: 'Midnight Noir', colorHex: '#161618', stock: 12 },
      { id: 'v-wlt-004-3', sku: 'SJC-WLT-004-BLS', size: 'One Size', color: 'Blush Taupe', colorHex: '#A8978D', stock: 7 }
    ]
  },
  {
    id: 'sjc-wlt-005',
    name: 'Artisanal Hand-Burnished Bridle Leather Tri-Fold Wallet',
    sku: 'SJC-WLT-005',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'men',
    description: 'Handcrafted from durable English bridle leather with rich wax temper. Tri-fold design featuring six vertical card slots, clear ID window, double currency compartment, and two hidden utility pockets.',
    details: [
      'Full-grain English bridle leather with hand-stained wax finish',
      '6 vertical card pockets and clear thumb-slide ID window',
      'Double banknote divider calibrated for Pakistani currency',
      'Hand-burnished perimeter and hand-sewn bar tacks'
    ],
    price: 9500,
    salePrice: 8400,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE
    ],
    sizes: ['One Size (11cm x 8.8cm)'],
    colors: [
      { name: 'Noir Black', hex: '#161616' },
      { name: 'Saddle Tan', hex: '#87512F' },
      { name: 'Dark Havana', hex: '#3B2820' }
    ],
    materials: ['English Bridle Leather', 'Moire Fabric Lining'],
    dimensions: '11cm (W) x 8.8cm (H) x 2cm (D)',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-15',
    rating: 4.8,
    reviewCount: 15,
    variants: [
      { id: 'v-wlt-005-1', sku: 'SJC-WLT-005-BLK', size: 'One Size', color: 'Noir Black', colorHex: '#161616', stock: 12 },
      { id: 'v-wlt-005-2', sku: 'SJC-WLT-005-TAN', size: 'One Size', color: 'Saddle Tan', colorHex: '#87512F', stock: 14 },
      { id: 'v-wlt-005-3', sku: 'SJC-WLT-005-HAV', size: 'One Size', color: 'Dark Havana', colorHex: '#3B2820', stock: 8 }
    ]
  },
  {
    id: 'sjc-wlt-006',
    name: 'Executive Passport & Travel Document Leather Folio',
    sku: 'SJC-WLT-006',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'unisex',
    description: 'A distinguished companion for international travel. Accommodates two passports, boarding passes, currency notes, pen loop, and eight travel card slots in full-grain French calfskin.',
    details: [
      'Supple full-grain French calfskin with scratch-resistant temper',
      'Dual passport sleeves, airline boarding pass slip, pen holder',
      '8 RFID-shielded credit & frequent flyer card pockets',
      'Discreet magnetic closure with gold-embossed SJ crest'
    ],
    price: 11500,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE
    ],
    sizes: ['One Size (14.5cm x 22cm open)'],
    colors: [
      { name: 'Midnight Noir', hex: '#141416' },
      { name: 'Chestnut Tan', hex: '#6D442A' }
    ],
    materials: ['French Calfskin', 'Microfiber Suede'],
    dimensions: '14.5cm (W) x 11cm (H) x 1.8cm (D)',
    featured: true,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-16',
    rating: 5.0,
    reviewCount: 24,
    variants: [
      { id: 'v-wlt-006-1', sku: 'SJC-WLT-006-BLK', size: 'One Size', color: 'Midnight Noir', colorHex: '#141416', stock: 10 },
      { id: 'v-wlt-006-2', sku: 'SJC-WLT-006-TAN', size: 'One Size', color: 'Chestnut Tan', colorHex: '#6D442A', stock: 11 }
    ]
  },
  {
    id: 'sjc-wlt-007',
    name: 'Croc-Embossed Calfskin Flap Coin & Card Pouch',
    sku: 'SJC-WLT-007',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'women',
    description: 'Compact luxury purse sculpted in glazed croc-embossed calfskin with magnetic envelope closure and expandable dual compartments for cards, folded banknotes, and coins.',
    details: [
      'High-gloss croc-embossed calf leather with deep tone variations',
      'Gold-plated snap button closure with embossed SJ monogram',
      'Expandable accordion interior holding up to 10 cards and coins',
      'Slip exterior pocket on reverse for quick-access metro or room card'
    ],
    price: 6800,
    salePrice: 5900,
    images: [
      'https://images.unsplash.com/photo-1606503829064-25b746c10565?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE
    ],
    sizes: ['One Size (10.5cm x 8cm)'],
    colors: [
      { name: 'Warm Ivory', hex: '#F6F3EC' },
      { name: 'Emerald Noir', hex: '#162822' },
      { name: 'Bordeaux Red', hex: '#4E1B24' }
    ],
    materials: ['Glazed Croc-Embossed Calfskin', 'Brushed Brass Snap'],
    dimensions: '10.5cm (W) x 8cm (H) x 2cm (D)',
    featured: false,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-15',
    rating: 4.9,
    reviewCount: 28,
    variants: [
      { id: 'v-wlt-007-1', sku: 'SJC-WLT-007-IVR', size: 'One Size', color: 'Warm Ivory', colorHex: '#F6F3EC', stock: 12 },
      { id: 'v-wlt-007-2', sku: 'SJC-WLT-007-EMR', size: 'One Size', color: 'Emerald Noir', colorHex: '#162822', stock: 8 },
      { id: 'v-wlt-007-3', sku: 'SJC-WLT-007-BRD', size: 'One Size', color: 'Bordeaux Red', colorHex: '#4E1B24', stock: 9 }
    ]
  },
  {
    id: 'sjc-wlt-008',
    name: 'Executive Money-Clip Cardholder in Box Calf',
    sku: 'SJC-WLT-008',
    category: 'wallets',
    categoryLabel: 'Leather Wallets',
    gender: 'men',
    description: 'Sleek and minimalist, combining six card slots with an integrated brushed palladium spring money clip for holding Pakistani banknotes securely without any pocket bulk.',
    details: [
      'Box calfskin leather with silky smooth finish and tight pores',
      '6 exterior card slots with beveled entry edges',
      'Central brushed palladium spring tension clip for cash notes',
      'Only 0.7cm thick when fully loaded'
    ],
    price: 6200,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['One Size (11cm x 7.8cm)'],
    colors: [
      { name: 'Pitch Black', hex: '#121212' },
      { name: 'Antique Walnut', hex: '#4A3428' }
    ],
    materials: ['French Box Calfskin', 'Palladium Spring Clip'],
    dimensions: '11cm (W) x 7.8cm (H) x 0.7cm (D)',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-14',
    rating: 4.8,
    reviewCount: 19,
    variants: [
      { id: 'v-wlt-008-1', sku: 'SJC-WLT-008-BLK', size: 'One Size', color: 'Pitch Black', colorHex: '#121212', stock: 16 },
      { id: 'v-wlt-008-2', sku: 'SJC-WLT-008-WAL', size: 'One Size', color: 'Antique Walnut', colorHex: '#4A3428', stock: 14 }
    ]
  },

  // ==========================================
  // --- MEN'S PREMIUM LEATHER FOOTWEAR ---
  // ==========================================
  {
    id: 'sjc-mf-001',
    name: 'Hand-Welted Double Monk Strap Shoes in Antique Espresso',
    sku: 'SJC-MF-001',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'Individually hand-welted by master cordwainers using full-grain French calfskin leather. Hand-patinated in antique espresso with mirror gloss toe cap, solid brass roller buckles, and stacked leather soles with rubber insert.',
    details: [
      'Full-grain French calfskin with hand-rubbed antique patina finish',
      'Goodyear welt construction allowing lifelong recraftability',
      'Solid brass twin buckles with nickel-free finish',
      'Vegetable-tanned leather insole that molds to your foot over time',
      'Supplied with cedar dust bags and luxury presentation box'
    ],
    price: 26500,
    salePrice: 23900,
    images: [
      FOOTWEAR_IMAGE,
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'Antique Espresso', hex: '#3B2820' },
      { name: 'Raven Black', hex: '#161616' }
    ],
    materials: ['French Calfskin', 'Oak Bark Leather Sole'],
    fit: 'Standard Classic British Last',
    featured: true,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-01',
    rating: 4.9,
    reviewCount: 34,
    variants: [
      { id: 'v-mf-001-1', sku: 'SJC-MF-001-40-ESP', size: '40 (EU 7)', color: 'Antique Espresso', colorHex: '#3B2820', stock: 4 },
      { id: 'v-mf-001-2', sku: 'SJC-MF-001-41-ESP', size: '41 (EU 8)', color: 'Antique Espresso', colorHex: '#3B2820', stock: 8 },
      { id: 'v-mf-001-3', sku: 'SJC-MF-001-42-ESP', size: '42 (EU 9)', color: 'Antique Espresso', colorHex: '#3B2820', stock: 10 },
      { id: 'v-mf-001-4', sku: 'SJC-MF-001-43-ESP', size: '43 (EU 10)', color: 'Antique Espresso', colorHex: '#3B2820', stock: 6 },
      { id: 'v-mf-001-5', sku: 'SJC-MF-001-44-ESP', size: '44 (EU 11)', color: 'Antique Espresso', colorHex: '#3B2820', stock: 3 },
      { id: 'v-mf-001-6', sku: 'SJC-MF-001-42-BLK', size: '42 (EU 9)', color: 'Raven Black', colorHex: '#161616', stock: 6 }
    ]
  },
  {
    id: 'sjc-mf-002',
    name: 'Artisanal Heritage Calfskin Peshawari Chappal',
    sku: 'SJC-MF-002',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'The epitome of Pakistani footwear craftsmanship, re-engineered with luxury specifications. Hand-selected top-grain cowhide leather, double-padded memory foam footbed, and aerodynamic semi-pointed toe with tire-tread sole.',
    details: [
      'Top-grain oil-waxed pull-up leather that develops rich patina',
      'Dual-density high resilience cushioning footbed',
      'Recycled aircraft tire sole with hand-sewn heavy waxed twine',
      'Reinforced strap with adjustable brass buckle',
      'Lightweight and remarkably comfortable for long festive events'
    ],
    price: 14500,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'Cognac Saddle', hex: '#633B24' },
      { name: 'Pure Jet Black', hex: '#181818' },
      { name: 'Dark Burgundy', hex: '#4A1C24' }
    ],
    materials: ['Top-grain Leather', 'Tire Sole'],
    fit: 'True to Size with Padded Footbed',
    featured: true,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-02-18',
    rating: 4.8,
    reviewCount: 52,
    variants: [
      { id: 'v-mf-002-1', sku: 'SJC-MF-002-41-COG', size: '41 (EU 8)', color: 'Cognac Saddle', colorHex: '#633B24', stock: 11 },
      { id: 'v-mf-002-2', sku: 'SJC-MF-002-42-COG', size: '42 (EU 9)', color: 'Cognac Saddle', colorHex: '#633B24', stock: 15 },
      { id: 'v-mf-002-3', sku: 'SJC-MF-002-43-COG', size: '43 (EU 10)', color: 'Cognac Saddle', colorHex: '#633B24', stock: 7 },
      { id: 'v-mf-002-4', sku: 'SJC-MF-002-42-BLK', size: '42 (EU 9)', color: 'Pure Jet Black', colorHex: '#181818', stock: 9 }
    ]
  },
  {
    id: 'sjc-mf-003',
    name: 'Goodyear Wholecut Oxford in Polished Noir Box Calf',
    sku: 'SJC-MF-003',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'Cut entirely from a single flawless piece of premium French box calfskin with zero seam breaks on the vamp. Features a chiseled toe, closed five-eyelet lacing, and beveled fiddleback waist for black-tie elegance.',
    details: [
      'One-piece seamless wholecut construction from Grade-A box calf',
      'Goodyear welted with blind waist stitching',
      'Hand-painted sole edges with brass toe plates',
      'Full glove calf lining with embossed monogram footbed'
    ],
    price: 28500,
    images: [
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'High-Shine Noir', hex: '#111111' },
      { name: 'Deep Burgundy Wine', hex: '#4A1C24' }
    ],
    materials: ['French Box Calfskin', 'Vegetable Tanned Leather Sole'],
    fit: 'Chiseled Formal Last',
    featured: false,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-05',
    rating: 5.0,
    reviewCount: 29,
    variants: [
      { id: 'v-mf-003-1', sku: 'SJC-MF-003-41-NOI', size: '41 (EU 8)', color: 'High-Shine Noir', colorHex: '#111111', stock: 6 },
      { id: 'v-mf-003-2', sku: 'SJC-MF-003-42-NOI', size: '42 (EU 9)', color: 'High-Shine Noir', colorHex: '#111111', stock: 9 },
      { id: 'v-mf-003-3', sku: 'SJC-MF-003-43-NOI', size: '43 (EU 10)', color: 'High-Shine Noir', colorHex: '#111111', stock: 5 },
      { id: 'v-mf-003-4', sku: 'SJC-MF-003-42-BRG', size: '42 (EU 9)', color: 'Deep Burgundy Wine', colorHex: '#4A1C24', stock: 4 }
    ]
  },
  {
    id: 'sjc-mf-004',
    name: 'Hand-Stitched Belgian Penny Loafer in Snuff Suede',
    sku: 'SJC-MF-004',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'Unlined buttery soft snuff suede loafer crafted with Belgian apron stitching and flexible Blake rapid construction. Designed for breezy luxury at festive luncheons and relaxed evening gatherings.',
    details: [
      'Italian water-resistant split snuff suede with velvet nap',
      'Ultra-pliant leather sole with injected rubber tread',
      'Memory foam heel cushion for all-day comfort without socks',
      'Hand-sewn saddle strap'
    ],
    price: 19500,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'Snuff Taupe', hex: '#6E5D4F' },
      { name: 'Midnight Navy Suede', hex: '#1C2536' },
      { name: 'Charcoal Black', hex: '#212124' }
    ],
    materials: ['Italian Calf Suede', 'Soft Leather Insole'],
    fit: 'Relaxed Slip-on Loafer Last',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-09',
    rating: 4.8,
    reviewCount: 18,
    variants: [
      { id: 'v-mf-004-1', sku: 'SJC-MF-004-41-SNF', size: '41 (EU 8)', color: 'Snuff Taupe', colorHex: '#6E5D4F', stock: 7 },
      { id: 'v-mf-004-2', sku: 'SJC-MF-004-42-SNF', size: '42 (EU 9)', color: 'Snuff Taupe', colorHex: '#6E5D4F', stock: 11 },
      { id: 'v-mf-004-3', sku: 'SJC-MF-004-43-SNF', size: '43 (EU 10)', color: 'Snuff Taupe', colorHex: '#6E5D4F', stock: 6 },
      { id: 'v-mf-004-4', sku: 'SJC-MF-004-42-NVY', size: '42 (EU 9)', color: 'Midnight Navy Suede', colorHex: '#1C2536', stock: 5 }
    ]
  },
  {
    id: 'sjc-mf-005',
    name: 'Hand-Burnished Chelsea Boot in Walnut Calfskin',
    sku: 'SJC-MF-005',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'An enduring icon of masculine refinement. Benchcrafted from premium full-grain Italian walnut calfskin with a bevelled waist, hand-burnished toe medallion, flexible tonal gussets, and Goodyear-welted double leather soles.',
    details: [
      'Full-grain Italian vegetable-tanned calfskin with hand-rubbed patina',
      'Traditional Goodyear-welted construction engineered for decades of wear',
      'Dual heavy-duty pull tabs and elasticated tonal side gussets',
      'Channeled oak-bark tanned leather outsole with stacked leather Cuban heel'
    ],
    price: 34500,
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'Walnut Burnish', hex: '#583622' },
      { name: 'Obsidian Black', hex: '#121214' }
    ],
    materials: ['Italian Full-Grain Calfskin', 'Oak-Bark Leather Sole'],
    fit: 'Classic Chiseled Boot Last — True to Size',
    featured: true,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-14',
    rating: 5.0,
    reviewCount: 31,
    variants: [
      { id: 'v-mf-005-1', sku: 'SJC-MF-005-41-WAL', size: '41 (EU 8)', color: 'Walnut Burnish', colorHex: '#583622', stock: 5 },
      { id: 'v-mf-005-2', sku: 'SJC-MF-005-42-WAL', size: '42 (EU 9)', color: 'Walnut Burnish', colorHex: '#583622', stock: 8 },
      { id: 'v-mf-005-3', sku: 'SJC-MF-005-43-WAL', size: '43 (EU 10)', color: 'Walnut Burnish', colorHex: '#583622', stock: 4 },
      { id: 'v-mf-005-4', sku: 'SJC-MF-005-42-BLK', size: '42 (EU 9)', color: 'Obsidian Black', colorHex: '#121214', stock: 6 }
    ]
  },
  {
    id: 'sjc-mf-006',
    name: 'Classic Wingtip Oxford Brogues in Antique Cognac',
    sku: 'SJC-MF-006',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'The epitome of formal sartorial elegance. Features intricate wingtip perforation details, closed five-eyelet lacing, and hand-finished antique cognac crust leather with subtle gradient depth.',
    details: [
      'Select crust calfskin leather hand-dyed with antique tonal gradation',
      'Classic closed lacing with waxed cotton laces and brass aglets',
      'Full leather sock liner with antimicrobial arch support',
      'Protective vibram-injected rubber toe tap on genuine leather sole'
    ],
    price: 28500,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'Antique Cognac', hex: '#7D4427' },
      { name: 'Piano Black', hex: '#111111' }
    ],
    materials: ['Crust Calfskin', 'Vegetable-Tanned Leather Lining'],
    fit: 'Almond Toe Oxford Last — Standard D Width',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-15',
    rating: 4.9,
    reviewCount: 20,
    variants: [
      { id: 'v-mf-006-1', sku: 'SJC-MF-006-41-COG', size: '41 (EU 8)', color: 'Antique Cognac', colorHex: '#7D4427', stock: 6 },
      { id: 'v-mf-006-2', sku: 'SJC-MF-006-42-COG', size: '42 (EU 9)', color: 'Antique Cognac', colorHex: '#7D4427', stock: 9 },
      { id: 'v-mf-006-3', sku: 'SJC-MF-006-43-COG', size: '43 (EU 10)', color: 'Antique Cognac', colorHex: '#7D4427', stock: 5 },
      { id: 'v-mf-006-4', sku: 'SJC-MF-006-42-BLK', size: '42 (EU 9)', color: 'Piano Black', colorHex: '#111111', stock: 7 }
    ]
  },
  {
    id: 'sjc-mf-007',
    name: 'Artisanal Nubuck Penny Driving Shoes in Desert Taupe',
    sku: 'SJC-MF-007',
    category: 'mens-footwear',
    categoryLabel: "Men's Footwear",
    gender: 'men',
    description: 'Designed for effortless weekend luxury and continental touring. Hand-sewn from velvety water-repellent nubuck with segmented gommino rubber pebble outsoles extending gracefully up the heel counter.',
    details: [
      'Ultra-soft milled nubuck leather with velvet touch',
      'Segmented rubber stud traction sole for exceptional pedal grip and flexibility',
      'Hand-stitched moccasin apron with penny keeper strap',
      'Breathable perforation under the footbed for tropical climates'
    ],
    price: 18500,
    salePrice: 16500,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['40 (EU 7)', '41 (EU 8)', '42 (EU 9)', '43 (EU 10)', '44 (EU 11)'],
    colors: [
      { name: 'Desert Taupe', hex: '#877B6F' },
      { name: 'French Navy', hex: '#1C2938' },
      { name: 'Saddle Tan', hex: '#8C522B' }
    ],
    materials: ['Milled Nubuck Leather', 'Gommino Studded Sole'],
    fit: 'Pliant Slip-on — shapes to feet within two wears',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-16',
    rating: 4.8,
    reviewCount: 16,
    variants: [
      { id: 'v-mf-007-1', sku: 'SJC-MF-007-41-TAU', size: '41 (EU 8)', color: 'Desert Taupe', colorHex: '#877B6F', stock: 7 },
      { id: 'v-mf-007-2', sku: 'SJC-MF-007-42-TAU', size: '42 (EU 9)', color: 'Desert Taupe', colorHex: '#877B6F', stock: 10 },
      { id: 'v-mf-007-3', sku: 'SJC-MF-007-43-TAU', size: '43 (EU 10)', color: 'Desert Taupe', colorHex: '#877B6F', stock: 6 },
      { id: 'v-mf-007-4', sku: 'SJC-MF-007-42-NAV', size: '42 (EU 9)', color: 'French Navy', colorHex: '#1C2938', stock: 5 }
    ]
  },

  // ==========================================
  // --- WOMEN'S PREMIUM LEATHER FOOTWEAR ---
  // ==========================================
  {
    id: 'sjc-wf-001',
    name: 'Ivory Nappa Leather Pointed Heeled Mules',
    sku: 'SJC-WF-001',
    category: 'womens-footwear',
    categoryLabel: "Women's Footwear",
    gender: 'women',
    description: 'Clean architectural lines and modern ease. Crafted in butter-soft Italian ivory nappa leather with an elongated pointed toe, wide buckled vamp strap, and sculpted 55mm kitten heel for effortless all-day grace.',
    details: [
      '100% Italian Nappa lambskin leather upper and lining',
      'Sculpted 55mm (2.1 inch) mid-heel for stable comfort',
      'Soft leather insole with arch-support padding',
      'Non-slip genuine leather outsole with rubber injection tip',
      'Pairs seamlessly with Eastern pret ensembles or Western tailoring'
    ],
    price: 19500,
    images: [
      FOOTWEAR_IMAGE,
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      WOMENS_COUTURE_IMAGE
    ],
    sizes: ['36 (EU 5)', '37 (EU 6)', '38 (EU 7)', '39 (EU 8)', '40 (EU 9)'],
    colors: [
      { name: 'Warm Cream Ivory', hex: '#F6F3EC' },
      { name: 'Caramel Tan', hex: '#8A5836' }
    ],
    materials: ['Italian Nappa Lambskin'],
    fit: 'Pointed Toe — recommend sizing up if in between sizes',
    featured: true,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-04',
    rating: 4.9,
    reviewCount: 27,
    variants: [
      { id: 'v-wf-001-1', sku: 'SJC-WF-001-37-IVR', size: '37 (EU 6)', color: 'Warm Cream Ivory', colorHex: '#F6F3EC', stock: 6 },
      { id: 'v-wf-001-2', sku: 'SJC-WF-001-38-IVR', size: '38 (EU 7)', color: 'Warm Cream Ivory', colorHex: '#F6F3EC', stock: 9 },
      { id: 'v-wf-001-3', sku: 'SJC-WF-001-39-IVR', size: '39 (EU 8)', color: 'Warm Cream Ivory', colorHex: '#F6F3EC', stock: 5 },
      { id: 'v-wf-001-4', sku: 'SJC-WF-001-38-TAN', size: '38 (EU 7)', color: 'Caramel Tan', colorHex: '#8A5836', stock: 4 }
    ]
  },
  {
    id: 'sjc-wf-002',
    name: 'Handcrafted Zari & Pearl Embellished Leather Khussa',
    sku: 'SJC-WF-002',
    category: 'womens-footwear',
    categoryLabel: "Women's Footwear",
    gender: 'women',
    description: 'Traditional artisanal excellence made modern. Pure vegetable-tanned leather base wrapped in ivory satin, hand-embroidered with micro-pearls and dull gold French knot work. Cushioned double leather sole designed to never bite.',
    details: [
      'Genuine double-layer leather sole with anti-bite cushioned heel collar',
      'Hand-sewn zari work with lustrous Japanese seed pearls',
      'Interchangeable left/right foot pattern that shapes to your natural gait',
      'Protective cloth shoe pouch included'
    ],
    price: 11500,
    images: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE,
      WOMENS_COUTURE_IMAGE
    ],
    sizes: ['36 (EU 5)', '37 (EU 6)', '38 (EU 7)', '39 (EU 8)', '40 (EU 9)'],
    colors: [
      { name: 'Opal Ivory', hex: '#F9F8F5' },
      { name: 'Blush Gold', hex: '#DECBB8' }
    ],
    materials: ['Pure Leather', 'Satin', 'Pearl Embellishment'],
    fit: 'Snug artisanal fit that naturally relaxes with first wear',
    featured: false,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-02-12',
    rating: 4.8,
    reviewCount: 39,
    variants: [
      { id: 'v-wf-002-1', sku: 'SJC-WF-002-37-IVR', size: '37 (EU 6)', color: 'Opal Ivory', colorHex: '#F9F8F5', stock: 8 },
      { id: 'v-wf-002-2', sku: 'SJC-WF-002-38-IVR', size: '38 (EU 7)', color: 'Opal Ivory', colorHex: '#F9F8F5', stock: 12 },
      { id: 'v-wf-002-3', sku: 'SJC-WF-002-39-IVR', size: '39 (EU 8)', color: 'Opal Ivory', colorHex: '#F9F8F5', stock: 7 }
    ]
  },
  {
    id: 'sjc-wf-003',
    name: 'Sleek Pointed-Toe Leather Slingback Pumps',
    sku: 'SJC-WF-003',
    category: 'womens-footwear',
    categoryLabel: "Women's Footwear",
    gender: 'women',
    description: 'Sculpted in glossy burnished box calf leather with an adjustable elasticized heel sling and polished 45mm tapered kitten heel. An enduring staple of quiet luxury and boardroom-to-evening poise.',
    details: [
      'Premium Italian burnished box calf with deep mirror depth',
      'Hand-crafted 45mm architectural kitten heel',
      'Padded lambskin insole with anatomical arch contour',
      'Elastic slingback strap for blister-free hold'
    ],
    price: 18500,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['36 (EU 5)', '37 (EU 6)', '38 (EU 7)', '39 (EU 8)', '40 (EU 9)'],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Warm Cream', hex: '#F7F5EE' }
    ],
    materials: ['Italian Box Calf', 'Lambskin Lining'],
    fit: 'True to Size with Pointed Toe',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-11',
    rating: 4.9,
    reviewCount: 23,
    variants: [
      { id: 'v-wf-003-1', sku: 'SJC-WF-003-37-BLK', size: '37 (EU 6)', color: 'Pitch Black', colorHex: '#111111', stock: 5 },
      { id: 'v-wf-003-2', sku: 'SJC-WF-003-38-BLK', size: '38 (EU 7)', color: 'Pitch Black', colorHex: '#111111', stock: 8 },
      { id: 'v-wf-003-3', sku: 'SJC-WF-003-39-BLK', size: '39 (EU 8)', color: 'Pitch Black', colorHex: '#111111', stock: 6 },
      { id: 'v-wf-003-4', sku: 'SJC-WF-003-38-CRM', size: '38 (EU 7)', color: 'Warm Cream', colorHex: '#F7F5EE', stock: 7 }
    ]
  },
  {
    id: 'sjc-wf-004',
    name: 'Sculpted Pointed-Toe Leather Kitten-Heel Ankle Boots in Noir',
    sku: 'SJC-WF-004',
    category: 'womens-footwear',
    categoryLabel: "Women's Footwear",
    gender: 'women',
    description: 'An architectural silhouette crafted from ultra-supple Italian calfskin. Features a sharp elongated pointed toe, inward-curving 50mm architectural kitten heel, inner antique brass zipper, and cushioned insoles for elevated ease.',
    details: [
      'Top-tier glove calfskin with silky soft hand-feel',
      'Sculpted 50mm (2 inch) inverted comma kitten heel',
      'Smooth hidden tonal zip closure with leather zipper pull',
      'All-leather sole with grooved rubber inset for slip resistance'
    ],
    price: 24500,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['36 (EU 5)', '37 (EU 6)', '38 (EU 7)', '39 (EU 8)', '40 (EU 9)'],
    colors: [
      { name: 'Noir Black', hex: '#111113' },
      { name: 'Deep Espresso', hex: '#2C1E18' }
    ],
    materials: ['Italian Calfskin', 'Kidskin Lining'],
    fit: 'Pointed Toe — Narrow to Medium Width',
    featured: true,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-14',
    rating: 4.9,
    reviewCount: 19,
    variants: [
      { id: 'v-wf-004-1', sku: 'SJC-WF-004-37-BLK', size: '37 (EU 6)', color: 'Noir Black', colorHex: '#111113', stock: 6 },
      { id: 'v-wf-004-2', sku: 'SJC-WF-004-38-BLK', size: '38 (EU 7)', color: 'Noir Black', colorHex: '#111113', stock: 9 },
      { id: 'v-wf-004-3', sku: 'SJC-WF-004-39-BLK', size: '39 (EU 8)', color: 'Noir Black', colorHex: '#111113', stock: 5 },
      { id: 'v-wf-004-4', sku: 'SJC-WF-004-38-ESP', size: '38 (EU 7)', color: 'Deep Espresso', colorHex: '#2C1E18', stock: 4 }
    ]
  },
  {
    id: 'sjc-wf-005',
    name: 'Hand-Braided Leather Resort Slide Sandals in Camel Tan',
    sku: 'SJC-WF-005',
    category: 'womens-footwear',
    categoryLabel: "Women's Footwear",
    gender: 'women',
    description: 'Effortless Mediterranean resort aesthetics meets bespoke leather craftsmanship. Hand-woven tubular calfskin upper banded across the vamp, grounded by an anatomical cushioned leather footbed and stitched welt.',
    details: [
      'Artisanal hand-braided tubular calf leather straps',
      'Double-cushioned footbed with ergonomic arch support',
      'Solid stacked leather flat heel (15mm) with rubber heel tap',
      'Flawless pairing with linen trousers, silk kaftans, and evening dresses'
    ],
    price: 14500,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['36 (EU 5)', '37 (EU 6)', '38 (EU 7)', '39 (EU 8)', '40 (EU 9)'],
    colors: [
      { name: 'Camel Tan', hex: '#9E6641' },
      { name: 'Pearl Ivory', hex: '#F6F3EC' },
      { name: 'Onyx Black', hex: '#141414' }
    ],
    materials: ['Full-Grain Calf Leather', 'Natural Leather Footbed'],
    fit: 'Slip-on Slide — True to size',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-15',
    rating: 4.8,
    reviewCount: 22,
    variants: [
      { id: 'v-wf-005-1', sku: 'SJC-WF-005-37-TAN', size: '37 (EU 6)', color: 'Camel Tan', colorHex: '#9E6641', stock: 7 },
      { id: 'v-wf-005-2', sku: 'SJC-WF-005-38-TAN', size: '38 (EU 7)', color: 'Camel Tan', colorHex: '#9E6641', stock: 10 },
      { id: 'v-wf-005-3', sku: 'SJC-WF-005-39-TAN', size: '39 (EU 8)', color: 'Camel Tan', colorHex: '#9E6641', stock: 6 },
      { id: 'v-wf-005-4', sku: 'SJC-WF-005-38-IVR', size: '38 (EU 7)', color: 'Pearl Ivory', colorHex: '#F6F3EC', stock: 8 }
    ]
  },
  {
    id: 'sjc-wf-006',
    name: 'Two-Strap Minimalist Block Heel Leather Sandal in Alabaster',
    sku: 'SJC-WF-006',
    category: 'womens-footwear',
    categoryLabel: "Women's Footwear",
    gender: 'women',
    description: 'Clean architectural lines and modern poise. Rendered in smooth alabaster ivory calf leather with two slender buckle straps, squared open toe, and steady 60mm block heel for day-to-night events.',
    details: [
      'Italian smooth box calfskin with subtle luster',
      'Modern squared toe shape and sturdy 60mm leather-wrapped block heel',
      'Micro-adjustable ankle buckle with elasticated hidden insert',
      'High-density memory foam padding across forefoot'
    ],
    price: 19500,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE
    ],
    sizes: ['36 (EU 5)', '37 (EU 6)', '38 (EU 7)', '39 (EU 8)', '40 (EU 9)'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#FAF7F0' },
      { name: 'Midnight Black', hex: '#111111' }
    ],
    materials: ['Smooth Box Calf', 'Stacked Leather Heel'],
    fit: 'Square Toe — True to Size',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-16',
    rating: 5.0,
    reviewCount: 14,
    variants: [
      { id: 'v-wf-006-1', sku: 'SJC-WF-006-37-IVR', size: '37 (EU 6)', color: 'Alabaster Ivory', colorHex: '#FAF7F0', stock: 6 },
      { id: 'v-wf-006-2', sku: 'SJC-WF-006-38-IVR', size: '38 (EU 7)', color: 'Alabaster Ivory', colorHex: '#FAF7F0', stock: 9 },
      { id: 'v-wf-006-3', sku: 'SJC-WF-006-39-IVR', size: '39 (EU 8)', color: 'Alabaster Ivory', colorHex: '#FAF7F0', stock: 5 },
      { id: 'v-wf-006-4', sku: 'SJC-WF-006-38-BLK', size: '38 (EU 7)', color: 'Midnight Black', colorHex: '#111111', stock: 7 }
    ]
  },

  // ==========================================
  // --- MEN'S CLOTHING ---
  // ==========================================
  {
    id: 'sjc-mc-001',
    name: 'Bespoke Charcoal Wool & Silk Tailored Waistcoat',
    sku: 'SJC-MC-001',
    category: 'mens-clothing',
    categoryLabel: "Men's Clothing",
    gender: 'men',
    description: 'A masterpiece of contemporary formal tailoring, crafted from an exclusive Italian wool and raw silk blend. Features a structured shawl lapel, hand-stitched pick detailing, horn buttons, and bespoke interior lining for formal celebrations and luxury gatherings.',
    details: [
      'Italian 80% Super 130s Merino Wool, 20% Hand-Reeled Mulberry Silk',
      'Hand-finished pick stitching along lapel and welt pockets',
      'Dual jetted lower pockets with breast pocket for silk square',
      'Dry clean only by luxury garment specialist',
      'Bespoke cut designed and finished at the SJ Collections atelier'
    ],
    price: 24500,
    salePrice: 21500,
    images: [
      MENS_TAILORED_IMAGE,
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    colors: [
      { name: 'Midnight Charcoal', hex: '#242426' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Warm Taupe', hex: '#7A6F62' }
    ],
    materials: ['Super 130s Wool', 'Mulberry Silk Lining'],
    fit: 'Tailored Slim Architectural Fit',
    featured: true,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-01',
    rating: 4.9,
    reviewCount: 38,
    variants: [
      { id: 'v-mc-001-1', sku: 'SJC-MC-001-38-CHR', size: '38 (S)', color: 'Midnight Charcoal', colorHex: '#242426', stock: 8 },
      { id: 'v-mc-001-2', sku: 'SJC-MC-001-40-CHR', size: '40 (M)', color: 'Midnight Charcoal', colorHex: '#242426', stock: 12 },
      { id: 'v-mc-001-3', sku: 'SJC-MC-001-42-CHR', size: '42 (L)', color: 'Midnight Charcoal', colorHex: '#242426', stock: 6 },
      { id: 'v-mc-001-4', sku: 'SJC-MC-001-44-CHR', size: '44 (XL)', color: 'Midnight Charcoal', colorHex: '#242426', stock: 3 },
      { id: 'v-mc-001-5', sku: 'SJC-MC-001-40-BLK', size: '40 (M)', color: 'Onyx Black', colorHex: '#111111', stock: 7 },
      { id: 'v-mc-001-6', sku: 'SJC-MC-001-42-BLK', size: '42 (L)', color: 'Onyx Black', colorHex: '#111111', stock: 5 },
      { id: 'v-mc-001-7', sku: 'SJC-MC-001-40-TAU', size: '40 (M)', color: 'Warm Taupe', colorHex: '#7A6F62', stock: 4 }
    ]
  },
  {
    id: 'sjc-mc-002',
    name: 'Hand-Loomed Raw Silk Kurta Pajama in Warm Ivory',
    sku: 'SJC-MC-002',
    category: 'mens-clothing',
    categoryLabel: "Men's Clothing",
    gender: 'men',
    description: 'Impeccably tailored from indigenous hand-loomed raw silk with an organic slub texture. Styled with a minimalist Mandarin ban collar, tonal button placket, and paired with straight-cut raw silk trouser.',
    details: [
      '100% Hand-loomed Raw Silk (Katan Silk Weave)',
      'Natural slub surface with tactile luster',
      'Concealed placket with genuine mother-of-pearl buttons',
      'Side inseam pockets and side slits for fluid movement',
      'Comes with tailored matching straight trouser'
    ],
    price: 32000,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE,
      MENS_TAILORED_IMAGE
    ],
    sizes: ['Small', 'Medium', 'Large', 'Custom'],
    colors: [
      { name: 'Warm Ivory', hex: '#F4F0E8' },
      { name: 'Raw Sand', hex: '#DDD2C3' }
    ],
    materials: ['100% Raw Silk'],
    fit: 'Relaxed Tailored Classic Silhouette',
    featured: true,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-05',
    rating: 4.8,
    reviewCount: 22,
    variants: [
      { id: 'v-mc-002-1', sku: 'SJC-MC-002-S-IVR', size: 'Small', color: 'Warm Ivory', colorHex: '#F4F0E8', stock: 5 },
      { id: 'v-mc-002-2', sku: 'SJC-MC-002-M-IVR', size: 'Medium', color: 'Warm Ivory', colorHex: '#F4F0E8', stock: 9 },
      { id: 'v-mc-002-3', sku: 'SJC-MC-002-L-IVR', size: 'Large', color: 'Warm Ivory', colorHex: '#F4F0E8', stock: 6 },
      { id: 'v-mc-002-4', sku: 'SJC-MC-002-M-SND', size: 'Medium', color: 'Raw Sand', colorHex: '#DDD2C3', stock: 4 }
    ]
  },
  {
    id: 'sjc-mc-003',
    name: 'Bespoke Structured Prince Coat in Fine Cashmere Blend',
    sku: 'SJC-MC-003',
    category: 'mens-clothing',
    categoryLabel: "Men's Clothing",
    gender: 'men',
    description: 'An iconic silhouette in subcontinental formal wear, the SJ Prince Coat is rendered in heavy cashmere-blend wool. Features high band collar, sculpted chest canvas, hand-cast brass crest buttons, and velvet collar lining.',
    details: [
      'Cashmere & Fine Wool blend with structured horsehair canvas interlining',
      'High Mandarin stand collar with interior micro-velvet trim',
      'Metallic custom crest shank buttons',
      'Chest pocket with welt finishing for pocket square',
      'Dry clean only'
    ],
    price: 48000,
    salePrice: 42500,
    images: [
      MENS_TAILORED_IMAGE,
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    colors: [
      { name: 'Regal Jet Black', hex: '#0F0F10' },
      { name: 'Deep Midnight Navy', hex: '#161C26' }
    ],
    materials: ['Cashmere Wool Blend', 'Bemberg Silk Lining'],
    fit: 'Sculpted Royal Fit',
    featured: false,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-02-15',
    rating: 5.0,
    reviewCount: 45,
    variants: [
      { id: 'v-mc-003-1', sku: 'SJC-MC-003-38-BLK', size: '38 (S)', color: 'Regal Jet Black', colorHex: '#0F0F10', stock: 4 },
      { id: 'v-mc-003-2', sku: 'SJC-MC-003-40-BLK', size: '40 (M)', color: 'Regal Jet Black', colorHex: '#0F0F10', stock: 8 },
      { id: 'v-mc-003-3', sku: 'SJC-MC-003-42-BLK', size: '42 (L)', color: 'Regal Jet Black', colorHex: '#0F0F10', stock: 5 },
      { id: 'v-mc-003-4', sku: 'SJC-MC-003-40-NVY', size: '40 (M)', color: 'Deep Midnight Navy', colorHex: '#161C26', stock: 4 }
    ]
  },
  {
    id: 'sjc-mc-004',
    name: 'Egyptian Giza Cotton Tonal Embroidered Kurta',
    sku: 'SJC-MC-004',
    category: 'mens-clothing',
    categoryLabel: "Men's Clothing",
    gender: 'men',
    description: 'Crafted from extra-long staple Egyptian Giza cotton for exceptional breathability and silky drape under Pakistan’s warm climate. Micro-herringbone weave adorned with ultra-subtle tonal resham threadwork along the neckline.',
    details: [
      '100% Extra-Long Staple 200s Egyptian Giza Cotton',
      'Delicate tone-on-tone resham embroidery on placket & cuffs',
      'Reinforced seams with hand-sewn bar tacks',
      'Pre-shrunk fabric with soft luxurious sheen'
    ],
    price: 18500,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE,
      MENS_TAILORED_IMAGE
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Pristine Chalk', hex: '#FDFCFA' },
      { name: 'Muted Platinum', hex: '#D8D8D8' },
      { name: 'Classic Slate', hex: '#58595B' }
    ],
    materials: ['100% Giza Cotton'],
    fit: 'Tailored Comfort Fit',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-10',
    rating: 4.7,
    reviewCount: 19,
    variants: [
      { id: 'v-mc-004-1', sku: 'SJC-MC-004-S-WHT', size: 'Small', color: 'Pristine Chalk', colorHex: '#FDFCFA', stock: 10 },
      { id: 'v-mc-004-2', sku: 'SJC-MC-004-M-WHT', size: 'Medium', color: 'Pristine Chalk', colorHex: '#FDFCFA', stock: 14 },
      { id: 'v-mc-004-3', sku: 'SJC-MC-004-L-WHT', size: 'Large', color: 'Pristine Chalk', colorHex: '#FDFCFA', stock: 8 },
      { id: 'v-mc-004-4', sku: 'SJC-MC-004-M-PLT', size: 'Medium', color: 'Muted Platinum', colorHex: '#D8D8D8', stock: 6 }
    ]
  },

  // ==========================================
  // --- WOMEN'S CLOTHING ---
  // ==========================================
  {
    id: 'sjc-wc-001',
    name: 'Couture Ivory Zardozi & Mukaish Pishwas Ensemble',
    sku: 'SJC-WC-001',
    category: 'womens-clothing',
    categoryLabel: "Women's Clothing",
    gender: 'women',
    description: 'An ethereal bridal & luxury festive pishwas cut from sheer hand-spun silk organza and chiffon. Embellished with 40+ hours of hand-executed zardozi, real silver dabka, mukaish flakes, and pearl seedwork on bodice and kalis.',
    details: [
      'Hand-woven Pure Silk Organza & Crinkle Chiffon flare',
      'Bodice intricately worked in silver dabka, mukaish, and micro-pearls',
      'Sweeping 18-kali voluminous silhouette with horsehair hem',
      'Includes matching pure organza dupatta with four-sided kiran border',
      'Silk slip and churidar pajama included in full 3-piece set'
    ],
    price: 58000,
    salePrice: 52000,
    images: [
      WOMENS_COUTURE_IMAGE,
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE
    ],
    sizes: ['Extra Small', 'Small', 'Medium', 'Large'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F9F7F1' },
      { name: 'Pale Champagne', hex: '#EDE6D6' }
    ],
    materials: ['Pure Silk Organza', 'Crinkle Chiffon', 'Silk Lining'],
    fit: 'Sweeping Royal Flare with Fitted Bodice',
    featured: true,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-02',
    rating: 5.0,
    reviewCount: 41,
    variants: [
      { id: 'v-wc-001-1', sku: 'SJC-WC-001-XS-IVR', size: 'Extra Small', color: 'Alabaster Ivory', colorHex: '#F9F7F1', stock: 3 },
      { id: 'v-wc-001-2', sku: 'SJC-WC-001-S-IVR', size: 'Small', color: 'Alabaster Ivory', colorHex: '#F9F7F1', stock: 6 },
      { id: 'v-wc-001-3', sku: 'SJC-WC-001-M-IVR', size: 'Medium', color: 'Alabaster Ivory', colorHex: '#F9F7F1', stock: 7 },
      { id: 'v-wc-001-4', sku: 'SJC-WC-001-L-IVR', size: 'Large', color: 'Alabaster Ivory', colorHex: '#F9F7F1', stock: 4 },
      { id: 'v-wc-001-5', sku: 'SJC-WC-001-M-CHM', size: 'Medium', color: 'Pale Champagne', colorHex: '#EDE6D6', stock: 4 }
    ]
  },
  {
    id: 'sjc-wc-002',
    name: 'Chanderi Silk Embroidered Tunic & Cigarette Pant',
    sku: 'SJC-WC-002',
    category: 'womens-clothing',
    categoryLabel: "Women's Clothing",
    gender: 'women',
    description: 'Understated luxury for intimate soirées and day festivities. Handwoven Chanderi silk with delicate self-colored thread jaal and scalloped lace edging. Paired with tailored raw silk cigarette trousers.',
    details: [
      'Authentic Handwoven Chanderi Silk with natural sheer sheen',
      'Delicate floral resham jaal with scalloped laser-cut hemline',
      'Boat neck with subtle pearl buttons down back',
      'Raw silk tapered cigarette trousers with cuff slit',
      '2-Piece luxury pret ready-to-wear set'
    ],
    price: 28500,
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      WOMENS_COUTURE_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['Small', 'Medium', 'Large'],
    colors: [
      { name: 'Warm Cream', hex: '#FAF6EE' },
      { name: 'Muted Rosewood', hex: '#A37C77' },
      { name: 'Sage Celadon', hex: '#A9B3A2' }
    ],
    materials: ['Chanderi Silk', 'Raw Silk Trouser'],
    fit: 'Relaxed A-Line Tunic with Tailored Trouser',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-08',
    rating: 4.8,
    reviewCount: 16,
    variants: [
      { id: 'v-wc-002-1', sku: 'SJC-WC-002-S-CRM', size: 'Small', color: 'Warm Cream', colorHex: '#FAF6EE', stock: 7 },
      { id: 'v-wc-002-2', sku: 'SJC-WC-002-M-CRM', size: 'Medium', color: 'Warm Cream', colorHex: '#FAF6EE', stock: 9 },
      { id: 'v-wc-002-3', sku: 'SJC-WC-002-L-CRM', size: 'Large', color: 'Warm Cream', colorHex: '#FAF6EE', stock: 5 },
      { id: 'v-wc-002-4', sku: 'SJC-WC-002-M-SGE', size: 'Medium', color: 'Sage Celadon', colorHex: '#A9B3A2', stock: 4 }
    ]
  },
  {
    id: 'sjc-wc-003',
    name: 'Artisanal Silk Velvet Formal Kaftan with Tilla Work',
    sku: 'SJC-WC-003',
    category: 'womens-clothing',
    categoryLabel: "Women's Clothing",
    gender: 'women',
    description: 'A regal silhouette crafted from heavyweight micro-silk velvet in midnight noir. Richly accented with antique dull gold tilla cord embroidery and hand-cut sequins along collar, cuffs, and front slit.',
    details: [
      'Heavy Micro-Silk Velvet (Plush 9000 grade)',
      'Antique metallic tilla wire embroidery inspired by Mughal architectural motifs',
      'Generous flared silhouette with interior cinch cord for customizable silhouette',
      'Full silk lining for comfortable drape against the skin'
    ],
    price: 38000,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      WOMENS_COUTURE_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['Free Size (Fits S-L)', 'Plus (Fits XL-XXL)'],
    colors: [
      { name: 'Midnight Noir', hex: '#141416' },
      { name: 'Emerald Velvet', hex: '#1E332B' }
    ],
    materials: ['Silk Velvet', 'Habotai Silk Lining'],
    fit: 'Fluid Architectural Kaftan Fit',
    featured: true,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-02-20',
    rating: 4.9,
    reviewCount: 29,
    variants: [
      { id: 'v-wc-003-1', sku: 'SJC-WC-003-FS-BLK', size: 'Free Size (Fits S-L)', color: 'Midnight Noir', colorHex: '#141416', stock: 8 },
      { id: 'v-wc-003-2', sku: 'SJC-WC-003-PL-BLK', size: 'Plus (Fits XL-XXL)', color: 'Midnight Noir', colorHex: '#141416', stock: 3 },
      { id: 'v-wc-003-3', sku: 'SJC-WC-003-FS-EMR', size: 'Free Size (Fits S-L)', color: 'Emerald Velvet', colorHex: '#1E332B', stock: 5 }
    ]
  },

  // ==========================================
  // --- BAGS & LUGGAGE ---
  // ==========================================
  {
    id: 'sjc-bg-001',
    name: 'Sovereign Full-Grain Leather Structured Handbag',
    sku: 'SJC-BG-001',
    category: 'bags',
    categoryLabel: 'Bags & Luggage',
    gender: 'women',
    description: 'The crowning statement of the SJ leather goods collection. Meticulously handcrafted from full-grain pebbled calfskin in dual tones of Noir Black and Rich Mahogany. Features structured luggage top handles, turn-lock brass hardware, and detachable crossbody strap.',
    details: [
      'Full-grain Italian calf leather with water-repellent protective wax coating',
      'Heavy brushed brass key-lock closure with engraved SJ crest',
      'Spacious main compartment lined in microfiber suede with zipped security pocket',
      'Protective metal base studs on bottom',
      'Includes detachable, adjustable leather shoulder strap (48cm - 58cm drop)'
    ],
    price: 36500,
    salePrice: 32500,
    images: [
      LEATHER_BAG_IMAGE,
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Noir & Mahogany Duo', hex: '#2A1F1D' },
      { name: 'Pure Noir Black', hex: '#1A1A1A' },
      { name: 'Cognac Saddle Tan', hex: '#724329' }
    ],
    materials: ['Full-Grain Calfskin', 'Brushed Brass Hardware'],
    dimensions: '32cm (W) x 24cm (H) x 14cm (D)',
    featured: true,
    newArrival: true,
    bestseller: true,
    createdAt: '2026-03-03',
    rating: 5.0,
    reviewCount: 48,
    variants: [
      { id: 'v-bg-001-1', sku: 'SJC-BG-001-OS-DUO', size: 'One Size', color: 'Noir & Mahogany Duo', colorHex: '#2A1F1D', stock: 6 },
      { id: 'v-bg-001-2', sku: 'SJC-BG-001-OS-BLK', size: 'One Size', color: 'Pure Noir Black', colorHex: '#1A1A1A', stock: 8 },
      { id: 'v-bg-001-3', sku: 'SJC-BG-001-OS-COG', size: 'One Size', color: 'Cognac Saddle Tan', colorHex: '#724329', stock: 4 }
    ]
  },
  {
    id: 'sjc-bg-002',
    name: 'Artisanal Executive Leather Attache & Laptop Briefcase',
    sku: 'SJC-BG-002',
    category: 'bags',
    categoryLabel: 'Bags & Luggage',
    gender: 'men',
    description: 'Designed for discerning professionals who appreciate legacy craftsmanship. Structured bridle leather with edge-dyed burnished seams, padded sleeve for up to 16-inch laptops, organizer pockets, and luggage trolley strap.',
    details: [
      'Vegetable-tanned full-grain cowhide leather with natural grain variations',
      'Dedicated padded compartment for 15-16” MacBook or PC laptop',
      'Antiqued brass two-way zippers with leather pullers',
      'Rear leather slot slides over rolling suitcase handles',
      'Removable ergonomic shoulder strap with padded leather patch'
    ],
    price: 29500,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Deep Espresso', hex: '#2C201C' },
      { name: 'Pitch Black', hex: '#161616' }
    ],
    materials: ['Vegetable-Tanned Cowhide', 'Solid Brass Hardware'],
    dimensions: '40cm (W) x 29cm (H) x 9cm (D)',
    featured: true,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-02-14',
    rating: 4.9,
    reviewCount: 31,
    variants: [
      { id: 'v-bg-002-1', sku: 'SJC-BG-002-OS-ESP', size: 'One Size', color: 'Deep Espresso', colorHex: '#2C201C', stock: 7 },
      { id: 'v-bg-002-2', sku: 'SJC-BG-002-OS-BLK', size: 'One Size', color: 'Pitch Black', colorHex: '#161616', stock: 5 }
    ]
  },
  {
    id: 'sjc-bg-003',
    name: 'Minimalist Suede & Calfskin Monogram Everyday Tote',
    sku: 'SJC-BG-003',
    category: 'bags',
    categoryLabel: 'Bags & Luggage',
    gender: 'unisex',
    description: 'A spacious and understated everyday luxury carryall. Soft suede panels bordered with smooth calfskin, long shoulder straps designed for effortless over-the-coat carrying, and a magnetic closure.',
    details: [
      'Plush Italian split suede with smooth calfskin reinforced base',
      'Magnetic bridge closure with interior detachable leather pouch',
      'Comfortable 26cm handle drop',
      'Fits laptop, daily essentials, and travel essentials'
    ],
    price: 22000,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      LEATHER_BAG_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Warm Taupe & Chocolate', hex: '#5E4A3F' },
      { name: 'Black Suede', hex: '#1F1F1F' }
    ],
    materials: ['Italian Suede', 'Smooth Calfskin'],
    dimensions: '38cm (W) x 32cm (H) x 16cm (D)',
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-09',
    rating: 4.8,
    reviewCount: 14,
    variants: [
      { id: 'v-bg-003-1', sku: 'SJC-BG-003-OS-TPC', size: 'One Size', color: 'Warm Taupe & Chocolate', colorHex: '#5E4A3F', stock: 8 },
      { id: 'v-bg-003-2', sku: 'SJC-BG-003-OS-BLK', size: 'One Size', color: 'Black Suede', colorHex: '#1F1F1F', stock: 6 }
    ]
  },

  // ==========================================
  // --- FASHION ACCESSORIES ---
  // ==========================================
  {
    id: 'sjc-ac-001',
    name: 'Hand-Rolled 100% Mulberry Silk Pocket Square',
    sku: 'SJC-AC-001',
    category: 'accessories',
    categoryLabel: 'Accessories',
    gender: 'men',
    description: 'Hand-crafted from 18-momme pure mulberry silk twill. Features classic architectural geometric motifs inspired by Lahore’s Wazir Khan fresco art, finished with meticulously hand-rolled edges.',
    details: [
      '100% Pure Mulberry Silk Twill (18 Momme)',
      'Hand-rolled and hand-stitched borders taking 90 minutes per square',
      'Vibrant colorfast dyes with gentle matte luster',
      'Dimensions: 42cm x 42cm'
    ],
    price: 6500,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE,
      MENS_TAILORED_IMAGE
    ],
    sizes: ['One Size (42x42 cm)'],
    colors: [
      { name: 'Ivory & Noir Scroll', hex: '#F5F2EB' },
      { name: 'Deep Burgundy Gold', hex: '#522026' }
    ],
    materials: ['100% Mulberry Silk'],
    dimensions: '42cm x 42cm',
    featured: false,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-02-05',
    rating: 4.9,
    reviewCount: 43,
    variants: [
      { id: 'v-ac-001-1', sku: 'SJC-AC-001-OS-IVR', size: 'One Size', color: 'Ivory & Noir Scroll', colorHex: '#F5F2EB', stock: 20 },
      { id: 'v-ac-001-2', sku: 'SJC-AC-001-OS-BRG', size: 'One Size', color: 'Deep Burgundy Gold', colorHex: '#522026', stock: 15 }
    ]
  },
  {
    id: 'sjc-ac-002',
    name: 'Reversible Italian Bridle Leather Dress Belt',
    sku: 'SJC-AC-002',
    category: 'accessories',
    categoryLabel: 'Accessories',
    gender: 'men',
    description: 'Two luxury belts in one. Premium Italian bridle leather with a clever swivel buckle allowing effortless rotation between Classic Noir Black and Rich Warm Cognac.',
    details: [
      'Top-grain Italian bridle leather with hand-burnished feathered edges',
      'Patented twist-buckle in brushed palladium matte finish',
      '35mm width — ideal for both suit trousers and chinos',
      'Presented in rigid SJ luxury gift box'
    ],
    price: 9500,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      FOOTWEAR_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black / Cognac Reversible', hex: '#1C1C1C' }
    ],
    materials: ['Italian Bridle Leather', 'Brushed Palladium Buckle'],
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-07',
    rating: 4.7,
    reviewCount: 28,
    variants: [
      { id: 'v-ac-002-1', sku: 'SJC-AC-002-32-REV', size: '32', color: 'Black / Cognac Reversible', colorHex: '#1C1C1C', stock: 8 },
      { id: 'v-ac-002-2', sku: 'SJC-AC-002-34-REV', size: '34', color: 'Black / Cognac Reversible', colorHex: '#1C1C1C', stock: 14 },
      { id: 'v-ac-002-3', sku: 'SJC-AC-002-36-REV', size: '36', color: 'Black / Cognac Reversible', colorHex: '#1C1C1C', stock: 12 },
      { id: 'v-ac-002-4', sku: 'SJC-AC-002-38-REV', size: '38', color: 'Black / Cognac Reversible', colorHex: '#1C1C1C', stock: 7 }
    ]
  },
  {
    id: 'sjc-ac-003',
    name: 'Handspun Pure Pashmina Cashmere Shawl with Sozni Border',
    sku: 'SJC-AC-003',
    category: 'accessories',
    categoryLabel: 'Accessories',
    gender: 'unisex',
    description: 'Woven on traditional wooden handlooms from ultra-fine Himalayan changthangi cashmere fibers (12-14 microns). Adorned along the perimeter with exquisite needlepoint Sozni embroidery that passes effortlessly through a ring.',
    details: [
      '100% Grade-A Pure Changthangi Cashmere Pashmina',
      'Certified handloom weave weighing less than 180 grams',
      'Delicate needlepoint floral hashia border executed by generational artisans',
      'Generous 100cm x 200cm drape for formal evenings'
    ],
    price: 45000,
    salePrice: 39500,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      WOMENS_COUTURE_IMAGE,
      HERO_IMAGE
    ],
    sizes: ['100cm x 200cm'],
    colors: [
      { name: 'Natural Warm Ivory', hex: '#F6F3EC' },
      { name: 'Charcoal Ombre', hex: '#343336' }
    ],
    materials: ['100% Pure Himalayan Cashmere Pashmina'],
    dimensions: '100cm x 200cm',
    featured: true,
    newArrival: false,
    bestseller: true,
    createdAt: '2026-01-25',
    rating: 5.0,
    reviewCount: 35,
    variants: [
      { id: 'v-ac-003-1', sku: 'SJC-AC-003-OS-IVR', size: '100cm x 200cm', color: 'Natural Warm Ivory', colorHex: '#F6F3EC', stock: 5 },
      { id: 'v-ac-003-2', sku: 'SJC-AC-003-OS-CHR', size: '100cm x 200cm', color: 'Charcoal Ombre', colorHex: '#343336', stock: 4 }
    ]
  },
  {
    id: 'sjc-ac-004',
    name: 'Sterling Silver 925 Engraved Monogram Cufflinks',
    sku: 'SJC-AC-004',
    category: 'accessories',
    categoryLabel: 'Accessories',
    gender: 'men',
    description: 'Cast in solid 925 Sterling Silver with a hand-polished mirror finish and bezel edge. Engraved with the official SJ Collections monogram and finished with a swivel whale-back toggle.',
    details: [
      'Solid 925 Sterling Silver stamped with hallmark',
      'Anti-tarnish rhodium protective micro-coating',
      'Laser-carved monogram with frosted interior contrast',
      'Presentation velvet case with silver polishing cloth included'
    ],
    price: 12500,
    images: [
      'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=800&q=80',
      HERO_IMAGE,
      MENS_TAILORED_IMAGE
    ],
    sizes: ['One Size (16mm Diameter)'],
    colors: [
      { name: 'Mirror Silver', hex: '#D6D8DC' }
    ],
    materials: ['925 Sterling Silver', 'Rhodium Coating'],
    featured: false,
    newArrival: true,
    bestseller: false,
    createdAt: '2026-03-06',
    rating: 4.9,
    reviewCount: 21,
    variants: [
      { id: 'v-ac-004-1', sku: 'SJC-AC-004-OS-SLV', size: 'One Size (16mm Diameter)', color: 'Mirror Silver', colorHex: '#D6D8DC', stock: 15 }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'mens-clothing', label: "Men's Clothing" },
  { id: 'womens-clothing', label: "Women's Clothing" },
  { id: 'mens-footwear', label: "Men's Footwear" },
  { id: 'womens-footwear', label: "Women's Footwear" },
  { id: 'wallets', label: 'Leather Wallets' },
  { id: 'bags', label: 'Bags & Luggage' },
  { id: 'accessories', label: 'Accessories' }
];

export const PAKISTAN_CITIES = [
  { name: 'Karachi', province: 'Sindh' },
  { name: 'Lahore', province: 'Punjab' },
  { name: 'Islamabad', province: 'Islamabad Capital Territory' },
  { name: 'Rawalpindi', province: 'Punjab' },
  { name: 'Faisalabad', province: 'Punjab' },
  { name: 'Multan', province: 'Punjab' },
  { name: 'Peshawar', province: 'Khyber Pakhtunkhwa' },
  { name: 'Quetta', province: 'Balochistan' },
  { name: 'Sialkot', province: 'Punjab' },
  { name: 'Gujranwala', province: 'Punjab' },
  { name: 'Hyderabad', province: 'Sindh' },
  { name: 'Abbottabad', province: 'Khyber Pakhtunkhwa' },
  { name: 'Bahawalpur', province: 'Punjab' },
  { name: 'Sargodha', province: 'Punjab' },
  { name: 'Sukkur', province: 'Sindh' },
  { name: 'Gilgit', province: 'Gilgit-Baltistan' },
  { name: 'Muzaffarabad', province: 'Azad Jammu & Kashmir' }
];

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Islamabad Capital Territory',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan'
];
