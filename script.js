// ========================================
// SmellSense AI - Enhanced JavaScript
// ========================================

// Enhanced AI Detection with 7 Categories
function generatePerfume() {
    const input = document.getElementById('smellInput').value.toLowerCase();
    
    // Show loading animation
    showLoadingAnimation();
    
    // AI Detection Logic with scoring system
    const scentProfiles = {
        woody: ['woody', 'sandalwood', 'cedar', 'oak', 'pine', 'earthy'],
        floral: ['floral', 'rose', 'jasmine', 'lavender', 'lily', 'peony'],
        citrus: ['citrus', 'lemon', 'orange', 'bergamot', 'grapefruit', 'lime'],
        oriental: ['oriental', 'vanilla', 'amber', 'musk', 'incense', 'exotic'],
        aquatic: ['aquatic', 'ocean', 'marine', 'water', 'sea', 'fresh'],
        gourmand: ['gourmand', 'chocolate', 'caramel', 'honey', 'sweet', 'dessert'],
        spicy: ['spicy', 'pepper', 'cinnamon', 'ginger', 'cardamom', 'clove']
    };
    
    // Mood-based recommendations
    const moods = {
        romantic: ['romantic', 'date', 'love', 'passion'],
        energetic: ['energetic', 'active', 'sporty', 'dynamic'],
        calm: ['calm', 'relaxing', 'peaceful', 'zen'],
        confident: ['confident', 'bold', 'powerful', 'strong']
    };
    
    // Multi-word detection with scoring
    let scores = {};
    
    // Score calculation
    for (let category in scentProfiles) {
        scores[category] = 0;
        scentProfiles[category].forEach(keyword => {
            if (input.includes(keyword)) scores[category]++;
        });
    }
    
    // Get dominant scent
    let dominantScent = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    // If no match found, default to citrus
    if (scores[dominantScent] === 0) {
        dominantScent = 'citrus';
    }
    
    // Perfume recommendations
    const perfumes = {
        woody: { name: 'Sandalwood Noir', top: 'Cedarwood', heart: 'Sandalwood', base: 'Oakmoss', price: '₹5,499' },
        floral: { name: 'Lavender Bliss', top: 'Rose', heart: 'Jasmine', base: 'Violet', price: '₹4,999' },
        citrus: { name: 'Citrus Dream', top: 'Bergamot', heart: 'Lemon', base: 'Neroli', price: '₹4,499' },
        oriental: { name: 'Amber Mystique', top: 'Saffron', heart: 'Amber', base: 'Vanilla', price: '₹6,999' },
        aquatic: { name: 'Aquatic Marine', top: 'Sea Salt', heart: 'Water Lily', base: 'Driftwood', price: '₹5,299' },
        gourmand: { name: 'Caramel Indulgence', top: 'Almond', heart: 'Caramel', base: 'Tonka Bean', price: '₹5,799' },
        spicy: { name: 'Spice Route', top: 'Pink Pepper', heart: 'Cardamom', base: 'Cinnamon', price: '₹5,999' }
    };
    
    // Display result with animation (1.5s delay for AI effect)
    setTimeout(() => {
        displayResult(perfumes[dominantScent]);
        saveToHistory(perfumes[dominantScent]);
    }, 1500);
}

// Show Loading Animation
function showLoadingAnimation() {
    document.getElementById('loadingAnimation').classList.remove('d-none');
    document.getElementById('result').classList.add('d-none');
}

