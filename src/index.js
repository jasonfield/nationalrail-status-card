import {
  LitElement,
  html,
} from "lit";

import style from './style.js';

import NationalrailStatusCardEditor from './index-editor.js';
import { destinationPresent, parseToTime, status } from './utils.js';

const cardName = 'nationalrail-status-card';
const editorName = cardName + '-editor';
customElements.define(editorName, NationalrailStatusCardEditor);

class NationalrailStatusCard extends LitElement {
  static properties = {
    attributes: {}
  };

  static styles = style;
  static getConfigElement() {
    return document.createElement(editorName);
  }
  set hass(hass) {
    this._hass = hass;
    this.updateProperties();
  }

  // required
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = config;
    this.updateProperties();
  }
  updateProperties() {
    if (!this._config || !this._hass) {
      return;
    }

    const entity = this._config.entity;
    const entityIndex = entity?.entity ?? entity;
    if (!entityIndex) {
      return;
    }

    const hassentity = this._hass.states[entityIndex]
    this.attributes = hassentity.attributes;
  }
  render() {
    let trains = this.attributes?.trains ?? [];
    if (this._config?.limit) {
      let limit = 0;
      if (typeof this._config.limit === 'number') {
        limit = config.limit;
      }
      else if (typeof this._config.limit === "string") {
        limit = parseInt(this._config.limit);
      }
      if (limit > 0) {
        trains = trains.slice(0, limit);
      }
    }
    let items = html`
    <h3>No trains scheduled</h3>
    `
    if (trains && trains.length > 0) {
      items = trains.map(this.renderTrain);
    }
    return html`<ha-card>
      <div id="content">
      <div id="nationalrail-status">
      <h2>${this.attributes?.station}</h3>
      ${items}
      </div>
      </div>
    </ha-card>`
  }


  renderTrain(train) {
    const scheduled = parseToTime(train.scheduled);
    return html`
    <div class="train">
      <div class="top-heading">
        <div class="scheduled-container">
          <span class="scheduled">${scheduled}</span>
          <span class="scheduled-status">${status(train)}</span>
        </div>
        <div class="platform-container">
          <span class="platform-label">Platform </span>
          <span class="platform">${train.platform ?? "-"}</span>
        </div>
      </div>
      <h3 
        id="station-heading-0" 
        tabindex="-1">
        <span class="terminus">${train.terminus}</span>
      </h3>
      <h4>Calling at ${train.destinations.map(dest => destinationPresent(dest, train.expected)).join(", ")}</h4 >
    </div >
      `
  }

}



customElements.define(cardName, NationalrailStatusCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: cardName,
  name: 'Nationalrail Status Card',
  description: 'Card showing the status of the London Underground lines',
});