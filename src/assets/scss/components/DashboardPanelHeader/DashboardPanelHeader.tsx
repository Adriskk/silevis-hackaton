import React, { FC } from "react";
import { Tooltip } from "primereact/tooltip";

interface DashboardPanelHeaderProps {
  data: {
    first_name: string;
    last_name: string;
    main_position: string;
    nationality: string;
    current_club: string;
  };
  onClick?: () => any;
}

const DashboardPanelHeader: FC<DashboardPanelHeaderProps> = ({
  data,
  onClick,
}) => {
  const {
    first_name = "Name",
    last_name = "Surname",
    main_position = "ST",
    nationality = "Country",
    current_club = "None",
  } = data;

  return (
    <div
      className="flex align-items-center justify-content-between gap-6 cursor-pointer w-full"
      onClick={onClick}
    >
      <div className="flex align-items-center justify-content-center gap-2">
        <div>
          <Tooltip target=".panel-text-pos" position="top" at="top" />
          <span
            className="panel-text-pos font-medium text-indigo-400"
            data-pr-tooltip="Player position on the field"
          >
            {main_position}
          </span>
        </div>

        <div>
          <Tooltip target=".panel-text-name" position="top" />
          <span
            className="panel-text-name font-light"
            data-pr-tooltip="Player's name and surname"
          >
            {first_name} {last_name}
          </span>
        </div>
      </div>

      <div>
        <Tooltip target=".panel-text-club" position="top" />
        <span
          className="panel-text-club font-light"
          data-pr-tooltip="Player's current club/team"
        >
          {current_club}
        </span>
      </div>

      <div>
        <Tooltip target=".panel-text-nat" position="top" />
        <span
          className="panel-text-nat font-light"
          data-pr-tooltip="Player nationality"
        >
          {nationality}
        </span>
      </div>
    </div>
  );
};

export default DashboardPanelHeader;
