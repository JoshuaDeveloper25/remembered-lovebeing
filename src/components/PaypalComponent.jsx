import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import getFastApiErrors from "../utils/getFastApiErrors";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PaypalComponent = ({ packageName, rememberedId }) => {
  const [paypalInvoiceDetails, setPaypalInvoiceDetails] = useState({});
  const [{ isPending }, dispatchPaypal] = usePayPalScriptReducer();
  const { userInfo } = useContext(AppContext);
  const navigate = useNavigate();

  // This is for turning a remembered profile from free to PRO
  const payRememberedProProfile = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/payments/pay?remembered_id=${rememberedId}&token=${
          userInfo?.access_token
        }`,
        paymentInfo
      ),
    onSuccess: (res) => {
      console.log(res);
      navigate(`/paypal-payment-success/`, { state: paypalInvoiceDetails });
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

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
            amount: {
              value: rememberedId
                ? 1
                : packageName === "singlePackage"
                ? 1
                : 5,
            },
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
        type_plan: rememberedId ? "Upgrading FREE profile to PRO" : packageName === "singlePackage" ? "Single" : "Tertiary",
      };

      setPaypalInvoiceDetails(invoiceDetails);

      try {
        localStorage.setItem("invoiceDetails", JSON.stringify(invoiceDetails));

        if (rememberedId) {
          payRememberedProProfile?.mutate();
        } else {
          payPremiumProfilePrices?.mutate();
        }

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
        // dispatch({ type: "clear cart" });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <PayPalButtons
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      )}
    </div>
  );
};

export default PaypalComponent;
