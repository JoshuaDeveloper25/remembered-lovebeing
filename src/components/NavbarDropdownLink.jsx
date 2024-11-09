import { Link } from "react-router-dom";

const NavbarDropdownLink = ({
  dropDownVersion = 1,
  hoverBgLink,
  linkText,
  onClick,
  linkTo,
  dropdownDesc,
  dropdownIcon,
}) => {
  return (
    <>
      {dropDownVersion === 1 && (
        <li
          className={`${hoverBgLink} hover:text-white last:rounded-b font-semibold animation-fade text-black text-sm cursor-pointer`}
          onClick={onClick}
        >
          <Link className="py-2.5 px-5 block" to={linkTo || "#"}>
            {linkText}
          </Link>
        </li>
      )}

      {dropDownVersion === 2 && (
        <li
          className={`${hoverBgLink} group py-2.5 px-5 flex gap-2 items-start hover:text-white last:rounded-b font-bold animation-fade text-black text-sm cursor-pointer`}
          onClick={onClick}
        >
          {dropdownIcon}

          <div>
            <Link className="block" to={linkTo || "#"}>
              {linkText}
            </Link>

            <p className="text-sm max-w-[392px] font-normal text-muted-color group-hover:text-white/90">
              {dropdownDesc}
            </p>
          </div>
        </li>
      )}
    </>
  );
};

export default NavbarDropdownLink;
