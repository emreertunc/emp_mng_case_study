import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/confirm-dialog.js';

describe('ConfirmDialog', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`
      <confirm-dialog
        .show=${true}
        .title=${'Confirm Delete'}
        .message=${'Are you sure you want to delete this item?'}
      ></confirm-dialog>
    `);
  });

  it('renders dialog when show is true', async () => {
    const dialog = element.shadowRoot.querySelector('.dialog');
    expect(dialog).to.exist;
    expect(dialog.style.display).to.not.equal('none');
  });

  it('displays correct title and message', () => {
    const title = element.shadowRoot.querySelector('.dialog-title');
    const message = element.shadowRoot.querySelector('.dialog-message');

    expect(title.textContent).to.equal('Confirm Delete');
    expect(message.textContent).to.equal('Are you sure you want to delete this item?');
  });

  it('hides dialog when show is false', async () => {
    element.show = false;
    await element.updateComplete;

    const dialog = element.shadowRoot.querySelector('.dialog');
    expect(dialog.style.display).to.equal('none');
  });

  it('emits confirm event when confirm button is clicked', () => {
    let confirmed = false;
    element.addEventListener('confirm', () => {
      confirmed = true;
    });

    const confirmButton = element.shadowRoot.querySelector('.confirm-button');
    confirmButton.click();

    expect(confirmed).to.be.true;
  });

  it('emits cancel event when cancel button is clicked', () => {
    let cancelled = false;
    element.addEventListener('cancel', () => {
      cancelled = true;
    });

    const cancelButton = element.shadowRoot.querySelector('.cancel-button');
    cancelButton.click();

    expect(cancelled).to.be.true;
  });

  it('emits cancel event when clicking outside dialog', () => {
    let cancelled = false;
    element.addEventListener('cancel', () => {
      cancelled = true;
    });

    const overlay = element.shadowRoot.querySelector('.dialog-overlay');
    overlay.click();

    expect(cancelled).to.be.true;
  });

  it('prevents event propagation when clicking dialog content', () => {
    let cancelled = false;
    element.addEventListener('cancel', () => {
      cancelled = true;
    });

    const dialogContent = element.shadowRoot.querySelector('.dialog-content');
    dialogContent.click();

    expect(cancelled).to.be.false;
  });

  it('updates visibility when show property changes', async () => {
    element.show = false;
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('.dialog').style.display).to.equal('none');

    element.show = true;
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('.dialog').style.display).to.not.equal('none');
  });
});
