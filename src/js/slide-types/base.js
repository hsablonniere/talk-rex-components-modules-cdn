import { css, LitElement } from 'lit';
import { entriesToObject, toCamelCase, trim } from '../utils.js';

// language=CSS
export const defaultSlideStyles = css`
  :host {
    display: block;
    background-color: #fff;
  }
`;

export function defineSlideType (slideType, options) {

  window.customElements.define(slideType, class extends LitElement {

    static get properties () {
      return {
        position: { type: String, attribute: 'data-position', reflect: true },
      };
    }

    render () {

      const attrs = this.getAttributeNames()
        .map((name) => [toCamelCase(name), this.getAttribute(name)])
        .reduce(entriesToObject);

      if (trim(this.innerHTML) === '') {
        this.innerHTML = '';
      }

      const content = (this.innerHTML !== '') ? this.innerHTML : null;

      return options.render
        ? options.render({ attrs, content })
        : '';
    }

    update (changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has('position')) {
        const elements = Array
          .from(this.shadowRoot.querySelectorAll('[id]'))
          .map((node) => [node.id, node])
          .reduce(entriesToObject, []);
        if (this.position === 'current' && options.onEnter != null) {
          options.onEnter(elements);
        }
        if (this.position !== 'current' && options.onLeave != null) {
          options.onLeave(this.position, elements);
        }
      }
    }

    static get styles () {
      return [
        defaultSlideStyles,
        options.styles ?? '',
      ];
    }
  });
}

export function play (audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
