// PRACTICING CONDITIONAL LIST RENDERING
import { useState } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({items, heading, onSelectItem}: Props) {
  const [selIndex, setSelIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
       {/* same as
      {items.length === 0 ? <p>No item found</p> : null} 
      same as
      if(items.length === 0)
        return <p>No item found</p>*/}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className= {selIndex === index ? "list-group-item active": "list-group-item"}
            key={item}
            onClick={() => {
              setSelIndex(index)
              onSelectItem(item)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;

//------------------------------------------------------------------------------------------------------>
//in the App.tsx--->
// import ListGroup from "./components/ListGroup";

//  function App(){
//     const handleSelectItem = (item:string) =>{
//         console.log("Clicked: ",item);
//     }
//     let items = ["New York", "London", "New Delhi", "Tokyo", "Paris "];
//     return <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/></div>
//  }
//  export default App;