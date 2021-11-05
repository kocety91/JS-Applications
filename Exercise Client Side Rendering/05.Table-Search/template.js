import { html } from "https://unpkg.com/lit-html?module";

export const createSingleTemplate = (movie) => html`
  <tr class=${movie.class}>
    <td>${movie.firstName + " " + movie.lastName}</td>
    <td>${movie.email}</td>
    <td>${movie.course}</td>
  </tr>
`;

export const createMultiTemplate = (data) => html`
  ${data.map((m) => createSingleTemplate(m))}
`;
