import axios from 'axios';

export const getCities = async (indian_state) =>
{
    let array = [];
    let cityJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${indian_state}&country=IN&maxRows=10&username=Shivam1911`);
    for (let i = 0; i < 10; i++) {
        array[i] = { label: cityJSON.data.geonames[i].name, value: i + 1 }
    }
    console.log("Array is : ", array);
    return array;
}


export const loadAsyncValues = async (name) => {
    let array = [];
    let asyncJSON = await axios.get(`http://api.geonames.org/searchJSON?q=${name}&maxRows=20&username=Shivam1911`);
    console.log("AsyncJson :", asyncJSON);
    for (let i = 0; i < 20; i++) {
        array[i] = { label: `${asyncJSON.data.geonames[i].name} ,${asyncJSON.data.geonames[i].adminName1}, ${asyncJSON.data.geonames[i].countryName}`, value: i + 1 }
    }
    console.log("Array is : ", array);
    return array;
}