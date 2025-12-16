import React from "react";
import { Button } from "@/components/ui/Button";
import { useChat } from "@/hooks/useChat";
import { MessageSquare, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";

export const LandingPage: React.FC = () => {
  const { startNewChat, isLoading } = useChat();

  const handleGetStarted = async () => {
    await startNewChat();
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Responses",
      description: "Get instant AI-powered answers to your questions",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Smart Conversations",
      description: "Context-aware conversations that remember your history",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your conversations are stored securely",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Data Visualization",
      description: "Get structured table data for better insights",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Chat with
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent ml-3">
              AI Assistant
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience the power of AI with instant responses, data
            visualization, and intelligent conversations. No signup required.
          </p>

          <Button
            size="lg"
            onClick={handleGetStarted}
            isLoading={isLoading}
            icon={<ArrowRight className="w-5 h-5" />}
            className="px-8 py-3 text-lg"
          >
            Start Chatting Free
          </Button>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            No credit card required • Free forever plan
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our AI Assistant
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <div className="text-primary-600 dark:text-primary-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Conversations?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of users who are already experiencing smarter
            conversations.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleGetStarted}
            isLoading={isLoading}
            className="px-8 py-3 text-lg bg-white hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};
