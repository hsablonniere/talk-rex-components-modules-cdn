
## media logo
<img src="src/img/logo-clever-cloud.svg">

## todo
Les composants chez Clever Cloud

## demo-html
```html
<cc-input-text value="my s3cr3t" secret clipboard></cc-input-text>
```
<cc-input-text value="my s3cr3t" secret clipboard style="font-size: 2em; width: 14em"></cc-input-text>
> contexte Clever Cloud: web components, besoins internes divers, besoins externes

## media
<img src="src/img/screenshot-clever-components-storybook.jpg" screenshot-url="https://www.clever-cloud.com/doc/clever-components/?path=/story/%F0%9F%8F%A0-home-readme--page">

## media
<img src="src/img/screenshot-clever-components-github.jpg" screenshot-url="https://github.com/CleverCloud/clever-components">

## todo
> Pour les utiliser dans la console, une SPA, il faut : (lister toutes les étapes avec node.js machin)
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

## media
<img src="src/img/screenshot-jspm.jpg" screenshot-url="https://jspm.org/">

## media
<img src="src/img/screenshot-unpkg.jpg" screenshot-url="https://unpkg.com/">

## media
<img src="src/img/screenshot-skypack.jpg" screenshot-url="https://www.skypack.dev/">

## todo
> mais du coup, qu'est ce que ça implique dans notre cas particulier ce mode plug and play ?
> expliquer qu'on utilise ESM et on publie sur npm en ESM
> maintenant c'est supporté dans les browsers
> du coup, ça marche sans rien faire

<!-- https://modernizr.com/download?ambientlight-audio-batteryapi-setclasses -->

## definition
Exemple support
* 89: Chrome <img src="src/img/logo-chrome.svg">
* 89: Firefox <img src="src/img/logo-firefox.svg">
* 89: Safari <img src="src/img/logo-safari.svg">

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