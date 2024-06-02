class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    state;
    props;
    constructor(renderHookId, props) {
        this.hookId = renderHookId;
        this.props = props;
        this.setup();
        this.render();
    }
    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            attributes.forEach(v => {
                rootElement.setAttribute(v.name, v.value);
            });
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
    setup() { }
    render() { }
}

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
class ShopingCart extends Component {
    items = [];
    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: ${this.totalAmount}원</h2>`;
    }
    get totalAmount() {
        const sum = this.items.reduce((prevValue, currItem) => prevValue + currItem.price, 0);
        return sum;
    }
    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }
    render() {
        const rootElement = this.createRootElement('section', 'cart');
        rootElement.innerHTML = `
            <h2>Total: ${0}원</h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = rootElement.querySelector('h2');
    }
}
class ProductItem extends Component {
    addToCart() {
        const { product } = this.props;
        App.addProductToCart(product);
    }
    setup() {

    }
    render() {
        const { product } = this.props;
        const rootElement = this.createRootElement('li', 'product-item');
        rootElement.innerHTML = `
            <div>
                <img src="${product.imageUrl}" alt="${product.title}" />
                <div class="product-item__content">
                    <h2>${product.title}</h2>
                    <h3>${product.price}</h3>
                    <p>${product.description}</p>
                    <button>Add to Cart!</button>
                </div>
            </div>               
        `;
        const addButton = rootElement.querySelector('button');
        addButton.addEventListener('click', this.addToCart.bind(this));
    }
}
class ProducList extends Component {
    constructor(renderHookId) {
        super(renderHookId);
    }
    setup() {
        this.products = [
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
    }
    render() {
        const { products } = this;

        this.createRootElement('ul', 'product-list', [
            new ElementAttribute('id', 'prod-list')
        ]);

        for (const product of products) {

            new ProductItem('prod-list', { product });
        }
    }
}
class Shop {
    render() {
        this.cart = new ShopingCart('app');
        new ProducList('app');
    }
}
class App {
    static cart;
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }
    static addProductToCart(product) {
        console.log('App.addProduct');
        this.cart.addProduct(product);
    }
}

App.init();