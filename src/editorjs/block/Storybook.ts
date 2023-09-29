import { InstructionResult } from "@/models/InstructionResult";

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
