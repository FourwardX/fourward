import { InstructionResult } from "@/models/InstructionResult";

interface SloganConfig {
  api: any;
  config?: any;
  data?: any;
}

export default class Slogantool {
  private data: any;
  private wrapper: any;

  constructor(config: SloganConfig) {
    this.data = config.data;
  }
  static get toolbox() {
    return {
      title: 'Slogan',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>'
    };
  }
  createStory(data: InstructionResult, id: string): void {
    const div = document.createElement('div');
    div.id = `sb-${id}`;

    const title = document.createElement('h1');
    title.textContent = data.Title;
    div.appendChild(title);

    const overview = document.createElement('p');
    overview.textContent = data.Overview;
    div.appendChild(overview);

    const stepsDiv = document.createElement('div');
    stepsDiv.id = `steps-${id}`;
    div.appendChild(stepsDiv);

    data.Steps.forEach((step) => {
      const stepDiv = document.createElement('div');

      const idx = document.createElement('h2');
      idx.textContent = `Step ${step.index}`;
      stepDiv.appendChild(idx);

      const desc = document.createElement('p');
      desc.textContent = step.description;
      stepDiv.appendChild(desc);

      if (step.img) {
        const img = document.createElement('img');
        img.src = step.img;
        stepDiv.appendChild(img);
      }

      stepsDiv.appendChild(stepDiv);
    });

    this.wrapper.appendChild(div);
  }
  generateUniqueId(length = 6) {
    return Math.random().toString(36).substr(2, length);
  }


  render() {
    this.wrapper = document.createElement('div');
    const loader = document.createElement('div');
    loader.classList.add('cdx-loader');
    loader.style.display = 'none'; // Initially hidden
    this.wrapper.appendChild(loader);
    const input = document.createElement('input');
    const button = document.createElement('button');

    this.wrapper.classList.add('storybook-wrapper');
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(button);
    this.wrapper.classList.add('cdx-block');
    input.classList.add('cdx-input');
    button.classList.add('cdx-button');

    input.placeholder = 'Please enter your prompt...';
    input.value = this.data && this.data.url ? this.data.url : '';
    button.textContent = 'Create Storybook';

    button.addEventListener('click', () => {
      const prompt = input.value;
      console.log(prompt);
      loader.style.display = 'block'; // Show loader
      input.remove();
      button.remove();
      fetch('/api/storybook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const uniqueId = this.generateUniqueId();
          this.createStory(data, uniqueId);
        })
        .catch((error) => console.error('Error:', error)).finally(() => {
          loader.style.display = 'none'; // Hide loader
        });;

    });

    return this.wrapper;
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
