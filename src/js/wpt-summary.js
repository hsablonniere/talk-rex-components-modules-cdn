import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

function computePercent (value, i, all) {
  const max = Math.max(...all);
  const percent = (value * 100) / max;
  return { value, percent };
}

function formatBytes (value) {
  return new Intl.NumberFormat('fr', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    // }).format(value / 1000) + ' Ko';
  }).format(value / 1000) + '';
}

function formatSeconds (value) {
  return new Intl.NumberFormat('fr', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    // }).format(value) + 's';
  }).format(value) + '';
}

/**
 * TODO DOCS
 */
export class WptSummary extends LitElement {

  static get properties () {
    return {
      bytes: { type: Array },
      _bytesData: { type: Array },
      requests: { type: Array },
      _requestsData: { type: Array },
      time: { type: Array },
      _timeData: { type: Array },
      legend: { type: Array },
      _legend: { type: Array },
      dim: { type: Array },
      _dimBytes: { type: Boolean },
      _dimRequests: { type: Boolean },
      _dimTime: { type: Boolean },
    };
  }

  constructor () {
    super();
  }

  render () {
    return html`
      <div class="title">
        <slot></slot>
        <div class="stabilo"></div>
      </div>

      <div class="chart bytes ${classMap({ dim: this._dimBytes })}">
        <div class="chart-bars">
          ${this._bytesData.map(({ value, percent }) => html`
            <div class="bar">
              <div class="bar-value" style="--bar-percent: ${percent}">
                <div class="bar-label">${formatBytes(value)}</div>
              </div>
            </div>
          `)}
        </div>
        <div class="chart-title">Taille (Ko)</div>
      </div>

      <div class="chart requests ${classMap({ dim: this._dimRequests })}">
        <div class="chart-bars">
          ${this._requestsData.map(({ value, percent }) => html`
            <div class="bar">
              <div class="bar-value" style="--bar-percent: ${percent}">
                <div class="bar-label">${value}</div>
              </div>
            </div>
          `)}
        </div>
        <div class="chart-title">Requêtes</div>
      </div>

      <div class="chart time ${classMap({ dim: this._dimTime })}">
        <div class="chart-bars">
          ${this._timeData.map(({ value, percent }) => html`
            <div class="bar">
              <div class="bar-value" style="--bar-percent: ${percent}">
                <div class="bar-label">${formatSeconds(value)}</div>
              </div>
            </div>
          `)}
        </div>
        <div class="chart-title">Temps (secs)</div>
      </div>

      <div class="legend">
        ${this._legend.map((legend) => html`
          <div class="legend-entry">
            <div class="legend-color"></div>
            <div class="legend-text">${legend}</div>
          </div>
        `)}
      </div>
    `;
  }

  update (changedProperties) {
    this._bytesData = (this.bytes ?? []).map(computePercent);
    this._requestsData = (this.requests ?? []).map(computePercent);
    this._timeData = (this.time ?? []).map(computePercent);
    this._legend = (this.legend ?? []);
    const dim = (this.dim ?? [0, 0, 0]).map((item) => item !== 0);
    this._dimBytes = dim[0];
    this._dimRequests = dim[1];
    this._dimTime = dim[2];
    super.update(changedProperties);
  }

  static get styles () {
    return [
      // language=CSS
      css`
        :host {
          display: grid;
          grid-template-rows: min-content 1fr min-content;
          grid-template-columns: repeat(3, 1fr);
          grid-template-areas: "title title title" "bytes requests time" "legend legend legend";
          /*grid-template-areas: "legend legend legend" "bytes requests time" "title title title";*/
        }

        .title {
          /*font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;*/
          /*font-size: 2rem;*/
          /*font-weight: bold;*/
          /*text-align: center;*/
          /*padding: 1rem 0;*/
          grid-area: title;

          text-align: center;
          justify-self: center;
          color: #0082ff;
          /*border-bottom: 0.25rem solid #3babfd;*/
          position: relative;
          padding: 0 1rem;
          /*margin: 3rem 0 0;*/
          margin: 1rem 0;
          font-family: skranji, sans-serif;
          font-size: 3.5rem;
          font-weight: bold;
          transform: rotate(-1deg) translateY(0%);
          z-index: 2;
        }

        .stabilo {
          content: '';
          display: block;
          height: 1.5rem;
          background-color: #ff0;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 1rem;
          z-index: -1;
          transform-origin: left center;
        }

        .chart {
          display: grid;
          grid-template-rows: 1fr auto;
          grid-template-columns: 1fr;
          padding: 4rem 0 2rem 0;
          justify-items: center;
          gap: 1rem;
          box-sizing: border-box;
        }
        
        .chart.dim {
          opacity: 0.1;
        }

        .chart-bars {
          display: flex;
          justify-content: center;
          gap: 1rem;
          height: 100%;
          width: auto;
          padding: 0 1rem;
          box-sizing: border-box;
          position: relative;
        }

        .chart-bars::after {
          content: '';
          display: block;
          height: 0.15rem;
          background-color: #000;
          position: absolute;
          bottom: 0;
          width: 100%;
        }

        .bar {
          width: 3rem;
          position: relative;
        }

        .bar-label {
          font-family: monospace;
          text-align: center;
          position: absolute;
          bottom: 100%;
          padding-bottom: 0.5rem;
          font-weight: bold;
          box-sizing: border-box;
          font-size: 1rem;
          left: 50%;
          transform: translate(-50%);
          white-space: nowrap;

          font-family: "Operator Mono Medium", monospace;
          font-size: 1.25rem;
        }

        .bar-value {
          box-sizing: border-box;
          /*border: 0.15rem solid #000;*/
          /*border-bottom: none;*/
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: calc(var(--bar-percent) * 1%);
          background-size: 100% auto;
        }

        .bar:nth-child(1) .bar-value {
          background-image: url(/src/img/drawn-rectangle-1.svg);
        }

        .bar:nth-child(2) .bar-value {
          background-image: url(/src/img/drawn-rectangle-2.svg);
        }

        .bar:nth-child(3) .bar-value {
          background-image: url(/src/img/drawn-rectangle-3.svg);
        }

        .chart-title {
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          font-family: "Operator Mono Book", monospace;
          font-weight: bold;
          font-size: 1.25rem;
          font-style: italic;
          color: #333;
          text-align: center;
        }

        .legend {
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
          font-weight: bold;
          text-align: left;
          display: flex;
          justify-content: center;
          padding: 1rem 1rem 2rem;
          box-sizing: border-box;
          grid-area: legend;
          font-size: 1.25rem;
          line-height: 1.25;
          gap: 3rem;
          font-family: "Yanone Kaffeesatz", sans-serif;
          font-size: 2rem;
        }

        .legend-entry {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
        }

        .legend-color {
          box-sizing: border-box;
          border: 0.15rem solid #000;
          border-radius: .1rem;
          height: 1.75rem;
          width: 1.75rem;
        }

        .legend-entry:nth-child(1) .legend-color {
          background-color: #CB0028;
        }

        .legend-entry:nth-child(2) .legend-color {
          background-color: #0082ff;
        }

        .legend-entry:nth-child(3) .legend-color {
          background-color: #009452;
        }
      `,
    ];
  }
}

window.customElements.define('wpt-summary', WptSummary);
