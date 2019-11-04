-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  lun. 04 nov. 2019 à 08:35
-- Version du serveur :  5.7.25
-- Version de PHP :  7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `cv_contacts`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `nom` varchar(160) NOT NULL,
  `email` varchar(160) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `nom`, `email`, `message`) VALUES
(6, 'Titi', 'titi@mail.me', 'titi'),
(7, 'utilisateur du 29/10', '29@mail.me', 'Bien présente'),
(8, 'Titi', 'titi@mail.me', 'tititi'),
(9, 'Titi', 'titi@mail.me', 'jfa\"jfo\"'),
(10, 'Titi', 'titi@mail.me', 'jfa\"jfo\"'),
(11, 'Titi', 'titi@mail.me', 'hdh'),
(12, 'hello', 'world@mail.me', 'un petit msg'),
(13, 'titu', 'tutifruti@mail.me', 'hello tutti frutti'),
(14, 'Cathy', 'clr@mail.me', 'encore un petit message de confirmation de la bdd');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
