import FavouriteProfile from "./FavouriteProfile";

const FavouritesRememberedsProfile = ({
  isPendingFavouritesProfiles,
  favouritesProfiles,
}) => {
  console.log(favouritesProfiles);
  return (
    <section>
      {favouritesProfiles?.length !== 0 ? (
        <article className="grid sm:grid-cols-2 grid-cols-1 gap-3 col-span-3">
          {favouritesProfiles?.map((item) => {
            return (
              <FavouriteProfile
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
