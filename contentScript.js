chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'autofill') {
        console.log('Received autofill data:', request.data);
        autofillForm(request.data);
    }
});

function autofillForm(data) {
    const formFields = document.querySelectorAll('input, textarea, select');

    formFields.forEach(field => {
        for (const key in data) {
            const fieldName = field.name.toLowerCase();
            const fieldId = field.id.toLowerCase();
            const fieldPlaceholder = field.placeholder ? field.placeholder.toLowerCase() : '';
            const fieldLabel = getFieldLabel(field).toLowerCase();

            if (fieldName.includes(key.toLowerCase()) || fieldId.includes(key.toLowerCase()) || fieldPlaceholder.includes(key.toLowerCase()) || fieldLabel.includes(key.toLowerCase())) {
                setFieldValue(field, data[key]);
                break;
            } else {
                const matchedKey = getMatchedKey(key.toLowerCase(), fieldName, fieldId, fieldPlaceholder, fieldLabel);
                if (matchedKey) {
                    setFieldValue(field, data[matchedKey]);
                    break;
                }
            }
        }
    });
}

function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.trim() : '';
}

function getMatchedKey(key, ...fieldValues) {
    for (const value of fieldValues) {
        if (value.includes(key)) {
            return key;
        } else if (value.includes(key.substring(0, 3))) {
            return key.substring(0, 3);
        }
    }
    return null;
}

function setFieldValue(field, value) {
    if (field.tagName.toLowerCase() === 'select') {
        setSelectValue(field, value);
    } else if (field.classList.contains('form-textbox')) {
        setNameValue(field, value);
    } else {
        field.value = value;
    }
}

function setSelectValue(select, value) {
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value || select.options[i].text.toLowerCase() === value.toLowerCase()) {
            select.selectedIndex = i;
            break;
        }
    }
}

function setNameValue(field, value) {
    if (field.getAttribute('data-component') === 'first') {
        field.value = value.split(' ')[0];
    } else if (field.getAttribute('data-component') === 'last') {
        field.value = value.split(' ')[1];
    } else {
        field.value = value;
    }
}