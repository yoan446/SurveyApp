<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Enquête Producteurs Camerounais - SurveyApp</title>
    <link rel="stylesheet" href="{{ asset('css/survey.css') }}">
    <link rel="icon" type="image/png" href="{{ asset('logo1.png') }}">
</head>
<header role="banner">
    <button id="lang-toggle" class="lang-toggle fade-in fade-in-delay-1" type="button" aria-label="Changer la langue en anglais">
        <span id="lang-toggle-label">FR</span>
    </button>
</header>
<body>
    <div class="container">
        <div class="header">
            <div class="logo"><img src="{{asset('images/logo2.png')}}" alt=""></div>
            <h1>Enquête Producteurs Agricoles</h1>
            <p class="subtitle">Votre contribution aide à améliorer l'agriculture camerounaise</p>
        </div>

        <form id="surveyForm" action="{{ route('survey.store') }}" method="POST">
            @csrf
            
            <!-- Section 1: Profil du producteur -->
            <div class="section active" data-section="1">
                <h2>📋 Profil du Producteur</h2>
                
                <div class="form-group">
                    <label for="nom">Nom complet *</label>
                    <input type="text" id="nom" name="nom" required placeholder="Ex: Jean Dupont">
                </div>

                <div class="form-group">
                    <label for="type">Type de producteur *</label>
                    <select id="type" name="type" required>
                        <option value="">Sélectionnez...</option>
                        <option value="Individuel">Individuel</option>
                        <option value="Coopérative">Coopérative</option>
                    </select>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="latitude">Latitude</label>
                        <input type="number" id="latitude" name="latitude" step="0.00000001" placeholder="Ex: 3.8480">
                    </div>
                    <div class="form-group">
                        <label for="longitude">Longitude</label>
                        <input type="number" id="longitude" name="longitude" step="0.00000001" placeholder="Ex: 11.5021">
                    </div>
                </div>

                <div class="form-row">
                      <div class="form-group">
                        <label for="region">Région *</label>
                        <select name="region" id="region" required>
                            <option value="">-- Sélectionnez une région --</option>
                            <option value="Adamaoua">Adamaoua</option>
                            <option value="Centre">Centre</option>
                            <option value="Est">Est</option>
                            <option value="Extrême-Nord">Extrême-Nord</option>
                            <option value="Littoral">Littoral</option>
                            <option value="Nord">Nord</option>
                            <option value="Nord-Ouest">Nord-Ouest</option>
                            <option value="Ouest">Ouest</option>
                            <option value="Sud">Sud</option>
                            <option value="Sud-Ouest">Sud-Ouest</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="departement">Département *</label>
                        <select name="departement" id="departement" required>
                            <option value="">-- Sélectionnez un département --</option>

                            <optgroup label="Adamaoua">
                                <option value="Djérem">Djérem</option>
                                <option value="Faro-et-Déo">Faro-et-Déo</option>
                                <option value="Mbéré">Mbéré</option>
                                <option value="Mayo-Banyo">Mayo-Banyo</option>
                                <option value="Vina">Vina</option>
                            </optgroup>

                            <optgroup label="Centre">
                                <option value="Haute-Sanaga">Haute-Sanaga</option>
                                <option value="Lekié">Lekié</option>
                                <option value="Mbam-et-Inoubou">Mbam-et-Inoubou</option>
                                <option value="Mbam-et-Kim">Mbam-et-Kim</option>
                                <option value="Méfou-et-Afamba">Méfou-et-Afamba</option>
                                <option value="Méfou-et-Akono">Méfou-et-Akono</option>
                                <option value="Mfoundi">Mfoundi</option>
                                <option value="Nyong-et-Kéllé">Nyong-et-Kéllé</option>
                                <option value="Nyong-et-Mfoumou">Nyong-et-Mfoumou</option>
                                <option value="Nyong-et-So’o">Nyong-et-So’o</option>
                            </optgroup>

                            <optgroup label="Est">
                                <option value="Boumba-et-Ngoko">Boumba-et-Ngoko</option>
                                <option value="Haut-Nyong">Haut-Nyong</option>
                                <option value="Kadey">Kadey</option>
                                <option value="Lom-et-Djérem">Lom-et-Djérem</option>
                            </optgroup>

                            <optgroup label="Extrême-Nord">
                                <option value="Diamaré">Diamaré</option>
                                <option value="Logone-et-Chari">Logone-et-Chari</option>
                                <option value="Mayo-Danay">Mayo-Danay</option>
                                <option value="Mayo-Kani">Mayo-Kani</option>
                                <option value="Mayo-Sava">Mayo-Sava</option>
                                <option value="Mayo-Tsanaga">Mayo-Tsanaga</option>
                            </optgroup>

                            <optgroup label="Littoral">
                                <option value="Moungo">Moungo</option>
                                <option value="Nkam">Nkam</option>
                                <option value="Sanaga-Maritime">Sanaga-Maritime</option>
                                <option value="Wouri">Wouri</option>
                            </optgroup>

                            <optgroup label="Nord">
                                <option value="Bénoué">Bénoué</option>
                                <option value="Faro">Faro</option>
                                <option value="Mayo-Louti">Mayo-Louti</option>
                                <option value="Mayo-Rey">Mayo-Rey</option>
                            </optgroup>

                            <optgroup label="Nord-Ouest">
                                <option value="Boyo">Boyo</option>
                                <option value="Bui">Bui</option>
                                <option value="Donga-Mantung">Donga-Mantung</option>
                                <option value="Menchum">Menchum</option>
                                <option value="Mezam">Mezam</option>
                                <option value="Momo">Momo</option>
                                <option value="Ngo-Ketunjia">Ngo-Ketunjia</option>
                            </optgroup>

                            <optgroup label="Ouest">
                                <option value="Bamboutos">Bamboutos</option>
                                <option value="Hauts-Plateaux">Hauts-Plateaux</option>
                                <option value="Houet">Hau’</option>
                                <option value="Koung-Khi">Koung-Khi</option>
                                <option value="Ménoua">Ménoua</option>
                                <option value="Mifi">Mifi</option>
                                <option value="Ndé">Ndé</option>
                                <option value="Noun">Noun</option>
                            </optgroup>

                            <optgroup label="Sud">
                                <option value="Dja-et-Lobo">Dja-et-Lobo</option>
                                <option value="Mvila">Mvila</option>
                                <option value="Océan">Océan</option>
                                <option value="Vallée-du-Ntem">Vallée-du-Ntem</option>
                            </optgroup>

                            <optgroup label="Sud-Ouest">
                                <option value="Fako">Fako</option>
                                <option value="Koupe-Manengouba">Koupe-Manengouba</option>
                                <option value="Lebialem">Lebialem</option>
                                <option value="Manyu">Manyu</option>
                                <option value="Meme">Meme</option>
                                <option value="Ndian">Ndian</option>
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="contact">Contact *</label>
                    <input type="tel" id="contact" name="contact" required placeholder="Ex: +237 6XX XX XX XX">
                </div>

                <div class="form-group">
                    <label for="surface_agricole">Surface agricole totale (ha) *</label>
                    <input type="number" id="surface_agricole" name="surface_agricole" step="0.01" required placeholder="Ex: 5.5">
                </div>

                <div class="form-group">
                    <label for="defis">Défis rencontrés</label>
                    <textarea id="defis" name="defis" rows="3" placeholder="Décrivez les principaux défis..."></textarea>
                </div>
            </div>

            <!-- Section 2: Produits cultivés -->
            <div class="section" data-section="2">
                <h2>🌱 Produits Cultivés</h2>
                <p class="section-description">Ajoutez tous les produits que vous cultivez. Pour chaque produit, vous pourrez ensuite spécifier les intrants utilisés.</p>
                
                <div id="products-container">
                    <!-- Les produits seront ajoutés ici dynamiquement -->
                </div>

                <button type="button" class="btn-add-product" onclick="addProduct()">
                    ➕ Ajouter un produit cultivé
                </button>
            </div>

            <!-- Section 3: Informations post-récolte -->
            <div class="section" data-section="3">
                <h2>📦 Informations Post-Récolte</h2>
                <p class="section-description">Informations générales sur le traitement après récolte</p>
                
                <div class="form-group">
                    <label for="sechage">Méthode de séchage</label>
                    <input type="text" id="sechage" name="sechage" placeholder="Ex: Solaire, mécanique">
                </div>

                <div class="form-group">
                    <label for="tri_nettoyage">Tri et nettoyage</label>
                    <input type="text" id="tri_nettoyage" name="tri_nettoyage" placeholder="Ex: Manuel, mécanique">
                </div>

                <div class="form-group">
                    <label for="mecanisation_postrecolte">Mécanisation post-récolte</label>
                    <select id="mecanisation_postrecolte" name="mecanisation_postrecolte">
                        <option value="">Sélectionnez...</option>
                        <option value="Manuelle">Manuelle</option>
                        <option value="Semi-mécanisée">Semi-mécanisée</option>
                        <option value="Totalement mécanisée">Totalement mécanisée</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="stockage">Type de stockage</label>
                    <input type="text" id="stockage" name="stockage" placeholder="Ex: Entrepôt, grenier, sac">
                </div>

                <div class="form-group">
                    <label for="accessibilite">Accessibilité</label>
                    <textarea id="accessibilite" name="accessibilite" rows="3" placeholder="Décrivez l'accessibilité à votre exploitation..."></textarea>
                </div>
            </div>

            <!-- Navigation -->
            <div class="navigation">
                <button type="button" class="btn btn-secondary" id="prevBtn" onclick="changeSection(-1)">← Précédent</button>
                <div class="progress-dots">
                    <span class="dot active" data-section="1"></span>
                    <span class="dot" data-section="2"></span>
                    <span class="dot" data-section="3"></span>
                </div>
                <button type="button" class="btn btn-primary" id="nextBtn" onclick="changeSection(1)">Suivant →</button>
                <button type="submit" class="btn btn-success" id="submitBtn" style="display: none;">Soumettre ✓</button>
            </div>
        </form>

        <div class="footer">
            <p>Merci pour votre participation ! 🌍</p>
        </div>
    </div>

    <!-- Template pour un produit -->
    <template id="product-template">
        <div class="product-card" data-product-index="">
            <div class="product-header">
                <h3>🌾 Produit <span class="product-number"></span></h3>
                <button type="button" class="btn-remove-product" onclick="removeProduct(this)">✕ Supprimer</button>
            </div>

            <div class="product-content">
                <!-- Informations de base -->
                <div class="form-group">
                    <label>Nom du produit *</label>
                    <input type="text" name="products[][nom_produit]" required placeholder="Ex: Maïs, Cacao, Plantain">
                </div>

                <div class="form-group">
                    <label>Superficie cultivée (ha) *</label>
                    <input type="number" name="products[][superficie]" step="0.01" required placeholder="Ex: 2.5">
                </div>

                <!-- Production -->
                <div class="subsection">
                    <h4>📊 Production</h4>
                    
                    <div class="form-group">
                        <label>Technique culturale</label>
                        <input type="text" name="products[][technique_culturale]" placeholder="Ex: Agriculture biologique">
                    </div>

                    <div class="form-group">
                        <label>Mécanisation</label>
                        <select name="products[][mecanisation_production]">
                            <option value="">Sélectionnez...</option>
                            <option value="Manuelle">Manuelle</option>
                            <option value="Semi-mécanisée">Semi-mécanisée</option>
                            <option value="Totalement mécanisée">Totalement mécanisée</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Période de production 1</label>
                            <input type="text" name="products[][periode_production_1]" placeholder="Ex: Mars - Juin">
                        </div>
                        <div class="form-group">
                            <label>Période de production 2</label>
                            <input type="text" name="products[][periode_production_2]" placeholder="Ex: Sept - Déc">
                        </div>
                    </div>
                </div>

                <!-- Récolte -->
                <div class="subsection">
                    <h4>🌾 Récolte</h4>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Rendement/ha</label>
                            <input type="number" name="products[][rendement_ha]" step="0.01" placeholder="Ex: 2.5 t/ha">
                        </div>
                        <div class="form-group">
                            <label>Production totale</label>
                            <input type="number" name="products[][production_totale]" step="0.01" placeholder="Ex: 6.25 tonnes">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Période de récolte 1</label>
                            <input type="text" name="products[][periode_recolte_1]" placeholder="Ex: Juillet">
                        </div>
                        <div class="form-group">
                            <label>Période de récolte 2</label>
                            <input type="text" name="products[][periode_recolte_2]" placeholder="Ex: Janvier">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Technique de récolte</label>
                        <input type="text" name="products[][technique_recolte]" placeholder="Ex: Manuelle">
                    </div>

                    <div class="form-group">
                        <label>Mécanisation récolte</label>
                        <select name="products[][mecanisation_recolte]">
                            <option value="">Sélectionnez...</option>
                            <option value="Manuelle">Manuelle</option>
                            <option value="Semi-mécanisée">Semi-mécanisée</option>
                            <option value="Totalement mécanisée">Totalement mécanisée</option>
                        </select>
                    </div>
                </div>

                <!-- Intrants -->
                <div class="intrants-section">
                    <h4>🧪 Intrants utilisés pour ce produit</h4>

                    <!-- Herbicides -->
                    <div class="intrant-group">
                        <label class="intrant-label">🌿 Herbicides</label>
                        <div class="intrant-items" data-type="herbicides">
                            <div class="intrant-item">
                                <input type="text" name="products[][herbicides][][nom]" placeholder="Nom">
                                <input type="text" name="products[][herbicides][][quantite]" placeholder="Quantité">
                                <input type="text" name="products[][herbicides][][frequence]" placeholder="Fréquence">
                                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-mini" onclick="addIntrant(this, 'herbicides')">+ Ajouter</button>
                    </div>

                    <!-- Semences -->
                    <div class="intrant-group">
                        <label class="intrant-label">🌱 Semences</label>
                        <div class="intrant-items" data-type="semences">
                            <div class="intrant-item">
                                <input type="text" name="products[][semences][][nom]" placeholder="Nom">
                                <input type="text" name="products[][semences][][variete]" placeholder="Variété">
                                <input type="text" name="products[][semences][][quantite]" placeholder="Quantité">
                                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-mini" onclick="addIntrant(this, 'semences')">+ Ajouter</button>
                    </div>

                    <!-- Engrais -->
                    <div class="intrant-group">
                        <label class="intrant-label">💧 Engrais</label>
                        <div class="intrant-items" data-type="engrais">
                            <div class="intrant-item">
                                <input type="text" name="products[][engrais][][nom]" placeholder="Nom">
                                <input type="text" name="products[][engrais][][type]" placeholder="Type (NPK, Bio...)">
                                <input type="text" name="products[][engrais][][quantite]" placeholder="Quantité">
                                <input type="text" name="products[][engrais][][frequence]" placeholder="Fréquence">
                                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-mini" onclick="addIntrant(this, 'engrais')">+ Ajouter</button>
                    </div>

                    <!-- Pesticides -->
                    <div class="intrant-group">
                        <label class="intrant-label">🐛 Pesticides</label>
                        <div class="intrant-items" data-type="pesticides">
                            <div class="intrant-item">
                                <input type="text" name="products[][pesticides][][nom]" placeholder="Nom">
                                <input type="text" name="products[][pesticides][][type]" placeholder="Type (Insecticide...)">
                                <input type="text" name="products[][pesticides][][quantite]" placeholder="Quantité">
                                <input type="text" name="products[][pesticides][][frequence]" placeholder="Fréquence">
                                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-mini" onclick="addIntrant(this, 'pesticides')">+ Ajouter</button>
                    </div>

                    <!-- Autres intrants -->
                    <div class="intrant-group">
                        <label class="intrant-label">📦 Autres intrants</label>
                        <div class="intrant-items" data-type="intrants">
                            <div class="intrant-item">
                                <input type="text" name="products[][intrants][][nom]" placeholder="Nom">
                                <input type="text" name="products[][intrants][][type]" placeholder="Type">
                                <input type="text" name="products[][intrants][][quantite]" placeholder="Quantité">
                                <button type="button" class="btn-remove-mini" onclick="removeIntrant(this)">✕</button>
                            </div>
                        </div>
                        <button type="button" class="btn-add-mini" onclick="addIntrant(this, 'intrants')">+ Ajouter</button>
                    </div>
                </div>
            </div>
        </div>
    </template>

    <script src="{{ asset('js/survey.js') }}"></script>
</body>
</html>