console.log('JS chargé');


/* pour que mon titre se révèle*/
ScrollReveal().reveal('h1', {duration: 5000}, {origin:"top"}, {scale: 0.8}, {reset: true});


/* fonction changement de couleur avec 2 css */
function setActiveStyleSheet(title) {
  var links = document.querySelectorAll('link[rel*="stylesheet"]');
  var i = links.length;
  while (links[--i]) {
    links[i].disabled = links[i].getAttribute('title') !== title;
  }
}


// ajouterAction('button.delete', 'click', function(){ });
function ajouterAction (selecteurCSS, evenement, fonctionCallback)
{
    // recuperer la liste des balises à sélectionner
    // ajouter pour chaque balise un event listener
    var listeBalise = document.querySelectorAll(selecteurCSS);
    listeBalise.forEach(function(balise, indice){
        balise.addEventListener(evenement, fonctionCallback);
    });
}

// on peut créer une fonction qui va prendre en paramètre un objet formData
// et qui va envoyer une requête ajax
// et qui va appeler une fonction de callback pour gérer un objet JSON
function envoyerRequeteAjax (formData, fonctionCallback)
{
    fetch('api-json.php', {
        method: 'POST',
        body: formData
    })
    .then(function(reponseServeur) { 
        return reponseServeur.json();
    })
    .then(fonctionCallback);
}


function envoyerFormulaireAjax (event)
{
    // bloque le formulaire
    event.preventDefault();

    // cool: je ne change plus de page
    // pas cool: je n'envoie plus les informations
    // => on va ajouter un appel à fetch
    // => permet d'envoyer un requête AJAX sans changer de page

    // avant d'envoyer la requête ajax
    // on va récuperer les infos remplies dans le formulaire
    console.log(this);
    // aspire les infos du formulaire
    var formData = new FormData(this);  // Programmation Orientée Objet
    // on va envoyer ces infos avec le fetch

    envoyerRequeteAjax(formData, (objetJS) => {
        // en utilisant une fonction fléchée
        // => avantage: je garde le this d'avant
        // cool: je peux manipuler un objet JS
        console.log(objetJS);
        if (objetJS.confirmation)
        {
            // je vais copier la valeur dans la balise div.confirmation
            console.log(this); // balise form     
            // dans ma balise form je vais chercher la balise div.confirmation
            this.querySelector(".confirmation").innerHTML = objetJS.confirmation;
        }

        if (objetJS.tabGalerie)
        {
            // la fonction va créer le HTML pour afficher les articles
            creerHtmlGalerie(objetJS.tabGalerie);
        }
    });

}

ajouterAction('form.ajax', 'submit', envoyerFormulaireAjax);


var tabGalerieUpdate = [];
function creerHtmlGalerie (tabGalerie)
{
    // mémoriser le tableau pour le update
    tabGalerieUpdate = tabGalerie;

    // vider la liste avant de la mettre à jour
    // insérer le code HTML dans la balise div.listeGalerie
    var listeGalerieAdmin = document.querySelector("div.listeGalerieAdmin");
    
    // si il n'y a pas cette balise, alors on ne fait rien
    if (listeGalerieAdmin == null) return;

    listeGalerieAdmin.innerHTML = '';

    // parcourir le tableau
    // crud non terminé pour une galerie de photos
    tabGalerie.forEach(function(article, indice){
        // je vais construire le HTML
        var codeHtmlArticle = `
            <article>
                <div class="categorie">${article.categorie}</div>
                <button class="delete" data-id="${article.id}" id="delete-${article.id}">supprimer</button>
                <button class="update" data-indice="${indice}" data-id="${article.id}" id="update-${article.id}">modifier</button>
                <h3>${article.titre}</h3>
                <img src="${article.photo}" alt="${article.photo}">
                <p>${article.contenu}</p>
            </article>
        `;

        listeGalerieAdmin.insertAdjacentHTML('beforeend', codeHtmlArticle);
    });


    function modifierArticle (event)
    {
        console.log('tu as cliqué');
        console.log(this);  // this donne le bouton sur lequel on a cliqué

        // on va afficher la section.section-update
        var sectionUpdate = document.querySelector(".section-update");
        // on va ajouter la classe .afficher
        sectionUpdate.classList.add("afficher");

        // je vais pré-remplir le formulaire de update 
        // avec les infos de l'article dans le tableau
        // je vais récupérer data-indice
        var indice = this.getAttribute("data-indice");
        // je vais utiliser l'indice pour retrouver l'élément dans le tableau
        var article = tabGalerieUpdate[indice];
        // debug
        console.log(article);

        // je vais pré-remplir les champs du formulaire d'update
        // id
        var inputId = document.querySelector('.section-update input[name=id]');
        inputId.value = article.id;
        // titre
        var inputTitre = document.querySelector('.section-update input[name=titre]');
        inputTitre.value = article.titre;
        // description
        var inputContenu = document.querySelector('.section-update textarea[name=contenu]');
        inputContenu.value = article.contenu;
        // photo
        var inputPhoto = document.querySelector('.section-update input[name=photo]');
        inputPhoto.value = article.photo;

    }
    ajouterAction('.listeGalerieAdmin button.update', 'click', modifierArticle);

    function supprimerArticle (event)
    {
        // debug 
        console.log('tu as cliqué');
        console.log(this);  // this donne le bouton sur lequel on a cliqué

        // il faudrait pour pouvoir lancer la requête ajax
        // que je puisse retrouver id de la ligne à supprimer
        // on a préparé le HTML pour retrouver id dans l'attribut data-id
        var idLigne = this.getAttribute("data-id");
        console.log(idLigne);
        
        // on va envoyer une requête ajax vers api-json.php
        // et on va demander à supprimer cette ligne
        var formData = new FormData();
        // en JS, je remplis les infos nécessaires pour traiter le formulaire
        formData.append("idFormulaire", "galerie-delete");
        formData.append("nomTable", "galerie");
        formData.append("id", idLigne);

        envoyerRequeteAjax(formData, (objetJS) => {
            // en utilisant une fonction fléchée
            // => avantage: je garde le this d'avant
            // cool: je peux manipuler un objet JS
            console.log(objetJS);

            if (objetJS.tabGalerie)
            {
                // la fonction va créer le HTML pour afficher les articles
                creerHtmlGalerie(objetJS.tabGalerie);
            }
        });

    }
    ajouterAction('.listeGalerieAdmin button.delete', 'click', supprimerArticle);

}


