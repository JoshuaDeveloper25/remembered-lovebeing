const TabLink = ({
  setOpenTab,
  openTab,
  numberTab,
  iconTab,
  linkTab,
  textTab,
  countTab,
  enableCountTab = true,
}) => {
  return (
    <li className="relative -mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === numberTab
            ? "bg-primary-color/30 text-black"
            : "bg-white")
        }
        onClick={(e) => {
          e.preventDefault();
          setOpenTab(numberTab);
        }}
        data-toggle="tab"
        href={linkTab}
        role="tablist"
      >
        <span className="inline-block">{iconTab}</span> {textTab}
      </a>

      {enableCountTab && (
        <div className="absolute right-0 -top-2">
          <p className="text-white bg-primary-color h-6 w-6 rounded-full flex justify-center items-center text-xs">
            {countTab}
          </p>
        </div>
      )}
    </li>
  );
};

export default TabLink;
