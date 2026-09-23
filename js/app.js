// ===============================================
// NOVA SHOP - ASOSIY LOGIKA
// ===============================================

class ShopApp {
    constructor() {
        this.tg = window.Telegram?.WebApp;

        this.cart = JSON.parse(
            localStorage.getItem('nova_cart') || '[]'
        );

        this.allProducts = [];
        this.filteredProducts = [];

        this.currentCategory = 'Barcha mahsulotlar';

        this.favorites = JSON.parse(
            localStorage.getItem('nova_favorites') || '[]'
        );

        this.searchQuery = '';

        this.init();
    }

    // ===============================================
    // ISHGA TUSHIRISH
    // ===============================================

    init() {
        this.initTelegram();
        this.initDOM();
        this.initEventListeners();
        this.applyConfig();
        this.renderCategories();
        this.loadProducts();
        this.updateCart();
    }

    // ===============================================
    // TELEGRAM
    // ===============================================

    initTelegram() {
        if (this.tg) {
            this.tg.ready();
            this.tg.expand();

            if (this.tg.colorScheme === 'dark') {
                document.body.classList.add('telegram-dark');
            }
        }
    }

    // ===============================================
    // DOM ELEMENTLAR
    // ===============================================

    initDOM() {
        this.el = {
            logo: document.getElementById('logo-img'),

            title: document.getElementById('shop-title'),

            slogan: document.querySelector('.shop-slogan'),

            searchInput: document.getElementById('search-input'),

            categoriesContainer:
                document.getElementById('categories-container'),

            catalogContainer:
                document.getElementById('product-catalog'),

            loader:
                document.getElementById('loader'),

            cartButton:
                document.getElementById('cart-button'),

            cartCounter:
                document.getElementById('cart-counter'),

            floatingCart:
                document.getElementById('floating-cart'),

            floatingCounter:
                document.getElementById('floating-cart-counter'),

            cartModal:
                document.getElementById('cart-modal'),

            closeCartButton:
                document.getElementById('close-cart-button'),

            cartItemsContainer:
                document.getElementById('cart-items-container'),

            cartSummary:
                document.getElementById('cart-summary'),

            cartTotalPrice:
                document.getElementById('cart-total-price'),

            orderForm:
                document.getElementById('order-form'),

            submitOrderButton:
                document.getElementById('submit-order-button'),

            customerName:
                document.getElementById('customer-name-input'),

            organization:
                document.getElementById('organization-input'),

            phone:
                document.getElementById('phone-input'),

            address:
                document.getElementById('address-input'),

            navButtons:
                document.querySelectorAll('.nav-btn')
        };
    }

    // ===============================================
    // EVENT LISTENERS
    // ===============================================

    initEventListeners() {

        // Savatchani ochish
        this.el.cartButton?.addEventListener(
            'click',
            () => this.openCart()
        );

        // Floating savat
        this.el.floatingCart?.addEventListener(
            'click',
            () => this.openCart()
        );

        // Savatni yopish
        this.el.closeCartButton?.addEventListener(
            'click',
            () => this.closeCart()
        );

        // Modal tashqarisini bosganda yopish
        this.el.cartModal?.addEventListener(
            'click',
            (e) => {
                if (e.target === this.el.cartModal) {
                    this.closeCart();
                }
            }
        );

        // Buyurtma
        this.el.submitOrderButton?.addEventListener(
            'click',
            () => this.submitOrder()
        );

        // Qidiruv
        this.el.searchInput?.addEventListener(
            'input',
            (e) => {

                this.searchQuery =
                    e.target.value
                        .toLowerCase()
                        .trim();

                this.filterProducts();
            }
        );

        // Pastki navigatsiya
        this.el.navButtons?.forEach(btn => {

            btn.addEventListener(
                'click',
                () => {

                    this.el.navButtons.forEach(
                        b => b.classList.remove('active')
                    );

                    btn.classList.add('active');
                }
            );

        });
    }

    // ===============================================
    // CONFIG
    // ===============================================

