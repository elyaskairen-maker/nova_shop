// ===============================================
// NOVA SHOP - SOZLAMALAR
// ===============================================

const SHOP_CONFIG = {
    shopTitle: "NOVA SHOP",
    shopSlogan: "Sifatli mahsulotlar - Siz uchun!",
    shopDescription: "Zamonaviy onlayn do'kon",
    
    logoPath: "images/logo.png",
    
    colors: {
        primary: "#16a34a",
        primaryLight: "#22c55e",
        primaryDark: "#15803d",
        accent: "#f59e0b",
        success: "#10b981",
        danger: "#ef4444"
    },
    
    currency: {
        code: "UZS",
        symbol: "so'm"
    },
    
    contact: {
        phone: "+998 90 123 45 67",
        email: "info@novashop.uz",
        address: "Toshkent sh., Chilonzor tumani",
        telegram: "@vora"
    },
    
    delivery: {
        freeDeliveryFrom: 500000,
        deliveryCost: 20000,
        deliveryText: "Toshkent bo'ylab yetkazib berish"
    },
    
    paymentMethods: [
        { value: "cash", label: "💵 Naqd pul", enabled: true },
        { value: "card", label: "💳 Karta", enabled: true }
    ],
    
    sectionTitles: {
        categories: "Kategoriyalar",
        products: "Ommabop mahsulotlar",
        cart: "Savatchangiz",
        order: "Buyurtma berish"
    },
    
    messages: {
        emptyCart: "Savatchangiz bo'sh",
        emptyCartDescription: "Buyurtma berish uchun mahsulot qo'shing",
        addedToCart: "✅ Qo'shildi!",
        orderSuccess: "Buyurtma qabul qilindi! Tez orada siz bilan bog'lanamiz.",
        fillRequiredFields: "Iltimos, ism, familiya, telefon va manzilni to'ldiring.",
        invalidPhone: "Telefon raqam noto'g'ri. Format: +998901234567",
        loading: "Mahsulotlar yuklanmoqda...",
        sending: "⏳ Yuborilmoqda...",
        noProducts: "Mahsulotlar topilmadi",
        searchPlaceholder: "Mahsulotlarni qidirish..."
    },
    
    animation: {
        enabled: true,
        duration: 300,
        staggerDelay: 50
    }
};
