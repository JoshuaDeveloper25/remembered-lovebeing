import { Link } from "react-router-dom";

const NavbarDropdownLink = ({ hoverBgLink, linkText, onClick, linkTo }) => {
  return (
    <li
      className={`${hoverBgLink} hover:text-white font-semibold animation-fade text-black text-sm cursor-pointer`}
      onClick={onClick}
    >
      <Link className="py-2.5 px-5 block" to={linkTo || "#"}>
        {linkText}
      </Link>
    </li>
  );
};

export default NavbarDropdownLink;
