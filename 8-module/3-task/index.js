export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {

    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (!cartItem) {
      this.cartItems.push({
        product,
        count: 1
      });
    } else {
      cartItem.count += 1;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.count += amount;
    }
    if (cartItem.count <= 0) {
      const cartItemIndex = this.cartItems.findIndex(item => item.product.id === productId);
      this.cartItems.splice(cartItemIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalQuantity = 0;
    this.cartItems.map(item => totalQuantity += item.count);
    return totalQuantity;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map(item => {
      totalPrice += item.product.price * item.count;
    });
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

