import NavbarDropdownLink from "../../../components/NavbarDropdownLink";
import { HiDotsVertical } from "react-icons/hi";
import { createPortal } from "react-dom";
import { useState } from "react";

const ResponsiveMoreInfoRememberedAdmin = ({ userStats }) => {
  const [openVerticalDots, setOpenVerticalDots] = useState(false);

  return (
    // {/* Vertical Dots Dropdown */}
    <div className="relative">
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="animation-fade text-xl hover:rounded-full  hover:bg-white/20"
        onClick={() => setOpenVerticalDots(!openVerticalDots)}
        type="button"
      >
        <HiDotsVertical size={23} />
      </button>

      {openVerticalDots && (
        <>
          {createPortal(
            <div
              onClick={() => setOpenVerticalDots(!openVerticalDots)}
              className="h-[100vh] fixed top-0 w-full"
            ></div>,
            document.body
          )}

          <ul className="absolute right-0 shadow-lg bg-gray-200 py-2 w-max rounded max-h-96 z-50">
            <div className="flex justify-center  items-center my-6">
              <div className="border-r border-tertiary-color/50 px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.posts_count}
                </h3>
                <h2 className="text-xs text-tertiary-color">Posts</h2>
              </div>

              <div className="border-r border-tertiary-color/50 px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.gallery_images_count}
                </h3>
                <h2 className="text-xs text-tertiary-color">Media</h2>
              </div>

              <div className="border-r border-tertiary-color/50 px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.tributes_count}
                </h3>
                <h2 className="text-xs text-tertiary-color">Tributes</h2>
              </div>

              <div className="px-2">
                <h3 className="text-sm text-tertiary-color font-bold">
                  {userStats?.condolences_count}
                </h3>

                <div className="relative group cursor-pointer">
                  <span className="text-sm text-tertiary-color block overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">
                    Con...
                  </span>
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden w-max px-2 py-1 text-white bg-black rounded-md text-sm group-hover:block">
                    Condolences
                  </span>
                </div>
              </div>
            </div>
          </ul>
        </>
      )}
    </div>
  );
};

export default ResponsiveMoreInfoRememberedAdmin;
