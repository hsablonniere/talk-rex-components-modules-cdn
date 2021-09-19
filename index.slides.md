---
author: Hubert Sablonnière
author-twitter: @hsablonniere
author-company: Clever Cloud
hashtags: #javascript #tooling #web-components #cdn
event: Devoxx France
date: 29 septembre 2021
---

# _Dans cette_ *Jungle de  l'outillage JavaScript*, _un retour à la simplicité est-il encore possible ?_

## poster
> Slide poster pour commencer

## blank black
> #Fondu au noir#
> #voix grave, lente et rassurante#
> Détendez vous...
> Fermez les yeux...
> Vous êtes en 2008, le dimanche 8 juin pour être précis.
> Vous venez de voir Nadal remporter son 4ème Roland Garros en battant Roger Federer et on va pas s'mentir, le match était vraiment chiant.
> Vous hésitez à vous faire un ciné mais vous ne croyez pas à cette rumeur d'un 4ème Indiana Jones ... n'importe quoi.
> À la place, vous décidez de regarder le season finale de Lost saison 4.
 <!-- grâce à votre cousin américan qui vous envoie les VHS par la poste. -->
 > #voix enthousiaste#
> Wow ce cliffhanger de dingue avec machin dans le cercueil !!
> #voix grave, lente et rassurante#
> Du coup : impossible de dormir.
> Vous pensez à votre semaine de boulot qui reprend demain.
> #voix hypnose#
> Vous aimez votre poste de dev frontend.
> #voix grave, lente et rassurante#
<!-- https://www.w3counter.com/globalstats.php?year=2008&month=6 -->
> Vous pestez contre la domination d'IE 6 et 7 avec leurs 63 pourcents de part de marché.
> D'ailleurs, depuis que vous avez découvert Firebug, vous ne bossez qu'avec Firefox.
> Ils ont quand même réussi à monter à 30 pourcents chez Mozilla.
> Pendant ce temps là, Safari et Opera se partage les miettes avec quelques pourcents chacun.
<!-- Dojo 2005, Prototype 2005, Mootools 2007 -->
<!-- https://jquery.org/history/ -->
<!-- > On en est à la version 1.2.6 (mai 2008). -->
> Côté framework JavaScript, vous avez testé Mootools et Prototype mais depuis qq temps, vous êtes plutôt team jQuery.
> Avec lui, les bugs d'IE ne vous font presque plus peur.
> Quand vous avez besoin d'un plugin => facile, une petite recherche et hop :
> vous tombez sur Google Code,
> vous copiez/collez la version minifiée dans votre projet,
> vous ajoutez la balise script qui va bien et le tour est joué.
> Il vous arrive même parfois de référencer directement l'URL d'un CDN qui propose les dépendances dont vous avez besoin.
> Pas de téléchargement, des balises script et ça "juste marche".
#voix admirative#
> C'est beau.
> Cette simplicité vous appaise et vous vous endormez paisiblement.

## todo
PAF + son horn
<!-- https://www.youtube.com/watch?v=coQN8zJQE04 -->
> #voix énergique#
> Et là, PAF !!
> Que se passe t-il ?
> Mais où êtes vous ?
> Et surtout, quand êtes vous ?

## todo
Calendrier
> #voix dramatique#
> Tu viens de débarquer en 2021 où le chaos s'est installé :

## todo
Nadal
> => Nadal a perdu 4 fois Roland Garros.

## todo
Lost
> => La fin de Lost était nulle.

## todo
Indiana Jones
> => Il y a des rumeurs d'un 5ème Indiana Jones pour 2022 ... n'im-por-te quoi.

## todo
comparatif fusées
> => On continue à détraquer le climat mais pendant ce temps là, on a des milliardaires qui font un concours de "fusée" pour aller sur Mars.

## todo
brexit
> => Le Royaume Uni est sorti de l'UE.

## todo
pangolin
> => et pour coroner le tout, depuis qu'un mec a bouffé un pangolin à l'autre bout de la planète,

## todo
masques + QR code
> on porte tous des masques et les QR code sont à la mode.
> Ouais je sais, c'est n'importe quoi mais c'est vrai.
> Côté dev frontend :

## todo
Chrome 63%
> Google a sorti un navigateur et domine le marché avec 63%.

## todo
Microsoft Edge
> Microsoft a abandonné IE pour créer Edge, un navigateur basé sur celui de Google.

