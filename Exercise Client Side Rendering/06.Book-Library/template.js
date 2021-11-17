import { html } from "https://unpkg.com/lit-html?module";

export const creteLoadBooksBtn = () => html`
  <button id="loadBooks">LOAD ALL BOOKS</button>
`;

export const creteTable = (data) => html`
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        ${data.map((x) => creteTableTd(x))}
      </tr>
    </tbody>
  </table>
`;

export const creteTableTd = (book) => html`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>
    <button>Edit</button>
    <button>Delete</button>
  </td>
`;

// <form id="add-form">
//     <h3>Add book</h3>
//     <label>TITLE</label>
//     <input type="text" name="title" placeholder="Title...">
//     <label>AUTHOR</label>
//     <input type="text" name="author" placeholder="Author...">
//     <input type="submit" value="Submit">
// </form>

// <form id="edit-form">
//     <input type="hidden" name="id">
//     <h3>Edit book</h3>
//     <label>TITLE</label>
//     <input type="text" name="title" placeholder="Title...">
//     <label>AUTHOR</label>
//     <input type="text" name="author" placeholder="Author...">
//     <input type="submit" value="Save">
// </form>
