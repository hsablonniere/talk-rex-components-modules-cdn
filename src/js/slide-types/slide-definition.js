import { css, html } from 'lit';
import { defineSlideType, play } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-definition', {
  render ({ content }) {
    console.log(content);

    const [title] = content.split('\n')
      .filter((line) => line.trim() !== '');

    const details = content.split('\n')
      .filter((line) => line.trim().startsWith('* '))
      .map((line) => line.replace(/^\* /, ''))
      .map((detail) => html`
        <div class="detail">${unsafeHTML(detail)}</div>
      `);

    const images = content.split('\n')
      .filter((line) => line.trim().startsWith('<img '))
      .map((img) => unsafeHTML(img));

    return html`
      <audio id="stabilo" src="/src/music/stabilo.ogg"></audio>
      <div class="title">
        ${title}
        <div class="stabilo"></div>
      </div>
      <div class="body">
        ${details}
        ${images}
      </div>
    `;
  },
  onEnter ({ stabilo }) {
    setTimeout(() => play(stabilo), 500);
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
      justify-self: center;
      color: #3babfd;
      color: #0082ff;
      /*border-bottom: 0.25rem solid #3babfd;*/
      position: relative;
      padding: 0 0.5rem;
      padding: 0 1rem;
      margin: 3rem 0 0;
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
      background-color:#ff0;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 1rem;
      z-index: -1;
      transform-origin: left center;
    }
    
    :host([data-position="current"]) .stabilo {
      transform: scaleX(0);
      animation: 500ms ease-in-out 500ms stabilo;
      animation-fill-mode: forwards;
    }

    .body {
      align-content: center;
      align-self: stretch;
      box-sizing: border-box;
      color: #43854a;
      display: grid;
      font-family: PT Sans, sans-serif;
      font-size: 2rem;
      font-weight: bold;
      justify-content: center;
      position: relative;
    }

    img {
      display: block;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      position: absolute;
      width: 100%;
    }
  `,
});
