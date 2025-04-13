
import { useRef, useEffect, useState } from "react";
import { useChat } from "@/context/ChatContext";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Globe, BookOpen, FileText, PanelRight, Lightbulb, Zap, Code2, PenLine } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ChatHistory() {
  const { messages, sendMessage, isProcessing } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recommendedQuestions, setRecommendedQuestions] = useState<string[]>([]);

  // Function to generate recommended questions
  const generateRecommendedQuestions = () => {
    const allQuestions = [
      "What causes a recession?",
      "Are we alone in the universe?",
      "What is the blockchain used for?",
      "Why did the dinosaurs go extinct?",
      "How does machine learning impact finance?",
      "Can you help me learn Python?", 
      "What are the latest breakthroughs in fusion energy?",
      "How do black holes work?",
      "What is quantum computing?",
      "How does the human brain create memories?",
      "What causes climate change?",
      "How do mRNA vaccines work?",
      "What is artificial general intelligence?",
      "How do solid-state batteries work?",
      "What is dark matter?",
      "Can we reverse aging?",
      "How do psychedelics affect consciousness?",
      "What is the future of space colonization?",
      "How does quantum entanglement work?",
      "What are parallel universes?",
      "How do plants communicate?",
      "What is the origin of consciousness?",
      "How do self-driving cars make decisions?",
      "What are supervolcanoes?",
      "How do coral reefs survive?",
      "What causes northern lights?",
      "How do birds navigate?",
      "What is the future of human evolution?",
      "How do tardigrades survive extreme conditions?",
      "What are gravitational waves?",
      "Could advanced civilizations exist in other dimensions?",
      "How might the universe ultimately end?",
      "What existed before the Big Bang?",
      "Is time travel theoretically possible?",
      "Could we upload human consciousness to computers?",
      "Are we living in a simulation?",
      "What lies at the bottom of Earth's deepest oceans?",
      "How do animals experience emotions?",
      "Could humans develop new senses?",
      "What happens inside a quantum computer?",
      "How did life first begin on Earth?",
      "Could we terraform other planets?",
      "What is dark energy's true nature?",
      "How does quantum tunneling work?",
      "Could we achieve immortality through technology?",
      "What causes déjà vu?",
      "How do migrating animals navigate?",
      "What lies beneath Europa's icy surface?",
      "Could we harness zero-point energy?",
      "How do quantum computers maintain coherence?"
    ];
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Take first 4 items
    return shuffled.slice(0, 4);
  };

  // Generate recommended questions on initial render
  useEffect(() => {
    setRecommendedQuestions(generateRecommendedQuestions());
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const renderSkeletonLoader = () => (
    <div className="py-4 animate-fade-in">
      <div className="flex gap-4 max-w-4xl mx-auto px-4 md:px-6">
        <div className="mt-1 flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gemini-purple/20 flex items-center justify-center text-gemini-yellow">
            <Skeleton className="h-4 w-4 rounded-full bg-white/20" />
          </div>
        </div>
        
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-24 mb-3 bg-white/20" />
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-11/12 bg-white/10" />
            <Skeleton className="h-4 w-3/4 bg-white/10" />
            <div className="pt-1"></div>
            <Skeleton className="h-4 w-5/6 bg-white/10" />
            <Skeleton className="h-4 w-3/5 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );

  const emptyStateContent = () => (
    <div className="h-full flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gemini-yellow mb-4">
        What would you like to explore today?
      </h1>
      <p className="text-md text-muted-foreground mb-8 max-w-2xl">
        Ask me anything about science, history, technology, or any topic you're curious about. I'm here to help you learn and discover.
      </p>
      
      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl mb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 glass-morphism">
          <h3 className="text-lg font-medium text-gemini-yellow mb-4 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 flex-shrink-0" />
            Popular topics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-3 px-4 justify-start text-left glass-morphism hover:bg-gemini-yellow/10 hover:border-gemini-yellow/30 transition-all btn-hover-effect"
                onClick={() => sendMessage(question)}
              >
                <Search className="h-4 w-4 mr-2 flex-shrink-0 text-gemini-yellow" />
                <span className="truncate text-slate-50">{question}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 glass-morphism">
            <h3 className="text-base font-medium text-white mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2 flex-shrink-0 text-gemini-yellow" />
              Research
            </h3>
            <p className="text-sm text-muted-foreground">
              Get insights on academic topics and scientific research
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 glass-morphism">
            <h3 className="text-base font-medium text-white mb-2 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 flex-shrink-0 text-gemini-yellow" />
              Learn
            </h3>
            <p className="text-sm text-muted-foreground">
              Understand complex concepts, theories, and processes
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10 glass-morphism">
            <h3 className="text-base font-medium text-white mb-2 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 flex-shrink-0 text-gemini-yellow" />
              Explore
            </h3>
            <p className="text-sm text-muted-foreground">
              Discover fascinating facts about our universe and beyond
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto chat-history px-2 md:px-4">
      {messages.length === 0 || (messages.length === 1 && messages[0].role === "assistant") ? (
        emptyStateContent()
      ) : (
        <div className="py-4 max-w-4xl mx-auto">
          {messages.map(message => <ChatMessage key={message.id} message={message} />)}
          {isProcessing && renderSkeletonLoader()}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
