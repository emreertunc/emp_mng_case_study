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
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      

      
      .router-outlet {
        padding-top: 16px;
        flex: 1;
      }

      .footer {
        background-color: #f5f5f5;
        padding: 16px;
        text-align: center;
        border-top: 1px solid #ddd;
        font-size: 14px;
        color: #666;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 100;
      }
      
      .app-container {
        padding: 16px;
        padding-bottom: 60px;
        flex: 1;
        display: flex;
        flex-direction: column;
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
        
        <footer class="footer">
          Made By Emre Ertunc for ING Hubs Case Study
        </footer>
      </div>
    `;
  }
}

customElements.define('employee-app', EmployeeApp);
