import { Puff } from "react-loader-spinner";

import React from "react";

export default function Spinner() {
  return (
    <Puff
      height="80"
      width="80"
      radius={2}
      color="black"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
