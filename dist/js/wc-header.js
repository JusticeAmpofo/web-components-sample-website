class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = 'My Header';
        const navTitle = 'Main nav links:';
        const navLinks = [
            {
                name: 'google.com',
                href: 'https://www.google.com',
                isInternal: false,
            },
            {
                name: 'klick.com',
                href: 'https://www.klick.com',
                isInternal: false,
            },
            {
                name: 'unity.com',
                href: 'https://unity.com/',
                isInternal: false,
            },
        ];

        this.innerHTML = `
            <div class='container'>
                <div class='headline-block mb8 mb0-sm'>
                    <h1 class='h1'>${title}</h1>

                    <button class='hamburger mobile-only-block'>
                        <span class='hamburger__top'></span>
                        <span class='hamburger__middle'></span>
                        <span class='hamburger__bottom'></span>
                    </button>
                </div>

                <div class='navigation-block navigation-block--desktop desktop-only-block'>
                    <p class='mr1'>${navTitle}</p>
                    <nav>
                        <ul>
                            ${navLinks
                                .map((link) => {
                                    return `
                                    <li class='navigation-block__list mr1'>
                                        <a class='navigation-block__link' href='${
                                            link.href
                                        }' target='${
                                        link.isInternal ? '_self' : '_blank'
                                    }'>${link.name}</a>
                                    </li>
                                `;
                                })
                                .join('')}
                        </ul>
                    </nav>
                </div>

                <div class='mt8 navigation-block navigation-block--mobile'>
                    <p class='mb2'>${navTitle}</p>
                    <nav>
                        <ul>
                        ${navLinks
                            .map((link) => {
                                return `
                                <li class='navigation-block__list-mobile mb3'>
                                    <a class='navigation-block__link navigation-block__link--mobile' href='${
                                        link.href
                                    }' target='${
                                    link.isInternal ? '_self' : '_blank'
                                }'>${link.name}</a>
                                </li>
                            `;
                            })
                            .join('')}
                        </ul>
                    </nav>
                </div>
            </div>
        `;

        const hamburger = this.querySelector('.hamburger');
        const navigationBlockMobile = this.querySelector(
            '.navigation-block--mobile'
        );
        hamburger.addEventListener('click', () => {
            this.classList.toggle('hamburger--expand');
            navigationBlockMobile.classList.toggle('mobile-only-block');
        });
    }
}
customElements.define('wc-header', Header);
