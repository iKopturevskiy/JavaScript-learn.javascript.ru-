import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.container();
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    this.scrollByRight();
    this.scrollByLeft();
    this.ribbonInner.addEventListener('scroll', () => this.hiddenButtons());
    this.ribbonInner.addEventListener('click', this.newCustomEvent);
    this.category = null;
  }

  container() {
    return createElement(`
    <!--Корневой элемент RibbonMenu-->
  <div class="ribbon">

    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    ${this.categories.map(item => {
    return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
  }).join('')}
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

  </div>`);
  }

  scrollByRight() {
    this.buttonRight.onclick = () => {
      this.ribbonInner.scrollBy(350, 0);
    };
  }

  scrollByLeft() {
    this.buttonLeft.onclick = () => {
      this.ribbonInner.scrollBy(-350, 0);
    };
  }

  hiddenButtons () {
    if (this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth < 1) {
      this.buttonRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.buttonRight.classList.add('ribbon__arrow_visible');
    }

    if (this.ribbonInner.scrollLeft === 0) {
      this.buttonLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.buttonLeft.classList.add('ribbon__arrow_visible');
    }
  }

  newCustomEvent (event) {
    event.preventDefault();
    this.target = event.target;

    if (this.target.closest('.ribbon__item')) {

      for (let a of this.target.parentElement.querySelectorAll('.ribbon__item')) {

        if (a.classList.contains('ribbon__item_active')) {
          a.classList.remove('ribbon__item_active');
        }
      }
    }

    this.target.classList.add('ribbon__item_active');
    this.category = this.target.getAttribute('data-id');

    const newEvent = new CustomEvent('ribbon-select', {
      detail: this.target.closest('.ribbon__item').dataset.id,
      bubbles: true
    });
    this.target.dispatchEvent(newEvent);
  }
}

