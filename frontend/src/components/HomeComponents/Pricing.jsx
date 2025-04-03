import React from "react";

export default function Pricing({
  heading,
  desc,
  features,
  buttonText,
  supportText,
  emailText,
  emailAddress,
}) {
  return (
    <div>
      <div className="bg-white/60 dark:border-white/[0.2] dark:bg-black flex h-full flex-col justify-between rounded-3xl border border-transparent px-6 py-8 ring-1 ring-gray-900/10 sm:mx-8 lg:mx-0">
        <div>
          <p className="mt-4 gap-x-2">
            <span className="text-gray-400 dark:text-white block h-6 text-sm dark:text-white">
              {" "}
            </span>
            <span className="text-gray-900 text-4xl font-bold tracking-tight dark:text-white">
              {heading}
            </span>
          </p>
          <p className="text-gray-600 mt-6 h-24 text-sm leading-7 md:h-32 xl:h-24 dark:text-neutral-200">
            {desc}
          </p>
          <ul
            role="list"
            className="text-gray-600 mt-8 space-y-3 text-sm leading-6 sm:mt-10 dark:text-neutral-100"
          >
            {features.map((feature, index) => (
              <li key={index} className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-600 h-6 w-5 flex-none"
                  aria-hidden="true"
                >
                  <path
                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    fill="currentColor"
                    strokeWidth="0"
                  ></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            aria-describedby="tier-free"
            className="text-emerald-600 ring-1 ring-emerald-500 ring-inset hover:ring-emerald-600 focus-visible:outline-emerald-600 mt-8 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
          >
            {buttonText}
          </button>
          <div className="mt-10">
            <button className="mt-2 text-left text-xs text-neutral-500">
              {supportText}{" "}
              <span className="font-bold text-emerald-500">Chat with us.</span>
            </button>
            <a
              href={`mailto:${emailAddress}`}
              className="mt-2 block text-left text-xs text-neutral-500"
            >
              {emailText}{" "}
              <span className="font-bold text-emerald-500">{emailAddress}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}