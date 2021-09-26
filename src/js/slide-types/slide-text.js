import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import twemoji from 'twemoji';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { markup } from '../utils.mjs';

console.log(twemoji);

defineSlideType('slide-text', {
  render ({ content }) {

    const htmlContent = twemoji.parse(markup(content), (icon, options, variant) => {
      return '/src/emoji/' + icon + '.svg';
    });

    return html`
      <div class="text">${unsafeHTML(htmlContent)}</div>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      position: relative;
      display: grid;
      align-items: center;
      justify-content: center;
    }
    
    .text {
      text-align: center;
      font-family: 'Yanone Kaffeesatz', sans-serif;
      font-size: 5.5rem;
      font-weight: bold;
    }
    
    img {
      height: 8rem;
      margin-bottom: 1rem;
      display: block;
      width: 100%;
    }
  `,
});