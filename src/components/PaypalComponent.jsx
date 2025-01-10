import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import getFastApiErrors from "../utils/getFastApiErrors";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const PaypalComponent = ({ packageName }) => {
  const [paypalInvoiceDetails, setPaypalInvoiceDetails] = useState({});
  const [{ isPending }, dispatchPaypal] = usePayPalScriptReducer();
  const { userInfo } = useContext(AppContext);
  const navigate = useNavigate();

  // This is for buying a package of 1 or 3
  const payPremiumProfilePrices = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/get-premium-profiles/pay/${
          packageName === "singlePackage" ? 1 : 3
        }/${"paypal"}/${"paypal"}`,
        paymentInfo
      ),
    onSuccess: (res) => {
      navigate(`/paypal-payment-success/`, { state: paypalInvoiceDetails });
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  //   const subTotalOrder = +state.cart.cartItems
  //     .reduce((ac, cu) => cu.qty * cu.price + ac, 0)
  //     .toFixed(2);
  //   const tax = Number(((15 * subTotalOrder) / 100).toFixed(2));
  //   const totalOrder = Number((subTotalOrder + tax).toFixed(2));

  useEffect(() => {
    console.log("cargando el paypal");
    dispatchPaypal({
      type: "setLoadingStatus",
      value: "pending",
    });
  }, []);

  const createOrder = async (data, actions) => {
    try {
      //   const url = `${import.meta.env.VITE_BASE_URL}/users/cart`;
      //   const config = {
      //     headers: { Authorization: `Bearer ${state.userInfo.token}` },
      //   };

      //   const { data } = await axios(url, config);
      //   console.log(data);
      // dispatch({type:'update cart from database', payload:data})

      //   const formatingCart = data.map((item) => ({
      //     ...item.productId,
      //     qty: item.qty,
      //   }));

      //   if (formatingCart.find((item) => item.qty > item.countInStock)) {
      //     window.alert("please check your cart");
      //     navigate("/cart");
      //     return;
      //   }

      return actions.order.create({
        purchase_units: [
          {
            description: "Paying in Eternal MemoriesX",
            amount: { value: packageName === "singlePackage" ? 20 : 50 },
            custom_id: JSON.stringify({
              id: userInfo?.email,
            }),
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }

    // if(state.cart.cartItems.find(item => item.qty > item.countInStock)){
    //   fetchCart()
    // }

    // return actions.order.create({
    //   purchase_units:[
    //     {
    //       description:"Paying in Eshop",
    //       amount:{value:totalOrder}
    //     }
    //   ]
    // })
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      const invoiceDetails = {
        ...JSON.parse(details.purchase_units[0].custom_id),
        approvalNumber: details?.id,
        invoiceNumber: details?.id,
        creation_date: details?.create_time,
        description: details?.purchase_units[0]?.description,
        price: details?.purchase_units[0]?.amount?.value,
        type_plan: packageName === "singlePackage" ? "Single" : "Tertiary",
      };

      setPaypalInvoiceDetails(invoiceDetails);

      console.log(details, "details aqui");
      console.log(data, "data quii");

      try {
        payPremiumProfilePrices?.mutate();

        // const url = `${import.meta.env.VITE_BASE_URL}/orders/pay`;

        // const bodyParameter = {
        //   details,
        // //   shippingAddress: state.cart.shippingAddress,
        // //   cart: state.cart.cartItems,
        //   subTotalOrder,
        //   tax,
        //   totalOrder,
        // };

        // const { data } = await axios.post(url, bodyParameter, config);
        // console.log(data);
        // dispatch({ type: "clear cart" });
      } catch (error) {
        // toast.error(getError(error));
        console.log(error);
      }
    });
  };

  const onError = () => {};

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          fundingSource={undefined}
        />
      )}
    </div>
  );
};

export default PaypalComponent;
