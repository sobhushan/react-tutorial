// PRACTICING CONDITIONAL LIST RENDERING
import { useState } from "react";

function ListGroup() {
  let items = ["New York", "Mumbai", "New Delhi", "Tokyo", "Paris "];
  const [selIndex, setSelIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
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
            onClick={() => {setSelIndex(index)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