## todo
iPhone = SMIC => Safari 18%
> Apple impose Safari sur tous ses iMachins (qui coutent un SMIC), du coup, ils sont montés à 18%.

## todo
Firefox 5%
> En pendant ce temps là, notre petit panda roux adoré est tombé sous la barre des 5%.
> C'est tellement triste, mais attends il y a pire :

## todo
RIP jQuery
> jQuery c'est devenu has been, genre has been de ouf.
> Maintenant, le framework à la mode,

## todo
> c'est React.
> Tout le monde fait des SPA, des Single Page Application.
> Et pour installer un plugin, une dépendance, tu peux oublier les balises script en mode plug-and-play.

## todo
Node.js
npm
browserify
webpack
rollup
parcel
esbuild
swc
babel
vite
snowpack
traceur
typescript
terser
uglify
sass
less
postcss
autoprefixer
eslint
prettier

> Il te faut Node.js, npm, un bundler, un transpiler, un minifier, un linter, un formatter...
> En vrai, faut un bac+17 pour t'y retrouver dans tous ces outils JavaScript.
> C'est devenu la jungle et je crois que le moment est venu de faire le point sur la question.

## poster
> #mode normal (et énergique)#
> Bonjour à *toutes* et à tous !
> J'm'appelle Hubert Sablonnière,
> J'suis développeur Web chez #Clever Cloud# et aujourd'hui, j'ai envie de vous parler de jungle et d'outils JavaScript.
> Plus précisémment, on va d'abord revenir sur certains concepts et termes inventés ou popularisés par ces outils.
> Et ensuite, on verra au travers d'un retour d'expérience, si c'est possible de revenir à un système plus simple,
> comment ?
> et qu'est ce que cela implique ?
> Allez, c'est parti !

## section
C'était mieux avant ?
> On pourrait qualifier mon intro de caricature de boomer, un peu trop exagérée en mode :
> #voix gnagnagna#
> "Oui-ennn, mais c'était mieux avant, à l'époque, avec jQuery, gna gna gna gna gna..."
> #pause#
> On pourrait rejeter ce genre de remarques et tomber dans la facilité en se moquant,
> mais moi j'crois qu'c'est important de se poser la question.
> Par exemple, pour Indiana Jones ou Lost, sans déconner, y'a pas débat. C'était mieux avant.
> #Lever la main pour inciter le public à le faire#
> Pour c'qui concerne le monde du dev frontend, ce constat de complexité, on est très nombreux à l'avoir fait et à le faire régulièrement.
> On compte plus les articles parlant de "JavaScript fatigue".
> Cette fatigue, elle est venue des frameworks mais ces derniers temps, elle vient aussi et surtout des outils.
> Et si c'était qu'une histoire de "Je sors de formation, c'est mon premier job et j'y comprends rien à cette jungle", à la rigueur, bon.
> Mais là, ça touche tout le monde.
> Il y a 

## section
Guide de survie
> On commence tout de suite par un petit guide de survie.
> Expliquer comment les concepts/termes sont arrivés et à quoi tout cela sert

## todo
Minification
* Moins de code à charger
* Moins de code à parser
* Moins de code à éxécuter

## todo
Concaténation
* Moins de requêtes

## todo
Bundling
* Moins de requêtes

## todo
Cache busting
* Garder en cache ce qu'on a déjà

## todo
Tree shaking
* Moins de code à transférer
* Moins de code à parser
* Moins de code à éxécuter

## todo
Scope hoisting
* Réduire l'effet escalier du chargement

## todo
Code splitting (chunking)
* Charger uniquement à la demande
* Moins de code à charger
* Moins de code à parser
* Moins de code à éxécuter

## todo
Transpiling

## section
Un nouvel espoir...
> Question de ce que ça fait de revenir à ce qu'on avait avant?

## todo
Les composants chez Clever Cloud

## todo
> Pour les utiliser dans la console, une SPA, il faut : (lister toutes les étapes)
> parler aussi des étapes de mise en prod :
> compression, header de cache, h1/h2/h3...

## todo
> on veut utiliser nos composant ailleurs que dans des SPA
> MPA Play/Scala, Wordpress, site statique
> on veut que des clients ou des partenaires puisse les utiliser le plus facilement possible

