console.log('wc-modal.js');
class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.modal;
        this.modalTitle;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <button class="modal__btn btn mb5"></button>
        <div class='modal'>
            <div class='modal__dimmer'></div>
            <div class='modal__container'>
                <button class='btn modal__btn-close'>Close</button>
                <slot><slot>
            </div>
        </div>
        `;
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'css/global.css');
        this.shadowRoot.appendChild(link);
    }

    connectedCallback() {
        this.modal = this.shadowRoot.querySelector('.modal');
        this.shadowRoot
            .querySelector('.modal__btn')
            .addEventListener('click', this.showModal.bind(this));
        this.shadowRoot
            .querySelector('.modal__btn-close')
            .addEventListener('click', this.hideModal.bind(this));
        this.shadowRoot
            .querySelector('.modal__dimmer')
            .addEventListener('click', this.hideModal.bind(this));
        this.shadowRoot.querySelector('.modal__btn').innerHTML = this.title;
    }

    disconnectedCallback() {
        this.shadowRoot
            .querySelector('.modal__btn')
            .removeEventListener('click', this.showModal.bind(this));
        this.shadowRoot
            .querySelector('.modal__btn-close')
            .removeEventListener('click', this.hideModal.bind(this));
        this.shadowRoot
            .querySelector('.modal__dimmer')
            .removeEventListener('click', this.hideModal.bind(this));
    }

    showModal() {
        this.modalVisible = true;
        this.modal.style.display = 'block';
        document.body.classList.toggle('overflow-hidden');
    }

    hideModal() {
        this.modalVisible = false;
        this.modal.style.display = 'none';
        document.body.classList.toggle('overflow-hidden');
    }

    get title() {
        return this.getAttribute('title');
    }
}
customElements.define('wc-modal', Modal);
