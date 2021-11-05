import { html } from "https://unpkg.com/lit-html?module";

export const createSingleTemplate = (town) => html`
  <option .value=${town._id}>${town.text}</option>
`;

export const createAllTemplate = (data) => html`
  ${data.map((t) => createSingleTemplate(t))}
`;
