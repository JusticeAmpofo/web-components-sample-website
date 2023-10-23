console.log('safety bar');
class SafetyBar extends HTMLElement {
    constructor() {
        super();
        this.isVisible = true;

        this.innerHTML = `
            <div class='safety-bar container website-border'>
                <div class='safety-bar__content'>
                    <a href='#isi' class='btn safety__btn-isi'>+</a>
                    <h2 class='h1 mb5'>IMPORTANT SAFETY INFORMATION</h2>
                    <p class='mb5'>
                        3 visible lines of copy should always be visible
                    </p>
                    <p class='mb5'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras suscipit, metus ac hendrerit vestibulum, turpis tortor
                        tempus lacus, nec mollis magna lorem ac nisi. Vivamus quis
                        enim lorem.
                    </p>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        window.addEventListener('scroll', this.scrollHandler.bind(this));
    }

    scrollHandler() {
        const safetyBar = document.querySelector('.safety-bar');
        const targetSection = document.getElementById('isi');

        // if (!targetSection) {
        //     return;
        // }

        const rect = targetSection.getBoundingClientRect();
        const topDistance = rect.top;
        const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;

        const distanceToBottom = viewportHeight - topDistance;
        console.log(distanceToBottom, +this.hideOffsetFromElement);

        if (distanceToBottom < this.hideOffsetFromElement) {
            this.isVisible = true;
            safetyBar.classList.remove('safety-bar--hidden');
        } else {
            this.isVisible = false;
            safetyBar.classList.add('safety-bar--hidden');
        }
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.scrollHandler.bind(this));
    }

    get hideOffsetFromElement() {
        return this.getAttribute('hideOffsetFromElement');
    }

    get targetId() {
        return this.getAttribute('targetId');
    }
}
customElements.define('wc-safety-bar', SafetyBar);
