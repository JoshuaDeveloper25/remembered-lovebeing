import Profile from "./Profile";

const FavouritesRememberedsProfile = ({
  isPendingFavouritesProfiles,
  favouritesProfiles,
}) => {
  console.log(favouritesProfiles);
  return (
    <section>
      {favouritesProfiles?.length !== 0 ? (
        <article className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-7 col-span-3">
          {favouritesProfiles?.map((item) => {
            return (
              <Profile
                isPending={isPendingFavouritesProfiles}
                item={item}
                key={item?.id}
              />
            );
          })}
        </article>
      ) : (
        <h2 className="text-primary-color text-center text-2xl uppercase tracking-wider my-8">
          There's no favourites profiles yet...
        </h2>
      )}
    </section>
  );
};

export default FavouritesRememberedsProfile;
