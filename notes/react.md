# React

React was made to ease UI development.  
Uses a virtual DOM to update the actual DOM.

## Components
Just like components in Vue.  
Uses PascalCase for component names.  
Ex : `Component.tsx`
```tsx
function Component() {
  return (
    <div>
      <h1>Component</h1>
    </div>
  );
}

export default Component;
```

### Dynamic components
```tsx
function Component({ name }) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

export default Component;
```

### CSS classes  
`class` is a JS keyword, so `className` is used in JSX.

### Multiline  
We need to wrap the JSX in parentheses to use multiple lines in the return statement.

### Multiple elements (like a list)  
There's no for loop or any other loop in JSX.  
So instead, we can use built-in JS functions like `map` to loop through an array and return JSX elements.  
Ex :
```tsx
function Component() {
  const names = ["Alice", "Bob", "Charlie"];

  return (
    <ul>
      {names.map(name => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}

export default Component;
```

### Conditional rendering
```tsx
function Component({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome</h1> : <h1>Log in</h1>}
    </div>
  );
}

export default Component;
```
A better way than ternary operator when we display nothing if the condition is falsy :
```tsx
function Component({ isLoggedIn }) {
  return (
    <div>
      {/* isLoggedIn ? <h1>Welcome</h1> : null */}
      {isLoggedIn && <h1>Welcome</h1>}
    </div>
  );
}

export default Component;
```
In JS, `&&` returns the last value if all values are truthy, or the first falsy value.  
Ex : `true && "Hello" && 1` returns `1`, `false && "Hello" && 1` returns `false`.

### Handle click events
```tsx
function Component() {
  return (
    <button onClick={(event) => console.log(event)}>Click me</button>
  );
}

export default Component;
```
or
```tsx
import { MouseEvent } from "react";

function Component() {
  function handleClick(event: MouseEvent) {
    console.log(event);
  }

  // specifying handleClick() would call it immediately, using it without parentheses allows React to call it at runtime
  return (
    <button onClick={handleClick}>Click me</button>
  );
}

export default Component;
```

## State hook
State is component-specific, so two `Component` components will have different states.
```tsx
import { useState } from "react";

function Component() {
  const items = ["Alice", "Bob", "Charlie"];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={selectedItem === item ? "selected" : ""}>{item}</li>
        ))}
      </ul>
      <button onClick={() => { setSelectedIndex(index); }}>Add item</button>
    </>
  );
}

export default Component;
```

## Props
Props are passed from parent to child components.
```tsx
interface Props {
  name: string;
  age: number;
}

interface ParentProps {
  hasChild: boolean;
}

function Parent({ hasChild }: ParentProps) {
  return (
    <>
      {hasChild && <Child name="Alice" age={30} />}
    </>
  );
}

function Child(props: Props) {
  const { name, age } = props;
  // Or use props.name and props.age

  return (
    <h1>{name} is {age} years old.</h1>
  );
}

export default Child;
```

### Callback from a child to a parent
```tsx
interface Props {
  onAdd: (name: string) => void;
}

function Parent() {
  function handleAdd(name: string) {
    console.log(name);
  }

  return (
    <Child onAdd={handleAdd} />
  );
}

function Child({ onAdd }: Props) {
  function handleClick() {
    onAdd("Alice");
  }

  return (
    <button onClick={handleClick}>Add</button>
  );
}

export default Child;
```

### Passing a Component as a prop
```tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Alert({ children }: Props) {
  return (
    <div className="alert">
      {children}
    </div>
  );
}

function Component() {
  return (
    <Alert>
      <h1>Alert !</h1>
      <p>This is an important alert message.</p>
    </Alert>
  );
}

export default Component;
```

## Fragments
To return multiple elements without a parent element, use a fragment.
```tsx
import { Fragment } from "react";

function Component() {
  return (
    <Fragment>
      <h1>Component</h1>
      <p>Paragraph</p>
    </Fragment>
  );
}
```
or
```tsx
function Component() {
  return (
    <>
      <h1>Component</h1>
      <p>Paragraph</p>
    </>
  );
}
```

## Rendering
In the `main.tsx`, it's `ReactDOM` which is in charge of rendering the components.  
It is also possible to use another renderer, like `react-native`.

## Sources
- [Programming with Mosh - "React Tutorial for Beginners"](https://www.youtube.com/watch?v=SqcY0GlETPk)
- [Code Bootcamp - "Every React Concept Explained in 12 Minutes"](https://www.youtube.com/watch?v=wIyHSOugGGw)
- [ByteGrad - "TypeScript in React - COMPLETE Tutorial (Crash Course)"](https://www.youtube.com/watch?v=TPACABQTHvM)
- [Fireship - "10 React Hooks Explained // Plus Build your own from Scratch"](https://www.youtube.com/watch?v=TNhaISOUy6Q)
