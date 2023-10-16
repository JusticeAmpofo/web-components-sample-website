console.log('footer');
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class='container'>
                <h2 class='h1'>My Footer</h2>
            </div>
        `;
    }
}
customElements.define('wc-footer', Footer);
