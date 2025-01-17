import { useEffect, useState } from 'react';

//interface DemoProps {}

//export default function Demo({}: DemoProps) {
function Demo() {
  const [count, setCount] = useState(0);

  const btnStyle = {
    backgroundColor: '#a4d9f3',
    padding: "20px",
    borderRadius: "10px",
    margin: "5px 5px",
  }

  useEffect(() => {
    // The code that we want to run
    console.log('The count is:', count);

    // Optional return function
    return () => {
      console.log('I am being cleaned up!');
    };
  }, [count]); // The dependency array

  return (
    <div className='tutorial'>
      <h1>Count: {count}</h1>
      <button style={btnStyle} onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button style={btnStyle} onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Demo;

//---------------------------------------------------------------->
// CODE FOR App.tsx
// import Demo from "./components/useEffectDemo";
// const App = () => {
//   const appStyle = {
//     backgroundColor: '#a4bdd3',
//     minHeight: '100vh',  
//     padding: '20px'      
//   };
//   return (
//     <div style={appStyle}><Demo /></div>
//   )
// }

// export default App