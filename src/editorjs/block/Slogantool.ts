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
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add("slogan-wrapper");
    this.wrapper.id = this.generateUniqueId();

  }
  static get toolbox() {
    return {
      title: 'Slogan',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>'
    };
  }
 
  generateUniqueId(length = 6) {
    return Math.random().toString(36).substr(2, length);
  }




  render() {

    const htmlTemplate = `
      <img src="icon.png" alt="Docu" class="icon-docu" />
      <div class="slogan-text-wrapper">
        <h1>
          Slogan<span style="color: white">.</span
          ><span style="color: #61afef">println</span>("
        </h1>
        <div class="string">
          <h1 class="greeting en">We <b>see</b> it!</h1>
          <h1 class="greeting es">We explore it!</h1>
          <h1 class="greeting de">We imagine it!</h1>
          <h1 class="greeting it">We create it!</h1>
        </div>
        <h1 class="closure">");</h1>
      </div>
      <div class="team-name-wrapper">
        <p>Hello 👋 We're</p>
        <section class="animation">
          <div class="first"><div>Fourward</div></div>
        </section>
      </div>
  `;

    // Assuming this.wrapper is the element you want to append to
    this.wrapper.innerHTML = htmlTemplate;
    return this.wrapper;
  }

  save(blockContent : any) {
    return this.data
  }

  validate(savedData: any) {

    return true;
  }
}
