const navMenu = document.querySelector(".header__menu");
const navToggle = document.querySelector(".header__toggle");
const mainHeader = document.querySelector(".header");
const logoImage = document.querySelector(".header__logo");

mainHeader.classList.remove("header--no-js");

navToggle.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (navMenu.classList.contains("header__menu--closed")) {
    navMenu.classList.remove("header__menu--closed");
    navToggle.classList.add("header__toggle--closed");
    logoImage.classList.add("header__logo--opened");
  } else {
    navMenu.classList.add("header__menu--closed");
    navToggle.classList.remove("header__toggle--closed");
    logoImage.classList.remove("header__logo--opened");
  };
});

window.addEventListener("keydown", (evt) => {
  if (evt.key === "Esc" || evt.key === "Escape") {
    if (!navMenu.classList.contains("header__menu-closed") && navToggle.classList.contains("header__toggle--close")) {
      evt.preventDefault();
      navMenu.classList.add("header__menu--closed");
      navToggle.classList.remove("header__toggle--closed");
    };
  };
});

// Паддинг при фиксированном меню

const pageBody = document.body;
const paddingWrapper = document.querySelector(".padding-wrapper");
const header = document.querySelector(".header");

const setPageWrapperPadding = () => {
  paddingWrapper.style.paddingTop = `${header.getBoundingClientRect().height}px`;
}

setPageWrapperPadding();

const windowResizeHandler = () => {
  setPageWrapperPadding();
};

window.addEventListener("scroll", () => {
  if (pageBody.getBoundingClientRect().top < 0) {
    header.classList.add("header--scrolled");
    return;
  };
  header.classList.remove("header--scrolled");
});

window.addEventListener("resize", windowResizeHandler);

//---- Модальное окно на главной странице

const modal = document.querySelector(".modal");
const openModalLink = document.querySelector(".open-modal-link");
const closeModalButton = document.querySelector(".modal-close-button");

const initModalTariff = () => {
  if(!openModalLink) {
    return;
  };

  const clearOpenedModal = () => {
    document.querySelector(".modal.modal--opened").classList.remove("modal--opened");
    enableScrolling();
  };

  openModalLink.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.classList.add("modal--opened");
    disableScrolling();
    document.addEventListener("click", onDocumentClick);
  });

  const onDocumentClick = ({target}) => {
    if (target.closest(".modal-close-button") || target.closest(".for-business__overlay")) {
      clearOpenedModal(modal);
      document.removeEventListener("click", onDocumentClick);
    };
  };

  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Esc" || evt.key === "Escape") {
      evt.preventDefault();
      clearOpenedModal(modal);
    };
  });

  const body = document.querySelector(`body`);
  window.offsetScroll = 0;

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const getBodyScrollTop = () => {
    return (
      self.pageYOffset ||
      (document.documentElement && document.documentElement.ScrollTop) ||
      (document.body && document.body.scrollTop)
    );
  };

  const disableScrolling = () => {
    const scrollWidth = getScrollbarWidth();
    body.setAttribute(`style`, `padding-right: ` + scrollWidth + `px;`);
    body.dataset.scrollY = `${getBodyScrollTop()}`;
    window.offsetScroll = getBodyScrollTop();
    body.style.top = `-${document.body.dataset.scrollY}px`;
    body.classList.add(`fixed`);
  };

  const enableScrolling = () =>{
    body.removeAttribute(`style`);
    body.classList.remove(`fixed`);
    window.scrollTo(0, +document.body.dataset.scrollY);
    window.offsetScroll = 0;
  };
};

initModalTariff();

//---- Форма регистрации на главной странице

const indexForm = document.querySelector(".authorize__form");
const emailInput = document.querySelector(".authorize__email-input");

const initIndexForm = () => {
  if(!indexForm) {
    return;
  };

  indexForm.addEventListener("submit", (evt) => {
    if (!emailInput.value) {
      evt.preventDefault();
      emailInput.placeholder = "Введите e-mail";
      emailInput.classList.add("authorize__email-input--error");
    };
  });
};

initIndexForm();

//---- Алфавит на странице формы

const alphabetLink = document.querySelector(".step__alphabet-link");
const alphabetForm = document.querySelector(".step__alphabet-modal");
const alphabetClose = document.querySelector(".step__close-alphabet-button");

const initAlphabetForm = () => {
  if (!alphabetLink) {
    return;
  };

  alphabetLink.addEventListener("click", (evt) => {
    evt.preventDefault();
    alphabetForm.classList.add("step__alphabet-modal--opened");
  });

  alphabetClose.addEventListener("click", (evt) => {
    evt.preventDefault();
    alphabetForm.classList.remove("step__alphabet-modal--opened");
  });
};

initAlphabetForm();

//---- Карта

const initMap = () => {
  const MapContainer = document.querySelector("#map");
  if (!MapContainer) {
    return;
  }

  window.ymaps.ready(function () {
    const map = new window.ymaps.Map(document.querySelector('#map'), {
      center: [59.938788, 30.323126],
      controls: [],
      zoom: 16,
    });
    const myPlaceMark = new window.ymaps.Placemark(
      [59.938788, 30.323126],
      null,
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/pin.svg',
        iconImageSize: [41, 41],
        iconImageOffset: [-20 / 2, -10 / 2],
      },
    );
    map.geoObjects.add(myPlaceMark);
  });
};

initMap();

//---- Алфавит на странице каталога

const alphabetToggle = document.querySelector(".land-filter__toggle");
const alphabetCatalog = document.querySelector(".land-filter__container");
const alphabetCloseButton = document.querySelector(".land-filter__close-button");

const initAlphabetCatalog = () => {
  if(!alphabetToggle) {
    return;
  };
  alphabetToggle.addEventListener("click", (evt) => {
    evt.preventDefault();
    const parent = evt.target.closest(".land-filter__container");
    parent.classList.toggle("land-filter__container--opened");
    alphabetToggle.classList.toggle("land-filter__toggle--opened");
  });

  alphabetCloseButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    alphabetCatalog.classList.remove("land-filter__container--opened");
    alphabetToggle.classList.remove("land-filter__toggle--opened")
  });
};

initAlphabetCatalog();

const accordionToggle = document.querySelectorAll(".companions-filter__toggle");
accordionToggle.forEach((toggle) => {
  toggle.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle("companions-filter__toggle--opened");
    const currentList = evt.target.nextElementSibling;
    const currentClass = currentList.classList[0];
    currentList.classList.toggle(`${currentClass}--opened`);
  });
});

const innerPageForm = document.querySelector(".add-plan__form");
const commentTextarea = document.querySelector(".step__entertainment-comment");

const initInnerPageForm = () => {
  if(!innerPageForm) {
    return;
  };

  innerPageForm.addEventListener("submit", (evt) => {
    if (!commentTextarea.value) {
      evt.preventDefault();
      commentTextarea.classList.add("step__entertainment-comment--error");
      commentTextarea.focus();
    };
  });
};

initInnerPageForm();
