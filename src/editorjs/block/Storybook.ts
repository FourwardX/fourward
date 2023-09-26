interface StorybookConfig {
  api: any;
  config?: any;
  data?: any;
}

export default class Storybook {
  private data: any;
  private wrapper: any;

  constructor(config: StorybookConfig) {
    this.data = config.data;
  }
  static get toolbox() {
    return {
      title: 'Storybook',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }


  render() {
    this.wrapper = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');

    this.wrapper.classList.add('simple-image');
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(button);
    this.wrapper.classList.add('cdx-block');
    input.classList.add('cdx-input');
    button.classList.add('cdx-button');

    input.placeholder = 'Paste an image URL...';
    input.value = this.data && this.data.url ? this.data.url : '';
    button.textContent = 'Log Input';

    input.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this._createImage(input.value);
      }
    });

    button.addEventListener('click', () => {
      console.log(input.value);
      input.remove();
      button.remove();
      fetch('/api/storybook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: 'How to use vending machine' }),
      })
        .then(response => response.json())
        .then(data => console.log(JSON.stringify(data, null, 2)))
        .catch((error) => console.error('Error:', error));

    });

    return this.wrapper;
  }

  _createImage(url:string) {
    const image = document.createElement('img');
    const caption = document.createElement('input');

    image.src = url;
    caption.placeholder = 'Caption...';

    this.wrapper.innerHTML = '';
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  save(blockContent : any) {
    const input = blockContent.querySelector('input');

    return {
      url: input.value
    }
  }

  validate(savedData: any) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }
}
