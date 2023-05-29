
1. ### `What is the difference between Component and PureComponent? Give an example where it might break my app.`

The main difference is that a Purecomponent can't have side effects. A side-effect such as a RESTful request could break an app if there is a network error and the error is not handled correctly.

2. ### `Context + ShouldComponentUpdate might be dangerous. Why is that?`
 
Context allows communication between deeply contained components. shouldComponentUpdate is used to block re-rendering of part of the componponent tree including children based on shallow comparison of props or state and so this could unintentionally block context propagation.

3. ### `3. Describe 3 ways to pass information from a component to its PARENT.`

Using a global store such as Redux (via dispatch and selector hooks) or via the New Context API, or by passing a function to the child component that then updates parent state (or by declaring the child component within lexical scope of the parent).

4. ### `4. Give 2 ways to prevent components from re-rendering.`

By using memoization techniques such as React.memo useCallback/useMemo and reselect libray, or by sensible decomposition of components and avoidance of prop-drilling with good state management tools (e.g Redux).  

5. ### `What is a fragment and why do we need it? Give an example where it might break my app.`
A Fragment will group multiple elements without requiring a DOM node container. This can reduce superfluous div wrappers as the parent then wraps the group. However, this makes assumptions about the context of the parent's boundaries which could change or be reused in an alternative context that may result in layout/styling bugs.

6. ### `Give 3 examples of the HOC pattern.`
The 'connect' redux container (map state/dispatch to props), react-router's withRouter and material-ui's withStyles. Note these HOC for class based components have been outdated/deprecated in favour of hooks used in functional components.

7. ### `What's the difference in handling exceptions in promises, callbacks and async...await?.`
Promises can handle exceptions with the use of the reject method inside the callback and chaining .catch() on the end of the promise chain. async...await exemptions can be handled by wrapping the await functionality in a try...catch...finally block. We can 'Promisify' an async callback and then attach .then and .catch to handle any exceptions.

8. ### `How many arguments does setState take and why is it async.`
The setState method takes an updater function that returns a state change object and an optional callback function that executes once the setState completes and after the subsequent render. setState is asynchronous because the rendering process is 'expensive' and this permits batching of state updates.

9. ### `List the steps needed to migrate a Class to Function Component.`
The class declaration is replaced with a function. props are combined into a single prop object parameter, the constructor is removed and each state initialization moved into their respective useState declaration at the top of the function (all references to 'this.' are removed). all lifecycle methods should be converted where necessary using the useEffect hook. event handlers can be converted into arrow functions (removing references to 'this.' and any binding of state). The render method is removed and all setup logic within the render method is moved into the function including the return of the react original component. Lastly, if the class extends from another class, then the inherited class behaviour should be composed into a custom hook and imported into the function.

10. ### `List a few ways styles can be used with components.` 
Inline using style prop, standard css, styled-components (emotion), via classname prop and class libraries (tailwind, tachyons, bootstrap), pre-processed (SASS/LESS).

11. ### `How to render an HTML string coming from the server.`
By using the dangerouslySetInnerHTML attribute or preferably with a html parser/sanitizer such as react-html-parser that avoids dangerouslySetInnerHTML and instead safely converts the string into react equivalents. The additional benefit of using a html parser is that styles can be programmatically overridden for consistency.