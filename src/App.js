import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pressed, setPressed] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    const input = document.querySelector("input");
    input.value = "";
    setSearchTerm("");
    setSearchedData(filteredData);
    setFilteredData([]);
    console.log(searchedData);
    setPressed(true);
  };

  // handle filter
  const handleFilter = (value) => {
    if (value === "") {
      setFilteredData([]);
      return;
    }
    const data = dummyData.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    }, []);

    console.log(data);
    setFilteredData(data);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleFilter(e.target.value);
  };

  // api call

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        const data = res.data.products;
        console.log(data);
        setDummyData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fun();
  }, []);

  // mapping filtered data to the component

  const renderData = () => {
    return filteredData.map((item) => {
      return (
        <div
          key={item.id}
          onClick={() => {
            setSearchTerm(item.title);
            const input = document.querySelector("input");
            input.value = item.title;
            handleFilter(item.title);
          }}
          className="mt-5"
        >
          <div className="flex flex-row items-center">
            <img src={item.thumbnail} alt="" className="w-20 h-20" />
            <h1 className="text-xl ml-5">{item.title}</h1>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl font-semibold">Search Filter</h1>
        <div className="mt-5 relative">
          <input
            type="text"
            placeholder="Search here..."
            onChange={handleChange}
            className="border w-[200px] border-gray-300 rounded-md p-2"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-md ml-2"
          >
            Search
          </button>

          {/* Filtered data */}
          <div className="p-2 w-[270px] max-h-[330px] overflow-auto scrollbar scrollbar-w-2 scrollbar-thumb-blue-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg absolute z-10 bg-white">
            {filteredData.length > 0 && renderData()}
          </div>
        </div>
        {/* Searched Item Detailed Information*/}
        <div className="mt-5 relative max-w-6xl m-4">
          {pressed && (
            <div className="">
              <div className="flex overflow-auto scrollbar scrollbar-w-1 scrollbar-h-1 scrollbar-thumb-blue-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
                <img
                  src={searchedData[0].images[0]}
                  alt=""
                  className="w-1/2 h-1/2"
                />
                <img
                  src={searchedData[0].images[1]}
                  alt=""
                  className="w-1/2 h-1/2"
                />
                <img
                  src={searchedData[0].images[2]}
                  alt=""
                  className="w-1/2 h-1/2"
                />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">
                  {searchedData[0].title}
                </h1>
                <p className="text-xl mt-2">{searchedData[0].description}</p>
              </div>
              <div className="grid grid-cols-2">
                <div className="mt-5">
                  <h1 className="text-2xl font-semibold">Price</h1>
                  <p className="text-xl mt-2">{searchedData[0].price} $</p>
                </div>

                <div className="mt-5">
                  <h1 className="text-2xl font-semibold">Category</h1>
                  <p className="text-xl mt-2">{searchedData[0].category}</p>
                </div>

                <div className="mt-5">
                  <h1 className="text-2xl font-semibold">Brand</h1>
                  <p className="text-xl mt-2">{searchedData[0].brand}</p>
                </div>

                <div className="mt-5">
                  <h1 className="text-2xl font-semibold">Rating</h1>
                  <p className="text-xl mt-2">{searchedData[0].rating}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
