class Product {
    title = 'DEFAULT';
    imageUrl;
    description;
    price;
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}
class ShopingCart {
    items = [];
    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>Total: ${0}원</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = 'cart';
        return cartEl;
    }
}
class ProductItem {
    constructor(product) {
        this.product = product;
    }
    addToCart() {
        console.log('Adding product to cart...');
        console.log(this.product);
    }
    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}" />
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart!</button>
                </div>
            </div>               
        `;
        const addButton = prodEl.querySelector('button');
        addButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}
class ProducList {
    products = [
        new Product(
            '좌복',
            'https://shop1.daumcdn.net/thumb/R500x500/?fname=http%3A%2F%2Fshop1.daumcdn.net%2Fshophow%2Fp%2FU9476022908.jpg%3Fut%3D20211203160308',
            '108배 시 무릎 보호를 위한 방석',
            30000
        ),
        new Product(
            '염주',
            'https://lh5.googleusercontent.com/proxy/TExD0nISrx4PGTYrjen9pUSFq7HuDrrypKajk8oCp2vNUs4hPYa09FXomba2dgNxf3WiqMPM65BY1OwEbEbkmpsdEh80vDeexPw3A0qRANggb19chThuYfb1GQrJJLrxAZXRvPk1jz4a0vvhznG2VTLt',
            '108배 시 숫자세기에 용이한 염주',
            15000
        ),
    ];
    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}
class Shop {
    render() {
        const renderHook = document.querySelector('#app');
        const cart = new ShopingCart();
        const cartEl = cart.render();
        const prodList = new ProducList();
        const prodListEl = prodList.render();
        renderHook.append(cartEl);
        renderHook.append(prodListEl);
    }
}
class App {
    static cart;
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = new shop.cart;
    }
    static addProductToCart() {
        this.cart.addProduct(product);
    }
}

App.init();