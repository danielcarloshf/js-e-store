/**
 * File: src/public/js/product.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Handle events on the products page.
 */

function addToCart(index) {
  var prod_id = $('#prod_id_'+index).text();
  updateCartItem(prod_id, 1);
}
