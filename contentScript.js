chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'autofill') {
    console.log('Received autofill data:', request.data);
    autofillForm(request.data);
  }
});

function autofillForm(data) {
  const nameField = document.querySelector('input[name="name"]');
  const addressField = document.querySelector('input[name="address"]');
  const emailField = document.querySelector('input[name="email"]');
  const phoneField = document.querySelector('input[name="phone"]');
  const linkedinField = document.querySelector('input[name="linkedin"]');
  const portfolioField = document.querySelector('input[name="portfolio"]');
  const workExperienceField = document.querySelector('textarea[name="workExperience"]');
  const educationField = document.querySelector('textarea[name="education"]');
  const skillsField = document.querySelector('textarea[name="skills"]');

  if (nameField) {
    nameField.value = data.name;
  }

  if (addressField) {
    addressField.value = data.address;
  }

  if (emailField) {
    emailField.value = data.email;
  }

  if (phoneField) {
    phoneField.value = data.phone;
  }

  if (linkedinField) {
    linkedinField.value = data.linkedin;
  }

  if (portfolioField) {
    portfolioField.value = data.portfolio;
  }

  if (workExperienceField) {
    workExperienceField.value = data.workExperience;
  }

  if (educationField) {
    educationField.value = data.education;
  }

  if (skillsField) {
    skillsField.value = data.skills;
  }
}