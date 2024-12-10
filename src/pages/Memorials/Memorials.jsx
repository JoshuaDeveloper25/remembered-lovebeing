import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Memorial from "./components/Memorial";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Memorials = () => {
  const [searchFullName, setSearchFullName] = useState("");
  const [tempSearchFullName, setTempSearchFullName] = useState("");
  const [searchBirthCountry, setSearchBirthCountry] = useState("");
  const [tempSearchBirthCountry, setTempSearchBirthCountry] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [tempSearchDesignation, setTempSearchDesignation] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [tempSearchGender, setTempSearchGender] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [nextPage, setNextPage] = useState(2);
  const queryClient = useQueryClient();

  const searchValue = searchParams.get("search");

  useEffect(() => {
    setSearchFullName(searchValue || "");
    setTempSearchFullName(searchValue || "");
  }, [searchValue]);

  const handleSearch = () => {
    setSearchFullName(tempSearchFullName);
    setSearchBirthCountry(tempSearchBirthCountry);
    setSearchDesignation(tempSearchDesignation);
    setSearchGender(tempSearchGender);

    // Refresca los resultados solo cuando se hace clic en el botón de búsqueda
    queryClient.invalidateQueries({ queryKey: ["memorials"] });
  };

  const memorialsQuery = useInfiniteQuery({
    queryKey: ["memorials", searchFullName, searchBirthCountry, searchDesignation, searchGender],
    queryFn: ({ pageParam = 1 }) => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}/remembereds/get-remembereds`,
        {
          params: {
            page: pageParam,
            full_name: searchFullName,
            birth_country: searchBirthCountry,
            designation: searchDesignation,
            gender: searchGender,
            size: 8,
          },
        }
      );
    },
    getNextPageParam: () => nextPage,
  });

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
    <section className="container-page px-2 py-16">
      {/* Introduction */}
      <div className="text-center mb-6">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          In Memory of Our Loved Ones
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          This page is dedicated to honoring and remembering those who have left
          an indelible mark on our lives.
        </p>
      </div>

      <article className="px-2 py-5 bg-white rounded-md shadow-lg overlay max-w-4xl mx-auto">
        <div className="flex items-center md:justify-center w-full mb-3">
          <label className="w-[30rem]">
            <input
              className="block py-2 px-2 h-full border border-tertiary-color/15 border-e-0 rounded-sm rounded-e-none w-full"
              type="text"
              value={tempSearchFullName}
              onChange={(e) => setTempSearchFullName(e?.target?.value)}
              placeholder="Full Name"
            />
          </label>

          <div className="flex self-end">
            <button
              className="bg-red-500 px-4 py-[0.55rem] rounded-r-sm text-white hover:bg-red-600"
              onClick={handleSearch}
              type="button"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-3">
          <label className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="text-primary-color font-semibold">Country:</span>
            <select
              value={tempSearchBirthCountry}
              onChange={(e) => setTempSearchBirthCountry(e?.target?.value)}
              name="countryMemorial"
              className="py-2 px-2 block border border-tertiary-color/15 rounded-sm bg-white"
            >
              <option value="">All</option>
              {countriesQuery?.data?.data?.map((country, index) => {
                if (country === null) return null;
                return (
                  <option key={index} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="font-medium text-primary-color">Cause of Death:</span>
            <select
              className="py-2 px-2 block border border-tertiary-color/15 bg-white rounded-sm w-[10rem]"
              onChange={(e) => setTempSearchDesignation(e?.target?.value)}
              value={tempSearchDesignation}
              name="designation"
            >
              <option value="">All</option>
              <option value="not_to_say">Prefer not to say</option>
              <option value="covid19_victim">COVID-19 victim</option>
              <option value="substance_victim">Substance abuse victim</option>
              <option value="cancer_victim">Cancer victim</option>
              <option value="accident_victim">Victim of an accident</option>
              <option value="crime_victim">Crime victim</option>
              <option value="heart_attack">Heart attack</option>
            </select>
          </label>

          <label className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="font-semibold text-primary-color">Gender:</span>
            <select
              className="py-2 px-2 block border border-tertiary-color/15 bg-white rounded-sm w-[10rem]"
              value={tempSearchGender}
              onChange={(e) => setTempSearchGender(e?.target?.value)}
              name="gender"
            >
              <option value="">Both</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </article>

      {/* No results message */}
      {!memorialsQuery?.data?.pages[0]?.data?.items?.length && (
        <h2 className="text-primary-color text-center text-2xl uppercase my-16 tracking-wider">
          There's no results about this memorial...
        </h2>
      )}

      {/* Results */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-7 my-9">
        {flapMapeado?.map((item, index) => (
          <Memorial item={item} key={index} />
        ))}
      </div>

      {/* Load More */}
      {flapMapeado?.length === memorialsQuery?.data?.pages[0]?.data?.total ? null : (
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
