import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { $$ } from '../utils.mjs';

defineSlideType('slide-image-grid', {
  render ({ content }) {
    return (content ?? '')
      .split('\n')
      .filter((line) => line !== '')
      .map((img) => {
        return html`
          ${unsafeHTML(img)}
        `;
      });
  },
  onEnter ({ host }) {
    host.__animations = $$(host, 'img').map((element, i) => {
      return element.animate([
        { opacity: '0' },
        { opacity: '1' },
      ], {
        easing: 'ease-in-out',
        fill: 'forwards',
        delay: i * 25 + 500,
        duration: 100,
      });
    });
  },
  onLeave (position, { host }) {
    if (host.__animations != null) {
      host.__animations.forEach((anim) => anim.cancel());
    }
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--min-w, 6rem), 1fr));
      align-items: center;
      justify-content: center;

      gap: 2rem;
      padding: 2rem;
    }

    img {
      opacity: 0;
      height: 100%;
      max-height: 8rem;
      width: 100%;
      object-fit: contain;
    }

    .text {
      font-size: 2rem;
      font-family: 'Anton', sans-serif;
      text-align: center;
      text-transform: uppercase;
      background-color: #003569;
      color: #fff;
      justify-self: center;
      border-radius: 0.25rem;
      padding: 1rem 2rem;
    }
  `,
});
