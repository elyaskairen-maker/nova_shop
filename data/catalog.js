// ===============================================
// NOVA SHOP - MAHSULOTLAR
// ===============================================

const CATALOG = [
    // === 📱 TELEFONLAR ===
    {
        id: 1,
        name: "iPhone 16 Pro",
        description: "256 GB, Natural Titanium",
        price: 12499000,
        oldPrice: 13999000,
        discount: 15,
        photo: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=400&fit=crop",
        category: "Smartfonlar",
        inStock: true,
        popular: true
    },
    {
        id: 2,
        name: "iPhone 15 128GB",
        description: "Original · 1 yil kafolat",
        price: 7650000,
        oldPrice: 8999000,
        discount: 15,
        photo: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        category: "Smartfonlar",
        inStock: true,
        popular: true
    },
    {
        id: 3,
        name: "Samsung Galaxy A15",
        description: "4/128 GB, 50 MP kamera",
        price: 2100000,
        photo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        category: "Smartfonlar",
        inStock: true,
        popular: true
    },
    {
        id: 4,
        name: "Redmi Note 13",
        description: "8/256 GB, AMOLED, 108 MP",
        price: 2300000,
        photo: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        category: "Smartfonlar",
        inStock: true,
        popular: true
    },
    {
        id: 5,
        name: "POCO X6",
        description: "Snapdragon 7s Gen 2, 8/256 GB",
        price: 3600000,
        photo: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        category: "Smartfonlar",
        inStock: true,
        popular: false
    },
    {
        id: 6,
        name: "Infinix Hot 40",
        description: "8/256 GB, 50 MP kamera",
        price: 1800000,
        photo: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
        category: "Smartfonlar",
        inStock: true,
        popular: false
    },

    // === 🎧 AUDIO ===
    {
        id: 7,
        name: "AirPods Pro 2",
        description: "Original · Shovqin bostirish",
        price: 2199000,
        oldPrice: 2390000,
        discount: 20,
        photo: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
        category: "Audio",
        inStock: true,
        popular: true
    },
    {
        id: 8,
        name: "Redmi Buds 5",
        description: "46 dB ANC, simsiz",
        price: 350000,
        photo: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
        category: "Audio",
        inStock: true,
        popular: true
    },
    {
        id: 9,
        name: "JBL Tune 520BT",
        description: "57 soat batareya",
        price: 650000,
        photo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        category: "Audio",
        inStock: true,
        popular: false
    },
    {
        id: 10,
        name: "Bluetooth Speaker",
        description: "10W, suv o'tkazmaydigan",
        price: 300000,
        photo: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        category: "Audio",
        inStock: true,
        popular: false
    },

    // === 🔌 ZARYADLASH ===
    {
        id: 11,
        name: "20W Fast Charger",
        description: "USB-C tez quvvatlagich",
        price: 120000,
        photo: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
        category: "Zaryadlash",
        inStock: true,
        popular: false
    },
    {
        id: 12,
        name: "33W Fast Charger",
        description: "USB-C, 33W quvvat",
        price: 180000,
        photo: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
        category: "Zaryadlash",
        inStock: true,
        popular: false
    },
    {
        id: 13,
        name: "Type-C Cable",
        description: "1 metr, tez zaryadlash",
        price: 60000,
        photo: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
        category: "Zaryadlash",
        inStock: true,
        popular: true
    },
    {
        id: 14,
        name: "Power Bank 10000mAh",
        description: "Portativ quvvatlagich",
        price: 250000,
        photo: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
        category: "Zaryadlash",
        inStock: true,
        popular: true
    },

    // === 📱 AKSESSUARLAR ===
    {
        id: 15,
        name: "Samsung A15 Case",
        description: "Himoya g'ilofi, silikon",
        price: 50000,
        photo: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
        category: "Aksessuarlar",
        inStock: true,
        popular: false
    },
    {
        id: 16,
        name: "Tempered Glass",
        description: "Himoya oynasi, 9H",
        price: 40000,
        photo: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
        category: "Aksessuarlar",
        inStock: true,
        popular: true
    },
    {
        id: 17,
        name: "Phone Holder",
        description: "Mashina uchun ushlagich",
        price: 90000,
        photo: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=400&fit=crop",
        category: "Aksessuarlar",
        inStock: true,
        popular: false
    },
    {
        id: 18,
        name: "Selfie Stick",
        description: "Bluetooth selfi tayoqcha",
        price: 150000,
        photo: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=400&fit=crop",
        category: "Aksessuarlar",
        inStock: true,
        popular: false
    },

    // === 👕 KIYIMLAR ===
    {
        id: 19,
        name: "Oversize T-Shirt",
        description: "Erkaklar futbolkasi, paxta 100%",
        price: 89000,
        photo: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        category: "Kiyimlar",
        inStock: true,
        popular: true
    },
    {
        id: 20,
        name: "Hoodie",
        description: "Qishki xudi, issiq, paxta",
        price: 179000,
        photo: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        category: "Kiyimlar",
        inStock: true,
        popular: true
    },
    {
        id: 21,
        name: "Erkaklar shim",
        description: "Klassik shim, chidamli mato",
        price: 149000,
        photo: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
        category: "Kiyimlar",
        inStock: true,
        popular: false
    },
    {
        id: 22,
        name: "Sport kostyum",
        description: "Qulay, yengil, sport",
        price: 249000,
        photo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
        category: "Kiyimlar",
        inStock: true,
        popular: false
    },
    {
        id: 23,
        name: "Kepka",
        description: "Klassik kepka, sozlanadigan",
        price: 79000,
        photo: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
        category: "Kiyimlar",
        inStock: true,
        popular: false
    },

    // === ⌚ GADJETLAR ===
    {
        id: 24,
        name: "Amazfit GTS 4",
        description: "Aqlli soat, AMOLED",
        price: 1299000,
        oldPrice: 1599000,
        discount: 17,
        photo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        category: "Gadjetlar",
        inStock: true,
        popular: true
    },
    {
        id: 25,
        name: "Apple Watch Series 9",
        description: "Sog'lig'ingiz nazoratda",
        price: 4990000,
        oldPrice: 5990000,
        discount: 17,
        photo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        category: "Gadjetlar",
        inStock: true,
        popular: true
    },
    {
        id: 26,
        name: "LED Lamp",
        description: "Yorqin, tejamkor",
        price: 120000,
        photo: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        category: "Gadjetlar",
        inStock: true,
        popular: false
    },
    {
        id: 27,
        name: "Mini Fan",
        description: "Portativ ventilyator",
        price: 90000,
        photo: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
        category: "Gadjetlar",
        inStock: true,
        popular: false
    },
    {
        id: 28,
        name: "USB Flash 64GB",
        description: "USB flesh xotira",
        price: 100000,
        photo: "https://images.unsplash.com/photo-1618410320928-25228d811631?w=400&h=400&fit=crop",
        category: "Gadjetlar",
        inStock: true,
        popular: false
    }
];
