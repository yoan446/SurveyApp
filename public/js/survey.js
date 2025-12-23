// Variables globales
let currentSection = 1;
const totalSections = 3;
let productCount = 0;
let currentLang = 'fr'; // Langue actuelle

// Traductions
const translations = {
    fr: {
        // Bouton de langue
        langToggleLabel: 'FR',
        langToggleAria: 'Changer la langue en anglais',
        // Header
        title: 'Enquête Producteurs Agricoles',
        subtitle: 'Votre contribution aide à améliorer l\'agriculture camerounaise',
        // Section 1
        section1Title: '📋 Profil du Producteur',
        nomLabel: 'Nom complet *',
        nomPlaceholder: 'Ex: Jean Dupont',
        typeLabel: 'Type de producteur *',
        selectPlaceholder: 'Sélectionnez...',
        typeIndividuel: 'Individuel',
        typeCooperative: 'Coopérative',
        latitudeLabel: 'Latitude',
        latitudePlaceholder: 'Ex: 3.8480',
        longitudeLabel: 'Longitude',
        longitudePlaceholder: 'Ex: 11.5021',
        regionLabel: 'Région *',
        regionSelect: '-- Sélectionnez une région --',
        departementLabel: 'Département *',
        departementSelect: '-- Sélectionnez un département --',
        contactLabel: 'Contact *',
        contactPlaceholder: 'Ex: +237 6XX XX XX XX',
        surfaceLabel: 'Surface agricole totale (ha) *',
        surfacePlaceholder: 'Ex: 5.5',
        defisLabel: 'Défis rencontrés',
        defisPlaceholder: 'Décrivez les principaux défis...',
        // Section 2
        section2Title: '🌱 Produits Cultivés',
        section2Description: 'Ajoutez tous les produits que vous cultivez. Pour chaque produit, vous pourrez ensuite spécifier les intrants utilisés.',
        addProduct: '➕ Ajouter un produit cultivé',
        productTitle: '🌾 Produit',
        removeProduct: '✕ Supprimer',
        productNameLabel: 'Nom du produit *',
        productNamePlaceholder: 'Ex: Maïs, Cacao, Plantain',
        superficieLabel: 'Superficie cultivée (ha) *',
        superficiePlaceholder: 'Ex: 2.5',
        productionTitle: '📊 Production',
        techniqueLabel: 'Technique culturale',
        techniquePlaceholder: 'Ex: Agriculture biologique',
        mecanisationLabel: 'Mécanisation',
        mecanisationManuelle: 'Manuelle',
        mecanisationSemi: 'Semi-mécanisée',
        mecanisationTotale: 'Totalement mécanisée',
        periode1Label: 'Période de production 1',
        periode1Placeholder: 'Ex: Mars - Juin',
        periode2Label: 'Période de production 2',
        periode2Placeholder: 'Ex: Sept - Déc',
        recolteTitle: '🌾 Récolte',
        rendementLabel: 'Rendement/ha',
        rendementPlaceholder: 'Ex: 2.5 t/ha',
        productionLabel: 'Production totale',
        productionPlaceholder: 'Ex: 6.25 tonnes',
        recolte1Label: 'Période de récolte 1',
        recolte1Placeholder: 'Ex: Juillet',
        recolte2Label: 'Période de récolte 2',
        recolte2Placeholder: 'Ex: Janvier',
        techniqueRecolteLabel: 'Technique de récolte',
        techniqueRecoltePlaceholder: 'Ex: Manuelle',
        mecanisationRecolteLabel: 'Mécanisation récolte',
        intrantsTitle: '🧪 Intrants utilisés pour ce produit',
        herbicidesLabel: '🌿 Herbicides',
        semencesLabel: '🌱 Semences',
        engraisLabel: '💧 Engrais',
        pesticidesLabel: '🐛 Pesticides',
        autresIntrantsLabel: '📦 Autres intrants',
        nomIntrant: 'Nom',
        varieteIntrant: 'Variété',
        quantiteIntrant: 'Quantité',
        frequenceIntrant: 'Fréquence',
        typeIntrant: 'Type',
        typeIntrantPlaceholder: 'Type (NPK, Bio...)',
        typePesticidePlaceholder: 'Type (Insecticide...)',
        addIntrant: '+ Ajouter',
        // Section 3
        section3Title: '📦 Informations Post-Récolte',
        section3Description: 'Informations générales sur le traitement après récolte',
        sechageLabel: 'Méthode de séchage',
        sechagePlaceholder: 'Ex: Solaire, mécanique',
        triLabel: 'Tri et nettoyage',
        triPlaceholder: 'Ex: Manuel, mécanique',
        mecanisationPostLabel: 'Mécanisation post-récolte',
        stockageLabel: 'Type de stockage',
        stockagePlaceholder: 'Ex: Entrepôt, grenier, sac',
        accessibiliteLabel: 'Accessibilité',
        accessibilitePlaceholder: 'Décrivez l\'accessibilité à votre exploitation...',
        // Navigation
        prevBtn: '← Précédent',
        nextBtn: 'Suivant →',
        submitBtn: 'Soumettre ✓',
        // Footer
        footerText: 'Merci pour votre participation ! 🌍',
        // Géolocalisation
        getPosition: '📍 Obtenir ma position',
        searching: '⏳ Recherche...',
        positionObtained: '✓ Position obtenue',
        // Messages
        validationError: 'Veuillez remplir tous les champs obligatoires (*)',
        noProductError: 'Veuillez ajouter au moins un produit cultivé',
        submitSuccess: '✓ Enquête soumise avec succès !',
        submitError: '❌ Erreur lors de la soumission. Veuillez réessayer.',
        sending: 'Envoi en cours...',
        removeConfirm: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
        addProductWarning: 'Ajoutez au moins un produit',
        intrantWarning: 'Au moins un champ doit rester pour chaque type d\'intrant',
        geoError: 'Impossible d\'obtenir votre position'
    },
    en: {
        // Language button
        langToggleLabel: 'EN',
        langToggleAria: 'Switch to French',
        // Header
        title: 'Agricultural Producers Survey',
        subtitle: 'Your contribution helps improve Cameroonian agriculture',
        // Section 1
        section1Title: '📋 Producer Profile',
        nomLabel: 'Full name *',
        nomPlaceholder: 'Ex: John Doe',
        typeLabel: 'Producer type *',
        selectPlaceholder: 'Select...',
        typeIndividuel: 'Individual',
        typeCooperative: 'Cooperative',
        latitudeLabel: 'Latitude',
        latitudePlaceholder: 'Ex: 3.8480',
        longitudeLabel: 'Longitude',
        longitudePlaceholder: 'Ex: 11.5021',
        regionLabel: 'Region *',
        regionSelect: '-- Select a region --',
        departementLabel: 'Department *',
        departementSelect: '-- Select a department --',
        contactLabel: 'Contact *',
        contactPlaceholder: 'Ex: +237 6XX XX XX XX',
        surfaceLabel: 'Total agricultural area (ha) *',
        surfacePlaceholder: 'Ex: 5.5',
        defisLabel: 'Challenges encountered',
        defisPlaceholder: 'Describe the main challenges...',
        // Section 2
        section2Title: '🌱 Cultivated Products',
        section2Description: 'Add all the products you cultivate. For each product, you can then specify the inputs used.',
        addProduct: '➕ Add a cultivated product',
        productTitle: '🌾 Product',
        removeProduct: '✕ Remove',
        productNameLabel: 'Product name *',
        productNamePlaceholder: 'Ex: Corn, Cocoa, Plantain',
        superficieLabel: 'Cultivated area (ha) *',
        superficiePlaceholder: 'Ex: 2.5',
        productionTitle: '📊 Production',
        techniqueLabel: 'Cultural technique',
        techniquePlaceholder: 'Ex: Organic farming',
        mecanisationLabel: 'Mechanization',
        mecanisationManuelle: 'Manual',
        mecanisationSemi: 'Semi-mechanized',
        mecanisationTotale: 'Fully mechanized',
        periode1Label: 'Production period 1',
        periode1Placeholder: 'Ex: March - June',
        periode2Label: 'Production period 2',
        periode2Placeholder: 'Ex: Sept - Dec',
        recolteTitle: '🌾 Harvest',
        rendementLabel: 'Yield/ha',
        rendementPlaceholder: 'Ex: 2.5 t/ha',
        productionLabel: 'Total production',
        productionPlaceholder: 'Ex: 6.25 tons',
        recolte1Label: 'Harvest period 1',
        recolte1Placeholder: 'Ex: July',
        recolte2Label: 'Harvest period 2',
        recolte2Placeholder: 'Ex: January',
        techniqueRecolteLabel: 'Harvest technique',
        techniqueRecoltePlaceholder: 'Ex: Manual',
        mecanisationRecolteLabel: 'Harvest mechanization',
        intrantsTitle: '🧪 Inputs used for this product',
        herbicidesLabel: '🌿 Herbicides',
        semencesLabel: '🌱 Seeds',
        engraisLabel: '💧 Fertilizers',
        pesticidesLabel: '🐛 Pesticides',
        autresIntrantsLabel: '📦 Other inputs',
        nomIntrant: 'Name',
        varieteIntrant: 'Variety',
        quantiteIntrant: 'Quantity',
        frequenceIntrant: 'Frequency',
        typeIntrant: 'Type',
        typeIntrantPlaceholder: 'Type (NPK, Bio...)',
        typePesticidePlaceholder: 'Type (Insecticide...)',
        addIntrant: '+ Add',
        // Section 3
        section3Title: '📦 Post-Harvest Information',
        section3Description: 'General information on post-harvest treatment',
        sechageLabel: 'Drying method',
        sechagePlaceholder: 'Ex: Solar, mechanical',
        triLabel: 'Sorting and cleaning',
        triPlaceholder: 'Ex: Manual, mechanical',
        mecanisationPostLabel: 'Post-harvest mechanization',
        stockageLabel: 'Storage type',
        stockagePlaceholder: 'Ex: Warehouse, granary, bag',
        accessibiliteLabel: 'Accessibility',
        accessibilitePlaceholder: 'Describe the accessibility to your farm...',
        // Navigation
        prevBtn: '← Previous',
        nextBtn: 'Next →',
        submitBtn: 'Submit ✓',
        // Footer
        footerText: 'Thank you for your participation! 🌍',
        // Geolocation
        getPosition: '📍 Get my position',
        searching: '⏳ Searching...',
        positionObtained: '✓ Position obtained',
        // Messages
        validationError: 'Please fill in all required fields (*)',
        noProductError: 'Please add at least one cultivated product',
        submitSuccess: '✓ Survey submitted successfully!',
        submitError: '❌ Error submitting. Please try again.',
        sending: 'Sending...',
        removeConfirm: 'Are you sure you want to remove this product?',
        addProductWarning: 'Add at least one product',
        intrantWarning: 'At least one field must remain for each input type',
        geoError: 'Unable to get your position'
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    showSection(currentSection);
    updateNavigationButtons();
    addProduct(); // Ajouter un produit par défaut
    
    // Initialiser le bouton de changement de langue
    initLanguageToggle();
    
    // Charger la langue sauvegardée si elle existe
    const savedLang = localStorage.getItem('surveyLang');
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
        currentLang = savedLang;
        updateLanguage();
    }
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
        showNotification(translations[currentLang].validationError, 'error');
    }
    
    // Validation spéciale pour la section 2 (au moins un produit)
    if (currentSection === 2) {
        const productsContainer = document.getElementById('products-container');
        if (productsContainer.children.length === 0) {
            showNotification(translations[currentLang].noProductError, 'error');
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
    
    // Mettre à jour la langue du nouveau produit
    updateProductsLanguage(translations[currentLang]);
    
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
    if (confirm(translations[currentLang].removeConfirm)) {
        const productCard = button.closest('.product-card');
        productCard.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            productCard.remove();
            
            // Renuméroter les produits restants
            renumberProducts();
            
            if (document.getElementById('products-container').children.length === 0) {
                showNotification(translations[currentLang].addProductWarning, 'warning');
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
    
    const t = translations[currentLang];
    let html = '';
    
    switch(type) {
        case 'herbicides':
            html = `
                <input type="text" name="products[][herbicides][][nom]" placeholder="${t.nomIntrant}">
                <input type="text" name="products[][herbicides][][quantite]" placeholder="${t.quantiteIntrant}">
                <input type="text" name="products[][herbicides][][frequence]" placeholder="${t.frequenceIntrant}">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'semences':
            html = `
                <input type="text" name="products[][semences][][nom]" placeholder="${t.nomIntrant}">
                <input type="text" name="products[][semences][][variete]" placeholder="${t.varieteIntrant}">
                <input type="text" name="products[][semences][][quantite]" placeholder="${t.quantiteIntrant}">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'engrais':
            html = `
                <input type="text" name="products[][engrais][][nom]" placeholder="${t.nomIntrant}">
                <input type="text" name="products[][engrais][][type]" placeholder="${t.typeIntrantPlaceholder}">
                <input type="text" name="products[][engrais][][quantite]" placeholder="${t.quantiteIntrant}">
                <input type="text" name="products[][engrais][][frequence]" placeholder="${t.frequenceIntrant}">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'pesticides':
            html = `
                <input type="text" name="products[][pesticides][][nom]" placeholder="${t.nomIntrant}">
                <input type="text" name="products[][pesticides][][type]" placeholder="${t.typePesticidePlaceholder}">
                <input type="text" name="products[][pesticides][][quantite]" placeholder="${t.quantiteIntrant}">
                <input type="text" name="products[][pesticides][][frequence]" placeholder="${t.frequenceIntrant}">
                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
            `;
            break;
        case 'intrants':
            html = `
                <input type="text" name="products[][intrants][][nom]" placeholder="${t.nomIntrant}">
                <input type="text" name="products[][intrants][][type]" placeholder="${t.typeIntrant}">
                <input type="text" name="products[][intrants][][quantite]" placeholder="${t.quantiteIntrant}">
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
        showNotification(translations[currentLang].intrantWarning, 'info');
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
    submitBtn.innerHTML = translations[currentLang].sending;
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
            showNotification(translations[currentLang].submitSuccess, 'success');
            
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            throw new Error(data.message || translations[currentLang].submitError);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        showNotification(translations[currentLang].submitError, 'error');
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
            variete_produit: card.querySelector(`input[name="products[${index}][variete_produit]"]`)?.value || '',
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
    geoButton.innerHTML = translations[currentLang].getPosition;
    geoButton.style.marginTop = '10px';
    
    geoButton.onclick = function() {
        const t = translations[currentLang];
        geoButton.innerHTML = t.searching;
        geoButton.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                latInput.value = position.coords.latitude.toFixed(8);
                lonInput.value = position.coords.longitude.toFixed(8);
                geoButton.innerHTML = t.positionObtained;
                setTimeout(() => {
                    geoButton.innerHTML = t.getPosition;
                    geoButton.disabled = false;
                }, 2000);
            },
            function(error) {
                console.error('Erreur de géolocalisation:', error);
                showNotification(t.geoError, 'error');
                geoButton.innerHTML = t.getPosition;
                geoButton.disabled = false;
            }
        );
    };
    
    lonInput.parentElement.parentElement.appendChild(geoButton);
    
    // Stocker la référence au bouton pour la mise à jour de langue
    window.geoButton = geoButton;

    
}

// Initialiser le bouton de changement de langue
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            updateLanguage();
            localStorage.setItem('surveyLang', currentLang);
        });
    }
}

