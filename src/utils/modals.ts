import { modalProps } from "./types";

const modalErrorProduct: modalProps = {
    title: "Invalid Product",
    subtext: "We cannot find a product matching this query under your account",
    buttonText: "Go to dashboard",
    closable: false,
    callback: () => {
      window.location.href = "/dashboard";
    },
  };
  
  const modalErrorLogin: modalProps = {
    title: "You are not logged in!",
    subtext: "Please login or create an account to view the Dashboard",
    buttonText: "Go to Home Page",
    callback: () => {
      window.location.href = "/";
    },
    closable: false,
  };

export {
    modalErrorLogin,
    modalErrorProduct
}