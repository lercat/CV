<?php

$tabAssoJson = [];

$tabAssoJson["request"] = $_REQUEST;

require "php/fonctions.php";

$idFormulaire = $_REQUEST["idFormulaire"];

if ($idFormulaire != "")
{
    if($idFormulaire == "contact")
    {
        require "php/controller/traitement-contact.php";
    }

}

$tabAssoJson["confirmation"] = $confirmation ?? "";

$texteJSON = json_encode($tabAssoJson, JSON_PRETTY_PRINT);

echo $texteJSON;

?>