## todo
DIY vs Plug-and-Play
> explication du DIY (je sais ce que je fais, je veux la maitrise)
> explication du Plug-and-play (je veux pas prendre cette complexité à ma charge, ça ne vaut pas le coup, donne moi le meilleur résultat possible)
> analogie pizza

## todo
> ici le DIY, c'est ce qu'on a déjà évoqué
> le plug-and-play, finalement, ça serait plutôt une approche à la jQuery avec juste des balises script

## todo
> précisons qu'il n'y a rien de bien nouveau
> on avait déjà des CDN publics avant
> ce qui a changé, c'est qu'aujourd'hui, certains d'entre eux sont un peu plus smart
> ils ont une connaissance de npm
> resolution des bare imports
> semver
> polyfill
> compression
> jspm, unpkg, skypack
> l'autre truc qui a changé, c'est qu'on ne peut plus se reposer sur le cache partagé d'un CDN

## todo
> mais du coup, qu'est ce que ça implique dans notre cas particulier ce mode plug and play ?
> expliquer qu'on utilise ESM et on publie sur npm en ESM
> maintenant c'est supporté dans les browsers
> du coup, ça marche sans rien faire

## todo
> par contre, on doit quant même demander à nos utilisateurs de mettre une balise script par composant
> en plus c'est pas minifié à 100% (CSS, JS)
> ça ne gère pas tjs les images (SVG et sans oublier la minification)
> + le i18n avec le boilerplate de setup de langue (si c'est nécessaire)

## todo
> idée, est-ce qu'on ne pourrait pas faire notre propre smart CDN
> et avoir une seule balise script pour les gouverner tous

## todo
> allez, c'est parti
> on va commencer par le pire cas possible
> et on va mesurer

## todo
> Source individual ES modules (raw unminified)
> Minify JavaScript
> Minify inlined HTML templates and CSS
> Minify SVG
> Enable treeshaking
> Shim unused stuffs from 3rd parties
> Enable gzip
> Enable brotli
<!-- > Keep alive TODO?? -->
<!-- > domain sharding TODO?? -->
<!-- > Enable HTTP/2 TODO?? -->
<!-- > Enable HTTP/3 TODO?? -->
> Code splitting (chunks)
> Code splitting (manual chunks)
> Hoist imports (rollup system)
> Hoist imports (JS depcache reverse order)
> Hoist imports (JS depcache reverse order dynamic import)
> Hoist imports (JS depcache reverse order dynamic import + preload SVG)
<!-- > Preload with Link header TODO?? -->
<!-- > HTTP/2 push TODO?? -->
> comparer à tout dans le bundle
> comparer à un bundle sélectif

## todo
> la cerise sur le gateau
> c'est l'auto i18n au besoin
> la bonne gestion du cache entre versions
> (pourrait mieux faire avec les import maps)
 
## todo
> serveiller les import maps
> serveiller les web bundles / resource bundles https://github.com/WICG/resource-bundles

## todo
> expliquer la mise en place du Cellar + endpoint dynamique chez CF

## section
à suivre...
> en fait, de la même manière qu'avec notre plateforme Cloud, on essaye de convaincre les gens de pas se prendre la tête avec les serveurs, les mises à jour, la sécu tout ça et de nous le déléguer car on sait faire
> ici on vient déplacer la connaissance et la complexité de "prodification" de l'app qui consomme à celui qui expose un lib de composants
> comme vous l'avez vu, c'est pas forcément la meilleure solution, mais on trouve que dans pas mal de cas, le résultat est sufisant comparer à cout de mise en place et maintenance
> on espère que ça vous donnera des idées

## poster
*Merci beaucoup !* _vous êtes un super public..._
> notes for empty slide (line 1)

## credits

* https://www.vexels.com/vectors/preview/70035/tropical-frame-styled-jungle-background
* https://www.cufonfonts.com/font/tintin
* https://fonts.google.com/specimen/PT+Sans
* https://fonts.google.com/specimen/Anton
* Marimba note https://www.youtube.com/watch?v=8FJMTJmuoU8
* Horn sound effect https://www.youtube.com/watch?v=gKz1X2rn3CQ
* Forest sound https://www.youtube.com/watch?v=IsPBplWLImI
* Source des composants : https://github.com/CleverCloud/clever-components
* Storybook des composants : https://www.clever-cloud.com/doc/clever-components/
* UI pour sélectionner : https://components.clever-cloud.com/
* Smart CDN source : https://github.com/CleverCloud/clever-components-cdn