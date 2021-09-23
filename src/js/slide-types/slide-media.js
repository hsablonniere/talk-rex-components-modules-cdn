import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

defineSlideType('slide-media', {
  render ({ content }) {

    const media = content
      .split('\n')
      .find((line) => line.startsWith('<img ') || line.startsWith('<video '));

    return html`
      ${unsafeHTML(media)}
    `;
  },
  // language=CSS
  styles: css`
    :host {
      position: relative;
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
    }
  `,
});
