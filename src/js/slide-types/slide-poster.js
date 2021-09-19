import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import { getMeta, getTitle } from '../utils.js';

defineSlideType('slide-poster', {
  render ({ content }) {
    const meta = getMeta();
    return html`
      <div class="header">
        <div class="details">
          <div class="author">${meta.author}</div>
          <div class="author-twitter">${meta.authorTwitter}</div>
          <div class="author-company">${meta.authorCompany}</div>
          <div class="date">${meta.date}</div>
          <div class="event">${meta.event}</div>
          <div class="event-date">${meta.eventDate}</div>
        </div>
        <div>${content ?? getTitle()}</div>
      </div>
    `;
  },
  onEnter () {
    console.log('onEnter');
  },
  onLeave (position) {
    console.log('onLeave', position);
  },
  // language=CSS
  styles: css`
    :host {
      background-color: #ffa;
    }
  `,
});
