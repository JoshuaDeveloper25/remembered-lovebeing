import RememberProfile from "../../components/RememberProfile";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const PreviewProfileRemembered = () => {
  const params = useParams()

  const { data, isPending, error } = useQuery({
    queryKey: [`profile`, params?.id],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-profile/${params?.id}`
      ),
  });

  console.log(params?.id)
  console.log(data)
  console.log(error)

  return (
    <div className="mt-10">
      <RememberProfile
        apiUrl={"get-remembered-profile"}
        queryKey={"individualProfile"}
      />
    </div>
  );
};

export default PreviewProfileRemembered;