// Enhanced Result Display with Typing Effect
function displayResult(perfume) {
    const loadingDiv = document.getElementById('loadingAnimation');
    const resultDiv = document.getElementById('result');
    
    // Hide loading
    loadingDiv.classList.add('d-none');
    
    resultDiv.innerHTML = `
        <h3 class="gold-text mb-3">Your Signature Scent</h3>
        <h2 class="fw-bold mb-4" id="perfumeNameTyping"></h2>
        <div class="row text-start">
            <div class="col-4"><strong>Top:</strong> ${perfume.top}</div>
            <div class="col-4"><strong>Heart:</strong> ${perfume.heart}</div>
            <div class="col-4"><strong>Base:</strong> ${perfume.base}</div>
        </div>
        <h4 class="mt-4 gold-text">${perfume.price}</h4>
        <div class="mt-4">
            <button onclick="sharePerfume('${perfume.name}')" class="btn btn-sm btn-outline-gold me-2">
                📱 Share
            </button>
            <button onclick="saveFavorite('${perfume.name}')" class="btn btn-sm btn-outline-gold me-2">
                ❤️ Save Favorite
            </button>
            <a href="#cta" class="btn btn-gold">🛒 Buy Now</a>
        </div>
    `;
    
    // Typing effect for perfume name
    typeWriter(perfume.name, 'perfumeNameTyping', 80);
    
    resultDiv.classList.remove('d-none');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Typing Animation
function typeWriter(text, elementId, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Social Sharing Function
function sharePerfume(name) {
    const shareText = `I discovered my signature scent: ${name} 🌸✨ Find yours at SmellSense AI!`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({ title: 'My Signature Scent', text: shareText, url: shareUrl })
            .catch(err => console.log('Share failed', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + shareUrl)
            .then(() => alert('Link copied to clipboard! Share it with friends 📋'))
            .catch(() => alert('Could not copy to clipboard'));
    }
}

// Save Favorite Scents (localStorage)
function saveFavorite(perfumeName) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(perfumeName)) {
        favorites.push(perfumeName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('❤️ Added to favorites!');
        updateFavoritesCount();
    } else {
        alert('Already in favorites!');
    }
}

// Display favorites count in navbar
function updateFavoritesCount() {
    const count = JSON.parse(localStorage.getItem('favorites') || '[]').length;
    const brandElement = document.querySelector('.navbar-brand');
    if (brandElement && count > 0) {
        brandElement.innerHTML = `SmellSense<sup>AI</sup> <span class="badge bg-warning text-dark ms-2">${count}</span>`;
    }
}

// Quiz History Tracker
function saveToHistory(perfume) {
    let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.unshift({
        perfume: perfume.name,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    });
    
    // Keep only last 10 entries
    if (history.length > 10) history = history.slice(0, 10);
    
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

// View history
function showHistory() {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    if (history.length === 0) {
        alert('No quiz history yet!');
        return;
    }
    
    let historyHtml = '<h4 class="mb-4">Your Quiz History</h4><ul class="list-group">';
    history.forEach(item => {
        historyHtml += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${item.perfume}</span>
            <span class="badge bg-gold text-dark">${item.date}</span>
        </li>`;
    });
    historyHtml += '</ul>';
    
    // Display in history section
    const historySection = document.getElementById('historySection');
    if (historySection) {
        historySection.innerHTML = `
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        ${historyHtml}
                        <div class="text-center mt-3">
                            <button onclick="clearHistory()" class="btn btn-outline-danger btn-sm">Clear History</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function clearHistory() {
    localStorage.removeItem('quizHistory');
    const historySection = document.getElementById('historySection');
    if (historySection) {
        historySection.innerHTML = `
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <button onclick="showHistory()" class="btn btn-outline-gold">📜 View Quiz History</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Virtual Try-On Camera Functions
function startCamera() {
    const video = document.getElementById('camera');
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.classList.remove('d-none');
        })
        .catch(err => alert('Camera access denied'));
}

function capturePhoto() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 400, 300);
    alert('Photo captured! 📸');
}

// Email Subscription
function subscribeEmail() {
    const email = document.getElementById('emailInput').value;
    if (email.includes('@')) {
        localStorage.setItem('emailSubscribed', 'true');
        localStorage.setItem('userEmail', email);
        alert('✅ Subscribed! Check your inbox for 20% off code.');
        const modalElement = document.getElementById('emailModal');
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        }
    } else {
        alert('Please enter a valid email');
    }
}

// Show email modal after 15 seconds
function showEmailModal() {
    setTimeout(() => {
        if (!localStorage.getItem('emailSubscribed')) {
            const modalElement = document.getElementById('emailModal');
            if (modalElement) {
                new bootstrap.Modal(modalElement).show();
            }
        }
    }, 15000);
}

// Seasonal Recommendations
function getSeasonalRecommendation() {
    const month = new Date().getMonth();
    const seasonal = {
        winter: [11, 0, 1], // Dec, Jan, Feb - Woody, Oriental
        spring: [2, 3, 4],  // Mar, Apr, May - Floral
        summer: [5, 6, 7],  // Jun, Jul, Aug - Aquatic, Citrus
        autumn: [8, 9, 10]  // Sep, Oct, Nov - Spicy, Gourmand
    };
    
    if (seasonal.winter.includes(month)) return 'Try our warm Sandalwood Noir for winter ❄️';
    if (seasonal.spring.includes(month)) return 'Fresh Lavender Bliss for spring 🌸';
    if (seasonal.summer.includes(month)) return 'Cool Aquatic Marine for summer 🌊';
    return 'Spice Route for autumn vibes 🍂';
}

// Display seasonal recommendation on page load
function displaySeasonalRecommendation() {
    const banner = document.createElement('div');
    banner.className = 'alert alert-info text-center mb-0 py-3';
    banner.textContent = getSeasonalRecommendation();
    const heroSection = document.getElementById('hero');
    if (heroSection && heroSection.nextElementSibling) {
        heroSection.parentNode.insertBefore(banner, heroSection.nextElementSibling);
    }
}

// Debounced scroll handler for performance
let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.background = window.scrollY > 50 ? 'rgba(26,26,46,0.98)' : 'rgba(26,26,46,0.95)';
        }
    }, 10);
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    displaySeasonalRecommendation();
    lazyLoadImages();
    showEmailModal();
    
    // Add scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
});
