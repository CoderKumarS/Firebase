import React, { MouseEvent, useState } from "react";

interface Props {
  items: string[];
  heading: string;
}
function ListGroup({ items, heading }: Props) {
  const message = items.length === 0 ? <p>No item found</p> : null;
  // const handleClick = (e: MouseEvent) => {
  //   console.log(e);
  // };
  let [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h2 className="p-2">{heading}</h2>
      {message}
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group p-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
