import { Puff } from "react-loader-spinner";

import React from "react";

export default function Spinner() {
  return (
    <Puff
      height="200"
      width="200"
      radius={15}
      color="rgba(255,255,255,0.5)"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
