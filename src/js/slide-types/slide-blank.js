import { css } from 'lit';
import { defineSlideType } from './base.js';

defineSlideType('slide-blank', {
  // language=CSS
  styles: css`
    @keyframes leftright {
      0% {
        background-position: 54% 54%, center;
      }
      33% {
        background-position: 46% 46%, center;
      }
      66% {
        background-position: 54% 48%, center;
      }
      100% {
        background-position: 46% 54%, center;
      }
    }

    :host {
      background-image: radial-gradient(transparent, transparent 0%, #000 80%), url('/src/img/jungle.svg');
      background-size: cover;
    }

    :host([animation]) {
      background-image: url('/src/img/binoculars.svg'), url('/src/img/jungle.svg');
      background-size: 400%, 70%;
      background-repeat: no-repeat;
    }

    :host([black]) {
      background: #000;
    }

    :host([data-position="current"][animation]) {
      animation: 20s linear infinite alternate leftright;
    }
  `,
});
