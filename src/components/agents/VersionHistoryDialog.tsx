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
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VersionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  versions: Array<{
    id: number;
    version: string;
    type: "major" | "minor" | "patch";
    description: string;
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
            {versions.map((version) => (
              <div
                key={version.id}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">v{version.version}</span>
                      <Badge className={getVersionTypeColor(version.type)}>
                        {version.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {version.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopyPrompt(version.prompt)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-3 p-3 rounded bg-muted/50">
                  <p className="text-xs font-mono text-muted-foreground line-clamp-3">
                    {version.prompt}
                  </p>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  <p>
                    {version.author} • {version.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
