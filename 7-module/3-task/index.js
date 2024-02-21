export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.container();
    this.divWithClassSliderTumb = this.elem.querySelector('.slider__thumb');
    this.divWithClassSliderProgress = this.elem.querySelector('.slider__progress');
    this.steps = steps;
    this.value = value;
    this.howManySectors = this.steps - 1;
    this.divWithClassSliderSteps = this.elem.querySelector('.slider__steps');
    this.divWithClassSliderValue = this.elem.querySelector('.slider__value');
    this.addSpans();
    this.sliderOnClick();
    this.spans = this.divWithClassSliderSteps.querySelectorAll('span');
    this.startPosition();
  }

  container () {
    let container = document.createElement('div');
    container.classList.add('slider');
    container.innerHTML = `
    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>`;
    return container;
  }

  addSpans () {
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      this.divWithClassSliderSteps.appendChild(span);
    }
  }

  startPosition () {
    this.divWithClassSliderValue.innerHTML = String(this.value);
    this.leftPercent = this.value / this.howManySectors * 100;
    this.divWithClassSliderTumb.style.left = `${this.leftPercent}%`;
    this.divWithClassSliderProgress.style.width = `${this.leftPercent}%`;
    this.spans[this.value].classList.add('slider__step-active');
  }

  sliderOnClick () {
    this.elem.addEventListener('click', (event) => {
      this.difference = event.clientX - this.elem.getBoundingClientRect().left;
      this.relativeValue = this.difference / this.elem.offsetWidth;
      this.whereClickAdd = Math.round(this.relativeValue * this.howManySectors);
      this.divWithClassSliderValue.innerHTML = String(this.whereClickAdd);
      for (let span of this.spans) {
        if (span.classList.contains('slider__step-active')) {
          span.classList.remove('slider__step-active');
        }
      }
      this.spans[this.whereClickAdd].classList.add('slider__step-active');
      this.leftPercent = this.whereClickAdd / this.howManySectors * 100;
      this.divWithClassSliderTumb.style.left = `${this.leftPercent}%`;
      this.divWithClassSliderProgress.style.width = `${this.leftPercent}%`;

      const newEvent = new CustomEvent('slider-change', {
        detail: this.whereClickAdd,
        bubbles: true
      });
      this.elem.dispatchEvent(newEvent);
    });
  }
}
