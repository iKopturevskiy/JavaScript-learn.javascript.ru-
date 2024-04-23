import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';


import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carouselHolder = document.querySelector(`[data-carousel-holder]`);
    this.sliders = slides;
    this.ribbonHolder = document.querySelector(`[data-ribbon-holder]`);
    this.categories = categories;
    this.sliderHolder = document.querySelector(`[data-slider-holder]`);
    this.cartIconHolder = document.querySelector(`[data-cart-icon-holder]`);
    this.productsGridHolder = document.querySelector(`[data-products-grid-holder]`);
  }

  async render() {
    const carousel = new Carousel(this.sliders);
    this.carouselHolder.append(carousel.elem);

    const ribbonMenu = new RibbonMenu(this.categories);
    this.ribbonHolder.append(ribbonMenu.elem);

    const stepSlider = new StepSlider({steps: 5, value: 3});
    this.sliderHolder.append(stepSlider.elem);

    const cartIcon = new CartIcon();
    this.cartIconHolder.append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    let products;
    const response = await fetch('./products.json', {method: 'GET'});
    if (response.ok) {
      products = await response.json();
    }
    const productsGrid = new ProductsGrid(products);
    this.productsGridHolder.innerHTML = '';
    this.productsGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.category
    });

    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.card__button')) {
        console.log(target.closest('.card__button').dataset.id);
      }
      if (target.closest('.carousel__button')) {
        console.log(target.closest('.carousel__button').dataset.id);
      }
    });

    // document.body.addEventListener('product-add', ({detail: productId}) => {
    //   console.log(productId);
    // });
  }
}

