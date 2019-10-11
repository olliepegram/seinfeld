import React from "react";
import "./Spinner.css";

const Spinner = props => {
  return (
    <div className='SpinnerContainer'>
      <svg
        class='spinner'
        width='65px'
        height='65px'
        viewBox='0 0 66 66'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          class='circle'
          fill='none'
          stroke-width='6'
          stroke-linecap='round'
          cx='33'
          cy='33'
          r='30'
        ></circle>
      </svg>
    </div>
  );
};

Spinner.defaultProps = {
  message: "Loading..."
};

export default Spinner;
