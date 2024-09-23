import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
  };

  return (
    <div>
      <ClipLoader
        color="white"
        loading={true}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
