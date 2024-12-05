import { Lesson } from '../../types/Lesson';

export const interfacesLesson: Lesson = {
  id: 'interfaces',
  title: 'TypeScript Interfaces',
  description: 'Master TypeScript interfaces and learn how to define complex object types.',
  code: `// Interface with optional and readonly properties
interface User {
  readonly id: number;
  username: string;
  email: string;
  age?: number;
}

// Interface extending another interface
interface Employee extends User {
  department: string;
  salary: number;
}

// Implementing an interface
class Manager implements Employee {
  readonly id: number;
  username: string;
  email: string;
  department: string;
  salary: number;

  constructor(id: number, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.department = "Management";
    this.salary = 100000;
  }
}

// Interface for function type
interface SearchFunction {
  (query: string, limit?: number): User[];
}

const searchUsers: SearchFunction = (query, limit = 10) => {
  // Implementation would go here
  return [];
};`,
  explanation: `This lesson covers:
- Interface declaration and properties
- Optional and readonly modifiers
- Interface extension
- Class implementation of interfaces
- Function type interfaces
- Interface reuse and composition`
};