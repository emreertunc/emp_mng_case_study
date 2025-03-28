import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import '../components/employee-list.js';

export class EmployeeListPage extends LitElement {
  static get styles() {
    return [
      sharedStyles
    ];
  }

  render() {
    return html`
      <div class="container">
        <employee-list></employee-list>
      </div>
    `;
  }
}

customElements.define('employee-list-page', EmployeeListPage);
