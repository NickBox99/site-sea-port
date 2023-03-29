class ScrollNodes {
    static nodes = [];

    static addNodes(selector, callback) {
        document.querySelectorAll(selector).forEach(el => {
            const { top } = el.getBoundingClientRect();

            this.nodes.push({
                callback: () => callback(el),
                top: top - 50 - window.innerHeight / 2
            })
        });

        this.checkVisibleNodes.apply(this);
    }

    static init() {
        window.addEventListener('scroll', this.checkVisibleNodes.bind(this));
    }
    
    static checkVisibleNodes() {
        if (!this.nodes.length) {
            return;
        }

        const newNodes = [];

        this.nodes.forEach((el) => {
            if (el.top < window.scrollY) {
                el.callback();
            }
            else {
                newNodes.push(el);
            }
        });

        this.nodes = newNodes;
    }
}

window.scrollNodes = ScrollNodes;

scrollNodes.init();