// Mettre à jour la langue de la page
function updateLanguage() {
    const t = translations[currentLang];
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = currentLang;
    
    // Mettre à jour le titre de la page
    document.title = currentLang === 'fr' 
        ? 'Enquête Producteurs Camerounais - SurveyApp'
        : 'Cameroonian Producers Survey - SurveyApp';
    
    // Mettre à jour le bouton de langue
    const langToggleLabel = document.getElementById('lang-toggle-label');
    const langToggle = document.getElementById('lang-toggle');
    if (langToggleLabel) {
        langToggleLabel.textContent = t.langToggleLabel;
    }
    if (langToggle) {
        langToggle.setAttribute('aria-label', t.langToggleAria);
    }
    
    // Mettre à jour le titre et sous-titre
    const title = document.querySelector('.header h1');
    if (title) title.textContent = t.title;
    const subtitle = document.querySelector('.header .subtitle');
    if (subtitle) subtitle.textContent = t.subtitle;
    
    // Section 1
    updateSection1(t);
    
    // Section 2
    updateSection2(t);
    
    // Section 3
    updateSection3(t);
    
    // Navigation
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) prevBtn.textContent = t.prevBtn;
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.textContent = t.nextBtn;
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.textContent = t.submitBtn;
    
    // Footer
    const footer = document.querySelector('.footer p');
    if (footer) footer.textContent = t.footerText;
    
    // Mettre à jour le bouton de géolocalisation si il existe
    if (window.geoButton && !window.geoButton.disabled) {
        window.geoButton.innerHTML = t.getPosition;
    }
    
    // Mettre à jour les produits existants
    updateProductsLanguage(t);
}

