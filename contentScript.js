chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'autofill') {
        console.log('Received autofill data:', request.data);
        initializeAutofill(request.data);
    }
});

function initializeAutofill(data) {
    delayAutofill(data);
    observeFormChanges(data);
    handleMultiStepForms(data);
    handleDynamicFields(data);
    retryAutofill(data);
    handleIframeForms(data);
    handleShadowDom(data);
}

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

function getMatchedKey(key, fieldName, fieldId, fieldPlaceholder, fieldLabel) {
    const fieldValues = [fieldName, fieldId, fieldPlaceholder, fieldLabel];
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
    } else if (field.type === 'radio' || field.type === 'checkbox') {
        setRadioOrCheckbox(field, value);
    } else if (field.type === 'date') {
        handleDateFields(field, value);
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

function setRadioOrCheckbox(field, value) {
    if (field.type === 'radio' || field.type === 'checkbox') {
        if (field.value.toLowerCase() === value.toLowerCase()) {
            field.checked = true;
        }
    }
}

function observeFormChanges(data) {
    const formObserver = new MutationObserver(() => {
        autofillForm(data);
    });

    const formElements = document.querySelectorAll('form');
    formElements.forEach(form => {
        formObserver.observe(form, { childList: true, subtree: true });
    });
}

function handleUnsupportedFields(field) {
    try {
        field.value = value;
    } catch (error) {
        console.error(`Failed to set value for field: ${field.name || field.id}`, error);
    }
}

function logAutofillProgress(field, value) {
    console.log(`Autofilling field: ${field.name || field.id} with value: ${value}`);
}

function delayAutofill(data) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    (async () => {
        for (const key in data) {
            await delay(100);
            autofillForm({ [key]: data[key] });
        }
    })();
}

function enhanceCompatibility(data) {
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        for (const key in data) {
            if (field.matches(`[name*="${key}"], [id*="${key}"], [placeholder*="${key}"], [aria-label*="${key}"]`)) {
                setFieldValue(field, data[key]);
                break;
            }
        }
    });
}

function handleCustomFieldTypes(field, value) {
    if (field.getAttribute('data-custom-type')) {
        switch (field.getAttribute('data-custom-type')) {
            case 'date-picker':
                field.value = formatDate(value);
                break;
            case 'currency':
                field.value = formatCurrency(value);
                break;
            default:
                field.value = value;
        }
    } else {
        field.value = value;
    }
}

function formatDate(date) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function isFieldVisible(field) {
    const style = window.getComputedStyle(field);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

function handleConditionalFields(field, value) {
    if (field.hasAttribute('data-condition')) {
        const condition = field.getAttribute('data-condition');
        const conditionField = document.querySelector(`[name="${condition}"], [id="${condition}"]`);
        if (conditionField && conditionField.value === value) {
            field.value = value;
        }
    } else {
        field.value = value;
    }
}

function handleMultiStepForms(data) {
    const nextButtons = document.querySelectorAll('[data-step="next"]');
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            autofillForm(data);
        });
    });
}

function handleHiddenFields(field, value) {
    if (field.type === 'hidden') {
        field.value = value;
    }
}

function handleDynamicFields(data) {
    const dynamicFields = document.querySelectorAll('[data-dynamic]');
    dynamicFields.forEach(field => {
        const dynamicValue = getDynamicValue(field, data);
        if (dynamicValue) {
            field.value = dynamicValue;
        }
    });
}

function getDynamicValue(field, data) {
    const dynamicKey = field.getAttribute('data-dynamic');
    return data[dynamicKey] || '';
}

function validateFormFields(field, value) {
    if (field.required && !value) {
        console.warn(`Required field ${field.name || field.id} is missing value.`);
    } else {
        field.value = value;
    }
}

function retryAutofill(data, retries = 3) {
    let attempt = 0;
    const interval = setInterval(() => {
        if (attempt >= retries) {
            clearInterval(interval);
        } else {
            autofillForm(data);
            attempt++;
        }
    }, 1000);
}

