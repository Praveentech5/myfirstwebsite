// context creation tick
// provider tick
// consumer- lenghty remove useContext hook
// useContext hook

import React from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Reducer from "./Reducer";

  let API ="http://hn.algolia.com/api/v1/search?";

const initialState = {
 isLoading : true,
 query : "css",
 nbPages: 0,
 page: 0,
 hits: [],
};


const AppContext = React.createContext();

//to  creat a provider function
const AppProvider = ({children})=> {

// const [state, setstate] = useState(initialState);

const [state, dispatch] = useReducer(Reducer,initialState);



  const fetchApiData = async (url)=> {

dispatch({type:"SET_LOADING"});

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
       type:"GET_STORIES",
     payload: {
      hits: data.hits,
      nbPages: data.nbPages,
     }
     });
      // let isLoading = false;
    } catch(error) {
      console.log(error);
    }
  };

  //to Remove the post
  const removePost = (post_ID) => {
   dispatch({type: "REMOVE_POST", payload: post_ID});
  };
// Search

const searchPost = (searchQuery) => {
 dispatch ({type: "SEARCH_QUERY",
payload: searchQuery,
});
};

//Pagination
const getNextPage = () => {
 dispatch({
  type: "NEXT_PAGE",
 })
}

const getPrevPage = () => {
 dispatch({
  type: "PREV_PAGE",
 })
}


//call tech api function
  useEffect(()=> {
   fetchApiData (`${API}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

 return(
  <AppContext.Provider value={{...state, removePost, searchPost, getNextPage, getPrevPage}}>
  {children}
  </AppContext.Provider>
 )
};

// coustom global hook create

const useGlobalContext = ()=> {
 return useContext(AppContext);
};


export { AppContext, AppProvider, useGlobalContext};
