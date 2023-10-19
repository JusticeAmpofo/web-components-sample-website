console.log('wc-modal.js');
class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.modal;
        this.modalTitle;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            .btn {
                background: #d4d4d4;
                border-radius: 8px;
                color: #000;
                font-weight: 700;
                text-decoration: none;
                padding: 10px 20px;
            }
            
            .modal {
                display: none;
            }
            
            .modal__dimmer {
                background: rgba(0, 0, 0, 0.8);
                height: 100vh;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
            }
            
            .modal__container {
                background: #fff;
                margin: 0 auto;
                max-width: 1000px;
                left: 50%;
                padding: 20px;
                position: fixed;
                width: 80%;
                transform: translateX(-50%);
                top: 10%;
            }
            
            .modal__btn-close {
                position: absolute;
                right: 20px;
            }
        </style>
        <button class="modal__btn btn mb5"></button>
        <div class='modal'>
            <div class='modal__dimmer'></div>
            <div class='modal__container'>
                <button class='btn modal__btn-close'>Close</button>
                <slot><slot>
            </div>
        </div>
        `;
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
    }

    hideModal() {
        this.modalVisible = false;
        this.modal.style.display = 'none';
    }

    get title() {
        return this.getAttribute('title');
    }
}
customElements.define('wc-modal', Modal);
