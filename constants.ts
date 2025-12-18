
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Saffiano Tote',
    category: 'Handbags',
    price: 450,
    salePrice: 299,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    description: 'A classic structured tote crafted from premium Saffiano leather.',
    features: ['100% Saffiano Leather', 'Gold-tone hardware', 'Spacious interior', 'Protective feet']
  },
  {
    id: '2',
    name: 'Desert Nomad Backpack',
    category: 'Backpacks',
    price: 180,
    salePrice: 145,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    description: 'Durable canvas backpack with leather accents for the modern explorer.',
    features: ['Water-resistant canvas', '15" Laptop sleeve', 'Padded straps', 'Multiple compartments']
  },
  {
    id: '3',
    name: 'Velvet Evening Clutch',
    category: 'Clutches',
    price: 120,
    salePrice: 89,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd111c36?auto=format&fit=crop&q=80&w=600',
    description: 'Elegant velvet clutch with a detachable chain strap.',
    features: ['Plush velvet finish', 'Internal card slots', 'Magnetic closure', 'Detachable chain']
  },
  {
    id: '4',
    name: 'The Jetsetter Duffle',
    category: 'Travel',
    price: 350,
    salePrice: 280,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=600',
    description: 'The ultimate weekender bag for stylish travels.',
    features: ['Premium vegan leather', 'Shoe compartment', 'Carry-on size', 'Adjustable strap']
  },
  {
    id: '5',
    name: 'Azure Crossbody',
    category: 'Handbags',
    price: 220,
    salePrice: 159,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600',
    description: 'Vibrant blue crossbody bag with adjustable strap.',
    features: ['Compact design', 'Pebbled leather', 'Zip-top closure', 'Lightweight']
  },
  {
    id: '6',
    name: 'Onyx Executive Briefcase',
    category: 'Travel',
    price: 550,
    salePrice: 420,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    description: 'Sleek black briefcase for the professional high-flyer.',
    features: ['Genuine full-grain leather', 'Ergonomic handle', 'Document organizer', 'Lockable zips']
  }
];
