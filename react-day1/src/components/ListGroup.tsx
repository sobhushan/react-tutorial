function ListGroup() {
  let items = ["New York", "Mumbai", "New Delhi", "Tokyo"];
  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No item found</p>}
       {/* same as
      {items.length === 0 ? <p>No item found</p> : null} */}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item"
            key={item}
            onClick={() => console.log(item, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
