"use strict";

var APP = window.APP || {};
APP.Plugins = APP.Plugins || {};
APP.Components = APP.Components || {}; // window.onbeforeunload = function () {
//   window.scrollTo(0, 0)
// };

(function (APP) {
  APP.Initilizer = function () {
    var app = {};

    app.init = function () {
      app.initPlugins();
      app.initComponents();
    };

    app.initPlugins = function () {
      APP.Plugins.CustomSelect.init();
      APP.Plugins.Validator.init();
      APP.Plugins.Slider.init();
      APP.Plugins.Tabs.init();
      APP.Plugins.Micromodal.init();
      APP.Plugins.DatePicker.init();
    };

    app.initComponents = function () {
      APP.Components.Header.init();
      APP.Components.Footer.init();
      APP.Components.Calculator.init();
      APP.Components.FixedMenu.init();
      APP.Components.GetMoney.init();
    };

    return app;
  };

  window.onload = function () {
    APP.Initilizer().init();
    document.querySelector('body').classList.add('is-ready');
  };
})(window.APP);

(function (APP) {
  APP.Plugins.CustomSelect = {
    init: function init() {
      this.custom();
      this.choice();
    },
    custom: function custom() {
      // if (document.querySelector('.js-choice[single]')) {
      //   document.querySelectorAll('.js-choice[single]').forEach(item => {
      //     new Choices(item, {
      //       searchEnabled: false,
      //     })
      //   })
      // }
      customSelect(document.querySelectorAll('.custom-select'));
    },
    choice: function choice() {
      if (document.querySelector('.js-choice[multiple]')) {
        document.querySelectorAll('.js-choice[multiple]').forEach(function (item) {
          new Choices(item, {
            removeItemButton: true,
            searchEnabled: false,
            itemSelectText: 'Нажмите для выбора',
            placeholderValue: 'Выберите вид оплаты',
            maxItemCount: 5,
            maxItemText: function maxItemText(maxItemCount) {
              return "\u041C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0434\u043E\u0440\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 ".concat(maxItemCount, " \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439");
            }
          });
        });
      }
    }
  };
})(window.APP);

