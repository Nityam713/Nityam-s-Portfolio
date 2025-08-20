// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Tab switching function
    function switchTab(tabName) {
        // Remove active class from all tabs and panes
        tabLinks.forEach(link => link.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to selected tab and pane
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activePane = document.getElementById(`${tabName}-tab`);
        
        if (activeTab && activePane) {
            activeTab.classList.add('active');
            activePane.classList.add('active');
        }
    }
    
    // Add click event listeners to tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Language toggle functionality
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const currentLang = this.querySelector('.lang-current');
            const altLang = this.querySelector('.lang-alt');
            
            // Toggle between EN and JP
            if (currentLang.textContent === 'EN') {
                currentLang.textContent = 'JP';
                altLang.textContent = 'EN';
                showLanguageMessage('Japanese version coming soon!', 'jp');
            } else {
                currentLang.textContent = 'EN';
                altLang.textContent = 'JP';
                // No message when switching back to English
            }
            
            // Add visual feedback
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    }
    
    // Function to show language change message
    function showLanguageMessage(message, lang) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.lang-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `lang-message lang-message-${lang}`;
        messageDiv.textContent = message;
        
        // Insert after the language toggle button
        const langToggleContainer = document.querySelector('.lang-toggle-container');
        langToggleContainer.appendChild(messageDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 1000);
    }
}); 