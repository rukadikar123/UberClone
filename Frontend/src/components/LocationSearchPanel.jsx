import React from "react";
import { IoLocation } from "react-icons/io5";

function LocationSearchPanel({ suggestions, onSelectSuggestion }) {
  return (
    <>
      <div className="flex flex-col gap-5 overflow-auto h-full scrollbar-none">
        {suggestions && suggestions?.length > 0 ? (
          suggestions?.map((suggestion, idx) => (
            <div
              onClick={() => onSelectSuggestion(suggestion)}
              key={idx}
              className="flex items-center border-2 border-gray-100 p-2 rounded-md active:border-gray-500 gap-4 justify-start"
            >
              <p className="bg-gray-200 rounded-full p-2">
                <IoLocation size={20} />
              </p>
              <p>{suggestion?.description}</p>
            </div>
          ))
        ) : (
          <p className="p-2 text-gray-500">No suggestions</p>
        )}
      </div>
    </>
  );
}

export default LocationSearchPanel;
