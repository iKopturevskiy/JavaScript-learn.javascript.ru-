import createElement from '../../assets/lib/create-element.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.productsWithFilters = this.products;
    this.filters = {};
    this.elem = this.createNewElement();
    this.render();
  }

  render() {
    return this.elem.querySelector('.products-grid__inner').innerHTML = this.createNewElements();
  }

  createNewElements() {
    return `
    ${this.productsWithFilters.map(item => {
    return `<div class="card">
                <div class="card__top">
                    <img src="/assets/images/products/${item.image}" class="card__image" alt="product">
                    <span class="card__price">€${item.price.toFixed(2)}</span>
                </div>
                <div class="card__body">
                    <div class="card__title">${item.name}</div>
                    <button type="button" class="card__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                </div>
            </div>`;
  })
      .join('')}`;
  }

  createNewElement() {
    return createElement(`
    <div class="products-grid">
        <div class="products-grid__inner"></div>
    </div>`);
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.productsWithFilters = this.products.filter(item => {

      if (!!this.filters.noNuts
        || !!this.filters.vegeterianOnly
        || this.filters.maxSpiciness < item.spiciness
        || !!this.filters.category) {

        let isNuts = true;
        let isVegetarian = true;
        let isSpiciness = true;
        let isCategory = true;

        if (!!this.filters.noNuts) {
          isNuts = !!this.filters.noNuts === !item.nuts;
        }

        if (!!this.filters.vegeterianOnly) {
          isVegetarian = !!this.filters.vegeterianOnly === !!item.vegeterian;
        }

        if (this.filters.maxSpiciness < item.spiciness) {
          isSpiciness = false;
        }

        if (!!this.filters.category) {
          isCategory = this.filters.category === item.category;
        }

        if (isNuts && isVegetarian && isSpiciness && isCategory) {
          return item;
        }

      } else {
        return item;
      }
    });

    this.render();
  }
}