// Mettre à jour la section 1
function updateSection1(t) {
    const section1 = document.querySelector('.section[data-section="1"]');
    if (!section1) return;
    
    const h2 = section1.querySelector('h2');
    if (h2) h2.textContent = t.section1Title;
    
    // Labels et placeholders
    updateLabel('nom', t.nomLabel);
    updatePlaceholder('nom', t.nomPlaceholder);
    
    updateLabel('type', t.typeLabel);
    const typeSelect = document.getElementById('type');
    if (typeSelect) {
        typeSelect.querySelector('option[value=""]').textContent = t.selectPlaceholder;
        const optionIndividuel = typeSelect.querySelector('option[value="Individuel"]');
        const optionCooperative = typeSelect.querySelector('option[value="Coopérative"]');
        if (optionIndividuel) optionIndividuel.textContent = t.typeIndividuel;
        if (optionCooperative) optionCooperative.textContent = t.typeCooperative;
    }
    
    updateLabel('latitude', t.latitudeLabel);
    updatePlaceholder('latitude', t.latitudePlaceholder);
    
    updateLabel('longitude', t.longitudeLabel);
    updatePlaceholder('longitude', t.longitudePlaceholder);
    
    updateLabel('region', t.regionLabel);
    const regionSelect = document.getElementById('region');
    if (regionSelect) {
        const firstOption = regionSelect.querySelector('option[value=""]');
        if (firstOption) firstOption.textContent = t.regionSelect;
    }
    
    updateLabel('departement', t.departementLabel);
    const departementSelect = document.getElementById('departement');
    if (departementSelect) {
        const firstOption = departementSelect.querySelector('option[value=""]');
        if (firstOption) firstOption.textContent = t.departementSelect;
    }
    
    updateLabel('contact', t.contactLabel);
    updatePlaceholder('contact', t.contactPlaceholder);
    
    updateLabel('surface_agricole', t.surfaceLabel);
    updatePlaceholder('surface_agricole', t.surfacePlaceholder);
    
    updateLabel('defis', t.defisLabel);
    updatePlaceholder('defis', t.defisPlaceholder);
}

