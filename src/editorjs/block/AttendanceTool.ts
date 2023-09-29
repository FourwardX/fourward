// attendanceTool.ts
import connection from '@/signalR/SignalrClient';

export default class AttendanceTool {
  private wrapper: HTMLElement;
  static get toolbox() {
    return {
      title: 'Attandance',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }
  constructor() {
    this.wrapper = document.createElement('div');
  }

  render() {
    connection.start().catch(err => console.error(err));

    const entriesDiv = document.createElement('div'); // Div to hold all entries

    const addButton = document.createElement('button');
    addButton.innerText = 'Add';
    addButton.addEventListener('click', () => {
      const entryDiv = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'User ID';

      entryDiv.appendChild(checkbox);
      entryDiv.appendChild(input);

      entriesDiv.appendChild(entryDiv);

      // Subscribe to SignalR to update the checkbox based on the ID
      connection.on('UpdateAttendance', (userId: string, isPresent: boolean) => {
        if (input.value === userId) {
          checkbox.checked = isPresent;
        }
      });
    });

    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Confirm';
    confirmButton.addEventListener('click', () => {
      Array.from(entriesDiv.childNodes).forEach((entryDiv: any) => {
        const input = entryDiv.querySelector('input[type="text"]');
        const checkbox = entryDiv.querySelector('input[type="checkbox"]');
        const label = document.createElement('label');
        label.innerText = input.value;
        checkbox.id = input.value; // Assign the checkbox id with the value of the input
        entryDiv.replaceChild(label, input);
      });
    });

    this.wrapper.appendChild(entriesDiv);
    this.wrapper.appendChild(addButton);
    this.wrapper.appendChild(confirmButton);

    return this.wrapper;
  }



  save() {
    const checkbox = this.wrapper.querySelector('#attendanceCheckbox') as HTMLInputElement;
    const input = this.wrapper.querySelector('#userIdInput') as HTMLInputElement;
    return {
      userId: input.value,
      isPresent: checkbox.checked
    };
  }
}
