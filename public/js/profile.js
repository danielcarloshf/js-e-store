/**
 * File: src/public/js/profile.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Handle events on the profile page.
 */

$(function() {
  $('#edit-address-dialog').dialog({
    height: 330,
    width: 680,
    modal: true,
    resizable: true,
    autoOpen: false
  });

  $('#btn-ok').click(function() {
    var street = $('#in-street').val().trim();
    var number = $('#in-number').val().trim();
    var zipcode = $('#in-zipcode').val().trim();
    var city = $('#in-city').val().trim();
    var state = $('#in-state').val().trim();
    var country = $('#in-country').val().trim();

    $.ajax({
      type: 'POST',
      url: '/address',
      data: {
        street : street,
        number : number,
        zipcode: zipcode,
        city : city,
        state : state,
        country : country
      },
      dataType: 'json',
      success: function(data) {
        $('#street').text(data.street);
        $('#number').text(data.number);
        $('#zipcode').text(data.zipcode);
        $('#city').text(data.city);
        $('#state').text(data.state);
        $('#country').text(data.country);

        $('#edit-address-dialog').dialog('close');
      }
    });
  });

  $('#btn-cancel').click(function() {
    $('#edit-address-dialog').dialog('close');
  });

  $('#btn-edit').click(function() {
    $('#in-street').val($('#street').text().trim());
    $('#in-number').val($('#number').text().trim());
    $('#in-zipcode').val($('#zipcode').text().trim());
    $('#in-city').val($('#city').text().trim());
    $('#in-state').val($('#state').text().trim());
    $('#in-country').val($('#country').text().trim());

    $('#edit-address-dialog').dialog('open');
  });
});

