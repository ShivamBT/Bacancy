import axios from "axios";
let url = "http://localhost:3001/api/";

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

export const getFamilyList = (current_page, string, sorting,status, token) => {
  return axios.get(
    `${url}family/list?page=${current_page}&${string}sort=${
      sorting.sort
    }&field=${sorting.field}&status=${status}`,
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
  else {
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
  return axios.post(`${url}reception/update-recovered-date/`, object, {
    headers: {
      token: token
    }
  });
};

export const editUserDetails = (id, object, token) => {
  return axios.post(`${url}pool/editPoolUserDetail/${id}`, object, {
    headers: {
      token: token
    }
  });
};

export const bulkNotifications = (arr,token) => {
  console.log("Token is :", token);
  return axios.post(`${url}notification/send-bulk-notifications`, { arr },{
    headers: {
      token: token
    }
  });
};


export const getSubFamilyData = (id, token) =>
{
  return axios.get(
    `${url}family/getResidents/${id}?&showAllRecords=1&doNotShowMainPerson=1`, {
      headers: {
        token:token
      }
    }
  );
}

// export const getFamilyDetails = (id, token) =>
// {
//   return axios.get(`${url}family/getResidents/${id}?status=active`, {
//     headers: {
//       token:token
//     }
//   })
// }

export const getFamilyData = (id, status,currentActive, token) =>
{

  if (currentActive === "residents")
  {
    return axios.get(
      `${url}family/getResidents/${id}?status=${status}`, {
        headers: {
          token: token
        }
      }
    );
    
  }
  else if (currentActive === "extended_members")
  {
    return axios.get(
      `${url}family/getExtendedFamilyMember/${id}?&status=${status}`, {
        headers: {
          token: token
        }
      }
    );
  }
  
  else if (currentActive === "personnel")
  {
    return axios.get(
      `${url}family/getResidents/${id}?personStatus=NR-FP&status=${status}`, {
        headers: {
          token: token
        }
      }
    );
  }
  
  else if (currentActive === "temporary_resident")
  {
    return axios.get(
      `${url}family/getResidents/${id}?personStatus=NR-TEMP&status=${status}`, {
        headers: {
          token: token
        }
      }
    );
  }
  
  else if (currentActive === "units")
  {
    return axios.get(
      `${url}family/unitList/${id}`, {
        headers: {
          token: token
        }
      }
    );
  }
  
  else if (currentActive === "vehicles")
  {
    return axios.get(
      `${url}vehicle/listByFamilyId/${id}?status=${status}`, {
        headers: {
          token: token
        }
      }
    );
  }
  else if (currentActive === "packets")
  {
    return axios.get(
      `${url}family/packets-List/${id}?status=${status}`, {
        headers: {
          token: token
        }
      }
    );
  }
  
  else if (currentActive === "purchases")
  {
    return axios.get(
      `${url}purchases/list/${id}`, {
        headers: {
          token: token
        }
      }
    );
  }
  
  
}


export const getOwnerList = (status,current_page,token) =>
{
  return axios.get(
    `${url}owner/list?page=${current_page}&status=${status}`,
    {
      headers: {
        token: token
      }
    }
  );
}


export const getOwnerProfile = (id, token) =>
{
  return axios.get(
    `${url}owner/getOwnerById/${id}`,
    {
      headers: {
        token:token
      }
    }
  );
}


export const getUnitDetails = (id, token) =>
{
  return axios.get(`${url}unit/detail/${id}`, {
    headers: {
      token:token
    }
  }
  )
}