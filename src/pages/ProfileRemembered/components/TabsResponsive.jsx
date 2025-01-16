import { Button, ButtonGroup } from "@nextui-org/react";
import AppContext from "../../../context/AppProvider";
import { useContext } from "react";

const TabsResponsive = ({ setOpenTab, openTab, t }) => {
  const { languageSelected } = useContext(AppContext);

  return (
    <ButtonGroup variant="faded" className="mb-3 justify-center w-full">
      <Button
        onPress={() => setOpenTab(1)}
        className={`${
          openTab === 1 &&
          "bg-primary-color/30 text-black text-xs font-bold uppercase  shadow-lg rounded block leading-normal"
        } min-w-fit w-full px-2`}
      >
        {t("About")}
      </Button>

      <Button
        onPress={() => setOpenTab(3)}
        className={`${
          openTab === 3 &&
          "bg-primary-color/30 text-black text-xs font-bold uppercase  shadow-lg rounded block leading-normal"
        } min-w-fit w-full px-2`}
      >
        {t("Media")}
      </Button>

      <Button
        onPress={() => setOpenTab(5)}
        className={`${
          openTab === 5 &&
          "bg-primary-color/30 text-black text-xs font-bold uppercase  shadow-lg rounded block leading-normal"
        } min-w-fit w-full px-2`}
      >
        {t("Tributes")}
      </Button>

      <Button
        onPress={() => setOpenTab(4)}
        className={`${
          openTab === 4 &&
          "bg-primary-color/30 text-black text-xs font-bold uppercase  shadow-lg rounded block leading-normal"
        } min-w-fit w-full px-2`}
      >
        Condo..
      </Button>

      <Button
        onPress={() => setOpenTab(2)}
        className={`${
          openTab === 2 &&
          "bg-primary-color/30 text-black text-xs font-bold uppercase  shadow-lg rounded block leading-normal"
        } min-w-fit w-full px-2`}
      >
        {languageSelected === "es" ? "Public.." : "Posts"}
      </Button>
    </ButtonGroup>
  );
};

export default TabsResponsive;
