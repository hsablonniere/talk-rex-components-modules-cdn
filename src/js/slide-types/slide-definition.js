import { css, html } from 'lit';
import { defineSlideType, playMedia, stopMedia } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { $$, markup } from '../utils.mjs';

const TIMELINE_REGEX = /^\* ([^:]*): (.*) (<img.*)$/;

function select (html, selector) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  return Array.from(tpl.content.querySelectorAll(selector));
}

defineSlideType('slide-definition', {
  render ({ content, attrs }) {

    const title = content
        .split('\n')
        .find((line) => line.match(/^[a-zA-Z0-9]/) != null)
      ?? '';

    const facts = content.split('\n')
      .filter((line) => line.startsWith('* '))
      .filter((line) => line.match(TIMELINE_REGEX) == null)
      .map((line) => line.replace(/^\* /, ''))
      .map((fact) => html`
        <div class="fact">${unsafeHTML(markup(fact))}</div>
      `);

    const timeline = content.split('\n')
      .map((line) => line.match(TIMELINE_REGEX)?.slice(1))
      .filter((matches) => matches != null)
      .map(([year, name, image]) => html`
        <div class="timeline-item">
          ${unsafeHTML(image)}
          <div class="marker">
            <div class="line"></div>
            <div class="dot"></div>
          </div>
          <div class="name">${unsafeHTML(name)}</div>
          <div class="year">${year}</div>
        </div>
      `);

    const images = content.split('\n')
      .filter((line) => line.startsWith('<img '))
      .map((img) => unsafeHTML(img));

    const codeBlocks = select(content, 'pre');

    return html`
      ${attrs.animation != null ? html`
        <audio id="stabilo" src="/src/music/stabilo.ogg"></audio>
      ` : ''}
      <div class="title">
        ${title.length > 0 ? html`
          ${title}
          <div class="stabilo"></div>
        ` : ''}
      </div>
      ${images.length ? html`
        <div class="image-wrapper">
          ${images}
        </div>
      ` : ''}
      ${facts.length ? html`
        <div class="fact-list">
          ${facts}
        </div>
      ` : ''}
      ${timeline.length ? html`
        <div class="timeline" id="timeline">
          ${timeline}
        </div>
      ` : ''}
      ${codeBlocks.length > 0 ? html`
        <div class="code" id="code">
          ${codeBlocks}
        </div>
      ` : ''}
      ${attrs.terminal != null ? html`
        <div class="terminal-wrapper">
          <div class="terminal" id="termial"></div>
        </div>
      ` : ''}
    `;
  },
  onEnter ({ stabilo, timeline, termial }) {
    playMedia(stabilo, 500);
    if (timeline != null) {
      timeline.__animations = [];
      $$(timeline, '.timeline-item').forEach((item, i) => {
        $$(item, 'img, .dot, .name, .year').forEach((element) => {
          timeline.__animations.push(element.animate([
            { opacity: '0', transform: 'translateX(5rem)' },
            { opacity: '1', transform: 'translateX(0)' },
          ], {
            easing: 'ease-in-out',
            fill: 'forwards',
            delay: i * 75 + 500,
            duration: 150,
          }));
        });
      });
    }
    if (termial) {
      console.log(termial.getBoundingClientRect())
    }
  },
  onLeave (position, { stabilo, timeline }) {
    stopMedia(stabilo, 500);
    if (timeline != null && timeline.__animations != null) {
      timeline.__animations.forEach((anim) => anim.cancel());
    }
  },
  // language=CSS
  styles: css`
    @keyframes stabilo {
      0% {
        transform: scaleX(0);
      }
      100% {
        transform: scaleX(1);
      }
    }

    :host {
      align-items: center;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content 1fr;
      justify-content: center;
    }

    .title {
      text-align: center;
      justify-self: center;
      color: #0082ff;
      /*border-bottom: 0.25rem solid #3babfd;*/
      position: relative;
      padding: 0 1rem;
      /*margin: 3rem 0 0;*/
      margin: 2rem 0;
      font-family: skranji, sans-serif;
      font-size: 3.5rem;
      font-weight: bold;
      transform: rotate(-1deg) translateY(0%);
      z-index: 2;
    }

    .stabilo {
      content: '';
      display: block;
      height: 1.5rem;
      background-color: #ff0;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 1rem;
      z-index: -1;
      transform-origin: left center;
    }

    :host([data-position="current"][animation]) .stabilo {
      transform: scaleX(0);
      animation: 500ms ease-in-out 500ms stabilo;
      animation-fill-mode: forwards;
    }

    .image-wrapper {
      align-self: stretch;
      position: relative;
    }

    .image-wrapper img {
      display: block;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      position: absolute;
      width: 100%;
    }

    .fact-list {
      align-content: center;
      align-self: stretch;
      box-sizing: border-box;
      display: grid;
      justify-items: center;
      justify-content: center;
      position: relative;
      padding: 0 4rem;
    }

    .fact {
      color: #43854a;
      font-family: 'Yanone Kaffeesatz', sans-serif;
      font-size: 4rem;
      font-weight: bold;
      text-align: center;
    }

    .timeline {
      display: grid;
      /*grid-template-columns: repeat(auto-fit, minmax(var(--min-w, 6rem), 1fr));*/
      grid-auto-flow: column;
      grid-template-rows: 1fr auto auto auto;
      justify-items: center;
    }

    .timeline-item {
      --space: 2rem;
      display: contents;
    }

    .timeline-item:first-child {
      --space-l: var(--space);
    }

    .timeline-item:last-child {
      --space-r: var(--space);
    }

    .timeline img,
    .name,
    .dot,
    .year {
      margin-left: var(--space-l);
      margin-right: var(--space-r);
      opacity: 0;
    }

    .timeline img {
      align-self: center;
      max-height: 6rem;
    }

    .marker {
      display: grid;
      grid-template-areas: "marker";
      width: 100%;
      justify-items: center;
      align-items: center;
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    .line {
      grid-area: marker;
      height: 0.5rem;
      background-color: #009452;
      width: 100%;
    }

    .dot {
      --size: 1rem;
      border: 0.25rem solid #000;
      grid-area: marker;
      height: var(--size);
      width: var(--size);
      background-color: #fff;
      border-radius: 50%;
    }

    .name {
      font-family: 'Yanone Kaffeesatz', sans-serif;
      font-size: 2.5rem;
      font-weight: bold;
      line-height: 1.25;
      text-align: center;
      align-self: center;
    }

    .year {
      font-family: monospace;
      color: #555;
      font-size: 1.5rem;
      /*font-weight: bold;*/
      font-style: italic;
    }

    .code {
      display: grid;
      justify-content: center;
      gap: 1rem;
    }

    pre {
      background-color: #f5f5f5;
      white-space: pre-wrap;
      margin: 0 2rem;
      padding: 1rem;
      border-radius: 0.5rem;
    }

    pre[invisible] {
      opacity: 0;
    }

    .terminal-wrapper {
      display: grid;
      align-content: center;
      justify-content: center;
    }

    .terminal {
      background-color: #000;
      height: 10rem;
      width: 50rem;
      /*border-radius: 0.25rem;*/
      box-shadow: 0 0 0.5rem #777;
    }
  `,
});
