import { OrderInterface } from "../../interfaces/IOrder";

const apiUrl = "http://localhost:8080";

async function GetOrders() {

    const requestOptions = {
         
        method: "GET",

        headers: {

            "Content-Type": "application/json",

        },
    };

    let res = await fetch(`${apiUrl}/orders`, requestOptions)

        .then((response) => response.json())

        .then((res) => {

            if (res.data) {

                return res.data;
            } else {
                
                return false;
            }
        });

    return res;
}

async function GetStates() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/states`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function DeleteOrderByID(id: Number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
  
    let res = await fetch(`${apiUrl}/orders/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
}

async function UpdateOrder(data: OrderInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/orders`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data }; 
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetOrdersDetail() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/ordersdetail`, requestOptions)
    .then((response) => response.json())
    .then((res) =>{
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
    
  return res.data;
}

export {GetOrders,
        GetStates,
        DeleteOrderByID,
        UpdateOrder,
        GetOrdersDetail};