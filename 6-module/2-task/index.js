import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;
    this.elem = this.#container();
    this.elem.addEventListener('click', this.buttonClick);
    this.button = this.elem.querySelector('.card__button');
    this.button.setAttribute('data-id', this.id);
  }

  buttonClick (event) {
    let target = event.target;
    if (target.closest('.card__button')) {
      const newEvent = new CustomEvent('product-add', {
        detail: target.closest('.card__button').dataset.id,
        bubbles: true
      });
      target.dispatchEvent(newEvent);
    }
  }

  #container() {
    return createElement(`
    <div class="card">
        <div class="card__top">
            <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
            <span class="card__price">€${this.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div>`);
  }
}
