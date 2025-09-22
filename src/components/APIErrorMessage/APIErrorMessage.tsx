type APIErrorMessageProps = {
  refetch?: () => void;
};

export default function APIErrorMessage({ refetch }: APIErrorMessageProps) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-6">
      <img src="/assets/images/icon-error.svg" className="size-12" alt="icon error" />
      <h1 className="font-bricolage-grotesque text-bricolage-grotesque-preset-1 text-center text-white">
        Something went wrong
      </h1>
      <p className="font-dm-sans text-dm-sans-preset-4 text-weather-200 text-center">
        We couldn’t connect to the server (API error). Please try again in a few moments.
      </p>
      <button
        onClick={refetch}
        className="bg-weather-800 hover:bg-weather-600 font-dm-sans text-dm-sans-preset-7 flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-3 text-white capitalize transition-all duration-150"
      >
        <img src="/assets/images/icon-retry.svg" className="size-4" alt="icon refresh" />
        <span>Retry</span>
      </button>
    </div>
  );
}
