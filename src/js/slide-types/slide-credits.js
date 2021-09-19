import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-credits', {
  render ({ content }) {

    const lines = content
      .split('\n')
      .filter((line) => line !== '')
      .map((rawLine) => {
        const line = rawLine
          .replace(/^\* /, '')
          .replace(/https?:\/\//, '');
        return html`
          <li class="credit-line">${line}</li>
        `;
      });

    return html`
      <div class="wrapper">
        <div class="title">Crédits :</div>
        <ul>${lines}</ul>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    @keyframes scroll {
      0% {
        transform: translateY(0%);
      }
      100% {
        transform: translateY(-500%);
      }
    }

    :host {
      align-items: center;
      /*background-image: radial-gradient(transparent, transparent 0%, #000 80%), url('/src/img/jungle.svg');*/
      background: #000;
      background-size: cover;
      color: #fff;
      position: relative;
    }

    .wrapper {
      display: grid;
      position: absolute;
      top: 100%;
      width: 100%;
    }

    :host([data-position="current"]) .wrapper {
      animation: 40s linear scroll;
    }

    ul,
    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .title {
      font-family: tintin, sans-serif;
      font-size: 4rem;
      justify-self: center;
      margin-bottom: 2rem;
      text-align: center;
    }

    .credit-line {
      font-size: 1.5rem;
      font-family: PT Sans, sans-serif;
      text-align: center;
    }
  `,
});
