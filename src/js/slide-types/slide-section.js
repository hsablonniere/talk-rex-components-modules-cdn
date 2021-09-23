import { css, html } from 'lit';
import { defineSlideType, play } from './base.js';
import { markup } from '../utils.mjs';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-section', {
  render ({ content }) {
    return html`
      <audio id="marimba" src="/src/music/marimba.ogg"></audio>
      <div class="sign-wrapper">
        <div class="sign">${unsafeHTML(content)}</div>
      </div>
    `;
  },
  onEnter ({ marimba }) {
    setTimeout(() => play(marimba), 500);
  },
  // language=CSS
  styles: css`
    @keyframes drop {
      0% {
        transform: rotate(-10deg) translateX(-5%) translateY(-400%);
      }
      50% {
        transform: rotate(-10deg) translateX(-5%) translateY(-500%);
      }
      95% {
        transform: rotate(-3deg) translateX(0) translateY(-5%);
      }
      100% {
        transform: rotate(-3deg) translateX(0) translateY(0%);
      }
    }

    :host {
      align-items: center;
      background-color: #3babfd !important;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr min-content;
      justify-content: center;
    }
    
    audio {
      display: none;
    }

    .sign-wrapper {
      justify-self: center;
      /*background-color: #cb9c64;*/
      /*border: 0.55 rem solid #865930;*/
      /*box-shadow: 0 0 1 rem #000, inset 0 0 0.25 rem #000;*/
      /*background-color: #85a365;*/
      /*background-color: #c2ce2f;*/
      /*background-color: #f49a39;*/
      /*background-color: #ecff7e;*/
      /*border-radius: 1 rem;*/
      /*border: 0.55 rem solid #506547;*/
      /*border: 0.55 rem solid #0d0e1f;*/
      /*border: 0.55 rem solid #2e1c43;*/
      color: #2e1c43;
      /*box-shadow: 0 0 1 rem #2e1c43;*/
      font-family: tintin, sans-serif;
      border-image-source: url(/src/img/empty-sign.svg);
      border-image-slice: 60 60 60 60;
      border-style: solid;
      border-width: 1rem;
      /*background-size: auto 12 rem;*/
      /*background-position: center center;*/
      /*background-repeat: no-repeat;*/
      font-size: 3.5rem;
      font-weight: bold;
      transform: rotate(-1deg) translateY(0%);
      filter: drop-shadow(0 0 1rem #2e1c43);
      margin: 0 5rem;
    }

    :host([data-position="current"]) .sign-wrapper {
      animation: 500ms ease-in-out drop;
    }

    .sign {
      background-color: #ecff7e;
      padding: 0.1rem 1rem;
      margin: -2px;
      text-align: center;
    }
  `,
});
