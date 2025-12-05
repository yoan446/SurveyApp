// Variables globales
let currentSection = 1;
const totalSections = 3;
let productCount = 0;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    showSection(currentSection);
    updateNavigationButtons();
    addProduct(); // Ajouter un produit par défaut
});

// Navigation entre les sections
function changeSection(direction) {
    if (direction === 1 && !validateCurrentSection()) {
        return;
    }

    const newSection = currentSection + direction;
    
    if (newSection >= 1 && newSection <= totalSections) {
        currentSection = newSection;
        showSection(currentSection);
        updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Afficher la section active
function showSection(sectionNumber) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.querySelector(`.section[data-section="${sectionNumber}"]`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    updateProgressDots();
}

// Mettre à jour les points de progression
function updateProgressDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Mettre à jour les boutons de navigation
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (currentSection === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
    
    if (currentSection === totalSections) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
}

// Valider la section courante
function validateCurrentSection() {
    const activeSection = document.querySelector(`.section[data-section="${currentSection}"]`);
    const requiredFields = activeSection.querySelectorAll('[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--error-color)';
            setTimeout(() => {
                field.style.borderColor = '';
            }, 2000);
        }
    });
    
    if (!isValid) {
        showNotification('Veuillez remplir tous les champs obligatoires (*)', 'error');
    }
    
    // Validation spéciale pour la section 2 (au moins un produit)
    if (currentSection === 2) {
        const productsContainer = document.getElementById('products-container');
        if (productsContainer.children.length === 0) {
            showNotification('Veuillez ajouter au moins un produit cultivé', 'error');
            return false;
        }
    }
    
    return isValid;
}

// Ajouter un produit
function addProduct() {
    productCount++;
    
    const template = document.getElementById('product-template');
    const clone = template.content.cloneNode(true);
    
    // Mettre à jour le numéro du produit
    const productCard = clone.querySelector('.product-card');
    productCard.dataset.productIndex = productCount;
    clone.querySelector('.product-number').textContent = productCount;
    
    // Mettre à jour les noms des inputs pour avoir les bons index
    updateProductInputNames(clone, productCount - 1);
    
    document.getElementById('products-container').appendChild(clone);
    
    // Animation
    const addedCard = document.querySelector(`.product-card[data-product-index="${productCount}"]`);
    addedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Mettre à jour les noms des inputs d'un produit
function updateProductInputNames(element, index) {
    const inputs = element.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.name) {
            input.name = input.name.replace('products[]', `products[${index}]`);
        }
    });
}

// Supprimer un produit
function removeProduct(button) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        const productCard = button.closest('.product-card');
        productCard.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            productCard.remove();
            
            // Renuméroter les produits restants
            renumberProducts();
            
            if (document.getElementById('products-container').children.length === 0) {
                showNotification('Ajoutez au moins un produit', 'warning');
            }
        }, 300);
    }
}

// Renuméroter les produits
function renumberProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.dataset.productIndex = index + 1;
        card.querySelector('.product-number').textContent = index + 1;
        
        // Mettre à jour les noms des inputs
        const inputs = card.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.name) {
                input.name = input.name.replace(/products\[\d+\]/, `products[${index}]`);
            }
        });
    });
    
    productCount = productCards.length;
}

