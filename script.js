// Jab webpage puri tarah load ho jaye tab yeh code run hoga
document.addEventListener('DOMContentLoaded', function () {
    // '.current-date' class wale sabhi elements ko select karega
    const currentDateElements = document.querySelectorAll('.current-date');

    // Current date ko display karne ke liye options set kiye gaye hain
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Current date ko 'en-US' format me format kiya gaya hai
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    // Har '.current-date' class wale element me formatted date ko set karega
    currentDateElements.forEach(element => {
        element.textContent = formattedDate;
    });
});

// Jab webpage puri tarah load ho jaye tab yeh code run hoga
document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu, navigation links, dark mode toggle, aur current date elements ko select karega
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const currentDate = document.querySelector('#current-date');

    // Hamburger menu par click karne par mobile menu toggle hoga aur icon change hoga
    hamburger.addEventListener('click', function () {
        // 'active' class ko toggle karega (add/remove)
        navLinks.classList.toggle('active');
        // Check karega ki menu open hai ya nahi
        const isMenuOpen = navLinks.classList.contains('active');
        // 'aria-expanded' attribute ko update karega based on menu state
        hamburger.setAttribute('aria-expanded', isMenuOpen);

        // Agar menu open hai toh close icon (X) show hoga, nahi toh open icon (bars) show hoga
        if (isMenuOpen) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>'; // Close icon (X)
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>'; // Open icon (bars)
        }
    });

    // Jab navigation links me se koi link click kiya jaye tab mobile menu close hoga
    navLinks.addEventListener('click', function (event) {
        // Check karega ki click kiya gaya element 'A' (anchor) tag hai ya nahi
        if (event.target.tagName === 'A') {
            // 'active' class ko remove karega (menu close hoga)
            navLinks.classList.remove('active');
            // 'aria-expanded' attribute ko false set karega
            hamburger.setAttribute('aria-expanded', false);
            // Icon ko reset karke bars icon show karega
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Dark mode toggle button par click karne par dark mode on/off hoga
    darkModeToggle.addEventListener('click', function () {
        // 'dark-mode' class ko toggle karega (add/remove)
        document.body.classList.toggle('dark-mode');
        // Check karega ki dark mode on hai ya nahi
        const isDarkMode = document.body.classList.contains('dark-mode');
        // Dark mode preference ko localStorage me save karega
        localStorage.setItem('darkMode', isDarkMode);
        // Dark mode ke hisab se icon change hoga (sun ya moon)
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Agar localStorage me dark mode preference 'true' hai toh dark mode enable karega
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // Agar dark mode enable nahi hai toh moon icon show hoga
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Current date ko display karne ke liye options set kiye gaye hain
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // Current date ko 'en-US' format me format karke '#current-date' element me set karega
    currentDate.textContent = new Date().toLocaleDateString('en-US', options);
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
        fetch(`/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                const resultsContainer = document.getElementById('search-results');
                resultsContainer.innerHTML = ''; // Clear previous results
                if (data.length > 0) {
                    data.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.textContent = item.title; // Assuming each item has a 'title' field
                        resultsContainer.appendChild(resultItem);
                    });
                } else {
                    resultsContainer.textContent = 'No results found.';
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter something to search.');
    }
});

document.getElementById('search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});

// Back to Top Button Functionality
const backToTop = document.getElementById("backToTop");
        
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTop.style.display = "flex"; // Show button
            } else {
                backToTop.style.display = "none"; // Hide button
            }
        };

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }


// Add interactivity here if needed
// Example: Smooth scrolling for anchor links

document.getElementById('floatingButton').addEventListener('click', function() {
    const languageSelector = document.getElementById('languageSelector');
    languageSelector.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });    


  document.addEventListener('DOMContentLoaded', function () {
    const floatingButton = document.getElementById('floatingButton');
    const languageSelector = document.getElementById('languageSelector');
    const languageDropdown = document.getElementById('language');

    // Toggle Language Selector on Floating Button Click
    floatingButton.addEventListener('click', function () {
        if (languageSelector.style.display === 'none' || languageSelector.style.display === '') {
            languageSelector.style.display = 'block';
        } else {
            languageSelector.style.display = 'none';
        }
    });

    // Load Content Based on Selected Language
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageDropdown.value = savedLanguage;

    // Fetch JSON Content
    fetch('home.json')
        .then(response => response.json())
        .then(data => {
            updateContent(data, savedLanguage);

            // Update Content on Language Change
            languageDropdown.addEventListener('change', function () {
                const selectedLanguage = this.value;
                localStorage.setItem('selectedLanguage', selectedLanguage);
                updateContent(data, selectedLanguage);
            });
        })
        .catch(error => console.error('Error loading JSON file:', error));

    // Function to Update Content
    function updateContent(content, language) {
        document.getElementById('heading').innerText = content[language].heading;
        document.getElementById('description').innerText = content[language].description;
    }
});