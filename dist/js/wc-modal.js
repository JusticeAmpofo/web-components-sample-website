console.log('wc-modal.js');
class Modal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class='modal'>
                <div class='modal__dimmer'></div>
                <div class='modal__container'>
                    <button class='modal__close'>Close</button>
                    <h2 class='modal__title'>My Modal</h2>
                </div>
            </div>
        `;
    }
}
customElements.define('wc-modal', Modal);
