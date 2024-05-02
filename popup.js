document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const container = document.querySelector('.container');

  darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
  });

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
});