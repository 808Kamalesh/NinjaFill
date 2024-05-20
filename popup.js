document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const container = document.querySelector('.container');

    chrome.storage.sync.get('darkMode', function (data) {
        if (data.darkMode) {
            body.classList.add('dark-mode');
            container.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
    });

    darkModeToggle.addEventListener('change', function () {
        const isChecked = darkModeToggle.checked;
        body.classList.toggle('dark-mode', isChecked);
        container.classList.toggle('dark-mode', isChecked);
        chrome.storage.sync.set({ darkMode: isChecked });
    });

    const clickSound = new Audio('click.mp3');

    document.getElementById('infoButton').addEventListener('click', function () {
        chrome.tabs.create({ url: chrome.runtime.getURL('info.html') });
    });

    document.getElementById('autofillButton').addEventListener('click', function () {
        clickSound.play();
        chrome.storage.sync.get([
            'name', 'dateOfBirth', 'gender', 'nationality', 'maritalStatus', 'email', 'phone', 
            'alternatePhone', 'linkedin', 'portfolio', 'github', 'education', 'major', 'gpa', 
            'coursework', 'workExperience', 'internships', 'volunteer', 'certifications', 'skills', 
            'technicalSkills', 'softSkills', 'language', 'projects', 'projectDescription', 
            'projectLinks'
        ], function (data) {
            console.log('Sending autofill data:', data);
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'autofill', data: data });
            });
        });
    });
});
