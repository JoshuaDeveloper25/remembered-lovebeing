import RememberProfile from "../../components/RememberProfile";

const EditProfileRemembered = () => {
  return (
    <section className="min-[1200px]:pt-5 pt-0">
      {/* General Information */}
      <RememberProfile apiUrl={"get-profile"} queryKey={"profile"} />
    </section>
  );
};

export default EditProfileRemembered;
