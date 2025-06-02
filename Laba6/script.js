class NewsManager {
    constructor() {
        this.imageSet = new Set([
            'https://via.placeholder.com/300x200?text=Новость+1',
            'https://via.placeholder.com/300x200?text=Новость+2',
            'https://via.placeholder.com/300x200?text=Новость+3'
        ]);
        this.paragraphSet = new Set([
            'Главные новости',
            'Местное событие',
            'Глобальное обновление'
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
            'https://via.placeholder.com/300x200?text=Новая+картинка+1',
            'https://via.placeholder.com/300x200?text=Новая+картинка+2'
        ]);
        this.newParagraphs = new Set([
            'Новая история',
            'Последнее обновление'
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