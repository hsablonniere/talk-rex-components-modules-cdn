import { css, html } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-todo', {
  render ({ content }) {
    return (content ?? '')
      .split('\n')
      .filter((line) => line !== '')
      .map((rawLine) => {
        return html`
          <mark>${rawLine}</mark>
        `;
      });
  },
  // language=CSS
  styles: css`
    :host {
      display: grid;
      align-items: center;
      justify-content: center;
    }
  `,
});