// Mettre à jour la section 2
function updateSection2(t) {
    const section2 = document.querySelector('.section[data-section="2"]');
    if (!section2) return;
    
    const h2 = section2.querySelector('h2');
    if (h2) h2.textContent = t.section2Title;
    
    const description = section2.querySelector('.section-description');
    if (description) description.textContent = t.section2Description;
    
    const addBtn = section2.querySelector('.btn-add-product');
    if (addBtn) addBtn.textContent = t.addProduct;
}

// Mettre à jour la section 3
function updateSection3(t) {
    const section3 = document.querySelector('.section[data-section="3"]');
    if (!section3) return;
    
    const h2 = section3.querySelector('h2');
    if (h2) h2.textContent = t.section3Title;
    
    const description = section3.querySelector('.section-description');
    if (description) description.textContent = t.section3Description;
    
    updateLabel('sechage', t.sechageLabel);
    updatePlaceholder('sechage', t.sechagePlaceholder);
    
    updateLabel('tri_nettoyage', t.triLabel);
    updatePlaceholder('tri_nettoyage', t.triPlaceholder);
    
    updateLabel('mecanisation_postrecolte', t.mecanisationPostLabel);
    const mecanisationSelect = document.getElementById('mecanisation_postrecolte');
    if (mecanisationSelect) {
        const options = mecanisationSelect.querySelectorAll('option');
        if (options[0]) options[0].textContent = t.selectPlaceholder;
        if (options[1]) options[1].textContent = t.mecanisationManuelle;
        if (options[2]) options[2].textContent = t.mecanisationSemi;
        if (options[3]) options[3].textContent = t.mecanisationTotale;
    }
    
    updateLabel('stockage', t.stockageLabel);
    updatePlaceholder('stockage', t.stockagePlaceholder);
    
    updateLabel('accessibilite', t.accessibiliteLabel);
    updatePlaceholder('accessibilite', t.accessibilitePlaceholder);
}

