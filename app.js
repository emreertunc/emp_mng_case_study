import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

import './src/pages/home-page.js';
import './src/pages/employee-list-page.js';
import './src/pages/employee-form-page.js';
import './src/pages/not-found-page.js';

import './src/components/navigation-menu.js';

class EmployeeApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      
      .app-container {
        padding: 16px;
      }
      
      .router-outlet {
        padding-top: 16px;
      }
    `;
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);
    
    router.baseUrl = '/';
    router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/employees', component: 'employee-list-page' },
      { path: '/employees/add', component: 'employee-form-page' },
      { path: '/employees/edit', component: 'employee-form-page' },
      { path: '(.*)', component: 'not-found-page' },
    ]);
  }

  render() {
    return html`
      <div class="app-container">
        <navigation-menu></navigation-menu>
        
        <div id="outlet" class="router-outlet"></div>
      </div>
    `;
  }
}

customElements.define('employee-app', EmployeeApp);
