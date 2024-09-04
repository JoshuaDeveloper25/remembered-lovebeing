import { getLivedDays } from "../../../utils/getLivedDays";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProfilePlanStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --> 🧓 Get certain profile by remember id
  const rememberProfileQuery = useQuery({
    queryKey: [`profile`, searchParams.get("slug")],
    queryFn: async () =>
      await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/remembereds/get-profile/${searchParams.get("slug")}`
      ),
  });

  const makePaymentMutation = useMutation({
    mutationFn: async (paymentInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/pay?remembered_id=${
          rememberProfileQuery?.data?.data?.remembered_profile?.id
        }`,
        paymentInfo
      ),
    onSuccess: (res) => {
      toast.success("Successfully payment realized!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!e?.target?.payment_status?.value.trim())
      return toast.error("Fill up the blanks available!");

    makePaymentMutation.mutate({
      payment_status: e?.target?.payment_status?.value,
    });
  };

  if (rememberProfileQuery?.isLoading) return "loading...";

  return (
    <div className="flex flex-col sm:flex-row md:gap-12 gap-4 bg-white rounded-sm shadow-lg p-4">
      <div className="flex-1 relative shadow-2xl">
        <img
          src={
            rememberProfileQuery?.data?.data?.remembered_profile?.cover_images
              ?.cloud_front_domain
              ? `${rememberProfileQuery?.data?.data?.remembered_profile?.cover_images?.cloud_front_domain}/${rememberProfileQuery?.data?.data?.remembered_profile?.cover_images?.aws_file_name}`
              : "https://images.unsplash.com/photo-1506353187171-d49740268889?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-full h-32 object-cover rounded-t-lg"
          decoding="async"
          loading="lazy"
        />
        <div className="relative p-6 pb-6 rounded-b-lg">
          <div className="absolute top-2 right-2">
            <p className="text-green-500 bg-green-500/20 p-2">
              Plan: <span className="font-semibold">Free</span>
            </p>
          </div>

          <div>
            <img
              src={
                rememberProfileQuery.data?.data?.remembered_profile
                  ?.profile_images?.cloud_front_domain
                  ? `${rememberProfileQuery?.data?.data?.remembered_profile?.profile_images?.cloud_front_domain}/${rememberProfileQuery?.data?.data?.remembered_profile?.profile_images?.aws_file_name}`
                  : "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              }
              className="h-24 w-24 -mt-20 object-cover rounded-full border-4 border-black/60"
              decoding="async"
              loading="lazy"
            />

            <h2 className="mt-8 capitalize self-end font-bold text-2xl leading-6 text-center">
              {`${
                rememberProfileQuery?.data?.data?.remembered_profile?.first_name
              } ${
                rememberProfileQuery?.data?.data?.remembered_profile
                  ?.last_name || ""
              }`}
            </h2>

            {!rememberProfileQuery?.data?.data?.remembered_profile
              ?.birth_date &&
            !rememberProfileQuery?.data?.data?.remembered_profile
              ?.birth_date ? (
              <h2 className="font-semibold mt-4 text-muted-color">
                User hasn't input a date...
              </h2>
            ) : (
              <div className="mt-4 text-center">
                <h4 className="text-gray-700 font-semibold text-base">
                  {
                    rememberProfileQuery?.data?.data?.remembered_profile
                      ?.birth_date
                  }{" "}
                  -{" "}
                  {
                    rememberProfileQuery?.data?.data?.remembered_profile
                      ?.death_date
                  }
                  <span className="block text-xs font-medium">
                    {!rememberProfileQuery?.data?.data?.remembered_profile
                      ?.birth_date &&
                    !rememberProfileQuery?.data?.data?.remembered_profile
                      ?.death_date
                      ? null
                      : `Lived: ${getLivedDays(
                          rememberProfileQuery?.data?.data?.remembered_profile
                            ?.birth_date,
                          rememberProfileQuery?.data?.data?.remembered_profile
                            ?.death_date
                        )}`}
                  </span>
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-[30%] px-4 py-8">
        <div>
          <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
            Complete your order
          </h2>
          <div className="bg-yellow-500 h-2 w-24 my-3"></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <input
              type="text"
              placeholder="Address Line"
              name="payment_status"
              className="animation-fade px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary-color-light"
            />
          </div>

          <div className="flex gap-4 flex-col sm:flex-row mt-8">
            <button
              type="submit"
              className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-primary-color-light hover:bg-primary-color-light/50 animation-fade font-semibold text-white"
            >
              Complete Purchase
            </button>

            <Link to="/">
              <button
                type="button"
                className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-red-200 border border-red-400 text-red-500 max-md:order-1 animation-fade font-semibold"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePlanStatus;
