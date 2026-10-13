export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  stock: "In Stock" | "Low Stock" | "Only a few left";
  img: string;
  desc: string;
  specs: string[];
  badge?: string;
};

export const CATEGORIES = [
  "All",
  "Mobile Accessories",
  "Audio & Wearables",
  "Computer & Office",
  "Smart Home",
  "Lifestyle & Travel",
];

export const DISTRICTS = [
  "Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barishal",
  "Rangpur", "Mymensingh", "Cumilla", "Bogura", "Jessore", "Cox's Bazar",
  "Dinajpur", "Faridpur", "Lakshmipur", "Noakhali",
];

const u = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

export const PRODUCTS: Product[] = [
  { id: 1, name: "AeroBuds Pro Wireless Earbuds", category: "Audio & Wearables", price: 1890, oldPrice: 2990, rating: 4.8, reviews: 1240, stock: "In Stock", img: u("photo-1590658268037-6bf12165a8df"), desc: "Crystal-clear sound, deep bass and active noise cancellation in a pocket-sized case.", specs: ["ANC + ENC mic", "32h total playtime", "Bluetooth 5.3", "IPX5 water resistant"], badge: "Bestseller" },
  { id: 2, name: "PulseFit Smart Watch S2", category: "Audio & Wearables", price: 3250, oldPrice: 4990, rating: 4.7, reviews: 890, stock: "In Stock", img: u("photo-1523275335684-37898b6baf30"), desc: "Track fitness, heart rate and sleep on a bright AMOLED display with 10-day battery.", specs: ["1.43\" AMOLED display", "Heart rate + SpO2", "10-day battery", "100+ sport modes"], badge: "Hot" },
  { id: 3, name: "VoltCore 20000mAh Power Bank", category: "Mobile Accessories", price: 2150, oldPrice: 3200, rating: 4.9, reviews: 2100, stock: "In Stock", img: u("photo-1609091839311-d5365f9ff1c5"), desc: "Charge two phones at once with fast 22.5W output and a handy LED battery display.", specs: ["20000mAh capacity", "22.5W fast charging", "Dual USB + Type-C", "LED display"], badge: "Bestseller" },
  { id: 4, name: "TurboCharge 65W GaN Charger", category: "Mobile Accessories", price: 1650, oldPrice: 2400, rating: 4.8, reviews: 760, stock: "In Stock", img: u("photo-1583864697784-a0efc8379f70"), desc: "One compact charger for your laptop, phone and tablet — GaN tech keeps it cool and fast.", specs: ["65W GaN II", "2x Type-C + 1x USB", "Charges laptop too", "Foldable plug"] },
  { id: 5, name: "BoomMini Portable Speaker", category: "Audio & Wearables", price: 1450, oldPrice: 2200, rating: 4.6, reviews: 540, stock: "In Stock", img: u("photo-1608043152269-423dbba4e7e1"), desc: "Room-filling sound in your palm. Pair two for stereo and take it anywhere.", specs: ["12h playtime", "IPX7 waterproof", "TWS pairing", "Built-in mic"] },
  { id: 6, name: "MechType RGB Mechanical Keyboard", category: "Computer & Office", price: 3950, oldPrice: 5500, rating: 4.7, reviews: 430, stock: "In Stock", img: u("photo-1587829741301-dc798b83add3"), desc: "Satisfying tactile keys, per-key RGB and a solid aluminium frame for work and play.", specs: ["Hot-swappable keys", "Tri-mode: BT / 2.4G / wired", "RGB backlight", "4000mAh battery"] },
  { id: 7, name: "SwiftClick Wireless Mouse", category: "Computer & Office", price: 950, oldPrice: 1450, rating: 4.5, reviews: 980, stock: "In Stock", img: u("photo-1527864550417-7fd91fc51a46"), desc: "Silent clicks, a comfy grip and months of battery — perfect for long work days.", specs: ["Silent buttons", "18-month battery", "2.4GHz + BT", "1600 DPI"], badge: "Value Pick" },
  { id: 8, name: "SoundMax Over-Ear Headphones", category: "Audio & Wearables", price: 2750, oldPrice: 4200, rating: 4.8, reviews: 1120, stock: "Low Stock", img: u("photo-1505740420928-5e560c06d30e"), desc: "Plush cushions, rich bass and 40-hour battery for music, movies and calls.", specs: ["40h battery", "Foldable design", "3.5mm + BT", "Built-in mic"] },
  { id: 9, name: "FlexStand Aluminium Laptop Stand", category: "Computer & Office", price: 1250, oldPrice: 1800, rating: 4.6, reviews: 310, stock: "In Stock", img: u("photo-1615663245857-ac93bb7c39e7"), desc: "Six adjustable heights for better posture, with airflow cooling built in.", specs: ["6 height levels", "Up to 17\" laptops", "Foldable", "Aluminium body"] },
  { id: 10, name: "SmartGlow LED Strip Light 5m", category: "Smart Home", price: 890, oldPrice: 1400, rating: 4.5, reviews: 670, stock: "In Stock", img: u("photo-1565538810643-b5bdb714032a"), desc: "16 million colours, music sync and app control — set the mood in seconds.", specs: ["5m, 16M colours", "App + remote", "Music sync", "Cut-to-size"] },
  { id: 11, name: "HomeCam 360° Security Camera", category: "Smart Home", price: 2450, oldPrice: 3800, rating: 4.7, reviews: 520, stock: "In Stock", img: u("photo-1558002038-1055907df827"), desc: "Full-room coverage, night vision and instant phone alerts when motion is detected.", specs: ["1080p Full HD", "360° pan + tilt", "Night vision", "Two-way talk"], badge: "New" },
  { id: 12, name: "AirPure Mini USB Desk Fan", category: "Lifestyle & Travel", price: 1150, oldPrice: 1700, rating: 4.4, reviews: 290, stock: "In Stock", img: u("photo-1565151443833-29bf49a4f4b6"), desc: "Quiet, powerful breeze for your desk — three speeds and whisper-quiet at night.", specs: ["3 speeds", "USB powered", "Quiet <30dB", "Adjustable tilt"] },
  { id: 13, name: "TravelPack Anti-Theft Backpack", category: "Lifestyle & Travel", price: 2350, oldPrice: 3400, rating: 4.8, reviews: 840, stock: "In Stock", img: u("photo-1553062407-98eeb64c6a62"), desc: "Hidden zippers, a USB charging port and a padded 15.6\" laptop sleeve.", specs: ["Anti-theft zippers", "USB charging port", "15.6\" laptop sleeve", "Water resistant"] },
  { id: 14, name: "CableKit 3-in-1 Fast Cable Set", category: "Mobile Accessories", price: 590, oldPrice: 950, rating: 4.6, reviews: 1500, stock: "In Stock", img: u("photo-1588508065123-287b28e013da"), desc: "One cable for every device — Type-C, Lightning and Micro-USB with 60W fast charging.", specs: ["60W fast charge", "3 connectors in 1", "Braided nylon", "1.2m length"], badge: "Value Pick" },
  { id: 15, name: "MagSnap Wireless Charging Pad", category: "Mobile Accessories", price: 1350, oldPrice: 2000, rating: 4.5, reviews: 410, stock: "In Stock", img: u("photo-1615526675159-e248c3021d3f"), desc: "Snap-and-charge 15W pad that works through most cases. LED shows charging status.", specs: ["15W fast wireless", "Magnetic snap", "Case friendly", "Cool-running"] },
  { id: 16, name: "BassBuds Lite Earbuds", category: "Audio & Wearables", price: 990, oldPrice: 1600, rating: 4.4, reviews: 2030, stock: "In Stock", img: u("photo-1572569511254-d8f925fe2cbb"), desc: "Big bass, small price. Great everyday earbuds with clear calls and 24h total playtime.", specs: ["24h total playtime", "13mm drivers", "ENC call mic", "IPX4 splash proof"] },
  { id: 17, name: "FitBand Active Tracker", category: "Audio & Wearables", price: 1750, oldPrice: 2600, rating: 4.5, reviews: 620, stock: "In Stock", img: u("photo-1575311373937-040b8e1fd5b6"), desc: "Steps, sleep, heart rate and 14-day battery — all on a light, comfy band.", specs: ["14-day battery", "Heart rate + sleep", "5ATM water resistant", "AMOLED display"] },
  { id: 18, name: "DeskHub 7-in-1 USB-C Hub", category: "Computer & Office", price: 2250, oldPrice: 3200, rating: 4.7, reviews: 380, stock: "Low Stock", img: u("photo-1625723044792-44de16ccb4e9"), desc: "HDMI, USB, card reader and 100W pass-through charging in one slim hub.", specs: ["4K HDMI out", "100W PD charging", "SD + microSD", "3x USB 3.0"] },
  { id: 19, name: "ErgoRest Memory-Foam Mouse Pad", category: "Computer & Office", price: 450, oldPrice: 700, rating: 4.3, reviews: 210, stock: "In Stock", img: u("photo-1615663245857-ac93bb7c39e7"), desc: "Soft wrist support that keeps long hours at the desk comfortable.", specs: ["Memory foam", "Non-slip base", "Breathable fabric", "25 x 23 cm"] },
  { id: 20, name: "SmartPlug WiFi Socket (2-Pack)", category: "Smart Home", price: 1550, oldPrice: 2300, rating: 4.6, reviews: 470, stock: "In Stock", img: u("photo-1543512214-318c7553f230"), desc: "Turn any appliance smart. Schedule, control from anywhere, and track energy use.", specs: ["App + voice control", "Schedules & timers", "Energy monitoring", "2-pack"] },
  { id: 21, name: "SolarCharge Lantern + Power Bank", category: "Lifestyle & Travel", price: 1950, oldPrice: 2800, rating: 4.6, reviews: 330, stock: "In Stock", img: u("photo-1504280390367-361c6d9f38f4"), desc: "Solar-powered lantern that also charges your phone — made for load-shedding and camping.", specs: ["Solar + USB charge", "8000mAh battery", "3 brightness modes", "SOS mode"] },
  { id: 22, name: "TravelMate Neck Pillow + Eye Mask", category: "Lifestyle & Travel", price: 750, oldPrice: 1200, rating: 4.4, reviews: 260, stock: "In Stock", img: u("photo-1565026057447-bc90a3dceb87"), desc: "Memory-foam neck support and a blackout eye mask for restful long journeys.", specs: ["Memory foam", "Washable cover", "Blackout eye mask", "Travel pouch"] },
  { id: 23, name: "ClipCam Phone Tripod + Remote", category: "Mobile Accessories", price: 850, oldPrice: 1300, rating: 4.5, reviews: 590, stock: "In Stock", img: u("photo-1520390138845-fd2d229dd553"), desc: "Steady shots, reels and video calls — extends to 120cm with a Bluetooth shutter remote.", specs: ["Extends to 120cm", "BT remote included", "360° rotation", "Fits all phones"] },
  { id: 24, name: "VoicePod Smart Speaker Mini", category: "Smart Home", price: 2950, oldPrice: 4500, rating: 4.7, reviews: 710, stock: "Only a few left", img: u("photo-1543512214-318c7553f230"), desc: "Voice control for music, reminders and your smart home — surprisingly big sound.", specs: ["Voice assistant", "WiFi + BT", "Multi-room pairing", "Privacy mute"], badge: "New" },
];

export const FLASH_IDS = [1, 3, 5, 8];
export const BESTSELLER_IDS = [3, 1, 16, 14, 2, 7];
