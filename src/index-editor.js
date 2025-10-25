import {
  html,
} from "lit";

import EditorForm from '@marcokreeft/ha-editor-formbuilder';
import { FormControlType } from '@marcokreeft/ha-editor-formbuilder/dist/interfaces.js';
import { getEntitiesByDomain } from '@marcokreeft/ha-editor-formbuilder/dist/utils/entities.js';


function filterTrainEntities(_hass, items) {
  return items.filter(item => {
    return item.value.startsWith("sensor.train_schedule");
  });
}

export default class NationalrailStatusCardEditor extends EditorForm {

  static get properties() {
    return { _hass: {}, _config: {} };
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return this.renderForm([
      { controls: [{ label: "Entity", configValue: "entity", type: FormControlType.Dropdown, items: filterTrainEntities(this._hass, getEntitiesByDomain(this._hass, "sensor")) }] },
      { controls: [{ label: "Number of trains to show", configValue: "limit", type: FormControlType.Textbox }] },
      { controls: [{ label: "Maximum journey duration", configValue: "maxDuration", type: FormControlType.Textbox }] },
      { controls: [{ label: "Minimum time until departure", configValue: "minTimeToDeparture", type: FormControlType.Textbox }] },
      { controls: [{ label: "Show station title", configValue: "showStationTitle", type: FormControlType.Textbox }] },
    ])
  };
}