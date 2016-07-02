/**
 * File: src/public/js/order.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Handle events on the order report page.
 */

$(function() {
  $('#btn-ok').click(function() {
    var items = [];
    var address = {
      street: $('#in-street').val().trim(),
      number: $('#in-number').val().trim(),
      city: $('#in-city').val().trim(),
      zipcode: $('#in-zipcode').val().trim(),
      state: $('#in-state').val().trim(),
      country: $('#in-country').val().trim(),
    };

    var total = Number($("#total_cost").text().replace(/[^0-9\.]+/g,""));

    for (var i = 0; i < $('.tr-item').size(); i++) {
      items[items.length] = {
        code: $("#prod_id_"+i).text(),
        name: $("#prod_name_"+i).text(),
        price: Number($("#prod_price_"+i).text().replace(/[^0-9\.]+/g,"")),
        quantity: $("#prod_quantity_"+i).text()
      };
    }

    $.ajax({
      type: 'POST',
      url: '/order',
      dataType: 'json',
      data: {
        total: total,
        address: address,
        items: items
      },
      success: function(order) {
        location.href = '/report/' + order._id;
      }
    });
  });

  $('#btn-cancel').click(function() {
    location.href = '/cart';
  });
});
