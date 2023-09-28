export interface Instruction {
  Title: string; // "Title of the instruction"
  Overview: string; // "Quick summary of what instruction is about"
  Steps: Step[]; // "List of steps to complete the instruction"
}

export interface Step {
  index: number; // "Index of the step"
  description: string; // "Description of the step"
}