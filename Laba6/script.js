class NewsManager {
    constructor() {
        this.imageSet = new Set([
            'images3.jpg',
            'images2.jpg',
            'images4.jpg'
        ]);
        this.paragraphSet = new Set([
            'Вчера в столице прошел ежегодный марафон, собравший более 5000 участников со всего региона.',
            'Местные власти открыли новый парк с детскими площадками и зонами отдыха для жителей города.',
            'Ученые объявили о прорыве в разработке возобновляемых источников энергии, обещающем снизить выбросы углерода.'
        ]);
        this.container = document.getElementById('newsContainer');
    }

    createImageElement(src) {
        const div = document.createElement('div');
        div.className = 'news-item';
        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);
        return div;
    }

    createParagraphElement(text) {
        const div = document.createElement('div');
        div.className = 'news-item';
        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
        return div;
    }

    displayContent() {
        this.container.innerHTML = '';
        let index = 0;
        for (let img of this.imageSet) {
            this.container.appendChild(this.createImageElement(img));
            if (index < this.paragraphSet.size) {
                const text = Array.from(this.paragraphSet)[index];
                this.container.appendChild(this.createParagraphElement(text));
            }
            index++;
        }
    }
}

class NewsEditor extends NewsManager {
    constructor() {
        super();
        this.newImages = new Set([
            'image1.aif',
            'images2.jpg'
        ]);
        this.newParagraphs = new Set([
            'На этой неделе местный театр представил новую постановку, которая уже получила восторженные отзывы зрителей.',
            'Команда исследователей обнаружила редкий вид рыбы в прибрежных водах, что вызвало интерес у экологов.'
        ]);
    }

    addImage() {
        const position = document.getElementById('imagePosition').value;
        const newImage = Array.from(this.newImages)[Math.floor(Math.random() * this.newImages.size)];
        this.imageSet.add(newImage);
        this.displayContent();
        
        const images = this.container.querySelectorAll('img');
        const newImageElement = this.createImageElement(newImage);
        
        if (position === 'beforeFirst' && images.length > 0) {
            this.container.insertBefore(newImageElement, this.container.firstChild);
        } else {
            this.container.appendChild(newImageElement);
        }
    }

    addParagraph() {
        const position = document.getElementById('paragraphPosition').value;
        const newParagraph = Array.from(this.newParagraphs)[Math.floor(Math.random() * this.newParagraphs.size)];
        this.paragraphSet.add(newParagraph);
        this.displayContent();
        
        const paragraphs = this.container.querySelectorAll('p');
        const newParagraphElement = this.createParagraphElement(newParagraph);
        
        if (position === 'beforeFirst' && paragraphs.length > 0) {
            this.container.insertBefore(newParagraphElement, this.container.querySelector('.news-item'));
        } else if (position === 'afterFirst' && paragraphs.length > 0) {
            const firstParagraph = this.container.querySelector('.news-item p');
            firstParagraph.parentElement.insertAdjacentElement('afterend', newParagraphElement);
        } else {
            this.container.appendChild(newParagraphElement);
        }
    }
}

const newsEditor = new NewsEditor();
newsEditor.displayContent();