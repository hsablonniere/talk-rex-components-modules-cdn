import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-definition', {
  render ({ content }) {
    console.log(content);
    const [title, ...lines] = content
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => line.replace(/^\* /, ''))
      .map((line) => html`
        <div class="item">${line}</div>
      `);

    return html`
      <div class="sign-wrapper">
        <div class="sign">${title}</div>
      </div>
      <div class="details">
        ${lines}
      </div>
    `;
  },
  // language=CSS
  styles: css`
    @keyframes drop {
      0% {
        transform: rotate(-10deg) translateY(-400%);
      }
      50% {
        transform: rotate(-10deg) translateY(-500%);
      }
      95% {
        transform: rotate(-3deg) translateY(-5%);
      }
      100% {
        transform: rotate(-3deg) translateY(0%);
      }
    }

    :host {
      align-items: center;
      /*background-image: radial-gradient(transparent, transparent 0 %, #000 80 %), url('/src/img/jungle.svg');*/
      /*background-size: cover;*/
      background-color: #3babfd !important;
      /*background-color: #deb78c !important;*/
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr min-content;
      justify-content: center;
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
      font-size: 4rem;
      font-weight: bold;
      transform: rotate(-1deg) translateY(0%);
      filter: drop-shadow(0 0 1rem #2e1c43);
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

    .details {
      /*background-color: #f0fce8;*/
      /*background-image: url(/src/img/empty-map.svg);*/
      /*background-size: 100 % auto;*/
      /*border-color: #60a555;*/
      /*color: #000;*/
      background-color: #43854a;
      background-position: top center;
      border-color: #fff;
      border-style: solid;
      border-width: 0.25rem 0 0 0;
      box-shadow: 0 0 0.5rem #777;
      box-sizing: border-box;
      color: #fff;
      display: grid;
      font-family: skranji, sans-serif;
      font-size: 2rem;
      font-weight: bold;
      justify-content: center;
      padding: 2rem;
      width: 100%;
    }
  `,
});
