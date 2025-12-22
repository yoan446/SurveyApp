<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{
    /**
     * Afficher le formulaire d'enquête
     */
    public function create()
    {
        return view('survey');
    }

    /**
     * Enregistrer l'enquête avec les produits et intrants
     */
    public function store(Request $request)
    {
        // Validation des données principales
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'type' => 'required|in:Individuel,Coopérative',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'region' => 'required|string|max:255',
            'departement' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'surface_agricole' => 'required|numeric|min:0',
            'products' => 'required|array|min:1',
            'products.*.nom_produit' => 'required|string|max:255',
            'products.*.superficie' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        
        try {
            // Insérer l'enquête principale
            $surveyId = DB::table('producer_surveys')->insertGetId([
                'nom' => $request->nom,
                'type' => $request->type,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'region' => $request->region,
                'departement' => $request->departement,
                'contact' => $request->contact,
                'surface_agricole' => $request->surface_agricole,
                'defis' => $request->defis,
                'sechage' => $request->sechage,
                'tri_nettoyage' => $request->tri_nettoyage,
                'mecanisation_postrecolte' => $request->mecanisation_postrecolte,
                'stockage' => $request->stockage,
                'accessibilite' => $request->accessibilite,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Insérer les produits et leurs intrants
            foreach ($request->products as $productData) {
                $productId = DB::table('survey_products')->insertGetId([
                    'survey_id' => $surveyId,
                    'nom_produit' => $productData['nom_produit'],
                    'variete_produit' => $productData['variete_produit'] ?? null,
                    'superficie' => $productData['superficie'],
                    'technique_culturale' => $productData['technique_culturale'] ?? null,
                    'mecanisation_production' => $productData['mecanisation_production'] ?? null,
                    'periode_production_1' => $productData['periode_production_1'] ?? null,
                    'periode_production_2' => $productData['periode_production_2'] ?? null,
                    'rendement_ha' => $productData['rendement_ha'] ?? null,
                    'production_totale' => $productData['production_totale'] ?? null,
                    'periode_recolte_1' => $productData['periode_recolte_1'] ?? null,
                    'periode_recolte_2' => $productData['periode_recolte_2'] ?? null,
                    'technique_recolte' => $productData['technique_recolte'] ?? null,
                    'mecanisation_recolte' => $productData['mecanisation_recolte'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                // Insérer les herbicides
                if (!empty($productData['herbicides'])) {
                    foreach ($productData['herbicides'] as $herbicide) {
                        if (!empty($herbicide['nom'])) {
                            DB::table('product_herbicides')->insert([
                                'product_id' => $productId,
                                'nom_herbicide' => $herbicide['nom'],
                                'quantite' => $herbicide['quantite'] ?? null,
                                'frequence' => $herbicide['frequence'] ?? null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }

                // Insérer les semences
                if (!empty($productData['semences'])) {
                    foreach ($productData['semences'] as $semence) {
                        if (!empty($semence['nom'])) {
                            DB::table('product_semences')->insert([
                                'product_id' => $productId,
                                'nom_semence' => $semence['nom'],
                                'variete' => $semence['variete'] ?? null,
                                'quantite' => $semence['quantite'] ?? null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }

                // Insérer les engrais
                if (!empty($productData['engrais'])) {
                    foreach ($productData['engrais'] as $engrais) {
                        if (!empty($engrais['nom'])) {
                            DB::table('product_engrais')->insert([
                                'product_id' => $productId,
                                'nom_engrais' => $engrais['nom'],
                                'type' => $engrais['type'] ?? null,
                                'quantite' => $engrais['quantite'] ?? null,
                                'frequence' => $engrais['frequence'] ?? null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }

                // Insérer les pesticides
                if (!empty($productData['pesticides'])) {
                    foreach ($productData['pesticides'] as $pesticide) {
                        if (!empty($pesticide['nom'])) {
                            DB::table('product_pesticides')->insert([
                                'product_id' => $productId,
                                'nom_pesticide' => $pesticide['nom'],
                                'type' => $pesticide['type'] ?? null,
                                'quantite' => $pesticide['quantite'] ?? null,
                                'frequence' => $pesticide['frequence'] ?? null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }

                // Insérer les autres intrants
                if (!empty($productData['intrants'])) {
                    foreach ($productData['intrants'] as $intrant) {
                        if (!empty($intrant['nom'])) {
                            DB::table('product_intrants')->insert([
                                'product_id' => $productId,
                                'nom_intrant' => $intrant['nom'],
                                'type' => $intrant['type'] ?? null,
                                'quantite' => $intrant['quantite'] ?? null,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Enquête enregistrée avec succès',
                'survey_id' => $surveyId
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'enregistrement: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher toutes les enquêtes
     */
    public function index()
    {
        $surveys = DB::table('producer_surveys')
            ->select('producer_surveys.*', DB::raw('COUNT(survey_products.id) as products_count'))
            ->leftJoin('survey_products', 'producer_surveys.id', '=', 'survey_products.survey_id')
            ->groupBy('producer_surveys.id')
            ->orderBy('producer_surveys.created_at', 'desc')
            ->get();

        return view('surveys.index', compact('surveys'));
    }

    /**
     * Afficher une enquête spécifique avec tous ses produits et intrants
     */
    public function show($id)
    {
        $survey = DB::table('producer_surveys')->find($id);

        if (!$survey) {
            abort(404, 'Enquête non trouvée');
        }

        // Récupérer tous les produits de cette enquête
        $products = DB::table('survey_products')
            ->where('survey_id', $id)
            ->get();

        // Pour chaque produit, récupérer ses intrants
        foreach ($products as $product) {
            $product->herbicides = DB::table('product_herbicides')
                ->where('product_id', $product->id)
                ->get();
            
            $product->semences = DB::table('product_semences')
                ->where('product_id', $product->id)
                ->get();
            
            $product->engrais = DB::table('product_engrais')
                ->where('product_id', $product->id)
                ->get();
            
            $product->pesticides = DB::table('product_pesticides')
                ->where('product_id', $product->id)
                ->get();
            
            $product->intrants = DB::table('product_intrants')
                ->where('product_id', $product->id)
                ->get();
        }

        $survey->products = $products;

        return view('surveys.show', compact('survey'));
    }

    /**
     * Obtenir les statistiques par produit
     */
    public function productStats()
    {
        // Statistiques des produits les plus cultivés
        $topProducts = DB::table('survey_products')
            ->select('nom_produit', DB::raw('COUNT(*) as count'), DB::raw('SUM(superficie) as total_superficie'))
            ->groupBy('nom_produit')
            ->orderBy('count', 'desc')
            ->limit(10)
            ->get();

        // Statistiques des intrants par produit
        $productIntrants = DB::table('survey_products')
            ->select('nom_produit')
            ->get()
            ->map(function($product) {
                return [
                    'nom_produit' => $product->nom_produit,
                    'herbicides_count' => DB::table('product_herbicides')->where('product_id', $product->id)->count(),
                    'engrais_count' => DB::table('product_engrais')->where('product_id', $product->id)->count(),
                    'pesticides_count' => DB::table('product_pesticides')->where('product_id', $product->id)->count(),
                ];
            });

        return response()->json([
            'top_products' => $topProducts,
            'product_intrants' => $productIntrants
        ]);
    }

    /**
     * Exporter les données en CSV détaillé avec toutes les informations
     */
    public function export()
    {
        $surveys = DB::table('producer_surveys')
            ->orderBy('created_at', 'desc')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => 'attachment; filename="enquetes_producteurs_completes_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function() use ($surveys) {
            $file = fopen('php://output', 'w');
            
            // BOM UTF-8 pour Excel
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            
            // En-têtes CSV complets
            fputcsv($file, [
                // Informations du producteur
                'ID Enquête',
                'Nom Producteur',
                'Type',
                'Région',
                'Département',
                'Contact',
                'Latitude',
                'Longitude',
                'Surface Agricole Totale (ha)',
                'Défis',
                'Séchage',
                'Tri/Nettoyage',
                'Mécanisation Post-Récolte',
                'Stockage',
                'Accessibilité',
                
                // Informations du produit
                'ID Produit',
                'Nom Produit',
                'Variété Produit',
                'Superficie Produit (ha)',
                
                // Informations de production
                'Technique Culturale',
                'Mécanisation Production',
                'Période Production 1',
                'Période Production 2',
                
                // Informations de récolte
                'Rendement/ha',
                'Production Totale',
                'Période Récolte 1',
                'Période Récolte 2',
                'Technique Récolte',
                'Mécanisation Récolte',
                
                // Intrants - Semences
                'Semences (Nom; Variété; Quantité)',
                
                // Intrants - Herbicides
                'Herbicides (Nom; Quantité; Fréquence)',
                
                // Intrants - Engrais
                'Engrais (Nom; Type; Quantité; Fréquence)',
                
                // Intrants - Pesticides
                'Pesticides (Nom; Type; Quantité; Fréquence)',
                
                // Intrants - Autres
                'Autres Intrants (Nom; Type; Quantité)',
                
                // Date
                'Date Création'
            ]);

            // Fonction helper pour formater les intrants
            $formatIntrants = function($items, $format) {
                if (empty($items)) {
                    return '';
                }
                
                $formatted = [];
                foreach ($items as $item) {
                    $parts = [];
                    foreach ($format as $key => $field) {
                        if (isset($item->$field) && !empty($item->$field)) {
                            $parts[] = $item->$field;
                        }
                    }
                    if (!empty($parts)) {
                        $formatted[] = implode('; ', $parts);
                    }
                }
                
                return implode(' | ', $formatted);
            };

            // Données
            foreach ($surveys as $survey) {
                $products = DB::table('survey_products')
                    ->where('survey_id', $survey->id)
                    ->get();

                // Si pas de produits, exporter quand même les infos du producteur
                if ($products->isEmpty()) {
                    $emptyRow = array_fill(0, 15, ''); // 15 colonnes pour le producteur
                    $emptyRow[0] = $survey->id;
                    $emptyRow[1] = $survey->nom;
                    $emptyRow[2] = $survey->type;
                    $emptyRow[3] = $survey->region;
                    $emptyRow[4] = $survey->departement;
                    $emptyRow[5] = $survey->contact;
                    $emptyRow[6] = $survey->latitude;
                    $emptyRow[7] = $survey->longitude;
                    $emptyRow[8] = $survey->surface_agricole;
                    $emptyRow[9] = $survey->defis;
                    $emptyRow[10] = $survey->sechage;
                    $emptyRow[11] = $survey->tri_nettoyage;
                    $emptyRow[12] = $survey->mecanisation_postrecolte;
                    $emptyRow[13] = $survey->stockage;
                    $emptyRow[14] = $survey->accessibilite;
                    
                    // Ajouter les colonnes vides pour le produit et intrants (23 colonnes)
                    $emptyRow = array_merge($emptyRow, array_fill(0, 23, ''));
                    $emptyRow[] = $survey->created_at;
                    
                    fputcsv($file, $emptyRow);
                } else {
                    // Pour chaque produit, créer une ligne
                    foreach ($products as $product) {
                        // Récupérer tous les intrants
                        $semences = DB::table('product_semences')
                            ->where('product_id', $product->id)
                            ->get();
                        
                        $herbicides = DB::table('product_herbicides')
                            ->where('product_id', $product->id)
                            ->get();
                        
                        $engrais = DB::table('product_engrais')
                            ->where('product_id', $product->id)
                            ->get();
                        
                        $pesticides = DB::table('product_pesticides')
                            ->where('product_id', $product->id)
                            ->get();
                        
                        $intrants = DB::table('product_intrants')
                            ->where('product_id', $product->id)
                            ->get();

                        // Formater les intrants
                        $semencesFormatted = $formatIntrants($semences, ['nom_semence', 'variete', 'quantite']);
                        $herbicidesFormatted = $formatIntrants($herbicides, ['nom_herbicide', 'quantite', 'frequence']);
                        $engraisFormatted = $formatIntrants($engrais, ['nom_engrais', 'type', 'quantite', 'frequence']);
                        $pesticidesFormatted = $formatIntrants($pesticides, ['nom_pesticide', 'type', 'quantite', 'frequence']);
                        $intrantsFormatted = $formatIntrants($intrants, ['nom_intrant', 'type', 'quantite']);

                        fputcsv($file, [
                            // Informations du producteur
                            $survey->id,
                            $survey->nom,
                            $survey->type,
                            $survey->region,
                            $survey->departement,
                            $survey->contact,
                            $survey->latitude,
                            $survey->longitude,
                            $survey->surface_agricole,
                            $survey->defis,
                            $survey->sechage,
                            $survey->tri_nettoyage,
                            $survey->mecanisation_postrecolte,
                            $survey->stockage,
                            $survey->accessibilite,
                            
                            // Informations du produit
                            $product->id,
                            $product->nom_produit,
                            $product->variete_produit,
                            $product->superficie,
                            
                            // Informations de production
                            $product->technique_culturale,
                            $product->mecanisation_production,
                            $product->periode_production_1,
                            $product->periode_production_2,
                            
                            // Informations de récolte
                            $product->rendement_ha,
                            $product->production_totale,
                            $product->periode_recolte_1,
                            $product->periode_recolte_2,
                            $product->technique_recolte,
                            $product->mecanisation_recolte,
                            
                            // Intrants
                            $semencesFormatted,
                            $herbicidesFormatted,
                            $engraisFormatted,
                            $pesticidesFormatted,
                            $intrantsFormatted,
                            
                            // Date
                            $survey->created_at,
                        ]);
                    }
                }
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
