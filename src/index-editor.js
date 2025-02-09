import {
  html,
} from "lit";

import EditorForm from '@marcokreeft/ha-editor-formbuilder';
import { FormControlType } from '@marcokreeft/ha-editor-formbuilder/dist/interfaces.js';
import { getEntitiesByDomain } from '@marcokreeft/ha-editor-formbuilder/dist/utils/entities.js';


export default class NationalrailMatrixCardEditor extends EditorForm {

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
      { controls: [{ label: "Entity", configValue: "entity", type: FormControlType.Dropdown, items: getEntitiesByDomain(this._hass, "sensor") }] },
      { controls: [{ label: "Number of trains to shown", configValue: "limit", type: FormControlType.Textbox }] },
    ])
  };
}