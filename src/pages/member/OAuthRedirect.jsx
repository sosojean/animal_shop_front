import React from 'react';
import {useSearchParams} from "react-router-dom";

const OAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code")

  return (
      <div>
        {code}


      </div>
  );
};

export default OAuthRedirect;