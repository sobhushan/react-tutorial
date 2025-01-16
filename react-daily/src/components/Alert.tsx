import React from 'react'
import { ReactNode } from 'react'

interface Props{
    children: ReactNode;
}
const Alert = ({ children }: Props) => {
  return (
    <div className="alert alert-primary">{children}</div>

  )
}

export default Alert

//-------------------------------------------------->
//code for App.tsx
// import Alert from "./components/Alert";

//  function App(){
//     return <div>
//         <Alert>
//             Hello World
//         </Alert>
//         </div>
//  }
//  export default App;