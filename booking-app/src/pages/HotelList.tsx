import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Navbar,
  Header,
  CalendarDays,
  OptionsHotel,
  SearchItem,
} from "@components";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { UseFetch } from "@hooks";
import { Hotel, optionsHotel } from "@types";
import { getIDHotelLocation } from "@utils";
import type { Range } from "react-date-range/index";

const List = () => {
  // const hotelId = getIDHotelLocation();
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state.destination as string
  );
  const [options, setOptions] = useState(
    location.state.options as optionsHotel
  );
  const [dates, setDates] = useState(location.state.dates as Range[]);
  const [minPrice, setMin] = useState<number>(0);
  const [maxPrice, setMax] = useState<number>(999);

  const { data, loading, error, reFetchData } = UseFetch<Hotel[]>(
    `http://localhost:8800/api/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}`
  );

  useEffect(() => {
    console.log("data hotel!", data);
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      {/* <Header type='list' /> */}
      <div className='listContainer'>
        <div className='flex p-2'>
          {/* Aside */}
          <div className='p-2 rounded-md max-w-xs shadow-sm bg-yellow-400'>
            <h1 className='text-xl font-bold'>Search</h1>
            <div className='lsItem'>
              <div>Destination</div>
              <input
                className='input py-1 w-full max-w-xs capitalize'
                placeholder={destination}
                type='text'
              />
            </div>
            <div className='bg-base-200 rounded-md p-2'>
              <div>Check-in Date</div>
              <CalendarDays dates={dates} setDates={setDates} />
              <OptionsHotel options={options} setOptions={setOptions} />
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.adult?.toString()}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    min={0}
                    className='lsOptionInput'
                    placeholder={options.children?.toString()}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.room?.toString()}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className='p-2'>
            {data?.map((item) => (
              <SearchItem hotelItem={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;