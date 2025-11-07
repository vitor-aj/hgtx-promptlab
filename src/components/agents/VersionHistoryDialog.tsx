import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface VersionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  versions: Array<{
    id: number;
    version: string;
    type: "major" | "minor" | "patch";
    description: string;
    model: string;
    prompt: string;
    createdAt: string;
    author: string;
  }>;
}

export function VersionHistoryDialog({
  open,
  onOpenChange,
  agentName,
  versions,
}: VersionHistoryDialogProps) {
  const { toast } = useToast();
  const [expandedVersions, setExpandedVersions] = useState<Set<number>>(new Set());

  const toggleExpanded = (versionId: number) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(versionId)) {
      newExpanded.delete(versionId);
    } else {
      newExpanded.add(versionId);
    }
    setExpandedVersions(newExpanded);
  };

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Copiado!",
        description: "Prompt copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o prompt.",
        variant: "destructive",
      });
    }
  };

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-primary text-primary-foreground";
      case "minor":
        return "bg-secondary text-secondary-foreground";
      case "patch":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Histórico de Versões</DialogTitle>
          <DialogDescription>
            Todas as alterações salvas do prompt de {agentName}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {versions.map((version) => {
              const isExpanded = expandedVersions.has(version.id);
              return (
                <div
                  key={version.id}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">v{version.version}</span>
                        <Badge className={getVersionTypeColor(version.type)}>
                          {version.type}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-foreground">Notas da versão:</span>
                          <p className="text-muted-foreground mt-0.5">{version.description}</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Modelo de IA:</span>
                          <p className="text-muted-foreground mt-0.5">{version.model}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => handleCopyPrompt(version.prompt)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between h-auto py-2 px-3 font-normal"
                      onClick={() => toggleExpanded(version.id)}
                    >
                      <span className="text-sm font-medium">System Prompt da versão</span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    {isExpanded && (
                      <div className="mt-2 p-3 rounded bg-muted/50 border">
                        <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                          {version.prompt}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                    <p>
                      {version.author} • {version.createdAt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
