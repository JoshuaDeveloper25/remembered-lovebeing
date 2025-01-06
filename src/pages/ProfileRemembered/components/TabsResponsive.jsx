import { Button, ButtonGroup } from "@nextui-org/react";

const TabsResponsive = () => {
  return (
    <ButtonGroup variant="faded" className="mb-3 justify-center w-full">
      <Button className="min-w-fit w-full px-2 bg-primary-color/30 text-black text-xs font-bold uppercase  shadow-lg rounded block leading-normal">About</Button>
      <Button className="min-w-fit w-full px-2">Media</Button>
      <Button className="min-w-fit w-full px-2">Tributes</Button>
      <Button className="min-w-fit w-full px-2">Condo..</Button>
      <Button className="min-w-fit w-full px-2">Posts</Button>
    </ButtonGroup>
  );
};

export default TabsResponsive;
