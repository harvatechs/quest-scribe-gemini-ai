
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { toast } from "@/components/ui/use-toast";

export function ApiKeyDialog() {
  const { apiKey, setApiKey } = useChat();
  const [key, setKey] = useState(apiKey || "");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (key.trim()) {
      setApiKey(key.trim());
      toast({
        title: "API Key Saved",
        description: "Your Google Gemini API key has been saved."
      });
      setOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Google Gemini API Key</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Enter your Google Gemini API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="API Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Get your API key from{" "}
            <a
              href="https://ai.google.dev/tutorials/setup"
              target="_blank"
              rel="noreferrer"
              className="text-gemini-purple hover:underline"
            >
              Google AI Studio
            </a>
          </div>
          <Button onClick={handleSave} className="w-full bg-gemini-purple hover:bg-gemini-purple/90 text-white">Save API Key</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