    applyConfig() {

        if (typeof SHOP_CONFIG === 'undefined') {
            console.warn('SHOP_CONFIG topilmadi');
            return;
        }

        // Sarlavha
        document.title =
            SHOP_CONFIG.shopTitle || 'NOVA SHOP';

        if (this.el.title) {
            this.el.title.textContent =
                SHOP_CONFIG.shopTitle || 'NOVA SHOP';
        }

        // Slogan
        if (this.el.slogan) {
            this.el.slogan.textContent =
                SHOP_CONFIG.shopSlogan || '';
        }

        // Logo
        if (
            this.el.logo &&
            SHOP_CONFIG.logoPath
        ) {

            this.el.logo.src =
                SHOP_CONFIG.logoPath;

            this.el.logo.onerror = () => {

                this.el.logo.src =
                    'data:image/svg+xml;utf8,' +
                    '<svg xmlns="http://www.w3.org/2000/svg" ' +
                    'viewBox="0 0 100 100">' +
                    '<rect fill="%2316a34a" ' +
                    'width="100" height="100" rx="20"/>' +
                    '<text x="50" y="70" ' +
                    'font-size="60" ' +
                    'font-weight="bold" ' +
                    'fill="white" ' +
                    'text-anchor="middle">N</text>' +
                    '</svg>';
            };
        }
    }

    // ===============================================
    // KATEGORIYALAR
    // ===============================================

    renderCategories() {

        // Kategoriya konteyneri mavjudligini tekshirish
        if (!this.el.categoriesContainer) {

            console.error(
                'categories-container topilmadi'
            );

            return;
        }

        // window.CATEGORIES mavjudligini tekshirish
        if (
            !window.CATEGORIES ||
            !Array.isArray(window.CATEGORIES)
        ) {

            console.error(
                'window.CATEGORIES topilmadi yoki massiv emas'
            );

            return;
        }

        // Eski kategoriyalarni tozalash
        this.el.categoriesContainer.innerHTML = '';

        // Kategoriyalarni chiqarish
        window.CATEGORIES
            .filter(cat => cat.enabled !== false)
            .forEach((cat) => {

                const btn =
                    document.createElement('button');

                btn.className =
                    'category-button';

                // Birinchi kategoriya aktiv
                if (
                    cat.name ===
                    this.currentCategory
                ) {
                    btn.classList.add('active');
                }

                // Kategoriya HTML
                btn.innerHTML = `
                    <span class="category-icon">
                        ${cat.icon || '📦'}
                    </span>

                    <span class="category-name">
                        ${cat.name || ''}
                    </span>

                    <span class="category-description">
                        ${cat.description || ''}
                    </span>
                `;

                // Kategoriya bosilganda
                btn.addEventListener(
                    'click',
                    () => {

                        this.currentCategory =
                            cat.name;

                        document
                            .querySelectorAll(
                                '.category-button'
                            )
                            .forEach(
                                b =>
                                    b.classList.remove(
                                        'active'
                                    )
                            );

                        btn.classList.add(
                            'active'
                        );

                        this.filterProducts();
                    }
                );

                // Sahifaga qo'shish
                this.el.categoriesContainer
                    .appendChild(btn);
            });

        console.log(
            'Kategoriyalar yuklandi:',
            window.CATEGORIES.length
        );
    }

    // ===============================================
    // MAHSULOTLAR
    // ===============================================

    loadProducts() {

        if (
            !window.CATALOG ||
            !Array.isArray(window.CATALOG)
        ) {

            console.error(
                'CATALOG topilmadi'
            );

            return;
        }

        this.allProducts =
            window.CATALOG.filter(
                p => p.inStock !== false
            );

        this.filteredProducts =
            this.allProducts;

        this.renderProducts();

        // Loaderni yashirish
        if (this.el.loader) {
            this.el.loader.style.display =
                'none';
        }
    }

    // ===============================================
    // FILTER
    // ===============================================

    filterProducts() {

        let products =
            this.allProducts;

        // Kategoriya
        if (
            this.currentCategory !==
            'Barcha mahsulotlar'
        ) {

            const cat =
                window.CATEGORIES?.find(
                    c =>
                        c.name ===
                        this.currentCategory
                );

            if (
                cat &&
                Array.isArray(cat.keywords) &&
                cat.keywords.length > 0
            ) {

                products =
                    products.filter(
                        product => {

                            const text =
                                (
                                    (product.name || '') +
                                    ' ' +
                                    (product.description || '')
                                ).toLowerCase();

                            return cat.keywords.some(
                                keyword =>
                                    text.includes(
                                        keyword.toLowerCase()
                                    )
                            );
                        }
                    );
            }
        }

        // Qidiruv
        if (this.searchQuery) {

            products =
                products.filter(
                    product => {

                        const text =
                            (
                                (product.name || '') +
                                ' ' +
                                (product.description || '')
                            ).toLowerCase();

                        return text.includes(
                            this.searchQuery
                        );
                    }
                );
        }

        this.filteredProducts =
            products;

        this.renderProducts();
    }

