// Should NOT trigger react/react-in-jsx-scope or react/jsx-uses-react.
// The new JSX transform doesn't require React in scope.

export function GoodComponent() {
  return <div>Hello</div>;
}
