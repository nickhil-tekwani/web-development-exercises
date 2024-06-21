import React from "react";

export default function Header({ title, counter, items, selectedItems, setItems, setSelected }) {
  return (
    <div className="header bg-white px-4 py-5 border-b border-gray-200 sm:px-6 mb-5">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title} ({counter})
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={(e) => {
              // todo add all button
              console.log('adding all');
              const itemsCopy = [...items];
              const selectedCopy = [...selectedItems];
              const combined = selectedCopy.concat(itemsCopy)
              setSelected(combined)
              setItems([])
            }}
          >
            Add All
          </button>
        </div>
      </div>
    </div>
  );
}