// je veux récupérer la liste des articles
// dès le chargement de la page
// on va envoyer une requête ajax
// et récupérer la liste des articles
function chargerListeArticle ()
{
    console.log("chargerListeArticle");

    // on va envoyer une requête ajax vers api-json.php
    // et on va demander à supprimer cette ligne
    var formData = new FormData();
    // en JS, je remplis les infos nécessaires pour traiter le formulaire
    // https://developer.mozilla.org/fr/docs/Web/API/FormData/append#Syntaxe
    formData.append("idFormulaire", "galerie-delete");
    formData.append("nomTable", "galerie");
    formData.append("id", 0);   // on triche car id n'est jamais égal à 0

    envoyerRequeteAjax(formData, (objetJS) => {
        // en utilisant une fonction fléchée
        // => avantage: je garde le this d'avant
        // cool: je peux manipuler un objet JS
        console.log(objetJS);

        if (objetJS.tabGalerie)
        {
            // la fonction va créer le HTML pour afficher les articles
            creerHtmlGalerie(objetJS.tabGalerie);
        }
    });

}

// appeler la fonction pour activer le code
chargerListeArticle();

// on ajoute un event listener sur la div.close
// pour enlever la classe afficher sur la section.section-update
function cacherPopup ()
{
    var sectionUpdate = document.querySelector('.section-update');
    sectionUpdate.classList.remove('afficher');
}
ajouterAction('.close', 'click', cacherPopup);



///////////////////////////////////////////////////////////////////
// var listeFormAjax = document.querySelectorAll("form.ajax");
// listeFormAjax.forEach(function(formulaire){
//     // on ajoute un event listener sur 'submit'
//     formulaire.addEventListener('submit', function(event){
//         event.preventDefault(); // bloque l'envoi classique du formulaire

//         // ON VA RECUPERER LES INFOS DU FORMULAIRE
//         var formData = new FormData(this);

//         // JE PEUX ENVOYER UNE REQUETE AJAX AVEC fetch
//         fetch('api-json.php', {
//                 method: "POST",
//                 body: formData      // LES INFOS DU FORMULAIRE SONT ENVOYEES AUSSI
//         })
//         .then((response) => {
//             // COOL AVEC JS
//             // JE PEUX DEMANDER A RECUPERER UN OBJET JSON A PARTIR DU TEXTE JSON
//             return response.json();
//         })
//         .then((objetJSON) => {
//             // JE VEUX RECUPERER LA PROPRIETE confirmation
//             // ET JE VEUX MODIFIER LE TEXTE DE LA BALISE div.confirmation AVEC CE TEXTE
//             this.querySelector('div.confirmation').innerHTML = objetJSON.confirmation;

//         });
//     });
// })                

