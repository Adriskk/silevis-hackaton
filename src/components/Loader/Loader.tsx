import React, { FC } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

interface LoaderProps {
  size?: "big" | "small";
}

const Loader: FC<LoaderProps> = ({ size = "small" }) => {
  const px = size === "big" ? "150px" : "50px";

  return (
    <div className="p-4">
      <ProgressSpinner
        style={{ width: px, height: px }}
        strokeWidth="8"
        fill="var(--indigo-600)"
        animationDuration=".5s"
      />
    </div>
  );
};

export default Loader;
