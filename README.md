# easy-css-merge 🌟

![Image John Avatar](https://raw.githubusercontent.com/johnny-quesada-developer/global-hooks-example/main/public/avatar2.jpeg)

Welcome to **easy-css-merge** - your streamlined solution for effortlessly merging CSS classes in React, Angular, Vue, or any other JavaScript framework. 🚀

**easy-css-merge** simplifies the process of dynamically adding and managing CSS class names in your JavaScript applications. Whether you're using plain JavaScript, TypeScript, or a popular framework like React or Vue, **easy-css-merge** enhances your development experience by providing a clean and intuitive API for handling class names.

### Seamlessly Manage CSS Classes!

tsCopy code

```TSX
import merge from 'easy-css-merge';

export const ThemeButton = ({ className }) => {
    const [theme, { toggle }] = useTheme();

    return (
        <button
            onClick={toggle}
            className={merge('py-3 px-5 font-bold', className, {
                'bg-white text-gray-700': theme === 'dark',
                'bg-gray-700 text-white': theme === 'light',
            })}
        >
            Toggle theme
        </button>
    );
};
```

With **easy-css-merge**, dynamically adding classes based on state or props becomes straightforward and readable, especially when using utility-first CSS frameworks like Tailwind CSS. [LIVE EXAMPLE](https://johnny-quesada-developer.github.io/react-global-state-hooks-example/), [CODE](https://github.com/johnny-quesada-developer/global-hooks-example)

### Features of easy-css-merge:

- **Simple String Merging**: Easily combine class names.
- **Array Merging**: Combine multiple classes from arrays.
- **Object Handling**: Apply classes conditionally, similar to Angular's class bindings.
- **Filter Functions**: Gain advanced control over which classes to include.

Explore the power of **easy-css-merge** in a Live Example and see how it can simplify your class name management.

### Get Started with easy-css-merge

Add **easy-css-merge** to your project:

```BASH
npm install easy-css-merge
```

Then, in your JavaScript or TypeScript files start merging classes!

```tsx
// merging simple strings
merge('pb-2', 'text-center', 'text-sm'); // 'pb-2 text-center text-sm'

// merging with arrays
merge(['pb-2', 'text-center'], 'text-sm', ['text-lg', 'text-red-500']); // 'pb-2 text-center text-sm text-lg text-red-500'

// merging with objects
merge(
  {
    'pb-2': true,
    'text-center': true,
  },
  ['text-sm text-red-500'],
  'text-lg'
); // 'pb-2 text-center text-sm text-red-500 text-lg'
```

And finally, merging with filters at the end of the merge, or at the end of each group, you can add a filter... With this simple extra step, you can filter out any class you want which give you the ability to override any classes and avoid collisions.

```TSX
import merge from 'easy-css-merge';

export const ThemeButton = ({ className, classNameFilter }) => {
  const [theme, { toggle }] = useTheme();

  return (
    <button
      onClick={toggle}
      className={merge(['block py-3 px-5 font-bold', classNameFilter] className, {
        'bg-white text-gray-700': theme === 'dark',
        'bg-gray-700 text-white': theme === 'light',
      })}>
        Toggle theme
    </button>
  );
};
```

In the previous example, since the classNameFilter is added just to the first group, it will only filter out the classes in that first group; but you can configure this as you want, and add filters at whatever point you want.

### The classNameFilter has the following signature:

```TSX
export type Excludes = string;

export type MergeFilterPredicate = (
value: string,
index: number,
array: string[]
) => boolean;

export type MergeFilter = (() => MergeFilterPredicate) | (() => Excludes[]);
```

It can be a function that returns a predicate, or an array of strings which will indicate which classes to exclude. In our previous example, if we wanted to exclude the **block** class, we could do the following:

```tsx
// By using a filter function
const classNameFilter = () => (key) => key !== 'block';

// By using an array with the classes to exclude
const classNameFilter = () => ['block'];
```

### Usage Examples

**Basic Usage**:

```tsx
const className = merge('text-lg', 'font-bold'); // 'text-lg font-bold'
```

**Conditional Classes**:

```tsx
const className = merge({ hidden: isHidden, flex: isFlex }); // 'flex' if isFlex is true
```

**Array and Object Combination**:

```tsx
const className = merge('text-lg font-bold', { hidden: isHidden }); // 'text-lg font-bold' or 'text-lg font-bold hidden' based on isHidden
```

**Advanced Filtering**:

```tsx
const className = merge(
  'base',
  { 'text-lg': true, hidden: false },
  ['p-4', 'm-2'],
  () => (cls) => cls !== 'hidden'
); // 'base text-lg p-4 m-2'
```

### Why easy-css-merge?

- **Lightweight**: No heavy dependencies.
- **Flexible**: Use in any JavaScript environment.
- **Intuitive**: Simple API, easy to learn and use.
- **Utility-First CSS Friendly**: Perfect companion for Tailwind CSS and similar frameworks.

Dive deeper into **easy-css-merge** on [GitHub](https://github.com/johnny-quesada-developer/easy-css-merge).

## Contribute to easy-css-merge

We welcome contributions! Check out our Contribution Guidelines and join us in enhancing **easy-css-merge** for developers around the world.

**_Thanks for reading, hope this help someone_**

## Collaborators

[![Image Johnny Quesada](https://avatars.githubusercontent.com/u/62082152?v=4&s=150)](https://github.com/johnny-quesada-developer)

&nbsp;&nbsp;&nbsp;&nbsp;[Johnny Quesada](https://github.com/johnny-quesada-developer) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