    // ===============================================
    // MAHSULOTLARNI CHIQARISH
    // ===============================================

    renderProducts() {

        if (!this.el.catalogContainer) {
            return;
        }

        this.el.catalogContainer.innerHTML =
            '';

        // Mahsulot yo'q
        if (
            this.filteredProducts.length === 0
        ) {

            this.el.catalogContainer.innerHTML = `
                <div
                    style="
                        grid-column:1/-1;
                        text-align:center;
                        padding:40px;
                        color:#6b7280;
                    "
                >
                    <div
                        style="
                            font-size:48px;
                            margin-bottom:12px;
                        "
                    >
                        🔍
                    </div>

                    <p>
                        Mahsulotlar topilmadi
                    </p>
                </div>
            `;

            return;
        }

        // Mahsulotlarni chiqarish
        this.filteredProducts.forEach(
            product => {

                const card =
                    this.createProductCard(
                        product
                    );

                this.el.catalogContainer
                    .appendChild(card);
            }
        );
    }

    // ===============================================
    // MAHSULOT KARTASI
    // ===============================================

    createProductCard(product) {

        const card =
            document.createElement('div');

        card.className =
            'product-card';

        const isFav =
            this.favorites.includes(
                product.id
            );

        const priceText =
            this.formatPrice(
                product.price
            );

        card.innerHTML = `
            <div class="product-photo">

                <img
                    src="${product.photo || ''}"
                    alt="${product.name || ''}"
                    onerror="
                        this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop';
                    "
                >

                ${
                    product.discount
                        ? `
                            <span class="discount-badge">
                                -${product.discount}%
                            </span>
                        `
                        : ''
                }

                <button
                    class="favorite-btn ${
                        isFav ? 'active' : ''
                    }"
                    data-id="${product.id}"
                >
                    ${
                        isFav
                            ? '❤️'
                            : '🤍'
                    }
                </button>

            </div>

            <div class="product-details">

                <h3 class="product-name">
                    ${product.name || ''}
                </h3>

                <p class="product-description">
                    ${product.description || ''}
                </p>

                <div class="product-price-block">

                    <span class="product-price">
                        ${priceText}
                    </span>

                    ${
                        product.oldPrice
                            ? `
                                <span class="product-old-price">
                                    ${this.formatPrice(
                                        product.oldPrice
                                    )}
                                </span>
                            `
                            : ''
                    }

                </div>

                <button
                    class="add-to-cart-button"
                    data-id="${product.id}"
                >
                    🛒 Savatga qo'shish
                </button>

            </div>
        `;

        // Savatga qo'shish
        const addButton =
            card.querySelector(
                '.add-to-cart-button'
            );

        addButton?.addEventListener(
            'click',
            (e) => {

                e.stopPropagation();

                this.addToCart(
                    product
                );
            }
        );

        // Sevimli
        const favoriteButton =
            card.querySelector(
                '.favorite-btn'
            );

        favoriteButton?.addEventListener(
            'click',
            (e) => {

                e.stopPropagation();

                this.toggleFavorite(
                    product.id
                );
            }
        );

        return card;
    }

    // ===============================================
    // SAVATGA QO'SHISH
    // ===============================================

