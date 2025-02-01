import Spinner from 'react-bootstrap/Spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const Loading = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <div className="loading-spinier position-absolute w-100">
      <Spinner className="spinner-border text-success" animation="border" />
      <div className="fade modal-backdrop show" />
    </div>
  ) : (
    <div />
  );
};

export default Loading;
