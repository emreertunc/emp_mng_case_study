import { css } from 'lit';

export const iconStyles = css`
  /* Material Design Icons */
  .icon-list::before {
    content: 'menu'; /* Material icon: menu (3 çizgi) */
    font-family: 'Material Icons';
  }
  
  .icon-table::before {
    content: 'grid_view'; /* Material icon: grid view (kutu şeklinde) */
    font-family: 'Material Icons';
  }
  
  .icon-edit::before {
    content: 'edit'; /* Material icon: edit */
    font-family: 'Material Icons';
    color: var(--primary-color);
  }
  
  .icon-delete::before {
    content: 'delete'; /* Material icon: delete */
    font-family: 'Material Icons';
    color: var(--error-color);
  }
  
  .icon-add::before {
    content: 'add'; /* Material icon: add */
    font-family: 'Material Icons';
  }
  
  .icon-back::before {
    content: 'arrow_back'; /* Material icon: arrow_back */
    font-family: 'Material Icons';
  }
  
  .icon {
    font-size: 18px;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }
`;

export const sharedStyles = css`
  :host {
    display: block;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
    --primary-color: #ff6600; /* ING Turuncu */
    --primary-light: #ff8533;
    --primary-dark: #cc5200;
    --navbar-color: #f8f8f8; /* Navbar için hafif soluk beyaz renk */
    --text-on-primary: white;
    --secondary-color: #607d8b;
    --secondary-light: #8eacbb;
    --secondary-dark: #34515e;
    --background-color: #f8f9fa;
    --card-background: white;
    --border-color: #e0e0e0;
    --error-color: #d32f2f;
    --success-color: #388e3c;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadow-md: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    --radius-sm: 4px;
    --radius-md: 8px;
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    color: #333;
    background-color: var(--background-color);
  }

  .container {
    padding: var(--spacing-sm);
    margin: 0 auto;
    max-width: 1200px;
    background-color: var(--background-color);
    min-height: 100vh;
  }

  h1, h2, h3 {
    color: var(--primary-color);
  }
  
  .employee-title {
    color: var(--primary-color);
    font-weight: 600;
  }

  button {
    background-color: var(--primary-color);
    color: var(--text-on-primary);
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
  }

  button:hover {
    background-color: var(--primary-dark);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  button:active {
    transform: translateY(1px);
    box-shadow: var(--shadow-sm);
  }

  button.secondary {
    background-color: var(--secondary-color);
    color: white;
    border: none;
  }

  button.secondary:hover {
    background-color: var(--secondary-dark);
  }

  input, select {
    display: block;
    width: calc(100% - 24px); /* input padding'ini hesaba katarak genişliği ayarla */
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 14px;
    margin-bottom: var(--spacing-sm);
    transition: all 0.2s ease;
    background-color: white;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
    box-sizing: border-box;
  }

  input:focus, select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
  }

  .form-group {
    margin-bottom: var(--spacing-md);
    box-sizing: border-box;
    width: 100%;
  }
  
  .form {
    background-color: var(--card-background);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);
    box-sizing: border-box;
  }

  .error {
    color: var(--error-color);
    font-size: 12px;
    margin-top: 4px;
  }

  .actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 16px;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: var(--card-background);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  th, td {
    padding: var(--spacing-md) var(--spacing-sm);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  th:first-child {
    padding-left: var(--spacing-md);
  }
  
  th:last-child, td:last-child {
    padding-right: var(--spacing-md);
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:hover {
    background-color: rgba(255, 109, 0, 0.05);
  }

  .icon-button {
    background: white;
    border: none;
    cursor: pointer;
    color: var(--primary-color);
    padding: 0;
    margin: 0 4px;
    box-shadow: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    min-height: 28px;
  }
  
  .icon-button:hover {
    background: white;
    box-shadow: none;
    transform: none;
  }

  .delete-button {
    color: var(--error-color);
  }

  .search-container {
    display: flex;
    margin-bottom: var(--spacing-md);
  }
  
  .search-container .search-input {
    border-radius: 20px;
    padding-left: var(--spacing-md);
    background-color: var(--card-background);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
  }
  
  .search-container .search-input:focus {
    box-shadow: var(--shadow-md);
  }

  .search-input {
    flex: 1;
    margin-right: 8px;
    margin-bottom: 0;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    gap: 8px;
  }

  .pagination button {
    min-width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination button.active {
    background-color: var(--primary-dark);
  }

  .view-toggle {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    gap: 8px;
  }
  
  .view-toggle .view-button {
    padding: 6px;
    background-color: transparent;
    color: var(--primary-color);
    box-shadow: none;
    min-width: 32px;
    min-height: 32px;
    border-radius: 0;
  }
  
  .view-toggle .view-button:hover {
    background-color: rgba(255, 102, 0, 0.1);
    box-shadow: none;
    transform: none;
  }
  
  .view-toggle .view-button.active {
    background-color: rgba(255, 102, 0, 0.1);
  }
  
  .view-toggle .view-button .icon {
    font-size: 24px;
    margin: 0;
    color: var(--primary-color);
  }
  
  .list-item {
    border: none;
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--card-background);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }
  
  .list-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .list-item-details {
    flex: 1;
  }
  
  .list-item-actions {
    display: flex;
    gap: 8px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .header h1 {
    margin: 0;
  }
  
  .app-toolbar {
    background-color: var(--navbar-color);
    color: var(--text-on-primary);
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-md);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .app-logo {
    font-weight: bold;
    font-size: 20px;
  }
`;