(function (APP) {
  APP.Plugins.DatePicker = {
    data: {
      elements: document.querySelectorAll('.datepicker')
    },
    init: function init() {
      this.generate();
      this.button();
    },
    generate: function generate() {
      this.data.elements.forEach(function (el) {
        new Litepicker({
          element: el.querySelector('input[name="datepicker"]'),
          position: 'bottom right',
          singleMode: false,
          lang: 'ru-RU',
          format: 'DD-MM-YYYY',
          numberOfColumns: 2,
          numberOfMonths: 2,
          showTooltip: false,
          startDate: Date.now(),
          endDate: Date.now(),
          plugins: ['mobilefriendly']
        });
      });
    },
    button: function button() {
      this.data.elements.forEach(function (el) {
        el.querySelector('.btn-filter').addEventListener('click', function () {
          el.querySelector('input[name="datepicker"]').click();
        });
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Plugins.Micromodal = {
    init: function init() {
      this.trigger();
    },
    trigger: function trigger() {
      MicroModal.init({
        disableScroll: true,
        // disableFocus: true,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        // debugMode: true,
        onShow: function onShow(modal) {},
        onClose: function onClose(modal) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    },
    change: function change(name) {
      event.target.closest('.modal-overlay').click();
      MicroModal.show(name, {
        disableScroll: true,
        // disableFocus: true,
        onShow: function onShow(modal) {},
        onClose: function onClose(modal) {}
      });
    },
    close: function close() {
      event.target.closest('.modal-overlay').click();
    }
  };
})(window.APP);

(function (APP) {
  APP.Plugins.Slider = {
    init: function init() {
      this.generate();
    },
    generate: function generate() {
      var sliders = document.querySelectorAll('[data-slider]');
      sliders.forEach(function (item) {
        new Swiper(item, {
          slidesPerView: parseInt(item.dataset.slides) || 1,
          spaceBetween: parseInt(item.dataset.space) || 0,
          watchSlidesProgress: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          breakpoints: {
            1200: {
              slidesPerView: parseInt(item.dataset.slides),
              spaceBetween: parseInt(item.dataset.space)
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            375: {
              slidesPerView: 1,
              spaceBetween: 0
            }
          }
        });
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Plugins.Tabs = {
    data: {
      contentBlocks: document.querySelectorAll('.tabs .tabs-content'),
      navBlocks: document.querySelectorAll('.tabs .tabs-nav')
    },
    init: function init() {
      this.generate();
      this.change();
      this.changeSelect();
    },
    generate: function generate() {
      this.data.contentBlocks.forEach(function (item) {
        item.querySelector('.tabs-item').classList.add('active');
      });
      this.data.navBlocks.forEach(function (item) {
        item.querySelector('a').classList.add('active');
      });
    },
    change: function change() {
      var _this = this;

      // Создание событий для каждого блока кнопок
      this.data.navBlocks.forEach(function (item) {
        // Создаем массив кнопок для каждого элемента
        var btns = item.querySelectorAll('a'); // Передаем все блоки кнопок в функцию

        var items = _this.data.contentBlocks; // С помощью декоратора call создаем событие для каждой кнопки с возвратом this

        [].forEach.call(btns, function (btn, i, btns) {
          btn.addEventListener('click', function () {
            // Присваеваем класс выбранной кнопке, у других кнопок класс убирается.
            [].forEach.call(btns, function (btn) {
              if (btn == this) {
                btn.classList.add('active');
              } else {
                btn.classList.remove('active');
              }
            }, this); // Ищем во всех блоках конента необходимую вкладку и присваемваем ей класс, у остальных вкладок класс убираем.

            items.forEach(function (content) {
              content.querySelectorAll('.tabs-item').forEach(function (contItem) {
                if (contItem.dataset.tab == btn.getAttribute('href')) {
                  contItem.classList.add('active');
                } else {
                  contItem.classList.remove('active');
                }
              });
            });
            var csSelect = item.querySelector('.custom-select').customSelect;
            csSelect.select.value = btn.getAttribute('href');
            csSelect.opener.querySelector('span').innerHTML = btn.innerHTML;
          });
        });
      });
    },
    changeSelect: function changeSelect() {
      var _this2 = this;

      this.data.navBlocks.forEach(function (item) {
        var csSelect = item.querySelector('.custom-select').customSelect.select;
        csSelect.addEventListener('change', function (e) {
          _this2.data.contentBlocks.forEach(function (content) {
            content.querySelectorAll('.tabs-item').forEach(function (contItem) {
              if (contItem.dataset.tab == csSelect.value) {
                contItem.classList.add('active');
              } else {
                contItem.classList.remove('active');
              }
            });
          });
        });
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Plugins.Validator = {
    data: {
      forms: document.querySelectorAll('form'),
      emailPattern: /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,4}(?:[a-z0-9-]*[a-z0-9])?/
    },
    init: function init() {
      this.textValid();
      this.numberValid();
      this.emailValid();
      this.passValid();
      this.checkboxValid();
      this.formValid();
    },
    formValid: function formValid() {
      this.data.forms.forEach(function (form) {
        var fields = form.querySelectorAll('input[required]');
        var btn = form.querySelector('[type="submit"]');
        var errors = [];
        fields.forEach(function (field) {
          field.addEventListener('input', function () {
            errors = [];

            for (var i = 0; i < fields.length; i++) {
              if (!fields[i].classList.contains('valid')) {
                errors.push(fields[i]);
              }
            }

            if (errors.length == 0) {
              btn.removeAttribute('disabled');

              if (form.querySelector('.error')) {
                form.querySelector('.error').classList.remove('is-visible');
              }
            } else {
              if (form.querySelector('.error')) {
                form.querySelector('.error').classList.add('is-visible');
              }

              btn.setAttribute('disabled', 'disabled');
            }

            if (form.classList.contains('login-form')) {
              btn.addEventListener('click', function (e) {
                e.preventDefault();
              });
            }
          });
        });
      });
    },
    emailValid: function emailValid() {
      var _this3 = this;

      Array.from(document.querySelectorAll('form input[type="email"]')).forEach(function (item) {
        item.addEventListener('input', function () {
          if (_this3.data.emailPattern.test(String(item.value).toLocaleLowerCase())) {
            item.classList.add('valid');
            item.classList.remove('not-valid');
          } else {
            item.classList.add('not-valid');
            item.classList.remove('valid');
          }
        });
      });
    },
    passValid: function passValid() {
      var passInput = document.querySelector('form .pass-input');
      var passConfirm = document.querySelector('form .pass-confirm');

      if (passInput != null) {
        passInput.addEventListener('input', function () {
          if (passInput.checkValidity()) {
            passInput.classList.add('valid');
            passInput.classList.remove('not-valid');
          } else {
            passInput.classList.add('not-valid');
            passInput.classList.remove('valid');
          }
        });
      }

      if (passConfirm != null) {
        passConfirm.addEventListener('input', function () {
          if (passConfirm.checkValidity() && passConfirm.value === passInput.value) {
            passConfirm.classList.add('valid');
            passConfirm.classList.remove('not-valid');
          } else {
            passConfirm.classList.add('not-valid');
            passConfirm.classList.remove('valid');
          }
        });
      }
    },
    textValid: function textValid() {
      Array.from(document.querySelectorAll('form input[type="text"]')).forEach(function (item) {
        item.addEventListener('input', function () {
          if (item.checkValidity()) {
            item.classList.add('valid');
            item.classList.remove('not-valid');
          } else {
            item.classList.add('not-valid');
            item.classList.remove('valid');
          }
        });
      });
    },
    numberValid: function numberValid() {
      Array.from(document.querySelectorAll('form input[type="number"]')).forEach(function (item) {
        item.addEventListener('input', function () {
          if (item.checkValidity()) {
            item.classList.add('valid');
            item.classList.remove('not-valid');
          } else {
            item.classList.add('not-valid');
            item.classList.remove('valid');
          }
        });
      });
    },
    checkboxValid: function checkboxValid() {
      Array.from(document.querySelectorAll('form input[type="checkbox"]')).forEach(function (item) {
        item.addEventListener('input', function () {
          if (item.checkValidity()) {
            item.classList.add('valid');
            item.classList.remove('not-valid');
          } else {
            item.classList.add('not-valid');
            item.classList.remove('valid');
          }
        });
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Components.Calculator = {
    data: {
      slider: document.querySelector('.calculator .calculator-price') || null,
      sliderValue: document.querySelector('.calculator .calculator-price-value'),
      buttons: document.querySelectorAll('.calculator input[type="radio"]'),
      result: document.querySelector('.calculator .calculator-result-value')
    },
    init: function init() {
      if (this.data.slider !== null) {
        this.generate();
        this.calc();
        this.change();
      }
    },
    generate: function generate() {
      var _this4 = this;

      noUiSlider.create(this.data.slider, {
        start: 1000,
        range: {
          min: 150,
          max: 100000
        },
        step: 1
      });
      this.data.slider.noUiSlider.on('update', function (values, handle) {
        _this4.data.sliderValue.innerHTML = values[handle];
      });
    },
    change: function change() {
      var _this5 = this;

      this.data.buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          _this5.calc();
        });
      });
      this.data.slider.noUiSlider.on('change', function () {
        _this5.calc();
      });
    },
    calc: function calc() {
      var invest = this.data.slider.noUiSlider.get();
      var duration = document.querySelector('input[name="duration"]:checked').value;
      var percent = document.querySelector('input[name="percent"]:checked').value;
      this.data.result.innerHTML = (invest * (percent / 100) / 12 * duration).toFixed(2);
    }
  };
})(window.APP);

(function (APP) {
  APP.Components.Footer = {
    init: function init() {
      if (document.querySelector('.footer-account')) {
        this.scroll();
      }
    },
    scroll: function scroll() {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset + 100 > document.body.scrollHeight - window.innerHeight) {
          document.querySelector('.footer-account').classList.add('visible');
        } else {
          document.querySelector('.footer-account').classList.remove('visible');
        }
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Components.FixedMenu = {
    init: function init() {
      if (document.querySelector('.fixed-menu')) {
        this.toggle();
        this.submenu();
      }
    },
    toggle: function toggle() {
      document.querySelector('.fixed-menu-btn').addEventListener('click', function () {
        document.querySelector('.fixed-menu').classList.toggle('open');
      });
    },
    submenu: function submenu() {
      document.querySelectorAll('.fixed-menu-submenu').forEach(function (submenu) {
        submenu.querySelector('button').addEventListener('click', function () {
          submenu.classList.toggle('is-open');
        });
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Components.Header = {
    init: function init() {
      if (document.querySelector('.header')) {
        this.scroll();
      }
    },
    scroll: function scroll() {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
          document.querySelector('.header').classList.add('header-scroll');
        } else {
          document.querySelector('.header').classList.remove('header-scroll');
        }
      });
    }
  };
})(window.APP);

(function (APP) {
  APP.Components.GetMoney = {
    data: {
      container: document.querySelectorAll('.get-money-container')
    },
    init: function init() {
      this.generate();
    },
    generate: function generate() {
      this.data.container.forEach(function (item) {
        var slider = item.querySelector('.get-money-slider');
        var value = item.querySelector('.get-money-value');
        var buttons = item.querySelectorAll('.get-money-buttons button');
        noUiSlider.create(slider, {
          start: 0,
          range: {
            min: 0,
            max: 100
          },
          step: 1,
          format: {
            to: function to(value) {
              return value;
            },
            from: function from(value) {
              return value.replace(',-', '');
            }
          }
        });
        slider.noUiSlider.on('update', function (values, handle) {
          value.innerHTML = values[handle] + '%';
        });
        buttons.forEach(function (item) {
          item.addEventListener('click', function () {
            slider.noUiSlider.set(item.dataset.value);
          });
        });
      });
    }
  };
})(window.APP);