function handleIframeForms(data) {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const formFields = iframeDocument.querySelectorAll('input, textarea, select');
            formFields.forEach(field => autofillFormInIframe(field, data));
        } catch (error) {
            console.error('Error accessing iframe content:', error);
        }
    });
}

function autofillFormInIframe(field, data) {
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
}

function handleNestedForms(data) {
    const nestedForms = document.querySelectorAll('form form');
    nestedForms.forEach(nestedForm => autofillForm(data));
}

function handleShadowDom(data) {
    const shadowRoots = Array.from(document.querySelectorAll('*')).filter(el => el.shadowRoot);
    shadowRoots.forEach(root => {
        const formFields = root.shadowRoot.querySelectorAll('input, textarea, select');
        formFields.forEach(field => autofillFormInShadowDom(field, data));
    });
}

function autofillFormInShadowDom(field, data) {
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
}

function handleComplexFields(field, value) {
    if (field.hasAttribute('data-complex')) {
        const complexType = field.getAttribute('data-complex');
        switch (complexType) {
            case 'phone':
                field.value = formatPhoneNumber(value);
                break;
            case 'ssn':
                field.value = formatSSN(value);
                break;
            default:
                field.value = value;
        }
    } else {
        field.value = value;
    }
}

function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function formatSSN(ssn) {
    return ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
}

function handleCustomEvents(field, value) {
    if (field.hasAttribute('data-custom-event')) {
        const eventType = field.getAttribute('data-custom-event');
        field.value = value;
        field.dispatchEvent(new Event(eventType, { bubbles: true }));
    } else {
        field.value = value;
    }
}

function handlePasswordFields(field, value) {
    if (field.type === 'password') {
        field.value = value;
    }
}

function handleTextareaFields(field, value) {
    if (field.tagName.toLowerCase() === 'textarea') {
        field.value = value;
    }
}

function handleFieldFocus(field) {
    field.focus();
    field.dispatchEvent(new Event('focus', { bubbles: true }));
}

function handleFieldBlur(field) {
    field.blur();
    field.dispatchEvent(new Event('blur', { bubbles: true }));
}

function handleFieldInput(field) {
    field.dispatchEvent(new Event('input', { bubbles: true }));
}

function handleFieldChange(field) {
    field.dispatchEvent(new Event('change', { bubbles: true }));
}

function autofillForm(data) {
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        for (const key in data) {
            const fieldName = field.name.toLowerCase();
            const fieldId = field.id.toLowerCase();
            const fieldPlaceholder = field.placeholder ? field.placeholder.toLowerCase() : '';
            const fieldLabel = getFieldLabel(field).toLowerCase();
            if (fieldName.includes(key.toLowerCase()) || fieldId.includes(key.toLowerCase()) || fieldPlaceholder.includes(key.toLowerCase()) || fieldLabel.includes(key.toLowerCase())) {
                logAutofillProgress(field, data[key]);
                validateFormFields(field, data[key]);
                handleCustomFieldTypes(field, data[key]);
                handleComplexFields(field, data[key]);
                handleConditionalFields(field, data[key]);
                handlePasswordFields(field, data[key]);
                handleTextareaFields(field, data[key]);
                handleFieldFocus(field);
                handleFieldInput(field);
                handleFieldBlur(field);
                handleFieldChange(field);
                break;
            } else {
                const matchedKey = getMatchedKey(key.toLowerCase(), fieldName, fieldId, fieldPlaceholder, fieldLabel);
                if (matchedKey) {
                    logAutofillProgress(field, data[matchedKey]);
                    validateFormFields(field, data[matchedKey]);
                    handleCustomFieldTypes(field, data[matchedKey]);
                    handleComplexFields(field, data[matchedKey]);
                    handleConditionalFields(field, data[matchedKey]);
                    handlePasswordFields(field, data[matchedKey]);
                    handleTextareaFields(field, data[matchedKey]);
                    handleFieldFocus(field);
                    handleFieldInput(field);
                    handleFieldBlur(field);
                    handleFieldChange(field);
                    break;
                }
            }
        }
    });
}
