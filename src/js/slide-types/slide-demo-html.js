import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import twemoji from 'twemoji';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { markup } from '../utils.mjs';

defineSlideType('slide-demo-html', {
  render ({ content }) {
    return html`
      ${unsafeHTML(content)}
    `;
  },
  // language=CSS
  styles: css`
    :host {
      position: relative;
      display: grid;
      align-items: center;
      justify-content: center;
      align-content: center;
      justify-items: center;
      gap: 1rem;
    }
  `,
});
