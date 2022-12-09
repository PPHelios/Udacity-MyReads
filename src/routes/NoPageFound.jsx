import { Link } from "react-router-dom";

export const NoPageFound = () => {
  return (
    <>
      <h4>You seems Lost...</h4>
      <Link to="/">
        <h3>Back To Home Page</h3>
      </Link>
    </>
  );
};
