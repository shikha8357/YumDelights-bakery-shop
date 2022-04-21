paypal.Buttons({
  style:{
     color:"blue",
     shape:"pill"
    
 },
 createOrder: function(data, actions) {
    return actions.order.create({
        purchase_units: [{
            amount: {
                value: '10.00'
            }
        }]
    });
},

// Finalize the transaction
onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
        // Show a success message to the buyer
        alert('Transaction completed by ' + details.payer.name.given_name + '!');
        // Window.location("http://127.0.0.1:5500/public/paymentsuccess.html")
    });
}
    }).render('#paypal-payment-button');