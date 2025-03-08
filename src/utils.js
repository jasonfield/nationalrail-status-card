import {
  html,
} from "lit";

export const parseToTime = (input) => {
  const d = new Date(input);

  const h = (d.getHours() < 10 ? '0' : '') + d.getHours();
  const m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  return h + ':' + m;
}

export const destinationPresent = (dest, start) => {
  const time_at_destination = parseToTime(dest.time_at_destination);
  const scheduled_time_at_destination = parseToTime(dest.scheduled_time_at_destination);
  let output = `${dest.name} (`
  if (!Date.parse(dest.time_at_destination)) {
    output += `${scheduled_time_at_destination} ${dest.time_at_destination}`
  }
  else if (scheduled_time_at_destination !== time_at_destination) {
    output += `${time_at_destination}`
  }
  else {
    output += `${scheduled_time_at_destination}`
  }
  const length = lengthJourney(start, dest.time_at_destination, dest.scheduled_time_at_destination);
  if (length !== '?') {
    output += ' - ' + length + 'm';
  }
  output += ')';
  return output;
}

export const status = (train) => {
  if (train.perturbation) {
    if (!Date.parse(train.expected)) {
      return html`<span class="peturbed">${train.expected}</span>`;
    }
    return html`<span class="peturbed">Expected ${parseToTime(train.expected)}</span>`;
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
