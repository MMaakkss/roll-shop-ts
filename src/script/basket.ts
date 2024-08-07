import { products } from "../data/products";
import { IBasketProduct } from "../model/product";

const storedProducts: IBasketProduct[] = localStorage.getItem("storedProducts")
  ? JSON.parse(localStorage.getItem("storedProducts")!)
  : [];

let basketProducts: IBasketProduct[] = storedProducts;

let basketWrapper: HTMLElement;
let totalBlock: HTMLElement;

const changeAmount = (count: number, id: number) => {
  basketProducts.map((product) => {
    if (product.id == id) product.count += count;
    return product;
  });
};

window.addEventListener("load", () => {
  basketWrapper = document.querySelector(".cart-wrapper")!;
  totalBlock = document.querySelector(".cart-total")!;

  basketProducts.length ? basketOutput() : clearBasket();
});

window.addEventListener("click", (e: Event) => {
  const element: HTMLElement = e.target as HTMLElement;

  if (!element.dataset.actionBasket) return;

  const product: HTMLElement = element.closest(".cart-item") as HTMLElement;
  const id: number = Number(product.dataset.id);

  const counter: HTMLElement = element.closest(".counter-wrapper")!.querySelector("[data-counter]")!;
  let currentValue: number = Number(counter.innerHTML);

  if (element.dataset.actionBasket === "plus") {
    changeAmount(1, id);
  } else if (element.dataset.actionBasket === "minus") {
    currentValue > 1 ? changeAmount(-1, id) : deleteProduct(id);
  }

  basketOutput();
  storeProducts();
});

const deleteProduct = (id: number) => {
  basketProducts = basketProducts.filter((product) => product.id !== id);
}

export const addToBasket = (id: number, count: number) => {
  const selectedProduct = products.find((product) => product.id === id);

  if (!selectedProduct) return;

  const isInArray: boolean = basketProducts.some(
    (product) => product.id === id
  );

  if (isInArray) {
    changeAmount(count, id);
  } else {
    basketProducts.push({ ...selectedProduct, count: count });
  }

  basketOutput();
  storeProducts();
};

export const clearBasket = () => {
  basketWrapper.innerHTML = `
    <div class="alert mb-0 alert-secondary" role="alert">
      Корзина пуста
    </div>
  `;

  totalBlock.innerHTML = "";
};

export const getBasketLength = () => basketProducts.length;

const basketOutput = () => {
  if (!basketProducts.length) clearBasket();

  if (basketProducts.length) basketWrapper.innerHTML = "";

  basketProducts.forEach((product) => {
    const newElem: HTMLElement = document.createElement("div");
    newElem.classList.add("cart-item");
    newElem.innerHTML = `
      <div class="cart-item" data-id="${ product.id }">
            <div class="cart-item__top">
              <div class="cart-item__img">
                <img src="${ product.img }" alt="">
              </div>
              <div class="cart-item__desc">
                <div class="cart-item__title">${ product.title }</div>
                <div class="cart-item__weight">${ product.amount } pcs. / ${ product.weight }g.</div>

                <div class="cart-item__details">

                  <div class="items items--small counter-wrapper">
                    <div class="items__control" data-action-basket="minus">-</div>
                    <div class="items__current" data-counter="">${ product.count }</div>
                    <div class="items__control" data-action-basket="plus">+</div>
                  </div>

                  <div class="price">
                    <div class="price__currency">${ product.price } ₴</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
      `;
    basketWrapper.appendChild(newElem);
  });

  if (basketProducts.length) {
    totalBlock.innerHTML = `
      <p><span class="h5">Delivery:</span> <span class="delivery-cost free">${ getDeliveryPrice() }</span> </p>
      <p><span class="h5">Total:</span> <span class="total-price">${ getBasketPrice() } ₴</span></p>
    `;
  }
};

const getBasketPrice = (): number => {
  return basketProducts.reduce(
    (acc, product) => acc + product.count * product.price,
    0
  );
};

const getDeliveryPrice = (): string => getBasketPrice() >= 750 ? "Free" : "Carrier's tariffs";

const storeProducts = () => {
  localStorage.setItem("storedProducts", JSON.stringify(basketProducts));
};