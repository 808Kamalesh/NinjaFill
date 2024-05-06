chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'autofill') {
      console.log('Received autofill data:', request.data);
      autofillForm(request.data);
  }
});

function autofillForm(data) {
  const formFields = document.querySelectorAll('input, textarea');

  formFields.forEach(field => {
      for (const key in data) {
          if (field.name.toLowerCase().includes(key.toLowerCase()) || field.id.toLowerCase().includes(key.toLowerCase()) || field.placeholder.toLowerCase().includes(key.toLowerCase())) {
              field.value = data[key];
              break;
          } else {
              if (field.name.toLowerCase().includes(key.toLowerCase().substring(0, 3))) {
                  field.value = data[key];
                  break;
              } else {
                  const label = document.querySelector(`label[for="${field.id}"]`);
                  if (label && label.textContent.toLowerCase().includes(key.toLowerCase())) {
                      field.value = data[key];
                      break;
                  }
              }
          }
          if (field.classList.contains('form-textbox') && field.getAttribute('data-component') === 'first') {
              field.value = data.name.split(' ')[0];
          } else if (field.classList.contains('form-textbox') && field.getAttribute('data-component') === 'last') {
              field.value = data.name.split(' ')[1];
          }
      }
  });
}