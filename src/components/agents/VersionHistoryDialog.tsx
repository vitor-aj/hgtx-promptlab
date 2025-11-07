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
import { Copy, Eye } from "lucide-react";
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
  const [viewingPrompt, setViewingPrompt] = useState<{ prompt: string; version: string } | null>(null);

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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[85vh] w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>Histórico de Versões</DialogTitle>
            <DialogDescription>
              Todas as alterações salvas do prompt de {agentName}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="p-4 rounded-lg border bg-card transition-colors"
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
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-3 border-t">
                    <div className="text-xs text-muted-foreground">
                      <p>
                        {version.author} • {version.createdAt}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setViewingPrompt({ prompt: version.prompt, version: version.version })}
                    >
                      <Eye className="h-4 w-4" />
                      Ver System Prompt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Modal para visualizar o prompt completo */}
      <Dialog open={!!viewingPrompt} onOpenChange={() => setViewingPrompt(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>System Prompt - v{viewingPrompt?.version}</DialogTitle>
            <DialogDescription>
              Visualização completa do prompt
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {viewingPrompt?.prompt}
              </p>
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button
              onClick={() => viewingPrompt && handleCopyPrompt(viewingPrompt.prompt)}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copiar Prompt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
