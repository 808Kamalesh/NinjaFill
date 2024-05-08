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
      clickSound.play();
      chrome.tabs.create({ url: chrome.runtime.getURL('info.html') });
    });
  
    document.getElementById('autofillButton').addEventListener('click', function() {
      clickSound.play();
      chrome.storage.sync.get(['name', 'dateOfBirth', 'gender', 'nationality', 'maritalStatus', 'email', 'phone', 'alternatePhone', 'linkedin', 'website', 'education', 'major', 'gpa', 'coursework', 'workExperience', 'internships', 'volunteer', 'certifications', 'skills', 'technicalSkills', 'softSkills', 'language'], function(data) {
        console.log('Sending autofill data:', data);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'autofill', data: data });
        });
      });
    });
  });