import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-credits', {
  render ({ content }) {

    const groups = [];
    let currentGroup;

    content
      .split('\n')
      .filter((line) => line !== '')
      .forEach((rawLine) => {
        if (!rawLine.startsWith('* ')) {
          currentGroup = {
            title: rawLine,
            lines: [],
          };
          groups.push(currentGroup);
        }
        else {
          const [left, right] = rawLine
            .replace(/^\* /, '')
            .replace(/https?:\/\//, '')
            .split(' : ');
          currentGroup.lines.push([left, right]);
        }
      });

    return html`
      <div class="wrapper">
        ${groups.map((group) => html`
          <div class="group-title">${group.title}</div>
          ${group.lines.map(([left, right]) => html`
            <div class="credit-line-left">${left}</div>
            <div class="credit-line-right">${right}</div>
          `)}
        `)}
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
      gap: 1rem;
      grid-template-columns: 2fr 3fr;
      position: absolute;
      top: 100%;
      width: 100%;
    }

    :host([data-position="current"]) .wrapper {
      animation: 80s linear scroll;
    }

    .group-title {
      font-family: tintin, sans-serif;
      font-size: 4rem;
      justify-self: center;
      grid-column: 1 / -1;
      margin-bottom: 2rem;
      margin-top: 4rem;
      text-align: center;
    }

    .credit-line-left,
    .credit-line-right {
      font-size: 1.5rem;
      font-family: PT Sans, sans-serif;
      line-height: 1.2;
    }

    .credit-line-left {
      text-align: right;
    }

    .credit-line-right {
    }
  `,
});
