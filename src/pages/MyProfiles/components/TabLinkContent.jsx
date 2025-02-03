// This is the link of the content!
const TabLinkContent = ({ openTab, numberTab, children, idTab }) => {
  return (
    <div className={openTab === numberTab ? "block" : "hidden"} id={idTab}>
      {children}
    </div>
  );
};

export default TabLinkContent;
