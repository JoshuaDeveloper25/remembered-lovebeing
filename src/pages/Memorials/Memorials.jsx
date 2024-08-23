import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Memorial from "./components/Memorial";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoSearch } from "react-icons/go";

const Memorials = () => {
  const [searchFullName, setSearchFullName] = useState("");
  const [searchBirthCountry, setSearchBirthCountry] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
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
            full_name: searchFullName,
            birth_country: searchBirthCountry,
            designation: searchDesignation,
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
      <div className="text-center mt-9 mb-14">
        <h2 className=" text-primary-color/85 text-3xl font-bold mb-1">
          In Memory of Our Loved Ones
        </h2>
        <p className="text-sm max-w-md mx-auto text-tertiary-color">
          This page is dedicated to honoring and remembering those who have left
          an indelible mark on our lives.
        </p>
      </div>

      <article className="flex items-center gap-3">
        <label>
          <span className="text-primary-color font-semibold">
            Search by Full Name:
          </span>
          <input
            className="w-full py-2 px-2 border border-tertiary-color/30 rounded-sm rounded-e-none outline-none"
            type="text"
            value={searchFullName}
            onChange={(e) => setSearchFullName(e?.target?.value)}
            placeholder="Full Name"
          />
        </label>

        <label>
          <span className="text-primary-color font-semibold">Country:</span>
          <select
            value={searchBirthCountry}
            onChange={(e) => setSearchBirthCountry(e?.target?.value)}
            name="countryMemorial"
            className="form-input-focus form-input-normal"
          >
            <option value="">-- Select Country --</option>

            {countriesQuery?.data?.data?.map((country, index) => {
              return (
                <option key={index} value={country}>
                  {country}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          <span className="font-semibold text-primary-color">
            Caused of Death:
          </span>
          <select
            className="form-input-focus form-input-normal"
            onChange={(e) => setSearchDesignation(e?.target?.value)}
            placeholder="-- Select --"
            value={searchDesignation}
            name="designation"
          >
            <option value="">-- Select --</option>
            <option value="covid19_victim">COVID-19 victim</option>
            <option value="substance_victim">Substance abuse victim</option>
            <option value="cancer_victim">Cancer victim</option>
            <option value="accident_victim">Victim of an accident</option>
            <option value="crime_victim">Crime victim</option>
          </select>
        </label>

        <div className="self-end">
          <button
            className=" bg-primary-color-light px-3 rounded-r-sm text-white py-2 border border-primary-color-light"
            type="button"
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["memorials"] })
            }
          >
            <GoSearch size={24} />
          </button>
        </div>
      </article>

      {/* If there's no results this is what we place */}
      {!memorialsQuery?.data?.pages[0]?.data?.items?.length && (
        <h2 className="text-primary-color text-center text-2xl uppercase my-16">
          There's no results about this memorial...
        </h2>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-7 my-9">
        {flapMapeado?.map((item) => {
          return <Memorial item={item} key={item?.id} />;
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
