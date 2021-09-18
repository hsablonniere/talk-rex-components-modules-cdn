# Smarts CDNs for Clever components

Our goal:

We want to provide our users (clients, partners...) a simple "plug-and-play" system to load and use one or many Clever components in a web page.

The interface should look like this:

```html
<script type="module" src="https://example.com/components?lang=fr&version=4.0.0&components=cc-toggle,cc-tcp-redirection-form"></script>
```

This should trigger the load of JavaScript files, images, fonts and translations.

## User interface requirements

1. The user can define a list of components he/she wants to load.
2. The user can define the version of the components he/she wants to load.
3. The user can define the language used to translate/internationalize the components he/she wants to load.

Bonus:

4. Specify the version with a SemVer expression.

## Performance requirements

The main perf requirement is: the components must be loaded, parsed and executed (l/p/e) the quickest possible way.

### Less data

* Only l/p/e the components listed by the user.
* Only l/p/e the translations for the language defined by the user.
* Only l/p/e the translations for the components listed by the user.
* Don't l/p/e translations if listed components don't have any translations.
* Only l/p/e internal dependencies imported by components.
  * Don't l/p/e unused code from internal dependencies.
* Only l/p/e third party dependencies imported by components.
  * Don't l/p/e unused code from third party dependencies.
* Only load assets used by listed components (images, fonts...).

### Small data

* Minify so the amount of code to load/parse/execute is smaller.
  * Ex: Terser for JS, SVGO for SVG, also minify HTML and CSS in templates
* Compress code and assets so the amount of data to load is smaller.
  * Ex: gzip/brotli...

### Quick load

We don't have any control over the connexion speed of our users but we have options limit impacts of potential latency problems.

* Use HTTP 1.1 keep-alive to reuse TCP connexions.
* Use HTTP 1.1 with multiple sub-domains to increase parallel nb of connexions per origin (limited to 6 in most browsers).
* Use HTTP/2 to reduce latency, increase parallelism and reuse connexion.
* Bundle/concatenate to reduce number of requests.
* Import hoisting to start sub requests sooner.
* Link preload to start sub requests sooner.

### Less data (bis)

We already adressed what can be done to improve first view.
Here we list options to improve perfs on repeat view:

* Configure cache headers correctly so the browser does not download something it already has.
  * Make we can have infinite expiration on scripts and assets.

### Open questions:

* How can the Service Worker cache API help in this context of third party CDN?
* How can a Service Worker help in this context of third party CDN?
* Can we have the best of both world: 1 bundle request with everything on first load + independant caching and loading on repeat view?
* What's the cost of doing "on the fly bundling"?
* What about Web Bundles

## Testing public smart CDN:

### jspm

https://jspm.org/#exports-field
https://jsbin.com/yicumihaso/3/edit?html,output
https://jsbin.com/mazefelive/edit?html,output
https://jspm.dev/@clevercloud/components@4.1.0-beta.4/atoms/cc-toggle.js

* Around 30min of latency between npm publish and availability
  * jspm.dev achieves instant response times for all requests because the entire compute job for npm has been completed on Google Cloud
  * every version of every package on npm has been built and optimized and stored for serving through Google Cloud CDN
* HTTP/2
* brotli
  * In addition all modules are optimized with level 9 Brotli compression, a fully supported compression algorithm across all browsers supporting ES modules.
* cache-control: public, max-age=31536000, s-maxage=604800, immutable
* etag
* expires
* last-modified
* Google Cloud Storage (x-goog headers)
* import hoisting
* no chunks sur les third party
* no auto minification (Guy says soon...)
* Images with import.meta.url don't work
* Based on export maps

### unpkg

https://jsbin.com/jiqegelisa/1/edit?html,output
https://unpkg.com/@clevercloud/components@4.1.0-beta.5/dist/atoms/cc-toggle.js?module

* Available very quickly
* HTTP/2
* brotli
* cache-control: public, max-age=31536000
* etag
* expires
* last-modified
* Cloudflare
* no import hoisting
* no chunks at all
* minified
* images with import.meta.url work
* Based on full path of what's in the packaged module

