import { css, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { defineSlideType } from './base.js';
import { getMeta, getTitle, markup, pipeline } from '../utils.mjs';

defineSlideType('slide-poster', {
  render ({ attrs, content }) {

    const meta = getMeta();
    const title = pipeline(
      content ?? getTitle(),
      (text) => text.replace(', ', ' '),
      markup,
    );

    return html`
      <div class="details">
        <div class="date">${meta.date}</div>
        <div class="event">${meta.event}</div>
      </div>
      <div class="title">
        ${unsafeHTML(title)}
      </div>
      <div class="details">
        <div class="author">${meta.author}</div>
        <div class="author-twitter">${meta.authorTwitter}</div>
        <div class="author-company">${meta.authorCompany}</div>
      </div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      align-items: center;
      background-color: #6fc6aa !important;
      background-image: radial-gradient(transparent, transparent 60%, #000 100%), url('/src/img/jungle.svg');
      background-repeat: no-repeat;
      background-position: center, center;
      background-size: cover;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content 1fr min-content;
      justify-content: center;
      padding: 0 2rem;
    }

    .title {
      display: grid;
      justify-self: center;
      text-align: center;
      transform: rotate(-1deg);
    }

    .title em {
      background-color: #0d0e1f;
      border-radius: 0.45rem;
      border: 0.55rem solid #0d0e1f;
      color: #fff;
      display: block;
      font-family: 'PT Sans', sans-serif;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
      padding: 0 1rem;
      position: relative;
      z-index: 2;
    }

    .title em:first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-width: 0;
      justify-self: start;
      margin-left: 2rem;
      transform: translateY(0.1rem);
      padding-bottom: 0.25rem;
    }

    .title em:last-child {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top-width: 0;
      justify-self: end;
      margin-right: 2rem;
      padding-top: 0.25rem;
      transform: translateY(-0.1rem);
    }

    .title strong {
      background-color: #577483;
      border-radius: 0.45rem;
      border: 0.55rem solid #0d0e1f;
      box-shadow: 0 0 3rem 1rem #deb78c;
      color: #fff;
      display: block;
      font-family: tintin, sans-serif;
      font-size: 3rem;
      font-weight: normal;
      line-height: 1.4;
      padding: 0.5rem 1rem;
    }

    .details {
      color: #fff;
      display: grid;
      font-family: 'Anton', sans-serif;
      font-size: 1.5rem;
      gap: 2rem;
      grid-auto-flow: column;
      grid-template-columns: repeat(auto-fit, minmax(0, min-content));
      justify-self: center;
      margin: 1rem 0;
      text-align: center;
      text-shadow: 0 0 1rem #000, 0 0 2rem #000, 0 0 3rem #000;
      white-space: nowrap;
    }
  `,
});
