import {
  html,
} from "lit";

export const parseToTime = (input) => {
  const d = new Date(input);

  const h = (d.getHours() < 10 ? '0' : '') + d.getHours();
  const m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  return h + ':' + m;
}

const dest = {
  "name": "Hackbridge",
  "time_at_destination": "2025-02-09T00:10:00+00:00",
  "scheduled_time_at_destination": "2025-02-09T00:10:00+00:00"
}

export const destinationPresent = (dest) => {

  const time_at_destination = parseToTime(dest.time_at_destination);
  const scheduled_time_at_destination = parseToTime(dest.scheduled_time_at_destination);
  let output = `${dest.name} (${scheduled_time_at_destination}`
  if (!Date.parse(dest.time_at_destination)) {
    output += ` ${dest.time_at_destination})`
  }
  else if (scheduled_time_at_destination !== time_at_destination) {
    output += ` ${time_at_destination})`
  }
  else {
    output += `)`
  }
  return output;
}

export const status = (train) => {
  if (train.perturbation) {
    return html`<span class="peturbed">${train.expected}</span>`;
  }
  else if (train.scheduled !== train.expected) {
    return html`<span class="warning">Expected ${parseToTime(train.expected)}</span>`;
  }
  else {
    return html`<span class="good">On Time</span>`;
  }
}


export const lengthJourney = (start, end, scheduled) => {
  const startTime = Date.parse(start);
  const endTime = Date.parse(end) ?? Date.parse(scheduled);
  if (!endTime) {
    return '?';
  }
  const d = endTime - startTime;

  return d / 60 / 1000;
}


export const printETAs = (destinations, start) => {
  if (destinations.length > 1) {
    return destinations.map(dest => `${dest.name} ${lengthJourney(start, dest.time_at_destination, dest.scheduled_time_at_destination)}m`).join(', ');
  }
  else if (destinations.length == 1) {
    return lengthJourney(start, destinations[0].time_at_destination, destinations[0].scheduled_time_at_destination) + 'm'
  }
  else {
    return
  }
}