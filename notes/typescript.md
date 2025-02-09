# TypeScript

TypeScript is JavaScript + types. A JS code is a TS code as well. TS transpiles to JS (ability to specify a target version of JS).  
`tsc file.ts` to compile a TypeScript file.  
`tsc --init` to create a `tsconfig.json` file.  
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "lib": ["dom", "es2017"],
  }
}
```
Some libs need to have type declarations installed separately (`npm i -D @types/library`).

## Basic types
- `boolean`
- `number`
- `string`
- `array`
- `any` (better to avoid)
- `void` (no return value)
- `null` & `undefined` (represents emptyness vs hasn't been initialized)
- `never` (function that never returns, ex `function e(m: string): never { throw new Error(m); }`)

## Implicit types
```typescript
let x = 10; // inferred as number
let y = "Hello, World !"; // inferred as string
let z; // inferred as any, avoid
```

## Explicit types
```typescript
let x: number = 10;
let y: string = "Hello, World !";
```

## Custom types
```typescript
type ID = number;
type Name = string;
type Genre = "male" | "female";

let id: ID = 1;
let name: Name = "Alice";
let genre: Genre = "female";
```

## Functions
```typescript
function add(x: number, y: number): number {
  return x + y;
}

async function fetchData(url: string): Promise<any> {
  let response = await fetch(url);
  return response.json();
}

function processObject(obj: { id: number, name: string }): void {
  console.log(obj.id, obj.name);
}
```

## Arrays
```typescript
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
```

## Tuples (fixed length arrays)
```typescript
type Car = [string, number, boolean];

let car: Car = ["Hyundai N Vision 74", 2024, true];
console.log(`Model : ${car[0]}, Year : ${car[1]}, Electric : ${car[2]}`);

let car2 = []; // error because a tuple must be initialized with values
// solution : type Car = [string?, number?, boolean?];
```

## Interfaces
```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number; // optional property
}

interface Developer extends Person {
  role: string;
}

function greet(person: Person) {
  console.log(`Hello, ${person.firstName} ${person.lastName}`);
}

const person = {
  firstName: "Alice",
  lastName: "Smith",
  age: 30
};

greet(person);

interface Modular {
  a: string,
  b: number,
  [key: string]: any // can have any other properties
}
```

## Classes
```typescript
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

let dog = new Animal("Dog");
dog.move(10);
```

## Generics
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");

class Observable<T> {
  constructor(public value: T) {}
}

let x = new Observable<number>(10);
```

## Enums
```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

let go: Direction = Direction.Up;
console.log(`The direction is : ${go}`);
```

## Sources
- [Fireship - "TypeScript - The Basics"](https://www.youtube.com/watch?v=ahCwqrYpIuM)
