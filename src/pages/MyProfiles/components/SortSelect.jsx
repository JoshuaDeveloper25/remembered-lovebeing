import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { MdSort } from "react-icons/md";

const SortSelect = ({ selectedKeys, setSelectedKeys }) => {
  const { t } = useTranslation();

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  return (
    <>
      <label>
        <span className="block font-semibold">{t("Filter by")}:</span>

        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              className="px-0 h-auto min-w-fit data-[hover=true]:bg-transparent"
              variant="light"
            >
              <MdSort size={24} /> {selectedValue}
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Single selection example"
            onSelectionChange={setSelectedKeys}
            selectedKeys={selectedKeys}
            disallowEmptySelection
            selectionMode="single"
          >
            <DropdownItem key={t("All")}>{t("All")}</DropdownItem>
            <DropdownItem key="Premium">{t("Premium")}</DropdownItem>
            <DropdownItem key={t("Free")}>{t("Free")}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </label>
    </>
  );
};

export default SortSelect;
