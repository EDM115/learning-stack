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

### Purity
Components should be pure, the same input should always return the same output.
- A component should only return JSX.
- A component shouldn't change stuff that existed before rendering.
To avoid this, we can use Strict Mode to detect side effects during dev. Usually by wrapping the app in `<React.StrictMode>` in the `main.tsx`.

### Multiple elements (like a list)
There's no for loop or any other loop in JSX.  
So instead, we can use built-in JS functions like `map` to loop through an array and return JSX elements.  
Also we need to add a `key` prop to each element to help React identify which items have changed, are added, or are removed.  
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
There is also `onChange` (ex an input), `onSubmit` (ex a form), ...

## State hook
State is component-specific, so two `Component` components will have different states.  
`useState` takes an initial value and returns an array with the current state and a function to update it.
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

### Usecase : Controlled components
A controlled component is a component where the value is controlled by the state.  
Ex : an input field where the value is stored in the state.
```tsx
import { useState } from "react";

function Component() {
  const [name, setName] = useState("");

  return (
    <>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={() => { console.log(name); }}>Log name</button>
    </>
  );
}

export default Component;
```
Here :
1. The user types into the input, which calls setName with the new value.
2. The name state is updated with the new value.
3. The input value reads the new value from the state.

## Context hook
Context provides a way to pass data through the component tree without having to pass props down manually at every level.
```tsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function Component() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <h1>Theme : {theme}</h1>
    </div>
  );
}

export default Component;
```

## Ref hook
Refs provide a way to access DOM nodes or React elements created in the render method.  
Refs doesn't trigger re-renders when the value changes, which makes it good for mutable values.
```tsx
import { useRef } from "react";

function Component() {
  const inputRef = useRef<HTMLInputElement>(null);
  const value = useRef(0);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus input</button>
      <button onClick={() => { value.current++; }}>{value.current}</button>
    </>
  );
}

export default Component;
```

## Effect hook
The effect hook adds the ability to perform side effects in function components, for example on component load.  
Effects are code that reaches outside of React.  
They are similar to Vue's `onMounted` and `onUnmounted`.
```tsx
import { useEffect } from "react";

function Component() {
  // This is ran every time the component's state changes
  useEffect(() => {
    console.log("Component mounted");
  });

  return (
    <h1>Component</h1>
  );
}

export default Component;
```
To run only on mount, we need to pass an empty array as second argument (dependencies).
```tsx
import { useEffect } from "react";

function Component() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return (
    <h1>Component</h1>
  );
}

export default Component;
```
To run when a specific state changes, we need to pass that state as second argument.
```tsx
import { useEffect, useState } from "react";

function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed to " + count);
  }, [count]);

  return (
    <>
      <h1>Count : {count}</h1>
      <button onClick={() => { setCount(count + 1); }}>Increment</button>
    </>
  );
}

export default Component;
```
To run when the component unmounts, we can return a function from the effect.
```tsx
import { useEffect } from "react";

function Component() {
  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <h1>Component</h1>
  );
}

export default Component;
```

## Performance hooks
- `useMemo` : memoizes a value, only recomputing it when one of the dependencies has changed.
```tsx
import { useMemo } from "react";

function Component() {
  const items = ["Alice", "Bob", "Charlie"];
  const count = useMemo(() => items.length, [items]);

  return (
    <h1>Count : {count}</h1>
  );
}

export default Component;
```
- `useCallback` : memoizes a callback, only recomputing it when one of the dependencies has changed.
```tsx
import { useCallback } from "react";

function Component() {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <button onClick={handleClick}>Click me</button>
  );
}

export default Component;
```
Also check https://github.com/aidenybai/react-scan for a tool to find unnecessary re-renders.

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

## Portals
Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component (ex moving a component to another place in the DOM like modals, dropdowns or tooltips).
```tsx
import { createPortal } from "react-dom";

function Component() {
  return createPortal(
    <h1>Portal</h1>,
    document.getElementById("portal")
  );
}

function App() {
  return (
    <div>
      <h1>Main App</h1>
      <div id="portal"></div>
    </div>
  );
}

export default App;
```

## Suspense
Suspense lets components "wait" for something before rendering.  
Useful when a component takes time to render or make API calls.
```tsx
import { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function Component() {
  return (
    <Suspense fallback={<h1>Loading...</h1><Loading />}>
      <LazyComponent />
    </Suspense>
  );
}

export default Component;
```

## Error boundaries
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app.
```tsx
import { Component, ErrorInfo } from "react";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
or
```tsx
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div>
      <h1>Something went wrong.</h1>
      <pre>{error.message}</pre>
    </div>
  );
}

function Component() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <h1>Component</h1>
    </ErrorBoundary>
  );
}

export default Component;
```

## React 19
- **Compiler** : Converts React code to JS, faster, simplifies the dev.
- **No more memoization** (useMemo, useCallback) : Were needed to prevent re-renders, now React does it automatically.
- **No more forwardRef** : Refs are automatically forwarded and can be used as any prop.
- **New `use()` hook** : Loads resources asynchronously. Can replace `useEffect` and `useContext`. Better to use with Suspense.
- **Directives** : Like in Next.JS, to add metadata to components (ex `use client`, `use server`).
- **Actions** : Functions connected to the `action` prop of any form, can be run client or server side
- **`useFormStatus`** : Allows to get info when submitting forms asynchronously, like "pending"
- **`useFormState`** : Like useState but for Actions. Can be used to manage form state.
- **`useOptimistic`** : Enables optimistic updates to the state, allowing for a responsive UI while waiting for server responses (ex update like counter before we actually got the response).

## Sources
- [Programming with Mosh - "React Tutorial for Beginners"](https://www.youtube.com/watch?v=SqcY0GlETPk)
- [Code Bootcamp - "Every React Concept Explained in 12 Minutes"](https://www.youtube.com/watch?v=wIyHSOugGGw)
- [ByteGrad - "TypeScript in React - COMPLETE Tutorial (Crash Course)"](https://www.youtube.com/watch?v=TPACABQTHvM)
- [Fireship - "10 React Hooks Explained // Plus Build your own from Scratch"](https://www.youtube.com/watch?v=TNhaISOUy6Q)
- [Code Bootcamp - "Every React 19 Feature Explained in 8 Minutes"](https://www.youtube.com/watch?v=2NPIYnY3ilo)
