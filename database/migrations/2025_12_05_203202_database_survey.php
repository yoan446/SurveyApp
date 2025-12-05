<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Table principale des enquêtes
        Schema::create('producer_surveys', function (Blueprint $table) {
            $table->id();
            
            // Profil du producteur
            $table->string('nom');
            $table->enum('type', ['Individuel', 'Coopérative']);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('region');
            $table->string('departement');
            $table->string('contact');
            $table->decimal('surface_agricole', 8, 2);
            
            // Informations générales
            $table->text('defis')->nullable();
            
            // Informations post-récolte générales
            $table->string('sechage')->nullable();
            $table->string('tri_nettoyage')->nullable();
            $table->string('mecanisation_postrecolte')->nullable();
            $table->string('stockage')->nullable();
            $table->text('accessibilite')->nullable();
            
            $table->timestamps();
        });

        // Table des produits cultivés par producteur
        Schema::create('survey_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('producer_surveys')->onDelete('cascade');
            $table->string('nom_produit'); // Ex: Maïs, Cacao, Plantain
            $table->decimal('superficie', 8, 2); // Superficie en hectares
            
            // Production
            $table->string('technique_culturale')->nullable();
            $table->string('mecanisation_production')->nullable();
            $table->string('periode_production_1')->nullable();
            $table->string('periode_production_2')->nullable();
            
            // Récolte
            $table->decimal('rendement_ha', 8, 2)->nullable();
            $table->decimal('production_totale', 10, 2)->nullable();
            $table->string('periode_recolte_1')->nullable();
            $table->string('periode_recolte_2')->nullable();
            $table->string('technique_recolte')->nullable();
            $table->string('mecanisation_recolte')->nullable();
            
            $table->timestamps();
        });

        // Table des herbicides par produit
        Schema::create('product_herbicides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('survey_products')->onDelete('cascade');
            $table->string('nom_herbicide');
            $table->string('quantite')->nullable();
            $table->string('frequence')->nullable();
            $table->timestamps();
        });

        // Table des semences par produit
        Schema::create('product_semences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('survey_products')->onDelete('cascade');
            $table->string('nom_semence');
            $table->string('variete')->nullable();
            $table->string('quantite')->nullable();
            $table->timestamps();
        });

        // Table des engrais par produit
        Schema::create('product_engrais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('survey_products')->onDelete('cascade');
            $table->string('nom_engrais');
            $table->string('type')->nullable(); // NPK, Organique, etc.
            $table->string('quantite')->nullable();
            $table->string('frequence')->nullable();
            $table->timestamps();
        });

        // Table des pesticides par produit
        Schema::create('product_pesticides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('survey_products')->onDelete('cascade');
            $table->string('nom_pesticide');
            $table->string('type')->nullable(); // Insecticide, Fongicide, etc.
            $table->string('quantite')->nullable();
            $table->string('frequence')->nullable();
            $table->timestamps();
        });

        // Table des autres intrants par produit
        Schema::create('product_intrants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('survey_products')->onDelete('cascade');
            $table->string('nom_intrant');
            $table->string('type')->nullable();
            $table->string('quantite')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_intrants');
        Schema::dropIfExists('product_pesticides');
        Schema::dropIfExists('product_engrais');
        Schema::dropIfExists('product_semences');
        Schema::dropIfExists('product_herbicides');
        Schema::dropIfExists('survey_products');
        Schema::dropIfExists('producer_surveys');
    }
};