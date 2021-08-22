const navMenu = document.querySelector(".header__menu");
const navToggle = document.querySelector(".header__toggle");

navMenu.classList.remove("header__menu--no-js");

navToggle.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (navMenu.classList.contains("header__menu--closed")) {
    navMenu.classList.remove("header__menu--closed");
    navToggle.classList.add("header__toggle--close");
  } else {
    navMenu.classList.add("header__menu--closed");
    navToggle.classList.remove("header__toggle--close");
  };
});

window.addEventListener("keydown", (evt) => {
  if (evt.key === "Esc" || evt.key === "Escape") {
    if (!navMenu.classList.contains("header__menu-closed") && navToggle.classList.contains("header__toggle--close")) {
      evt.preventDefault();
      navMenu.classList.add("header__menu--closed");
      navToggle.classList.remove("header__toggle--close");
    };
  };
});

const modal = document.querySelector(".modal");
const openModalLink = document.querySelector(".open-modal-link");
const closeModalButton = document.querySelector(".modal-close-button");

const clearOpenedModal = () => {
  document.querySelector(".modal.modal--opened").classList.remove("modal--opened");
};

openModalLink.addEventListener("click", (evt) => {
  evt.preventDefault();
  modal.classList.add("modal--opened");
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

const indexForm = document.querySelector(".authorize__form");
const emailInput = document.querySelector(".authorize__email-input");

indexForm.addEventListener("submit", (evt) => {
  if (!emailInput.value) {
    evt.preventDefault();
    emailInput.placeholder = "Введите e-mail";
    emailInput.classList.add("authorize__email-input--error");
  };
})
