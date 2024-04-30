document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('infoButton').addEventListener('click', function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('info.html') });
  });

  document.getElementById('autofillButton').addEventListener('click', function() {
    chrome.storage.sync.get(['name', 'address', 'email', 'phone', 'linkedin', 'portfolio', 'workExperience', 'education', 'skills'], function(data) {
      console.log('Sending autofill data:', data);
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'autofill', data: data });
      });
    });
  });
})