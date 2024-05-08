document.addEventListener('DOMContentLoaded', function() {
  const personalInfoTab = document.getElementById('personalInfoTab');
  const educationAndWorkTab = document.getElementById('educationAndWorkTab');

  personalInfoTab.addEventListener('click', function() {
    openTab(event, 'personalInfo');
  });

  educationAndWorkTab.addEventListener('click', function() {
    openTab(event, 'educationAndWork');
  });

  function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    evt.currentTarget.classList.add("active");
  }

  chrome.storage.sync.get(['name', 'dateOfBirth', 'gender', 'nationality', 'maritalStatus', 'email', 'phone', 'alternatePhone', 'linkedin', 'website', 'education', 'major', 'gpa', 'coursework', 'workExperience', 'internships', 'volunteer', 'certifications', 'skills', 'technicalSkills', 'softSkills', 'language'], function(data) {
    document.getElementById('nameField').value = data.name || '';
    document.getElementById('dateOfBirthField').value = data.dateOfBirth || '';
    document.getElementById('genderField').value = data.gender || '';
    document.getElementById('nationalityField').value = data.nationality || '';
    document.getElementById('maritalStatusField').value = data.maritalStatus || '';
    document.getElementById('emailField').value = data.email || '';
    document.getElementById('phoneField').value = data.phone || '';
    document.getElementById('alternatePhoneField').value = data.alternatePhone || '';
    document.getElementById('linkedinField').value = data.linkedin || '';
    document.getElementById('websiteField').value = data.website || '';
    document.getElementById('educationField').value = data.education || '';
    document.getElementById('majorField').value = data.major || '';
    document.getElementById('gpaField').value = data.gpa || '';
    document.getElementById('courseworkField').value = data.coursework || '';
    document.getElementById('workExperienceField').value = data.workExperience || '';
    document.getElementById('internshipsField').value = data.internships || '';
    document.getElementById('volunteerField').value = data.volunteer || '';
    document.getElementById('certificationsField').value = data.certifications || '';
    document.getElementById('skillsField').value = data.skills || '';
    document.getElementById('technicalSkillsField').value = data.technicalSkills || '';
    document.getElementById('softSkillsField').value = data.softSkills || '';
    document.getElementById('languageField').value = data.language || '';
});

document.getElementById('saveButton').addEventListener('click', function() {
    const name = document.getElementById('nameField').value;
    const dateOfBirth = document.getElementById('dateOfBirthField').value;
    const gender = document.getElementById('genderField').value;
    const nationality = document.getElementById('nationalityField').value;
    const maritalStatus = document.getElementById('maritalStatusField').value;
    const email = document.getElementById('emailField').value;
    const phone = document.getElementById('phoneField').value;
    const alternatePhone = document.getElementById('alternatePhoneField').value;
    const linkedin = document.getElementById('linkedinField').value;
    const website = document.getElementById('websiteField').value;
    const education = document.getElementById('educationField').value;
    const major = document.getElementById('majorField').value;
    const gpa = document.getElementById('gpaField').value;
    const coursework = document.getElementById('courseworkField').value;
    const workExperience = document.getElementById('workExperienceField').value;
    const internships = document.getElementById('internshipsField').value;
    const volunteer = document.getElementById('volunteerField').value;
    const certifications = document.getElementById('certificationsField').value;
    const skills = document.getElementById('skillsField').value;
    const technicalSkills = document.getElementById('technicalSkillsField').value;
    const softSkills = document.getElementById('softSkillsField').value;
    const language = document.getElementById('languageField').value;

    chrome.storage.sync.set({
        'name': name,
        'dateOfBirth': dateOfBirth,
        'gender': gender,
        'nationality': nationality,
        'maritalStatus': maritalStatus,
        'email': email,
        'phone': phone,
        'alternatePhone': alternatePhone,
        'linkedin': linkedin,
        'website': website,
        'education': education,
        'major': major,
        'gpa': gpa,
        'coursework': coursework,
        'workExperience': workExperience,
        'internships': internships,
        'volunteer': volunteer,
        'certifications': certifications,
        'skills': skills,
        'technicalSkills': technicalSkills,
        'softSkills': softSkills,
        'language': language
    }, function() {
        const saveStatus = document.getElementById('saveStatus');
        saveStatus.textContent = 'User information saved successfully!';
        saveStatus.classList.add('save-success');
        setTimeout(function() {
            saveStatus.textContent = '';
            saveStatus.classList.remove('save-success');
        }, 3000);
    });
});
});