// Mettre à jour les produits
function updateProductsLanguage(t) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productTitle = card.querySelector('.product-header h3');
        if (productTitle) {
            const number = card.querySelector('.product-number').textContent;
            productTitle.innerHTML = `${t.productTitle} <span class="product-number">${number}</span>`;
        }
        
        const removeBtn = card.querySelector('.btn-remove-product');
        if (removeBtn) removeBtn.textContent = t.removeProduct;
        
        // Labels des champs de produit
        const labels = card.querySelectorAll('label');
        labels.forEach(label => {
            const forAttr = label.getAttribute('for') || '';
            const text = label.textContent.trim();
            
            if (text.includes('Nom du produit') || text.includes('Product name')) {
                label.textContent = t.productNameLabel;
            } else if (text.includes('Superficie') || text.includes('Cultivated area')) {
                label.textContent = t.superficieLabel;
            } else if (text.includes('Technique culturale') || text.includes('Cultural technique')) {
                label.textContent = t.techniqueLabel;
            } else if (text.includes('Mécanisation') && !text.includes('récolte') && !text.includes('Harvest')) {
                label.textContent = t.mecanisationLabel;
            } else if (text.includes('Période de production 1') || text.includes('Production period 1')) {
                label.textContent = t.periode1Label;
            } else if (text.includes('Période de production 2') || text.includes('Production period 2')) {
                label.textContent = t.periode2Label;
            } else if (text.includes('Rendement') || text.includes('Yield')) {
                label.textContent = t.rendementLabel;
            } else if (text.includes('Production totale') || text.includes('Total production')) {
                label.textContent = t.productionLabel;
            } else if (text.includes('Période de récolte 1') || text.includes('Harvest period 1')) {
                label.textContent = t.recolte1Label;
            } else if (text.includes('Période de récolte 2') || text.includes('Harvest period 2')) {
                label.textContent = t.recolte2Label;
            } else if (text.includes('Technique de récolte') || text.includes('Harvest technique')) {
                label.textContent = t.techniqueRecolteLabel;
            } else if (text.includes('Mécanisation récolte') || text.includes('Harvest mechanization')) {
                label.textContent = t.mecanisationRecolteLabel;
            }
        });
        
        // Placeholders
        const inputs = card.querySelectorAll('input[type="text"], input[type="number"]');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder) {
                if (placeholder.includes('Maïs') || placeholder.includes('Corn')) {
                    input.placeholder = t.productNamePlaceholder;
                } else if (placeholder.includes('2.5') && !placeholder.includes('t/ha') && !placeholder.includes('tonnes')) {
                    input.placeholder = t.superficiePlaceholder;
                } else if (placeholder.includes('Agriculture biologique') || placeholder.includes('Organic')) {
                    input.placeholder = t.techniquePlaceholder;
                } else if (placeholder.includes('Mars - Juin') || placeholder.includes('March - June')) {
                    input.placeholder = t.periode1Placeholder;
                } else if (placeholder.includes('Sept - Déc') || placeholder.includes('Sept - Dec')) {
                    input.placeholder = t.periode2Placeholder;
                } else if (placeholder.includes('t/ha')) {
                    input.placeholder = t.rendementPlaceholder;
                } else if (placeholder.includes('tonnes') || placeholder.includes('tons')) {
                    input.placeholder = t.productionPlaceholder;
                } else if (placeholder.includes('Juillet') || placeholder.includes('July')) {
                    input.placeholder = t.recolte1Placeholder;
                } else if (placeholder.includes('Janvier') || placeholder.includes('January')) {
                    input.placeholder = t.recolte2Placeholder;
                } else if (placeholder.includes('Manuelle') && !placeholder.includes('Type')) {
                    input.placeholder = t.techniqueRecoltePlaceholder;
                }
            }
        });
        
        // Selects
        const selects = card.querySelectorAll('select');
        selects.forEach(select => {
            const options = select.querySelectorAll('option');
            if (options.length > 0) {
                if (options[0].value === '') {
                    options[0].textContent = t.selectPlaceholder;
                }
                if (options.length > 1) {
                    options[1].textContent = t.mecanisationManuelle;
                }
                if (options.length > 2) {
                    options[2].textContent = t.mecanisationSemi;
                }
                if (options.length > 3) {
                    options[3].textContent = t.mecanisationTotale;
                }
            }
        });
        
        // Titres des sous-sections
        const subsectionTitles = card.querySelectorAll('.subsection h4');
        subsectionTitles.forEach(title => {
            if (title.textContent.includes('Production')) {
                title.textContent = t.productionTitle;
            } else if (title.textContent.includes('Récolte') || title.textContent.includes('Harvest')) {
                title.textContent = t.recolteTitle;
            }
        });
        
        // Intrants
        const intrantsTitle = card.querySelector('.intrants-section h4');
        if (intrantsTitle) intrantsTitle.textContent = t.intrantsTitle;
        
        const intrantLabels = card.querySelectorAll('.intrant-label');
        intrantLabels.forEach(label => {
            if (label.textContent.includes('Herbicides')) {
                label.textContent = t.herbicidesLabel;
            } else if (label.textContent.includes('Semences') || label.textContent.includes('Seeds')) {
                label.textContent = t.semencesLabel;
            } else if (label.textContent.includes('Engrais') || label.textContent.includes('Fertilizers')) {
                label.textContent = t.engraisLabel;
            } else if (label.textContent.includes('Pesticides')) {
                label.textContent = t.pesticidesLabel;
            } else if (label.textContent.includes('Autres intrants') || label.textContent.includes('Other inputs')) {
                label.textContent = t.autresIntrantsLabel;
            }
        });
        
        // Placeholders des intrants
        const intrantInputs = card.querySelectorAll('.intrant-item input');
        intrantInputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder === 'Nom' || placeholder === 'Name') {
                input.placeholder = t.nomIntrant;
            } else if (placeholder === 'Variété' || placeholder === 'Variety') {
                input.placeholder = t.varieteIntrant;
            } else if (placeholder === 'Quantité' || placeholder === 'Quantity') {
                input.placeholder = t.quantiteIntrant;
            } else if (placeholder === 'Fréquence' || placeholder === 'Frequency') {
                input.placeholder = t.frequenceIntrant;
            } else if (placeholder === 'Type') {
                input.placeholder = t.typeIntrant;
            } else if (placeholder.includes('NPK') || placeholder.includes('Bio')) {
                input.placeholder = t.typeIntrantPlaceholder;
            } else if (placeholder.includes('Insecticide')) {
                input.placeholder = t.typePesticidePlaceholder;
            }
        });
        
        // Boutons d'ajout d'intrants
        const addIntrantBtns = card.querySelectorAll('.btn-add-mini');
        addIntrantBtns.forEach(btn => {
            if (btn.textContent.includes('Ajouter') || btn.textContent.includes('Add')) {
                btn.textContent = t.addIntrant;
            }
        });
    });
}

// Fonctions utilitaires pour mettre à jour les labels et placeholders
function updateLabel(id, text) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) {
        // Préserver l'astérisque si présent
        if (label.textContent.includes('*')) {
            label.textContent = text + ' *';
        } else {
            label.textContent = text;
        }
    }
}

function updatePlaceholder(id, text) {
    const input = document.getElementById(id);
    if (input) {
        input.placeholder = text;
    }
}