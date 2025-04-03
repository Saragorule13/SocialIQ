import React from 'react';
import Navbar from '../components/HomeComponents/Navbar.home';
import Hero from '../components/HomeComponents/Hero.home';
import { InfiniteMovingCardsDemo } from '../components/HomeComponents/InfiniteCard';
import { HeroScrollDemo } from '../components/HomeComponents/Scroll';
import { FeaturesSectionDemo } from '../components/HomeComponents/Features';
import Pricing from '../components/HomeComponents/Pricing';

function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <HeroScrollDemo />
      <FeaturesSectionDemo />
    

      {/* Pricing Section */}
      <div className="flex flex-col items-center py-16">
      <h1 className="text-4xl font-semibold text-center text-black mb-20 dark:text-white">
            Don't wanna spend tons of money? <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Start with our affordable plans
            </span>
          </h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Pricing
            heading="Free Plan"
            desc="Enjoy all features for free for 1 month. Perfect for trying out SocialIQ."
            features={[
              "Dashboard with real-time analytics",
              "AI-powered sentiment analysis",
              "Caption, hashtag, and image generator",
              "Customizable chatbot",
              "Report downloads",
            ]}
            buttonText="Start Free Trial"
            supportText="Need help?"
            emailText="Contact us at"
            emailAddress="support@socialiq.com"
          />
          <Pricing
            heading="Quarterly Plan"
            desc="Get all features for 3 months at an affordable price of ₹450."
            features={[
              "Dashboard with real-time analytics",
              "AI-powered sentiment analysis",
              "Caption, hashtag, and image generator",
              "Customizable chatbot",
              "Unlimited report downloads",
            ]}
            buttonText="Subscribe for ₹450"
            supportText="Questions?"
            emailText="Reach out at"
            emailAddress="support@socialiq.com"
          />
          <Pricing
            heading="Monthly Plan"
            desc="Pay ₹150 per account per month and enjoy all features."
            features={[
              "Dashboard with real-time analytics",
              "AI-powered sentiment analysis",
              "Caption, hashtag, and image generator",
              "Customizable chatbot",
              "Unlimited report downloads",
            ]}
            buttonText="Subscribe for ₹150"
            supportText="Need assistance?"
            emailText="Email us at"
            emailAddress="support@socialiq.com"
          />
        </div>
      </div>

        <InfiniteMovingCardsDemo />
    </div>
  );
}

export default Home;