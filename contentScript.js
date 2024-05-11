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
            const fieldName = field.name.toLowerCase();
            const fieldId = field.id.toLowerCase();
            const fieldPlaceholder = field.placeholder.toLowerCase();
            
            if (fieldName.includes(key.toLowerCase()) || fieldId.includes(key.toLowerCase()) || fieldPlaceholder.includes(key.toLowerCase())) {
                field.value = data[key];
                break;
            } else {
                if (fieldName.includes(key.toLowerCase().substring(0, 3))) {
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