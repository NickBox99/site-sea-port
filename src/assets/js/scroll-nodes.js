class ScrollNodes {
    static nodes = [];

    static addNodes(selector, callback) {

        console.log(document.querySelectorAll(selector))
        document.querySelectorAll(selector).forEach(el => {
            const { top } = el.getBoundingClientRect();

            this.nodes.push({
                callback: () => callback(el),
                top: top - 20 - window.innerHeight / 2
            })
        });
    }

    static init() {
        window.addEventListener('scroll', () => {
            {
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
        });
    }
}

window.scrollNodes = ScrollNodes;

scrollNodes.init();