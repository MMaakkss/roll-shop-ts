import { products } from "../data/products";

export function productsOutput(element: HTMLDivElement) {
  products.forEach((product) => {
    const newElem: HTMLElement = document.createElement("div");

    newElem.classList.add("col-md-6", "mb-4");
    newElem.innerHTML = `
        <div class="card h-100">
          <img class="product-img" src="${ product.img }" alt="image of ${ product.title }">
          <div class="card-body d-flex flex-column text-center">
            <h4 class="mb-4 item-title">${ product.title }</h4>
            <p class="mb-2 mt-auto"><small data-items-in-box class="text-muted">${ product.amount } pcs.</small></p>

            <div class="details-wrapper">
              <div class="items counter-wrapper">
                <div class="items__control" data-action="minus">-</div>
                <div class="items__current" data-counter>1</div>
                <div class="items__control" data-action="plus">+</div>
              </div>

              <div class="price">
                <div class="price__weight">${ product.weight }g.</div>
                <div class="price__currency">${ product.price } ₴</div>
              </div>

            </div>

            <button data-id="${ product.id }" type="button" class="btn btn-block btn-outline-warning">
              + add to basket
            </button>

          </div>
        </div>
      `;

    element.appendChild(newElem);
  });
}
