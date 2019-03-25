import axios from "axios";
let url = "http://localhost:8080/api/";

export const logIn = (email, password) => {
  return axios.post(`${url}user/login`, {
    email: email,
    password: password
  });
};

export const logOut = () => {
  return axios.get(`${url}user/logout`);
};

export const getUserList = (status, current_page, search, token) => {
  return axios.get(
    `${url}user/list?page=${current_page}&limit=20&${search.id}=${
      search.value
    }&status=${status}`,
    {
      headers: {
        token: token
      }
    }
  );
};

export const getStructureList = (current_page, search, token) => {
  return axios.get(
    `${url}entry/structure?page=${current_page}&${search.id}=${search.value}`,
    {
      headers: {
        token: token
      }
    }
  );
};

export const signupUser = signup => {
  return axios.post(`${url}user/signup`, signup);
};

export const getUnitList = (current_page, search, token) => {
  return axios.get(
    `${url}unit/list?page=${current_page}&${search.id}=${search.value}`,
    {
      headers: {
        token: token
      }
    }
  );
};

export const getFamilyList = (current_page, string, sorting, token) => {
  return axios.get(
    `${url}family/list?page=${current_page}&${string}sort=${
      sorting.sort
    }&field=${sorting.field}`,
    {
      headers: {
        token: token
      }
    }
  );
};

export const getReceptionList = (
  current_page,
  search,
  currentActive,
  token
) => {
  if (currentActive === "reception")
    return axios.get(
      `${url}reception/reception-users-list?page=${current_page}&${search.id}=${
        search.value
      }`,
      {
        headers: {
          token: token
        }
      }
    );
  else
  {
    let val = currentActive === "packet_in" ? false : true;
  
      return axios.get(
        `${url}reception/packets-List?page=${current_page}&dateTimeRecovered=${val}`,
        {
          headers: {
            token: token
          }
        }
      );
  }
};

export const getLastPacket = token => {
  return axios.get(`${url}reception/lastpacket-in`, {
    headers: {
      token: token
    }
  });
};

export const getUserDetails = (id, token) => {
  return axios.get(`${url}user/detail/${id}`, {
    headers: {
      token: token
    }
  });
};

export const getPacketTypes = token => {
  return axios.get(`${url}reception/packetTypes/list`, {
    headers: {
      token: token
    }
  });
};

export const addPacket = (object, token) => {
  return axios.post(`${url}reception/add-packet`, object, {
    headers: {
      token: token
    }
  });
};

export const recoverPacket = (object, token) => {
  return axios.post(
    `${url}reception/update-recovered-date/`, object, {
      headers: {
        token:token
      }
    }
  );
}
