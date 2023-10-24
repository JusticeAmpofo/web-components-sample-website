function getTabs(element) {
    const tabs = Array.from(
        element.querySelectorAll('[role="tablist"] [role="tab"]')
    );
    return tabs;
}

function getPanels(element) {
    const panels = Array.from(element.querySelectorAll('[role="panel"]'));
    return panels;
}

function selectTab(element, index) {
    const tabs = getTabs(element);
    const panels = getPanels(element);

    for (const tab of tabs) {
        tab.setAttribute('aria-selected', false);
        tab.setAttribute('tabindex', -1);
        tab.classList.remove('tabs__item--active');
    }

    for (const panel of panels) {
        panel.hidden = true;
        panel.setAttribute('aria-selected', false);
        panel.setAttribute('tabindex', -1);
    }

    const selectedTab = tabs[index];
    const selectedPanel = panels[index];

    selectedTab.focus();
    selectedTab.setAttribute('aria-selected', true);
    selectedTab.setAttribute('tabindex', 0);
    selectedTab.classList.add('tabs__item--active');

    selectedPanel.hidden = false;
    selectedPanel.setAttribute('aria-selected', true);
    selectedPanel.setAttribute('tabindex', 0);

    element.dispatchEvent(
        new Event('wc-tab-change', {
            bubbles: true,
            detail: {
                relatedTarget: selectedPanel,
            },
        })
    );
}

class Tabs extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('keydown', (event) => {
            const tabs = getTabs(this);
            // Get the index of the selected tab
            const currentIndex = tabs.indexOf(
                // Find the selected tab where aria-selected is true
                tabs.find((tab) => tab.matches('[aria-selected="true"]'))
            );

            if (event.code === 'ArrowLeft') {
                // hit left
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = 0;
                selectTab(this, newIndex);
            } else if (event.code === 'ArrowRight') {
                // hit right
                let newIndex = currentIndex + 1;
                if (newIndex >= tabs.length) newIndex = tabs.length - 1;
                selectTab(this, newIndex);
            }
        });

        this.addEventListener('click', (event) => {
            // Get all tabs
            const tabs = getTabs(this);

            // Find tab that was clicked
            const tab = event.target.closest('[role="tab"]');

            if (!tab?.closest('[role="tablist"]')) {
                return;
            }

            // Find index of tab that was clicked
            const index = tabs.indexOf(tab);

            selectTab(this, index);
        });
    }
}
customElements.define('wc-tabs', Tabs);
