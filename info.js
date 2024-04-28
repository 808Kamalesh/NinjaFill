document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['name', 'address', 'email', 'phone'], function(data) {
      document.getElementById('nameField').value = data.name || '';
      document.getElementById('addressField').value = data.address || '';
      document.getElementById('emailField').value = data.email || '';
      document.getElementById('phoneField').value = data.phone || '';
    });
  
    document.getElementById('saveButton').addEventListener('click', function() {
      const name = document.getElementById('nameField').value;
      const address = document.getElementById('addressField').value;
      const email = document.getElementById('emailField').value;
      const phone = document.getElementById('phoneField').value;
  
      chrome.storage.sync.set({ 'name': name, 'address': address, 'email': email, 'phone': phone }, function() {
        console.log('User information saved to storage.');
      });
    });
  });