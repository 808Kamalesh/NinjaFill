document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const container = document.querySelector('.container');

  darkModeToggle.addEventListener('change', () => {
      body.classList.toggle('dark-mode');
      container.classList.toggle('dark-mode');
  });

  const clickSound = new Audio('click.mp3');

  document.getElementById('infoButton').addEventListener('click', function() {
      chrome.tabs.create({ url: chrome.runtime.getURL('info.html') });
  });

  document.getElementById('autofillButton').addEventListener('click', function() {
      clickSound.play();
      chrome.storage.sync.get(['name', 'dateOfBirth', 'gender', 'nationality', 'maritalStatus', 'email', 'phone', 'alternatePhone', 'linkedin', 'website', 'github', 'education', 'major', 'gpa', 'coursework', 'workExperience', 'internships', 'volunteer', 'certifications', 'skills', 'technicalSkills', 'softSkills', 'language', 'projects', 'projectDescription', 'projectLinks'], function(data) {
          console.log('Sending autofill data:', data);
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'autofill', data: data });
          });
      });
  });
});

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