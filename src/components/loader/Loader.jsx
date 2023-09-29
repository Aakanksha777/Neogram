import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const Loader = () => {
  return (
    <div>
      <ClipLoader color={"#123abc"} loading={true} css={override} size={50} />
    </div>
  );
};

export default Loader;
