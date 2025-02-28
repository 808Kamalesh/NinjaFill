chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'autofill' && request.data) {
        console.log('Received autofill data:', request.data);
        initializeAutofill(request.data);
    }
});

function initializeAutofill(data) {
    if (!data || typeof data !== 'object') return;
    setTimeout(() => autofillForm(data), 100);
    observeFormChanges(data);
    retryAutofill(data);
    handleSpecialCases(data);
}

function autofillForm(data) {
    document.querySelectorAll('input, textarea, select').forEach(field => {
        const key = Object.keys(data).find(k => fieldMatches(field, k));
        if (key) setFieldValue(field, data[key]);
    });
}

function fieldMatches(field, key) {
    key = key.toLowerCase();
    return ['name', 'id', 'placeholder', 'aria-label']
        .some(attr => field[attr]?.toLowerCase().includes(key));
}

function setFieldValue(field, value) {
    if (!field || value === undefined || value === null) return;
    switch (field.type) {
        case 'select-one': setSelectValue(field, value); break;
        case 'radio': case 'checkbox': setRadioOrCheckbox(field, value); break;
        case 'date': field.value = formatDate(value); break;
        default: field.value = value;
    }
}

function setSelectValue(select, value) {
    const option = Array.from(select.options).find(opt => opt.value === value || opt.text.toLowerCase() === value.toLowerCase());
    if (option) select.value = option.value;
}

function setRadioOrCheckbox(field, value) {
    if (field.value.toLowerCase() === value.toLowerCase()) field.checked = true;
}

function formatDate(date) {
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
}

function observeFormChanges(data) {
    new MutationObserver(() => autofillForm(data))
        .observe(document.body, { childList: true, subtree: true });
}

function retryAutofill(data, retries = 3) {
    let attempts = 0;
    const interval = setInterval(() => {
        if (++attempts >= retries) clearInterval(interval);
        autofillForm(data);
    }, 1000);
}

function handleSpecialCases(data) {
    document.querySelectorAll('iframe').forEach(iframe => {
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (doc) autofillForm(data);
        } catch (e) { console.error('Error accessing iframe:', e); }
    });
    document.querySelectorAll('*').forEach(el => {
        if (el.shadowRoot) autofillForm(data);
    });
}
