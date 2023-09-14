export interface Response {
  Title: string; // "Title of the information"
  Overview: string; // "Quick summary of what this is about"
  Steps: Step[]; // "List of steps to complete the task"
}

export interface Step {
  index: number; // "Index of the step"
  description: string; // "Description of the step"
}