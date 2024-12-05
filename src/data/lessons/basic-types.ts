import { Lesson } from '../../types/Lesson';

export const basicTypesLesson: Lesson = {
  id: 'basic-types',
  title: 'Basic Types in TypeScript',
  description: 'Learn about fundamental TypeScript types while practicing typing.',
  code: `// Basic Types in TypeScript
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;

// Array type notation
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Bob", "Charlie", "David"];

// Object type with interface
interface Person {
  name: string;
  age: number;
}

let student: Person = {
  name: "Eve",
  age: 20
};

// Function with type annotations
function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}`,
  explanation: `This lesson covers:
- Basic type annotations (string, number, boolean)
- Array type declarations
- Interface definitions
- Object typing
- Function parameter and return type annotations`
};