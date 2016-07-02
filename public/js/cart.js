/**
 * File: src/public/js/cart.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Handle events on the cart items page.
 */

function updateCartItem(id, quantity) {
  $.ajax({
    type: 'POST',
    url: '/cart',
    data: { product : id, quantity : quantity }
  });
}

function removeFromCart(index, quantity) {
  var item_id = $('#item_id_'+index).text();
  var decrement = (-1) * Number(quantity);
  updateCartItem(item_id, decrement);
}

function setItemQty(index, increment) {
  var item_id = $('#item_id_'+index).text();
  updateCartItem(item_id, increment);
}
