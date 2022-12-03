import React, { FC, useState } from "react";

import { TabMenu, TabMenuTabChangeParams } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

const Navigation: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();

  const OnChange = (e: TabMenuTabChangeParams) => {
    setActiveIndex(e.index);
    navigate(items[e.index].link);
  };

  const items = [
    { label: "Players", icon: "pi pi-fw pi-users", link: "/" },
    { label: "Compare", icon: "pi pi-fw pi-clone", link: "/compare/" },
  ];

  return (
    <nav className="flex justify-content-center gap-6 p-5">
      <span className="flex align-items-center text-xl">PlayersMarket</span>
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => OnChange(e)}
      />
      <Button
        label="Login"
        icon="pi pi-arrow-right"
        iconPos="right"
        onClick={() => navigate("/login")}
      />
    </nav>
  );
};

export default Navigation;