// Ajouter un intrant
function addIntrant(button, type) {
    const intrantGroup = button.previousElementSibling;
    const intrantItem = document.createElement('div');
    intrantItem.className = 'intrant-item';
    
    let html = '';
    
    switch(type) {
        case 'herbicides':
            html = `
                <input type="text" name="products[][herbicides][][nom]" placeholder="Nom">
                <input type="text" name="products[][herbicides][][quantite]" placeholder="Quantité">
                <input type="text" name="products[][herbicides][][frequence]" placeholder="Fréquence">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'semences':
            html = `
                <input type="text" name="products[][semences][][nom]" placeholder="Nom">
                <input type="text" name="products[][semences][][variete]" placeholder="Variété">
                <input type="text" name="products[][semences][][quantite]" placeholder="Quantité">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'engrais':
            html = `
                <input type="text" name="products[][engrais][][nom]" placeholder="Nom">
                <input type="text" name="products[][engrais][][type]" placeholder="Type (NPK, Bio...)">
                <input type="text" name="products[][engrais][][quantite]" placeholder="Quantité">
                <input type="text" name="products[][engrais][][frequence]" placeholder="Fréquence">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'pesticides':
            html = `
                <input type="text" name="products[][pesticides][][nom]" placeholder="Nom">
                <input type="text" name="products[][pesticides][][type]" placeholder="Type (Insecticide...)">
                <input type="text" name="products[][pesticides][][quantite]" placeholder="Quantité">
                <input type="text" name="products[][pesticides][][frequence]" placeholder="Fréquence">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'intrants':
            html = `
                <input type="text" name="products[][intrants][][nom]" placeholder="Nom">
                <input type="text" name="products[][intrants][][type]" placeholder="Type">
                <input type="text" name="products[][intrants][][quantite]" placeholder="Quantité">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
    }
    
    intrantItem.innerHTML = html;
    intrantGroup.appendChild(intrantItem);
    
    // Animation
    intrantItem.style.animation = 'fadeIn 0.3s ease';
}

// Supprimer un intrant
function removeIntrant(button) {
    const intrantItem = button.parentElement;
    const intrantItems = intrantItem.parentElement;
    
    // Ne pas supprimer si c'est le seul
    if (intrantItems.children.length > 1) {
        intrantItem.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            intrantItem.remove();
        }, 300);
    } else {
        // Vider les champs au lieu de supprimer
        const inputs = intrantItem.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        showNotification('Au moins un champ doit rester pour chaque type d\'intrant', 'info');
    }
}

// Navigation par les points
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', function() {
        const targetSection = index + 1;
        
        let canNavigate = true;
        for (let i = 1; i < targetSection; i++) {
            currentSection = i;
            if (!validateCurrentSection()) {
                canNavigate = false;
                break;
            }
        }
        
        if (canNavigate) {
            currentSection = targetSection;
            showSection(currentSection);
            updateNavigationButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Soumission du formulaire
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateCurrentSection()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Collecter et structurer les données
    const formData = collectFormData();
    
    // Envoyer les données
    fetch(this.action, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('✓ Enquête soumise avec succès !', 'success');
            
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            throw new Error(data.message || 'Erreur lors de la soumission');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        showNotification('❌ Erreur lors de la soumission. Veuillez réessayer.', 'error');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// Collecter les données du formulaire
function collectFormData() {
    const data = {
        nom: document.getElementById('nom').value,
        type: document.getElementById('type').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        region: document.getElementById('region').value,
        departement: document.getElementById('departement').value,
        contact: document.getElementById('contact').value,
        surface_agricole: document.getElementById('surface_agricole').value,
        defis: document.getElementById('defis').value,
        sechage: document.getElementById('sechage').value,
        tri_nettoyage: document.getElementById('tri_nettoyage').value,
        mecanisation_postrecolte: document.getElementById('mecanisation_postrecolte').value,
        stockage: document.getElementById('stockage').value,
        accessibilite: document.getElementById('accessibilite').value,
        products: []
    };
    
    // Collecter les produits
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        const product = {
            nom_produit: card.querySelector(`input[name="products[${index}][nom_produit]"]`).value,
            superficie: card.querySelector(`input[name="products[${index}][superficie]"]`).value,
            technique_culturale: card.querySelector(`input[name="products[${index}][technique_culturale]"]`).value,
            mecanisation_production: card.querySelector(`select[name="products[${index}][mecanisation_production]"]`).value,
            periode_production_1: card.querySelector(`input[name="products[${index}][periode_production_1]"]`).value,
            periode_production_2: card.querySelector(`input[name="products[${index}][periode_production_2]"]`).value,
            rendement_ha: card.querySelector(`input[name="products[${index}][rendement_ha]"]`).value,
            production_totale: card.querySelector(`input[name="products[${index}][production_totale]"]`).value,
            periode_recolte_1: card.querySelector(`input[name="products[${index}][periode_recolte_1]"]`).value,
            periode_recolte_2: card.querySelector(`input[name="products[${index}][periode_recolte_2]"]`).value,
            technique_recolte: card.querySelector(`input[name="products[${index}][technique_recolte]"]`).value,
            mecanisation_recolte: card.querySelector(`select[name="products[${index}][mecanisation_recolte]"]`).value,
            herbicides: collectIntrants(card, index, 'herbicides'),
            semences: collectIntrants(card, index, 'semences'),
            engrais: collectIntrants(card, index, 'engrais'),
            pesticides: collectIntrants(card, index, 'pesticides'),
            intrants: collectIntrants(card, index, 'intrants')
        };
        
        data.products.push(product);
    });
    
    return data;
}

// Collecter les intrants d'un produit
function collectIntrants(card, productIndex, type) {
    const intrants = [];
    const items = card.querySelectorAll(`.intrant-items[data-type="${type}"] .intrant-item`);
    
    items.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const intrant = {};
        
        inputs.forEach(input => {
            if (input.value.trim()) {
                const nameParts = input.name.match(/\[(\w+)\]$/);
                if (nameParts) {
                    intrant[nameParts[1]] = input.value;
                }
            }
        });
        
        if (Object.keys(intrant).length > 0) {
            intrants.push(intrant);
        }
    });
    
    return intrants;
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = 'var(--error-color)';
    } else if (type === 'warning') {
        notification.style.background = 'var(--accent-color)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Géolocalisation automatique
if (navigator.geolocation) {
    const latInput = document.getElementById('latitude');
    const lonInput = document.getElementById('longitude');
    
    const geoButton = document.createElement('button');
    geoButton.type = 'button';
    geoButton.className = 'btn-add-mini';
    geoButton.innerHTML = '📍 Obtenir ma position';
    geoButton.style.marginTop = '10px';
    
    geoButton.onclick = function() {
        geoButton.innerHTML = '⏳ Recherche...';
        geoButton.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                latInput.value = position.coords.latitude.toFixed(8);
                lonInput.value = position.coords.longitude.toFixed(8);
                geoButton.innerHTML = '✓ Position obtenue';
                setTimeout(() => {
                    geoButton.innerHTML = '📍 Obtenir ma position';
                    geoButton.disabled = false;
                }, 2000);
            },
            function(error) {
                console.error('Erreur de géolocalisation:', error);
                showNotification('Impossible d\'obtenir votre position', 'error');
                geoButton.innerHTML = '📍 Obtenir ma position';
                geoButton.disabled = false;
            }
        );
    };
    
    lonInput.parentElement.parentElement.appendChild(geoButton);
}