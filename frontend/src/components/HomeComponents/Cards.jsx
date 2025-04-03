import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="mx-auto px-8">
      <HoverEffect items={features} />
    </div>
  );
}

export const features = [
  {
    title: "Dashboard",
    description:
      "Get a bird's-eye view of your social media performance with real-time analytics and actionable insights.",
  },
  {
    title: "Sentiment Analysis",
    description:
      "Understand the emotions behind your audience's comments and feedback with advanced AI-powered sentiment analysis.",
  },
  {
    title: "Caption Generator",
    description:
      "Create engaging and creative captions tailored to your audience, helping you stand out on social media.",
  },
  {
    title: "Hashtag Generator",
    description:
      "Discover trending and relevant hashtags to maximize your post's reach and engagement.",
  },
  {
    title: "Image Generator",
    description:
      "Generate stunning, high-quality images that align with your brand's identity and captivate your audience.",
  },
  {
    title: "Chatbot",
    description:
      "Automate your customer interactions with an intelligent chatbot that provides instant and accurate responses.",
  },
];