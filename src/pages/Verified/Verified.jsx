import VerifyingContent from "./components/VerifyingContent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";


const Verified = () => {
  const params = useParams();

  const { isPending, error } = useQuery({
    queryKey: ["confirmToken"],
    queryFn: async () =>
      await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/confirm-account/${params?.tokenId}`
      ),
  });

  return <VerifyingContent isPending={isPending} error={error} />;
};

export default Verified;