    addToCart(product) {

        const existing =
            this.cart.find(
                p => p.id === product.id
            );

        if (existing) {

            existing.quantity += 1;

        } else {

            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCart();

        // Telegram haptic
        if (
            this.tg?.HapticFeedback
        ) {

            this.tg.HapticFeedback
                .impactOccurred(
                    'light'
                );
        }

        // Telegram popup
        if (
            this.tg?.showPopup
        ) {

            this.tg.showPopup({

                title: '✅ Qo\'shildi!',

                message:
                    `${product.name} ` +
                    `savatchaga qo'shildi`,

                buttons: [
                    {
                        type: 'ok'
                    }
                ]
            });
        }
    }

    // ===============================================
    // MIQDORNI O'ZGARTIRISH
    // ===============================================

    changeQuantity(
        productId,
        delta
    ) {

        const item =
            this.cart.find(
                p => p.id === productId
            );

        if (!item) {
            return;
        }

        item.quantity += delta;

        if (item.quantity <= 0) {

            this.cart =
                this.cart.filter(
                    p =>
                        p.id !== productId
                );
        }

        this.saveCart();
        this.updateCart();
        this.renderCartItems();
    }

    // ===============================================
    // SAVAT COUNTER
    // ===============================================

    updateCart() {

        const total =
            this.cart.reduce(
                (sum, p) =>
                    sum + p.quantity,
                0
            );

        if (this.el.cartCounter) {

            this.el.cartCounter.textContent =
                total;

            this.el.cartCounter.style.display =
                total > 0
                    ? 'flex'
                    : 'none';
        }

        if (this.el.floatingCounter) {

            this.el.floatingCounter.textContent =
                total;

            this.el.floatingCounter.style.display =
                total > 0
                    ? 'flex'
                    : 'none';
        }
    }

    // ===============================================
    // SAVAT ICHIDAGI MAHSULOTLAR
    // ===============================================

    renderCartItems() {

        if (!this.el.cartItemsContainer) {
            return;
        }

        // Savat bo'sh
        if (this.cart.length === 0) {

            this.el.cartItemsContainer.innerHTML = `
                <div class="empty-cart">

                    <div class="empty-cart-icon">
                        🛒
                    </div>

                    <div class="empty-cart-text">
                        Savatchangiz bo'sh
                    </div>

                    <div class="empty-cart-desc">
                        Buyurtma berish uchun
                        mahsulot qo'shing
                    </div>

                </div>
            `;

            if (this.el.cartSummary) {
                this.el.cartSummary.style.display =
                    'none';
            }

            if (this.el.orderForm) {
                this.el.orderForm.style.display =
                    'none';
            }

            return;
        }

        this.el.cartItemsContainer.innerHTML =
            '';

        // Mahsulotlarni chiqarish
        this.cart.forEach(
            item => {

                const div =
                    document.createElement(
                        'div'
                    );

                div.className =
                    'cart-item';

                div.innerHTML = `
                    <img
                        src="${item.photo || ''}"
                        class="cart-item-img"
                        alt="${item.name || ''}"
                    >

                    <div class="cart-item-details">

                        <div class="cart-item-name">
                            ${item.name || ''}
                        </div>

                        <div class="cart-item-price">
                            ${this.formatPrice(
                                item.price
                            )}
                        </div>

                    </div>

                    <div class="quantity-controls">

                        <button
                            class="quantity-btn"
                            data-id="${item.id}"
                            data-delta="-1"
                        >
                            −
                        </button>

                        <span class="item-quantity">
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            data-id="${item.id}"
                            data-delta="1"
                        >
                            +
                        </button>

                    </div>
                `;

                this.el.cartItemsContainer
                    .appendChild(div);
            }
        );

        // + va - tugmalari
        this.el.cartItemsContainer
            .querySelectorAll(
                '.quantity-btn'
            )
            .forEach(
                btn => {

                    btn.addEventListener(
                        'click',
                        () => {

                            this.changeQuantity(
                                parseInt(
                                    btn.dataset.id
                                ),
                                parseInt(
                                    btn.dataset.delta
                                )
                            );
                        }
                    );
                }
            );

        // Jami narx
        const totalPrice =
            this.cart.reduce(
                (sum, p) =>
                    sum +
                    (
                        p.price *
                        p.quantity
                    ),
                0
            );

        if (this.el.cartTotalPrice) {

            this.el.cartTotalPrice.textContent =
                this.formatPrice(
                    totalPrice
                );
        }

        if (this.el.cartSummary) {

            this.el.cartSummary.style.display =
                'block';
        }

        if (this.el.orderForm) {

            this.el.orderForm.style.display =
                'block';
        }
    }

    // ===============================================
    // SAVATNI OCHISH
    // ===============================================

    openCart() {

        if (!this.el.cartModal) {
            return;
        }

        this.el.cartModal.style.display =
            'flex';

        this.renderCartItems();
    }

    // ===============================================
    // SAVATNI YOPISH
    // ===============================================

    closeCart() {

        if (!this.el.cartModal) {
            return;
        }

        this.el.cartModal.style.display =
            'none';
    }

    // ===============================================
    // SAVATNI SAQLASH
    // ===============================================

    saveCart() {

        localStorage.setItem(
            'nova_cart',
            JSON.stringify(
                this.cart
            )
        );
    }

    // ===============================================
    // SEVIMLILAR
    // ===============================================

    toggleFavorite(id) {

        if (
            this.favorites.includes(id)
        ) {

            this.favorites =
                this.favorites.filter(
                    f => f !== id
                );

        } else {

            this.favorites.push(id);
        }

        localStorage.setItem(
            'nova_favorites',
            JSON.stringify(
                this.favorites
            )
        );

        this.renderProducts();
    }

    // ===============================================
    // BUYURTMA
    // ===============================================

    submitOrder() {

        const name =
            this.el.customerName
                ?.value
                .trim();

        const org =
            this.el.organization
                ?.value
                .trim();

        const phone =
            this.el.phone
                ?.value
                .trim();

        const address =
            this.el.address
                ?.value
                .trim();

        // Savat bo'sh
        if (this.cart.length === 0) {

            this.showAlert(
                'Savatchangiz bo\'sh'
            );

            return;
        }

        // Maydonlar
        if (
            !name ||
            !org ||
            !phone ||
            !address
        ) {

            this.showAlert(
                'Iltimos, hamma maydonlarni to\'ldiring'
            );

            return;
        }

        // Telefon
        const phoneClean =
            phone.replace(
                /\s/g,
                ''
            );

        if (
            !/^\+998\d{9}$/.test(
                phoneClean
            )
        ) {

            this.showAlert(
                'Telefon noto\'g\'ri. Format: +998901234567'
            );

            return;
        }

        // Buyurtma matni
        const orderText =
            this.formatOrderForBot({
                name,
                org,
                phone: phoneClean,
                address
            });

        // Telegram botga yuborish
        if (this.tg?.sendData) {

            this.tg.sendData(
                orderText
            );

        } else {

            console.log(
                'Buyurtma:',
                orderText
            );

            alert(
                'Buyurtma yuborildi (test):\n\n' +
                orderText
            );
        }

        // Savatni tozalash
        this.cart = [];

        this.saveCart();
        this.updateCart();
        this.closeCart();
    }

    // ===============================================
    // BUYURTMA MATNI
    // ===============================================

    formatOrderForBot(data) {

        const total =
            this.cart.reduce(
                (sum, p) =>
                    sum +
                    (
                        p.price *
                        p.quantity
                    ),
                0
            );

        let text =
            '🆕 YANGI BUYURTMA\n';

        text +=
            '━━━━━━━━━━━━━━━━━━━━\n\n';

        text +=
            `👤 Ism: ${data.name}\n`;

        text +=
            `👤 Familiya: ${data.org}\n`;

        text +=
            `📞 Telefon: ${data.phone}\n`;

        text +=
            `📍 Manzil: ${data.address}\n\n`;

        text +=
            '🛒 Mahsulotlar:\n';

        this.cart.forEach(
            item => {

                text +=
                    `• ${item.name} × ` +
                    `${item.quantity} = ` +
                    `${this.formatPrice(
                        item.price *
                        item.quantity
                    )}\n`;
            }
        );

        text +=
            `\n💰 JAMI: ` +
            `${this.formatPrice(
                total
            )}\n\n`;

        // Telegram user
        if (
            this.tg?.initDataUnsafe?.user
        ) {

            const u =
                this.tg
                    .initDataUnsafe
                    .user;

            text +=
                `🆔 Telegram: @` +
                `${u.username || u.id}`;
        }

        return text;
    }

    // ===============================================
    // ALERT
    // ===============================================

    showAlert(message) {

        if (
            this.tg?.showAlert
        ) {

            this.tg.showAlert(
                message
            );

        } else {

            alert(message);
        }
    }

    // ===============================================
    // NARX FORMAT
    // ===============================================

    formatPrice(price) {

        return new Intl.NumberFormat(
            'uz-UZ'
        ).format(
            price || 0
        ) + ' so\'m';
    }
}

// ===============================================
// DOM TAYYOR BO'LGANDA ISHGA TUSHIRISH
// ===============================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        window.app =
            new ShopApp();

    }
);
