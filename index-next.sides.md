* source => rollup => source (sans bare imports) + deps
* => bien expliquer le fait de mettre les fichiers sur un CDN
* => expliquer le contexte du benchmark
* compression
* minification
* treeshaking (+shim)
* HTTP/2
* code splitting (chunks + manual hunks)
* => c'est super verbeux
* => introduction du endpoint dynamique (explication du manifeste)
* hoist imports (avec différentes étapes)
* bonus => inlining des traductions
* => parler du cache

<!-------------------------------------------->



=> au fur et à mesure, on intègre les nouveaux composants dans la console
=> choix des web components
=> (?? tout de suite expliquer le besoin cross app et client/partenaires)
=> j'ai passé beaucoup de temps dans le monde des SPA JS (angular.js, vue...)
=> du coup, on expose la bibliothèque de composant sur npm
=> ?? comment est-ce qu'on integre ces composants dans la console ?

## definition
* : Node.js <img src="src/img/logo-nodejs.svg">
* : npm <img src="src/img/logo-npm.svg">
* : Webpack <img src="src/img/logo-webpack.svg">
> en plus de node et npm, il va falloir un bundler
> après il faut forcément un bundler
> car il va falloir résoudre les bare imports
> et potentiellement configurer un trucs pour copier les images
>

> "C'est bien des Web Components, hein ?"
> Q: du coup, comment on les intègre ? c'est facile ?
> H: npm install + réglage webpack (du coup il faut node + npm avec la bonne version)
> H: et encore dans notre cas on ne force pas l'utilisation d'un bundler en particulier ou de yarn
> Q: on a vraiment besoin de tous ces trucs ?
> Q: tu sais à terme, on ne va pas s'en servir que dans la console, on va s'en servir ailleurs et même des partenaires et clients
> Q: du coup, il faut que ce soit simple
> Q: on peut pas juste mettre une balise script en mode CDN, comme on faisait à la jQuery ?
> H: bah non, on ne sait pas quels composants les gens vont utiliser, les performances vont être pourries par rapport à quelqu'un qui fait un npm install et qui passe tout ça dans un bundler bien configuré
> Q: t'es sûr de ça ?

## todo
ce sont des web components (logo web component)

par réfléxe, je suis parti du principe que les gens qui veulent intégrer nos composants allait utiliser un bundler et donc node et npm
en faisant ça j'ai mis de côté tous les professionels du web qui n'utilise pas javascript dans leur suite d'outils
ou qui même s'ils savent mettre les mains dedans quand c'est nécessaire ont de bonne raison pour vouloir éviter de le faire (très fort)

drogué et enfermé dans ma bulle d'aficionados du JS, j'en vient à trop facilement oublier cela

c'est aussi assez culotté de ma part sachant que contrairement à un composant react/angular/vue/svelte...
un web component ça s'utilise partout
il faut juste ajouter une balise script
et ensuite on peut utiliser la balise telle quelle dans du PHP, CMS HTML, site statique (markdown)...

le truc c'est qu'avec une bibliothèque comme jQuery, on récupère tout le code en un seul fichier
si je fais ça dans mon cas, ça représente actuellement un peu plus de 80 composants (et sous composants) UI
et ça pèse 190kb / 650 kb (min+br)
si j'ai juste besoin du composant loader, c'est un peu abusé
surtout qu'à chaque nouveau composant, ça va grossir et grossir
du coup, je peux pas juste mettre sur un CDN un méga bundle optimisé avec tout

on va essayer de plutôt charger les fichiers à la demande

* source => rollup => source (sans bare imports) + deps
* => bien expliquer le fait de mettre les fichiers sur un CDN
* => expliquer le contexte du benchmark
* compression
* minification
* treeshaking (+shim)
* HTTP/2
* code splitting (chunks + manual hunks)
* => c'est super verbeux
* => introduction du endpoint dynamique (explication du manifeste)
* hoist imports (avec différentes étapes)
* bonus => inlining des traductions
* => parler du cache

ouverture

* pourquoi pas HTTP/2 push
* pourquoi pas preload ?
* pourquoi pas un CDN existant ?

## text
🚨 Il n'y a pas que le<br>JavaScript dans la vie
> Et à la fin, ça va bien se passer.
