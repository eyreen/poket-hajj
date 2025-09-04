"use client";

import { SentimentAnalysisCenter } from "@/components/admin/sentiment-analysis-center";

export default function SentimentAnalysisPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sentiment Analysis Center</h1>
        <p className="text-gray-600 mt-1">
          AI-powered sentiment monitoring and crisis management for pilgrim satisfaction
        </p>
      </div>
      
      <SentimentAnalysisCenter />
    </div>
  );
}
