
const intialState = {
    age: {
        male_age: 15,
        female_age:15
  }  
};

export const myReducer = (state = intialState, action) =>
{
    switch (action.type)
    {
        case "MALE_AGE_UP":
            return {
                ...state,
                age: { ...state.age, male_age: state.age.male_age + action.payload },
            };
            
        
        case "MALE_AGE_DOWN":
            return {
                ...state,
                age: { ...state.age, male_age: state.age.male_age - 1 }
            }
           
        
        case "FEMALE_AGE_UP":
            return {
                ...state,
                age: { ...state.age, female_age: state.age.female_age + action.payload }
            }
            
        case "FEMALE_AGE_DOWN":
            return {
                ...state,
                age: { ...state.age, female_age: state.age.female_age - 1 }
            }
           
        default:
            return {
                ...state
            }
    }
}