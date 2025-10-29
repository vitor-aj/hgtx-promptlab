import { Bot, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AgentCardProps {
  name: string;
  description: string;
  promptName?: string;
  status: "active" | "inactive";
  onLinkPrompt: () => void;
}

export function AgentCard({ name, description, promptName, status, onLinkPrompt }: AgentCardProps) {
  return (
    <Card className="p-6 hover:shadow-hover transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <Badge variant={status === "active" ? "default" : "secondary"} className="mt-1">
              {status === "active" ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {promptName ? (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground">Prompt vinculado</p>
            <p className="text-sm font-medium text-foreground">{promptName}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>
      ) : (
        <Button onClick={onLinkPrompt} variant="outline" className="w-full">
          Vincular Prompt
        </Button>
      )}
    </Card>
  );
}
