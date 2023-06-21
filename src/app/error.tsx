"use client";

/**
 *
 * error handle in nextjs, this helps use by creating an error boundary catching the error and displaying the content of this page rather that the normal error messagge.
 *
 * This function gets two params direct from nextjs, the error param and the reset param.
 * @param reset this restarts the component that triggerred the error
 */
const Error = ({ error }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center flex flex-col gap-4">
        <h1 className="font-semibold text-xl text-blue-500">
          Oops...something went wrong
        </h1>
        <p className="font-semibold text-xl text-gray-500">{error.message}</p>
        <p className="font-semibold text-gray-500">Kindly refresh the page</p>
      </div>

      {/* <div>
        <button
          onClick={reset}
          className="rounded p-2 outline-none bg-blue-400"
        >
          Try Again
        </button>
      </div> */}
    </div>
  );
};

export default Error;
