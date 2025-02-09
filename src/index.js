import {
  LitElement,
  html,
} from "lit";

import style from './style.js';

import NationalrailStatusCardEditor from './index-editor.js';
import { destinationPresent, parseToTime, status, printETAs } from './utils.js';

const cardName = 'nationalrail-status-card';
const editorName = cardName + '-editor';
customElements.define(editorName, NationalrailStatusCardEditor);

class NationalrailStatusCard extends LitElement {

  static styles = style;
  static getConfigElement() {
    return document.createElement(editorName);
  }
  // required
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = config;
  }

  render() {
    const config = this._config;

    const entity = config.entity;
    const entityIndex = entity?.entity ?? entity;
    if (!entityIndex) {
      return;
    }

    const hassentity = this.hass.states[entityIndex]
    const att = hassentity.attributes;
    let trains = att?.trains ?? [];
    if (config.limit) {
      let limit = 0;
      if (typeof config.limit === 'number') {
        limit = config.limit;
      }
      else if (typeof config.limit === "string") {
        limit = parseInt(config.limit);
      }
      if (limit > 0) {
        trains = trains.slice(0, limit);
      }
    }

    const items = trains.map(this.renderTrain);
    return html`<ha-card>
      <div id="content">
      <div id="nationalrail-status">
      <h2>${att.station}</h3>
      ${items}
      </div>
      </div>
    </ha-card>`
  }


  renderTrain(train) {
    console.log(train);
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
      <h4>Calling at ${train.destinations.map(destinationPresent).join(", ")}</h4 >
      
      <div class="details">
        <time 
          tabindex="-1"
          role="time">
          <span class="detail-etas" aria-hidden="true">${printETAs(train.destinations, train.expected)}</span>
        </time>
      </div>
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