--

* No support for "exports" maps
* ESM is opt-in with ?module
* We need to refer to /dist/...
* Images work (because of the /dist...)
* Some component fail when a dependency is not ESM (because we put ?module everywhere)
  * cc-input-text because of "clipboard-copy"
  * cc-tile-requests & cc-tile-status-codes because of "statuses"

### skypack (and pika CDN)

https://docs.skypack.dev/lookup-urls/pinned-urls-optimized
https://docs.skypack.dev/lookup-urls/lookup-urls
https://www.pika.dev/cdn

* Pika CDN and skypack have two different behaviours
* It's unclear what Pika CDN will become
* Skypack uses cloudflare and vercel

Both those systems don't work with our repo.

* https://cdn.skypack.dev/@clevercloud/components@4.1.0-beta.5/dist/atoms/cc-toggle.js
  * ⠼ skypack installing... @clevercloud/components, @clevercloud/components/assets/backup.svg
  * ✖ Cannot find module '@clevercloud/components/assets/backup.svg'
  * in this version, backup.svg is the first non javascript file entry in "exports"

* https://cdn.skypack.dev/@clevercloud/components@4.1.0-beta.4/dist/atoms/cc-toggle.js
  * ⠼ skypack installing... @clevercloud/components, @clevercloud/components/lib/i18n.js
  * ✖ Cannot find module '@clevercloud/components/lib/i18n.js'
  * in this version, i18n.js is the first direct file entry in "exports"

* https://cdn.skypack.dev/@clevercloud/components@4.0.0/dist/atoms/cc-toggle.js
  * ⠼ skypack installing... @clevercloud/components
  * ✖ Cannot find module '/tmp/cdn/_eoHpok1UaZPlq8wWxDBR/node_modules/@clevercloud/components/dist/index.js'
  * in this version, we have a "main" pointing to "dist/index.js" which does not exist anymore

* https://cdn.pika.dev/@clevercloud/components@4.1.0-beta.5/atoms/cc-toggle.js
  * not found

* https://cdn.pika.dev/@clevercloud/components@4.1.0-beta.5/dist/atoms/cc-toggle.js
  * weird lit-element bug, we have lit-element source code inside the DOM

* https://cdn.pika.dev/@clevercloud/components@4.0.0/dist/atoms/cc-toggle.js
  * bad request

* ESM works by default
* We need to refer to /dist/...
* Images work (because of the /dist...)
* Weird bug on multiple with lit-html
* seems to auto-add polyfills if necessary

### packd-es.wcd.center from webcomponents.dev people (George)

https://jsbin.com/bolodirone/1/edit?html,output
https://jsbin.com/zikajufuko/1/edit?html,output

* Slow build on first resquest (creates 1 mega bundle)
* HTTP/2
* gzip
* cache-control: public,max-age=86400,s-maxage=31536000
* etag
* NO expires
* No last-modified
* google frontend (firebase I think)
* no import hoisting (because 1 mega bundle)
* images with import.meta.url work
* Based on full path of what's in the packaged module

### Custom CDN system by Clever

https://jsbin.com/refebiseve/edit?html,output

https://cellar-c2.services.clever-cloud.com/components/3.0.2/load.js?components=cc-flex-gap,cc-block,cc-input-text,cc-toggle,cc-tcp-redirection-form

## Benchmark ideas

Multiple pages using different setup of components so we can go from one to another

Components without translations
Components with translations
Example for SPA
Example for MPA

* simple.html
  * <cc-input-text> LE/i18n/img/clipboard-copy
  * <cc-tcp-redirection-form> LE/i18n
    * <cc-block> LE/i18n/img
      * <cc-button> LE/i18n
      * <cc-expand>
      * <cc-img> LE
    * <cc-error> LE/i18n/img
      * <cc-button> LE/i18n
      * <cc-loader>
    * <cc-tcp-redirection> LE/i18n/img
      * <cc-button> LE/i18n
      * <cc-flex-gap>
      * <cc-loader>
* multiple.html /one
  * <cc-toggle> LE
  * <cc-img> LE
