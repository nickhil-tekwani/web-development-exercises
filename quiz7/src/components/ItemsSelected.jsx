import React from "react";

export default function ItemsSelected({ items, selectedItems, setItems, setSelected }) {
  return (
    <div className="items-selected overflow-y-auto h-auto">
      <ul className="divide-y divide-gray-200">
        {selectedItems &&
          selectedItems.map((item, i) => (
            <li className="py-4" key={`selected-${i}-${item.name}`}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={item.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {item.subTitle}
                  </p>
                </div>
                <div className="pr-5">
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={(e) => {
                      // todo + button
                      setItems([item, ...items]); 
                      const selectedCopy = [...selectedItems];
                      const selectedLoc = selectedItems.indexOf(item);
                      if (selectedLoc > -1) {
                        selectedCopy.splice(selectedLoc, 1)
                      }
                      setSelected(selectedCopy)
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
