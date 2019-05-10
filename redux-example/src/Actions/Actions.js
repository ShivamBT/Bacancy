import axios from "axios";

export const onMaleAgeUp = val => {
  return {
    type: "MALE_AGE_UP",
    payload: val
  };
};

export const onMaleAgeDown = () => {
  return {
    type: "MALE_AGE_DOWN"
  };
};

export const onFemaleAgeUp = val => {
  return {
    type: "FEMALE_AGE_UP",
    payload: val
  };
};

export const onFemaleAgeDown = () => {
  return {
    type: "FEMALE_AGE_DOWN"
  };
};

export const increaseNumber = () => {
  return {
    type: "INCREASE_NUMBER"
  };
};

export const fetchApiData = () => {
    return async dispatch => {
        // axios
        //   .get("https://jsonplaceholder.typicode.com/posts")
        //   .then(res => {
        //     console.log("Result of apiFetchdata is :", res);
        //     dispatch(sendApiData(res.data));
        //   })
        //   .catch(res => {
        //     console.log("Error is :", res);
        //     dispatch(errorApiData());
        //   });
        let result = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );
        console.log("Result of apiFetchdata is :", result);
        dispatch(sendApiData(result.data));
         
    };
    
};

export const sendApiData = data => {
  return {
    type: "FETCH_SUCCESS",
    payload: data
  };
};

export const errorApiData = () => {
  return {
    type: "FETCH_ERROR",
    payload: []
  };
};
