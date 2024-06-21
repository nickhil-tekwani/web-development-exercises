import React from "react";
import ItemRow from "./ItemRow";

function itemContainsText(item, text) {
  text = text.toLowerCase();
  const name = item.name.toLowerCase();
  const subtitle = item.subTitle.toLowerCase()
  return name.startsWith(text) || subtitle.startsWith(text); // name or department
}

export default function ItemPicker({ items, setItems, setSelected, selectedItems }) {
  return (
    <div className="item-picker h-auto">
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-blue-600 focus:ring-0 sm:text-sm h-12 pl-3"
        placeholder="Search by name or department"
        onChange={(e) => {
          // TODO -- optional
          // const inputText = e.target.value
          // const itemsCopy = [...items]
          // const filteredItems = itemsCopy.filter(item => itemContainsText(item, inputText));
          // setItems(filteredItems)
        }}
      />

      <div className="flow-root mt-8 overflow-y-auto h-96">
        <ul className="-my-5 divide-y divide-gray-200">
          {items.map((item, i) => (
            // pass props onto item row
            <ItemRow key={`${i}-${item.name}`} item={item} setItems={setItems} setSelected={setSelected} items={items} selectedItems={selectedItems} />
          ))}
        </ul>
      </div>
    </div>
  );
}
