import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { PiCoinFill } from "react-icons/pi";
import { useState } from "react";

const SelectCurrency = ({ handleChangeCurrency, currency, t }) => {
  let countrySelected;

  if (currency === "HNL") {
    countrySelected = (
      <Avatar
        alt="Honduras"
        className="w-6 h-6"
        src="https://flagcdn.com/hn.svg"
      />
    );
  } else if (currency === "GTQ") {
    countrySelected = (
      <Avatar
        alt="Guatemala"
        className="w-6 h-6"
        src="https://flagcdn.com/gt.svg"
      />
    );
  } else if (currency === "NIO") {
    countrySelected = (
      <Avatar
        alt="Nicaragua"
        className="w-6 h-6"
        src="https://flagcdn.com/ni.svg"
      />
    );
  } else if (currency === "CRC") {
    countrySelected = (
      <Avatar
        alt="Costa Rica"
        className="w-6 h-6"
        src="https://flagcdn.com/cr.svg"
      />
    );
  } else if (currency === "MXN") {
    countrySelected = (
      <Avatar
        alt="Mexico"
        className="w-6 h-6"
        src="https://flagcdn.com/mx.svg"
      />
    );
  }

  return (
    <Select
      onChange={handleChangeCurrency}
      defaultSelectedKeys={["united_states"]}
      classNames={{
        trigger: "bg-primary-color data-[hover=true]:bg-primary-color/90",
        selectorIcon: "text-white",
      }}
      startContent={countrySelected}
      label={
        <div className="flex items-center gap-1.5 text-white">
          <PiCoinFill className="text-yellow-300" size={20} />
          {t("Select currency")}
        </div>
      }
      className="max-w-xs"
    >
      <SelectItem
        value={currency}
        key="HNL"
        startContent={
          <Avatar
            alt="Honduras"
            className="w-6 h-6"
            src="https://flagcdn.com/hn.svg"
          />
        }
      >
        Honduras
      </SelectItem>
      <SelectItem
        value={currency}
        key="GTQ"
        startContent={
          <Avatar
            alt="Guatemala"
            className="w-6 h-6"
            src="https://flagcdn.com/gt.svg"
          />
        }
      >
        Guatemala
      </SelectItem>
      <SelectItem
        value={currency}
        key="NIO"
        startContent={
          <Avatar
            alt="Nicaragua"
            className="w-6 h-6"
            src="https://flagcdn.com/ni.svg"
          />
        }
      >
        Nicaragua
      </SelectItem>
      <SelectItem
        value={currency}
        key="CRC"
        startContent={
          <Avatar
            alt="Costa Rica"
            className="w-6 h-6"
            src="https://flagcdn.com/cr.svg"
          />
        }
      >
        Costa Rica
      </SelectItem>
      <SelectItem
        value={currency}
        key="MXN"
        startContent={
          <Avatar
            alt="Mexico"
            className="w-6 h-6"
            src="https://flagcdn.com/mx.svg"
          />
        }
      >
        Mexico
      </SelectItem>
    </Select>
  );
};

export default SelectCurrency;
