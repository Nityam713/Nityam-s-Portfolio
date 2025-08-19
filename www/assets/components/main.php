<div class="main">
    <div class="top-controls">
        <div class="lang-toggle-container">
            <button class="lang-toggle-btn" id="langToggle">
                <span class="lang-current">EN</span>
                <span class="lang-divider">|</span>
                <span class="lang-alt">JP</span>
            </button>
        </div>
        
        <div class="tab-navigation">
            <a href="#" class="tab-link active" data-tab="about">About</a>
            <span class="tab-separator">|</span>
            <a href="#" class="tab-link" data-tab="resume">Resume</a>
            <span class="tab-separator">|</span>
            <a href="#" class="tab-link" data-tab="portfolio">Portfolio</a>
        </div>
    </div>
    
    <div class="tab-content">
        <div class="tab-pane active" id="about-tab">
            <?php include_once 'about.php'; ?>
        </div>
        <div class="tab-pane" id="resume-tab">
            <?php include_once 'resume.php'; ?>
        </div>
        <div class="tab-pane" id="portfolio-tab">
            <?php include_once 'portfolio.php'; ?>
        </div>
    </div>
</div>