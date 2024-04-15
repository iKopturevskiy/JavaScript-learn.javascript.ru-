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
    <div class="slider__steps"></div>`;
    return container;
  }

  addSpans () {
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      this.divWithClassSliderSteps.appendChild(span);
    }
  }

  addStyles (pointermove) {
    if (pointermove) {
      this.fillPercentage = this.lengthToThumbInHundredths * 100;
    } else {
      this.fillPercentage = this.changePosition / this.howManySectors * 100;
    }
    this.divWithClassSliderTumb.style.left = `${this.fillPercentage}%`;
    this.divWithClassSliderProgress.style.width = `${this.fillPercentage}%`;
  }

  startPosition () {
    this.divWithClassSliderValue.innerHTML = String(this.value);
    this.fillPercentage = this.value / this.howManySectors * 100;
    this.divWithClassSliderTumb.style.left = `${this.fillPercentage}%`;
    this.divWithClassSliderProgress.style.width = `${this.fillPercentage}%`;
    this.spans[this.value].classList.add('slider__step-active');
  }

  addCustomEvent () {
    const newEvent = new CustomEvent('slider-change', {
      detail: this.changePosition,
      bubbles: true
    });
    console.log(newEvent.detail);
    this.elem.dispatchEvent(newEvent);
  }

  sliderThumbPositionChange (event) {
    const lengthToThumb = event.clientX - this.elem.getBoundingClientRect().left;
    const lengthToThumbInHundredths = lengthToThumb / this.elem.offsetWidth;
    const changePosition = Math.round(lengthToThumbInHundredths * this.howManySectors);
    return {
      lengthToThumbInHundredths,
      changePosition
    };
  }

  sliderOnClick () {
    this.elem.addEventListener('click', (event) => {
      this.changePosition = this.sliderThumbPositionChange(event).changePosition;
      this.divWithClassSliderValue.innerHTML = String(this.changePosition);
      for (let span of this.spans) {
        if (span.classList.contains('slider__step-active')) {
          span.classList.remove('slider__step-active');
        }
      }
      this.spans[this.changePosition].classList.add('slider__step-active');
      this.addStyles();
      this.addCustomEvent();
    });

    this.divWithClassSliderTumb.addEventListener('pointerdown', () => {

      let onMove = (event) => {
        event.preventDefault();
        if (!this.elem.querySelector('.slider_dragging')) {
          this.elem.classList.add('slider_dragging');
        }
        this.changePosition = this.sliderThumbPositionChange(event).changePosition;
        this.lengthToThumbInHundredths = this.sliderThumbPositionChange(event).lengthToThumbInHundredths;
        if (this.lengthToThumbInHundredths < 0) {
          this.lengthToThumbInHundredths = 0;
        }
        if (this.lengthToThumbInHundredths > 1) {
          this.lengthToThumbInHundredths = 1;
        }
        this.divWithClassSliderValue.innerHTML = String(this.changePosition);
        for (let span of this.spans) {
          if (span.classList.contains('slider__step-active')) {
            span.classList.remove('slider__step-active');
          }
        }
        this.spans[this.changePosition].classList.add('slider__step-active');
        this.addStyles('pointermove');
      };


      this.elem.addEventListener('pointermove', onMove);


      this.elem.addEventListener('pointerup', () => {
        this.addStyles();
        this.elem.classList.remove('slider_dragging');
        this.addCustomEvent();
        this.elem.removeEventListener('pointermove', onMove);
      }, {once: true});
    });
  }
}
