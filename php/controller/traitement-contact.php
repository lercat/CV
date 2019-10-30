<?php

    $nom = $_REQUEST["nom"] ?? "";
    $email = $_REQUEST["email"] ?? "";
    $message = $_REQUEST["message"] ?? "";


    insererLigneTable("contact", [
        "nom" => $nom,
        "email" => $email,
        "message" => $message
    ]);

    $confirmation ="message reçu ($message)";

        $ligne = 
<<<CODETEXT
-------------
Nom: $nom
Email: $email
Message:
$message

CODETEXT;


    //envoi email
    @mail("webmaster@monsite.fr", "nouveau message d'un contact", $ligne);

    // message à afficher au visiteur
    $confirmation = "Merci $nom de votre message.";