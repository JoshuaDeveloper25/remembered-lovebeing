import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Memorial from "./components/Memorial";
import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { causeOfDeaths, genres } from "../../db/data";

const Memorials = () => {
  const { t } = useTranslation();
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
    queryKey: [
      "memorials",
      searchFullName,
      searchBirthCountry,
      searchDesignation,
      searchGender,
    ],
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

  const flapMapeado = memorialsQuery?.data?.pages?.flatMap(
    (item) => item?.data?.items
  );

  return (
    <section className="container-page px-2 py-16">
      {/* Introduction */}
      <div className="text-center mb-6">
        <h2 className="font-mono tracking-wider text-4xl text-primary-color uppercase font-semibold">
          {t("In Memory of Our Loved Ones")}
        </h2>
        <div className="bg-yellow-500 h-2 w-24 my-3 mx-auto"></div>
        <p className="text-xl max-w-2xl mx-auto mt-2 mb-8 text-muted-color">
          {t(
            "This page is dedicated to honoring and remembering those who have left an indelible mark on our lives."
          )}
        </p>
      </div>

      <article className="px-2 py-5 bg-white rounded-md shadow-lg overlay max-w-4xl mx-auto">
        <div className="flex items-center md:justify-center w-full mb-3">
          <label className="md:w-[30rem] w-full">
            <input
              className="block py-2 px-2 h-full border border-tertiary-color/15 border-e-0 rounded-sm rounded-e-none w-full"
              type="text"
              value={tempSearchFullName}
              onChange={(e) => setTempSearchFullName(e?.target?.value)}
              placeholder={t("Full Name")}
            />
          </label>

          <div className="flex self-end">
            <button
              className="bg-red-500 px-4 py-[0.55rem] rounded-r-sm text-white hover:bg-red-600"
              onClick={handleSearch}
              type="button"
            >
              {t("Search")}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-3">
          <Select
            onChange={(e) => setTempSearchBirthCountry(e?.target?.value)}
            placeholder={`${t("Select country")}`}
            value={tempSearchBirthCountry}
            label={`${t("Country")}`}
            name="countryMemorial"
          >
            {countriesQuery?.data?.data?.map((country) => {
              if (country === null) return null;

              return (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              );
            })}
          </Select>

          <Select
            onChange={(e) => setTempSearchDesignation(e?.target?.value)}
            label={`${t("Cause of Death")}`}
            value={tempSearchDesignation}
            placeholder={`${t("Select cause of death")}`}
            name="designation"
          >
            {causeOfDeaths.map((cause) => {
              return (
                <SelectItem key={cause?.value} value={cause?.value}>
                  {cause?.causeDeath}
                </SelectItem>
              );
            })}
          </Select>

          <Select
            onChange={(e) => setTempSearchGender(e?.target?.value)}
            placeholder={`${t("Select a gender")}`}
            value={tempSearchDesignation}
            label={`${t("Gender")}`}
            name="gender"
          >
            {genres.map((genre) => {
              return (
                <SelectItem key={genre?.value} value={genre?.value}>
                  {genre?.type}
                </SelectItem>
              );
            })}
          </Select>
        </div>
      </article>

      {memorialsQuery?.isLoading ? (
        t("Loading...")
      ) : (
        <>
          {!memorialsQuery?.data?.pages[0]?.data?.items?.length ? (
            <h2 className="text-primary-color text-center text-2xl uppercase my-16 tracking-wider">
              {t("There's no results about this memorial...")}
            </h2>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-7 my-9">
              {flapMapeado?.map((item, index) => (
                <Memorial item={item} key={index} />
              ))}
            </div>
          )}{" "}
        </>
      )}

      {/* Load More */}
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
