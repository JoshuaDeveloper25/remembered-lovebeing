import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Memorial from "./components/Memorial";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Memorials = () => {
  const [searchFullName, setSearchFullName] = useState("");
  const [searchBirthCountry, setSearchBirthCountry] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchGender, setSearchGender] = useState("");
  const [nextPage, setNextPage] = useState(2);
  const queryClient = useQueryClient();

  const memorialsQuery = useInfiniteQuery({
    queryKey: ["memorials"],
    queryFn: (data) => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-remembereds`,
        {
          params: {
            page: data?.pageParam || 1,
            full_name: searchFullName || searchParams.get("search"),
            birth_country: searchBirthCountry,
            designation: searchDesignation,
            gender: searchGender,
            size: 8,
          },
        }
      );
    },
    getNextPageParam: () => {
      return nextPage;
    },
  });

  // Get the countries of the people who just entered to the app.
  const countriesQuery = useQuery({
    queryKey: ["countriesMemorials"],
    queryFn: () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-registered-countries`
      );
    },
  });

  if (memorialsQuery?.isLoading) return <p>Cargando..</p>;

  const flapMapeado = memorialsQuery?.data?.pages?.flatMap(
    (item) => item?.data?.items
  );

  return (
    <section className="container-page px-2">
      {/* Introduction */}
      <div className="text-center mt-9 mb-6">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          In Memory of Our Loved Ones
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          This page is dedicated to honoring and remembering those who have left
          an indelible mark on our lives.
        </p>
      </div>

      <article className="px-2 py-5 bg-gray-300/25 rounded-sm shadow-lg overlay max-w-4xl mx-auto">
        <div className="flex items-center justify-center w-full mb-3">
          <label className="w-[30rem]">
            <input
              className="block py-2 px-2 h-full border border-tertiary-color/30 border-e-0 rounded-sm rounded-e-none w-full"
              type="text"
              value={searchFullName ?? searchParams.get("search")}
              onChange={(e) => setSearchFullName(e?.target?.value)}
              placeholder="Full Name"
            />
          </label>

          <div className="flex self-end">
            <button
              className="bg-red-500 px-4 py-[0.55rem] rounded-r-sm text-white hover:bg-red-600"
              type="button"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ["memorials"] })
              }
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center place-content-center gap-3">
          <label className="flex items-center gap-3">
            <span className="text-primary-color font-semibold">Country:</span>
            <select
              value={searchBirthCountry}
              onChange={(e) => setSearchBirthCountry(e?.target?.value)}
              name="countryMemorial"
              className="py-2 px-2 block border border-tertiary-color/30 rounded-sm bg-white"
            >
              <option value="">All</option>

              {countriesQuery?.data?.data?.map((country, index) => {
                // This is for the people who hasn't input the country of its profile
                // We dissapear the 'empty string' || null
                if (country === null) return;
                return (
                  <option key={index} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex items-center gap-3">
            <span className="font-medium text-primary-color">
              Cause of Death:
            </span>
            <select
              className="py-2 px-2 block border border-tertiary-color/30 bg-white rounded-sm w-[10rem]"
              onChange={(e) => setSearchDesignation(e?.target?.value)}
              placeholder="All"
              value={searchDesignation}
              name="designation"
            >
              <option value="">All</option>
              <option value="covid19_victim">COVID-19 victim</option>
              <option value="substance_victim">Substance abuse victim</option>
              <option value="cancer_victim">Cancer victim</option>
              <option value="accident_victim">Victim of an accident</option>
              <option value="crime_victim">Crime victim</option>
            </select>
          </label>

          <label className="flex items-center gap-3">
            <span className="font-semibold text-primary-color">Gender:</span>

            <select
              className="py-2 px-2 block border border-tertiary-color/30 bg-white rounded-sm w-[10rem]"
              placeholder="Gender"
              name="gender"
              value={searchGender}
              onChange={(e) => setSearchGender(e?.target?.value)}
            >
              <option value="">Both</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </article>

      {/* If there's no results this is what we place */}
      {!memorialsQuery?.data?.pages[0]?.data?.items?.length && (
        <h2 className="text-primary-color text-center text-2xl uppercase my-16 tracking-wider">
          There's no results about this memorial...
        </h2>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-7 my-9">
        {flapMapeado?.map((item, index) => {
          return <Memorial item={item} key={index} />;
        })}
      </div>

      {flapMapeado?.length ===
      memorialsQuery?.data?.pages[0]?.data?.total ? null : (
        <div className="my-5 text-center">
          <button
            className="btn btn-blue w-auto"
            onClick={() => {
              setNextPage((prev) => prev + 1);
              memorialsQuery?.fetchNextPage();
            }}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Memorials;
