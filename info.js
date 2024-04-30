document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['name', 'address', 'email', 'phone', 'linkedin', 'portfolio', 'workExperience', 'education', 'skills'], function(data) {
    document.getElementById('nameField').value = data.name || '';
    document.getElementById('addressField').value = data.address || '';
    document.getElementById('emailField').value = data.email || '';
    document.getElementById('phoneField').value = data.phone || '';
    document.getElementById('linkedinField').value = data.linkedin || '';
    document.getElementById('portfolioField').value = data.portfolio || '';
    document.getElementById('workExperienceField').value = data.workExperience || '';
    document.getElementById('educationField').value = data.education || '';
    document.getElementById('skillsField').value = data.skills || '';
  });

  document.getElementById('saveButton').addEventListener('click', function() {
    const name = document.getElementById('nameField').value;
    const address = document.getElementById('addressField').value;
    const email = document.getElementById('emailField').value;
    const phone = document.getElementById('phoneField').value;
    const linkedin = document.getElementById('linkedinField').value;
    const portfolio = document.getElementById('portfolioField').value;
    const workExperience = document.getElementById('workExperienceField').value;
    const education = document.getElementById('educationField').value;
    const skills = document.getElementById('skillsField').value;

    chrome.storage.sync.set({ 'name': name, 'address': address, 'email': email, 'phone': phone, 'linkedin': linkedin, 'portfolio': portfolio, 'workExperience': workExperience, 'education': education, 'skills': skills }, function() {
      console.log('User information saved to storage.');
    });
  });
});