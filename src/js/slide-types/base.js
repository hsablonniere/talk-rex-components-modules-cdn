import { css, LitElement } from 'lit';
import { entriesToObject, toCamelCase, trim } from '../utils.js';

// language=CSS
export const defaultSlideStyles = css`
  :host {
    display: block;
  }
`;

export function defineSlideType (slideType, render, styles = []) {

  window.customElements.define(slideType, class extends LitElement {

    render () {

      const attrs = this.getAttributeNames()
        .map((name) => [toCamelCase(name), this.getAttribute(name)])
        .reduce(entriesToObject);

      if (trim(this.innerHTML) === '') {
        this.innerHTML = '';
      }

      const content = (this.innerHTML !== '') ? this.innerHTML : null;

      return render({ attrs, content });
    }

    static get styles () {
      return [
        defaultSlideStyles,
        styles,
      ];
    }
  });
}
