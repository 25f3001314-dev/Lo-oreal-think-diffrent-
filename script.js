function generatePerfume() {
    const input = document.getElementById('smellInput').value.toLowerCase();
    const result = document.getElementById('result');
    const nameEl = document.getElementById('perfumeName');
    
    let perfume = 'Citrus Dream';
    if (input.includes('woody')) perfume = 'Sandalwood Noir';
    else if (input.includes('floral')) perfume = 'Lavender Bliss';
    
    nameEl.textContent = perfume;
    result.classList.remove('d-none');
    result.scrollIntoView({ behavior: 'smooth' });
}

// Navbar scroll
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').style.background = window.scrollY > 50 ? 'rgba(26,26,46,0.98)' : 'rgba(26,26,46,0.95)';
});
