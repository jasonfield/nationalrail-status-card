

import { css } from 'lit';

const style = css`
#nationalrail-status {
  padding:16px;
}
.train {
  display:flex;
  flex-direction:column;
  padding:5px;
  border:1px white solid;
  border-radius: 5px;
  margin: 2px 0px;
}
.top-heading {
  display:flex;
  flex-direction:row;
  flex-basis:100%;
  margin-bottom:5px;
}
.scheduled-container {
  display:flex;
  flex-basis:100%;
}
.scheduled-status {
  padding-left: 5px;
}
.platform-container {
  display:flex;
}
.platform-label {
  padding-right: 5px;
}
.details {
  margin-top:5px;
}
h3, h4 {
  margin:0;
}
h4 {
  font-style: italic;
  font-weight: 500;
}
.peturbed {
color: red;
}
.warning {
color: yellow;
}
.good {
color: green;
}
`;

export default style;
