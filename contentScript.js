chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'autofill') {
    console.log('Received autofill data:', request.data);
    autofillForm(request.data);
  }
});

function autofillForm(data) {
  const nameField = document.querySelector('input[name="name"]');
  const addressField = document.querySelector('input[name="address"]');
  const emailField = document.querySelector('input[name="email"]');
  const phoneField = document.querySelector('input[name="phone"]');

  if (nameField) {
    nameField.value = data.name;
  }

  if (addressField) {
    addressField.value = data.address;
  }

  if (emailField) {
    emailField.value = data.email;
  }

  if (phoneField) {
    phoneField.value = data.phone;
  }
}