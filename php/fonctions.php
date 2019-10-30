<?php

function creerConnexionBDD()
    {
        $database   = "cv_contacts";   // mettre le nom donné pour sa bdd ds php-mysql
        $user       = "root";
        $password   = "root"; // ici pour mac il faut rajouter un mdp ici root à la base

        // Data Source Name
        $dsn = "mysql:dbname=$database;host=localhost;charset=utf8mb4";
        // créer la connexion avec MySQL
        $dbh = new PDO($dsn, $user, $password);


    return $dbh;
}

function envoyerRequeteSQL ($requeteSQLPreparee, $tabAssoColonneValeur)
{

    $dbh = creerConnexionBDD();

    $pdoStatement = $dbh->prepare($requeteSQLPreparee);
    $pdoStatement->execute($tabAssoColonneValeur);

    return $pdoStatement;
}

function lireTable($nomTable, $colonne="", $valeurSelection="", $tri="id DESC")
{
    if ($colonne != "")
    {
        $clauseWhere = "WHERE $colonne = '$valeurSelection'";
    }
    else{
        $clauseWhere ="";
    }
    $requeteSQLPreparee =
<<<CODESQL

SELECT * FROM $nomTable
$clauseWhere
ORDER BY $tri

CODESQL;

    $pdoStatement = envoyerRequeteSQL($requeteSQLPreparee, []);

    $tabLigne = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);

    return $tabLigne;
}



// EN PHP: VERSION AVEC UN TABLEAU ASSOCIATIF
function concatenerTexteAsso ($nomTable, $tabAssoColonneValeur)
{
    // AJOUTER LE CODE MANQUANT
    $texteFinal = "";
    $texteToken = "";
    $indice     = 0;
    foreach($tabAssoColonneValeur as $cle => $valeur)
    {
        if ($indice > 0)
        {
            // ON AJOUTE LA VIRGULE AU TEXTE FINAL
            $texteFinal = "$texteFinal,$cle";
            $texteToken = "$texteToken,:$cle";
        }
        else
        {
            // ON N(AJOUTE PAS LA VIRGULE) AU TEXTE FINAL
            $texteFinal = "$texteFinal$cle";
            $texteToken = "$texteToken:$cle";
        }
        // J'INCREMENTE MOI MEME L'INDICE
        $indice++;
    }

    // JE COMPLETE LE TEXTE FINAL
    $texteFinal = "INSERT INTO $nomTable ( $texteFinal ) VALUES ($texteToken)";
    return $texteFinal;
}

// INSERER UNE LIGNE DANS N'IMPORTE QUELLE TABLE
function insererLigneTable($nomTable, $tabAssoColonneValeur)
{
    // ETAPE1: CREER UNE REQUETE SQL PREPAREE
    $requeteSQLPreparee = concatenerTexteAsso($nomTable, $tabAssoColonneValeur);
    // ETAPE2: ENVOYER LA REQUETE
    $pdoStatement = envoyerRequeteSQL($requeteSQLPreparee, $tabAssoColonneValeur);

    return $pdoStatement;
}

// DELETE

function supprimerLigne($nomTable, $id)
{
    // IL FAUT PROTEGER $id POUR ASSURER QUE C'EST UN NOMBRE
    // filtre pour convertir $id en nombre entier
    $id = intval($id);
    // CREER UNE REQUETE SQL PREPAREE
    $requeteSQLPreparee =
<<<CODESQL
DELETE FROM $nomTable
WHERE id = $id
CODESQL;
    $tabAssoColonneValeur = [];
    // ENVOYER LA REQUETE SQL PREPAREE
    $pdoStatement = envoyerRequeteSQL($requeteSQLPreparee, $tabAssoColonneValeur);
    // renvoyer $pdoStatement
    return $pdoStatement;
}

// update
function modifierLigne($nomTable, $id, $tabAssoColonneValeur)
{
    $id = intval($id);
    $listeColonneToken = "";
    // A VOUS LES STUDIOS... 
    // LA LISTE DES COLONNES EST DANS LES CLES DU TABLEAU ASSOCIATIF $tabAssoColonneValeur
    $indice = 0;
    // on crée une variable $nouvelleValeur
    // mais on ne l'utilise pas
    // => si on veut la clé, PHP nous oblige à ajouter aussi la variable pour la valeur
    // (mais on ne s'en sert pas)
    foreach($tabAssoColonneValeur as $colonne => $nouvelleValeur)
    {
        // est-ce qu'on est au début ?
        if ($indice > 0)
        {
            // pour les élements suivants, je rajoute une virgule
            $listeColonneToken = $listeColonneToken . ",$colonne = :$colonne";
        }
        else
        {
            // au début, je ne mets pas de virgule
            $listeColonneToken = $listeColonneToken . "$colonne = :$colonne";
        }
        
        $indice++;
    }
    // REQUETE SQL PREPAREE
    $requeteSQLPreparee =
<<<CODESQL
UPDATE $nomTable
SET
$listeColonneToken
WHERE id = $id
CODESQL;
    // ENVOYER LA REQUETE SQL PREPAREE
    $pdoStatement = envoyerRequeteSQL($requeteSQLPreparee, $tabAssoColonneValeur);
    // renvoyer $pdoStatement
    return $pdoStatement;
}