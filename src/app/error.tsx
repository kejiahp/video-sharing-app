"use client";

/**
 *
 * error handle in nextjs, this helps use by creating an error boundary catching the error and displaying the content of this page rather that the normal error messagge.
 *
 * This function gets two params direct from nextjs, the error param and the reset param.
 * @param reset this restarts the component that triggerred the error
 */
const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <h1>{error.message}</h1>
      <button onClick={reset} className="rounded p-2 outline-none bg-blue-400">
        Try Again
      </button>
    </div>
  );
};

export default error;
