import RememberProfile from "../../components/RememberProfile";

const PreviewProfileRemembered = () => {
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
