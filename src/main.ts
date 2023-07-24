import { productsOutput } from "./script/productsOutput";
import { addToBasket } from "./script/basket";
import { submitForm } from "./script/form";
import './style.css'

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<header class="header">
<div class="container text-center">
  <img src="/img/logo/logo.svg" width="92" alt="rolls">
  <div class="display-4">Roll delivery</div>
  <p class="lead">Fast and delicious</p>
</div>
</header>

<div class="container mb-5">
<div class="row">
  <div class="col-md-8">
    <div class="row products-wrapper"></div>
  </div>
  <div class="col-md-4">

    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Your order</h4>
        
        <div class="cart-wrapper"></div>
        
        <div class="cart-total"></div>

      </div>

      <div id="order-form" class="card-body border-top">
        <h5 class="card-title">Checkout</h4>
        <form>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter your e-mail">
          </div>
          <button type="submit" class="btn btn-primary">Send order</button>
        </form>
      </div>

    </div>

  </div>
</div>
</div>
`;

window.addEventListener("click", (e: Event) => {
  const element: HTMLButtonElement = e.target as HTMLButtonElement;

  if (element.dataset.id) {
    const id: number = Number(element.dataset.id);
    const count: number = Number(
      element.closest(".card-body")!.querySelector("[data-counter]")!.innerHTML
    );
    addToBasket(id, count);
  }

  if (element.dataset.action) {
    const counter: HTMLElement = element
      .closest(".counter-wrapper")!
      .querySelector("[data-counter]")!;

    if (element.dataset.action === "plus") {
      let currentValue: number = Number(counter.innerHTML);
      counter.innerHTML = String(++currentValue);
    }

    if (element.dataset.action === "minus") {
      let currentValue: number = Number(counter.innerHTML);

      if (currentValue > 1) {
        counter.innerHTML = String(--currentValue);
      }
    }

  }
});

const form: HTMLFormElement = document.getElementById("order-form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input: HTMLInputElement = form.querySelector(".form-control") as HTMLInputElement;
  submitForm(input.value);
});

productsOutput(document.querySelector<HTMLDivElement>(".products-wrapper")!);