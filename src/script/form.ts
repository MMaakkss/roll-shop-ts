import { clearBasket, getBasketLength } from "./basket";
import emailjs from "emailjs-com";

let showError: boolean = false;

export const submitForm = (email: string) => {
  if (!getBasketLength()) return;

  if (validateEmail(email)) {
    document.querySelector(".form-group")!.innerHTML = '<input type="text" class="form-control" placeholder="Enter your e-mail">';
    showError = false;

	  emailjs
      .send(
        "service_olg381s",
        "template_o9kgqe7",
        {},
        "zFNkswCQ3i-kc1dDy"
      )
      .then(() => {
          alert("Thanks! We receive your order! (You won't receive a letter to your e-mail)");
        },
        (error) => {
          console.error("FAILED...", error);
        }
      );

    clearBasket();
    localStorage.removeItem("storedProducts");
  } else {
    if (!showError) {
      document
        .querySelector(".form-group")!
        .insertAdjacentHTML("beforeend", '<div class="form-error">Enter valid e-mail</div>');
    }
    showError = true;
  }
};

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};