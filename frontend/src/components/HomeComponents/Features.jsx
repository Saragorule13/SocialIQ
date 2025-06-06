import { cn } from "../../libs/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Dashboard",
      description:
        "Get a bird's-eye view of your social media performance with real-time analytics and actionable insights.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Sentiment Analysis",
      description:
        "Understand the emotions behind your audience's comments and feedback with advanced AI-powered sentiment analysis.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Caption Generator",
      description:
        "Create engaging and creative captions tailored to your audience, helping you stand out on social media.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Hashtag Generator",
      description:
        "Discover trending and relevant hashtags to maximize your post's reach and engagement.",
      icon: <IconCloud />,
    },
    {
      title: "Image Generator",
      description:
        "Generate stunning, high-quality images that align with your brand's identity and captivate your audience.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Chatbot",
      description:
        "Automate your customer interactions with an intelligent chatbot that provides instant and accurate responses.",
      icon: <IconHelp />,
    },
    {
      title: "Report Download",
      description:
        "Easily download detailed reports of your social media performance for presentations, analysis, and decision-making.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And More",
      description:
        "Explore additional tools and features designed to simplify your social media management journey.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="relative z-10 py-10 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl text-center mb-20 font-semibold text-black dark:text-white">
        Packed with <br />
        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
          Tons of features
        </span>
      </h1>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
