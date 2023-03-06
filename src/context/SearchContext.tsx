import { optionsHotel } from "@types";
import { Dispatch, createContext, useReducer } from "react";
import type { Range } from "react-date-range/index";

export type SearchedDestination = {
  city: string;
  destination_id?: number;
  type?: string;
  dates: Range[] | [];
  options: optionsHotel;
};

type SearchAction = {
  type: "NEW_SEARCH" | "RESET_SEARCH"; // literal type ideally besides enums.
  payload: SearchedDestination;
};

type DestinationContext = {
  state: SearchedDestination;
  dispatch?: Dispatch<SearchAction>;
};

const initialState: SearchedDestination = {
  city: "argentina",
  dates: [{ startDate: new Date(), endDate: new Date(), key: "selection" }],
  options: {
    adult: 1,
    children: 0,
    room: 0,
  },
};

const initialContext: DestinationContext = {
  state: initialState,
};

export const SearchContext = createContext<DestinationContext>(initialContext);

type props = {
  children?: JSX.Element | JSX.Element[];
};
export const SearchContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(setSearch, initialState);

  function setSearch(state: SearchedDestination, action: SearchAction) {
    switch (action.type) {
      case "NEW_SEARCH":
        return action.payload; // new data
      case "RESET_SEARCH":
        return initialState;
      default:
        throw new Error("No action defined in context provider");
    }
  }

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
