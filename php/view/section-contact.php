<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <title>CV</title>

  <link href="https://fonts.googleapis.com/css?family=B612+Mono&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Mes CSS -->
  <link rel="stylesheet" type="text/css" href="assets/css/style-contact.css" title="">


  <!-- pour mon titre h1-->
  <script src="https://unpkg.com/scrollreveal@4"></script>


</head>

<body onload="setActiveStyleSheet('');">

  <header id="header">
    <nav>
      <div class="logo">
        <img  class=".maphoto"  src="assets/images/photo-cv.jpg" alt="photo de cathy" />
      </div>
      <div class="ico">
        <a href="index.php"><img class="i" src="assets/images/img_svg/01-experience.svg">Expériences</a>
        <a href="index.php"><img class="i" src="assets/images/img_svg/03-formation.svg">Formations</a>
        <a href="index.php"><img class="i" src="assets/images/img_svg/02-competence.svg">Compétences</a>
        <a href="contact.php"><img class="i" src="assets/images/img_svg/04-contact.svg">Contact</a>
      </div>
    </nav>
</header>
<h1 id="haut">Développeuse Web & Web Mobile</h1>

  <section>
    <h3>Me contacter</h3>
    <form method="POST" action="api-json.php" class="ajax">
      <div>
      <label>
        <span>Nom</span>
        <!-- CONSEIL: DONNER EN name LE NOM DE LA COLONNE SQL -->
        <input type="text" name="nom" required placeholder="Entrez votre nom">
      </label>
    </div>
    <div>
      <label>
        <span>Email</span>
        <!-- CONSEIL: DONNER EN name LE NOM DE LA COLONNE SQL -->
        <input type="email" name="email" required placeholder="Entrez votre email">
      </label>
    </div>
    <div>
      <label>
        <span>Message</span>
        <!-- CONSEIL: DONNER EN name LE NOM DE LA COLONNE SQL -->
        <textarea name="message" cols="80" rows="5" required placeholder="Laissez un message"></textarea>
      </label>
    </div>
    <div class="button">
      <button type="submit">Envoyer votre message</button>
    </div>
      <div class="confirmation">
        <!-- ICI AVEC AJAX, ON AFFICHERA LE MESSAGE DE CONFIRMATION -->
      </div>
      <!-- Partie technique -->
      <input type="hidden" name="idFormulaire"  value="contact">
    </form>
  </section>
