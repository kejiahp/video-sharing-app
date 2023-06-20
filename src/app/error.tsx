/**
 *
 * error handle in nextjs, this helps use by creating an error boundary catching the error and displaying the content of this page rather that the normal error messagge.
 *
 * This function gets two params direct from nextjs, the error param and the reset param.
 * @param reset this restarts the component that triggerred the error
 */
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="font-semibold text-xl">Oops...something went wrong</h1>
        <p className="font-semibold text-xl">{error.message}</p>
        <p className="font-semibold">Kindly refresh the page</p>
      </div>

      <div>
        <button
          onClick={reset}
          className="rounded p-2 outline-none bg-blue-400"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
