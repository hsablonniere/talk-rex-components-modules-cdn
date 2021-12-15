import { css, html } from 'lit';
import { defineSlideType } from './base.js';
import '../wpt-summary.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

function findKeyValues (parts, key) {
  const part = parts.find((line) => line.startsWith(key + ':'));
  if (part == null) {
    return [];
  }
  const [_, rawValues] = part.split(':');
  return JSON.parse(`[${rawValues}]`);
}

defineSlideType('slide-wpt-summary', {
  render ({ content }) {

    const [title, ...parts] = content
      .trim()
      .split('\n')
      .map((line) => line.trim());

    const legend = findKeyValues(parts, 'legend');
    const bytes = findKeyValues(parts, 'bytes');
    const requests = findKeyValues(parts, 'requests');
    const time = findKeyValues(parts, 'time');
    const dim = findKeyValues(parts, 'dim');

    return html`
      <wpt-summary .legend=${legend} .bytes=${bytes} .requests=${requests} .time=${time} .dim=${dim}>
        ${unsafeHTML(title)}
      </wpt-summary>
    `;
  },
  // language=CSS
  styles: css`
    :host {
      position: relative;
    }

    wpt-summary {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
  `,
});
