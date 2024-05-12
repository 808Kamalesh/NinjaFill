document.addEventListener('DOMContentLoaded', function() {

  const body = document.body;
  const container = document.querySelector('.info-container');

  const darkModeToggle = document.getElementById('darkModeToggle');

  darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
  });
  
  const personalInfoTab = document.getElementById('personalInfoTab');
  const educationTab = document.getElementById('educationTab');
  const workExperienceTab = document.getElementById('workExperienceTab');
  const skillsTab = document.getElementById('skillsTab');
  const projectsTab = document.getElementById('projectsTab');

  personalInfoTab.addEventListener('click', function() {
    openTab(event, 'personalInfo');
  });

  educationTab.addEventListener('click', function() {
    openTab(event, 'education');
  });

  workExperienceTab.addEventListener('click', function() {
    openTab(event, 'workExperience');
  });

  skillsTab.addEventListener('click', function() {
    openTab(event, 'skills');
  });

  projectsTab.addEventListener('click', function() {
    openTab(event, 'projects');
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

  chrome.storage.sync.get(['name', 'dateOfBirth', 'gender', 'nationality', 'maritalStatus', 'email', 'phone', 'alternatePhone', 'linkedin', 'portfolio', 'github', 'education', 'major', 'gpa', 'coursework', 'workExperience', 'internships', 'volunteer', 'certifications', 'skills', 'technicalSkills', 'softSkills', 'language', 'projects', 'projectDescription', 'projectLinks'], function(data) {
    const [firstName, ...lastName] = (data.name || '').split(' ');
    document.getElementById('nameField').value = data.name || '';
    document.getElementById('dateOfBirthField').value = data.dateOfBirth || '';
    document.querySelector(`input[name="gender"][value="${data.gender || 'prefer-not-to-say'}"]`).checked = true;
    document.getElementById('nationalityField').value = data.nationality || '';
    document.getElementById('maritalStatusField').value = data.maritalStatus || '';
    document.getElementById('emailField').value = data.email || '';
    document.getElementById('phoneField').value = data.phone || '';
    document.getElementById('alternatePhoneField').value = data.alternatePhone || '';
    document.getElementById('linkedinField').value = data.linkedin || '';
    document.getElementById('portfolioField').value = data.portfolio || '';
    document.getElementById('githubField').value = data.github || '';
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
    document.getElementById('projectsField').value = data.projects || '';
    document.getElementById('projectDescriptionField').value = data.projectDescription || '';
    document.getElementById('projectLinksField').value = data.projectLinks || '';

    document.getElementById('saveButton').addEventListener('click', function() {
      const name = document.getElementById('nameField').value;
      const [firstName, ...lastName] = name.split(' ');
      const dateOfBirth = document.getElementById('dateOfBirthField').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const nationality = document.getElementById('nationalityField').value;
      const maritalStatus = document.getElementById('maritalStatusField').value;
      const email = document.getElementById('emailField').value;
      const phone = document.getElementById('phoneField').value;
      const alternatePhone = document.getElementById('alternatePhoneField').value;
      const linkedin = document.getElementById('linkedinField').value;
      const portfolio = document.getElementById('portfolioField').value;
      const github = document.getElementById('githubField').value;
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
      const projects = document.getElementById('projectsField').value;
      const projectDescription = document.getElementById('projectDescriptionField').value;
      const projectLinks = document.getElementById('projectLinksField').value;

      chrome.storage.sync.set({
        'name': name,
        'firstName': firstName,
        'lastName': lastName.join(' '),
        'dateOfBirth': dateOfBirth,
        'gender': gender,
        'nationality': nationality,
        'maritalStatus': maritalStatus,
        'email': email,
        'phone': phone,
        'alternatePhone': alternatePhone,
        'linkedin': linkedin,
        'portfolio': portfolio,
        'github': github,
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
        'language': language,
        'projects': projects,
        'projectDescription': projectDescription,
        'projectLinks': projectLinks,
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
});