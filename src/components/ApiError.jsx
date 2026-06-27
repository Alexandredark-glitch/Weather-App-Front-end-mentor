import RestrictedIcon from "../../assets/images/icon-error.svg";
import RetryIcon from "../../assets/images/icon-retry.svg";
export default function ApiError({onRetry} ) {
  return (
      <div className="flex flex-col gap-4 items-center">
          <img src={RestrictedIcon} alt="error icon"></img>
          <h3 className="text-4xl font-bold">Something went wrong</h3>
          <p className="text-neutral-300 text-sm">We couldn't connect to the server (API error). Please try again in few moments</p>
          <button onClick={onRetry} className="cursor-pointer flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <img src={RetryIcon} alt="Retry icon"></img>
              Retry
          </button>
    </div>
  );
}
