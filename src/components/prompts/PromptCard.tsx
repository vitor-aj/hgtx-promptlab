import { FileText, Edit, History, Copy, TestTube } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PromptCardProps {
  title: string;
  creator: string;
  lastModified: string;
  status: "draft" | "published";
  onEdit: () => void;
  onHistory: () => void;
  onTest: () => void;
  onDuplicate: () => void;
}

export function PromptCard({
  title,
  creator,
  lastModified,
  status,
  onEdit,
  onHistory,
  onTest,
  onDuplicate,
}: PromptCardProps) {
  return (
    <Card className="p-5 hover:shadow-hover transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              por {creator} • {lastModified}
            </p>
          </div>
        </div>
        <Badge variant={status === "published" ? "default" : "secondary"}>
          {status === "published" ? "Publicado" : "Rascunho"}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onEdit} variant="outline" size="sm" className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button onClick={onHistory} variant="outline" size="sm">
          <History className="h-4 w-4" />
        </Button>
        <Button onClick={onTest} variant="outline" size="sm">
          <TestTube className="h-4 w-4" />
        </Button>
        <Button onClick={onDuplicate} variant="outline" size="sm">
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
