import { css, LitElement } from 'lit';
import { entriesToObject, toCamelCase, trim } from '../utils.mjs';

// language=CSS
export const defaultSlideStyles = css`
  :host {
    display: block;
    background-color: #fff;
  }

  :host([todo]) {
    position: relative;
  }

  .todo-banner,
  :host([todo])::after {
    content: 'TODO';
    display: block;
    position: absolute;
    left: 0;
    background-color: #ff0;
    border-style: solid;
    border-color: #000;
    border-width: 0.1rem 0;
    font-family: Arial, sans-serif;
    padding: 0 5rem;
    top: 0;
    transform: translateX(-35%) translateY(60%) rotate(-45deg);
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
  if (audio == null) {
    return;
  }
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