* multiple.html /two
  * <cc-env-var-form> LE/i18n
    * <cc-button> LE/i18n
    * <cc-expand>
    * <cc-loader>
    * <cc-toggle> LE
    * <cc-error> LE/i18n/img
      * <cc-button> LE/i18n
      * <cc-loader>
    * <cc-env-var-editor-expert> LE/i18n/cc-client
      * <cc-input-text> LE/i18n/img/clipboard-copy
      * <cc-error> LE/i18n/img
        * <cc-button> LE/i18n
        * <cc-loader>
    * <cc-env-var-editor-simple> LE/i18n
      * <cc-env-var-create> LE/i18n/cc-client
        * <cc-button> LE/i18n
        * <cc-flex-gap>
        * <cc-input-text> LE/i18n/img/clipboard-copy
        * <cc-error> LE/i18n/img
          * <cc-button> LE/i18n
          * <cc-loader>
      * <cc-env-var-input> LE/i18n
        * <cc-button> LE/i18n
        * <cc-flex-gap>
        * <cc-input-text> LE/i18n/img/clipboard-copy
* multiple.html /three
  * <cc-logsmap> LE/i18n
    * <cc-toggle> LE
    * <cc-map> LE/i18n/leaflet/geojson
      * <cc-loader>
      * <cc-error> LE/i18n/img
        * <cc-button> LE/i18n
        * <cc-loader>
  * <cc-tile-status-codes> LE/i18n/img/statuses/chart.js
    * <cc-button> LE/i18n
    * <cc-error> LE/i18n/img
        * <cc-button> LE/i18n
        * <cc-loader>

Here are the steps we can go throug to improve perfs

* raw source
* minified source
* minified source + gzip
* minified source + brotli
* http 1.1 keep alive
* http 1.1 multiple subdomains
* http/2
* import hoisting
* link preload
* 1 big bundle
* 1 big bundle (with only what's necessary)
* on the fly big bundle

## Notes

* Docs for export maps
  * https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_package_entry_points
* We'll probably need a trick to make sure translations can be loaded in parallel
  * maybe with a separate define custom element
* How do we load the CSS?

## Idée

À priori, je dirais que le mode le plus performant pour notre contexte, c'est:

à partir de ça https://example.com/components?lang=fr&version=4.0.0&components=cc-toggle,cc-tcp-redirection-form

On génère à la volée, un fichier JS qui contient ça:

```js
// Only if one of the components requires translations

import { addTranslations, setLanguage } from './i18n.js';
// file depends on lang query param
import { lang, translations } from './translations.en.js';

addTranslations(lang, translations);
setLanguage(lang);

// Import components using a match between "exact version" + "component name" to "content hash"

// cc-toggle en 4.0.0
import('./l3zvKk8zx6I.js')

// cc-tcp-redirection-form en 4.0.0
import('./ejKCCVSNsUU.js')
```

IMPROVEMENTS

* With this, I think the browser will wait to load/parse/execute both i18n + translation file before downloading components
  * maybe add a preload link header
* we could use import hoisting or link preload to start downloading chunks ASAP
  * which one first and in which order
  * we could also preload image

function preload (href, type) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  //link.crossOrigin = 'anonymous';
  link.href = href;
  document.head.appendChild(link);
}

preload('https://localhost:8082/cdn/split-min-js-html-css-svg/assets/clipboard.svg', 'image');

on peut imaginer un path du genre :

//

## Links

https://dev.to/btopro/part-1-how-penn-state-unbundles-web-components-for-cdn-deployments-20di
https://www.reddit.com/r/javascript/comments/hwwcxb/the_future_of_web_deployment_without_bundlers_or/
https://perf-track.web.app/polymer
https://blog.alwaysdata.com/2020/06/23/the-eternal-sunshine-of-the-zero-build-pipeline/
https://github.com/whatwg/fetch/issues/486
https://github.com/w3c/preload/issues/136
https://bugzilla.mozilla.org/show_bug.cgi?id=1379942

wpo stats
resources

twitter bundle par feature