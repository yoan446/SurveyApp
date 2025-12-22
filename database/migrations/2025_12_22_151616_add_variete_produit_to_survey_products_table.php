<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('survey_products', function (Blueprint $table) {
            $table->string('variete_produit')->nullable()->after('nom_produit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('survey_products', function (Blueprint $table) {
            $table->dropColumn('variete_produit');
        });
    }
};
