import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: coral;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const MyComponent = () => {
  return <StyledDiv>This is styled with Styled Components!</StyledDiv>;
};

export default MyComponent;

//----------------------------------------------------->
//Code for App.tsx
// import MyComponent from "./components/Alert";
//  function App(){
//     return <div>
//         <h1>Welcome to Styled Components Example</h1>
//         <MyComponent />
//         </div>
//  }
//  export default App;