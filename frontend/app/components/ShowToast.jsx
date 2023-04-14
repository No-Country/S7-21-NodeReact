import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ShowToast(status, message, closeModal) {
  console.log("ingreso a showtoast",status, message, closeModal)
  if (status) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      onClose: closeModal,
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      onClose: closeModal,
    });
  }
}
