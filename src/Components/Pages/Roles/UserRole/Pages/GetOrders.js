import React, { useEffect } from "react";
import swal from "sweetalert";

const GetOrders = ({ order, index, orderData, user, setOrderData }) => {
  const { img, roomId, name, startDate, endDate, price } = order;

  const handleDeleteOrder = async (roomId) => {
    // alert(`Clicked on ${roomId}`)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        // const url = `http://localhost:5000/api/v1/orders/delete-room-order/${roomId}`;
        await fetch(`http://localhost:5000/api/v1/orders/delete-room-order/${roomId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        swal("Your order Deleted", {
          icon: "success",
        });

        //this second fetched is use to refresh delete data 
        await fetch(`http://localhost:5000/api/v1/orders/room/${user?.email}`)
        .then((res) => res.json())
        .then((data) => setOrderData(data?.data));
      } else {
        swal("Oder not deleted. You canceled it!");
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img className="w-28 xl:h-20 rounded " src={img} alt="" />
      </td>
      <td>{roomId}</td>
      <td>{name}</td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>{price}TK</td>
      <td>
        <button
          onClick={() => {
            handleDeleteOrder(roomId);
          }}
          className="btn btn-error text-base-200 btn-outline btn-sm"
        >
          Delete Order
        </button>
      </td>
    </tr>
  );
};

export default GetOrders;
