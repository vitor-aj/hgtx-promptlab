import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GitBranch, Clock, User, FileText, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PromptVersion {
  version: string;
  type: "major" | "minor" | "patch";
  changeDescription: string;
  systemPrompt: string;
  createdAt: string;
  createdBy: string;
}

interface PromptHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: {
    id: number;
    title: string;
    currentVersion: string;
  } | null;
}

export function PromptHistoryDialog({ open, onOpenChange, prompt }: PromptHistoryDialogProps) {
  const { toast } = useToast();
  const [copiedVersion, setCopiedVersion] = useState<string | null>(null);

  const handleCopyPrompt = async (content: string, version: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedVersion(version);
      toast({
        title: "Conteúdo copiado!",
        description: `Prompt da versão ${version} copiado para a área de transferência.`,
      });
      setTimeout(() => setCopiedVersion(null), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o conteúdo.",
        variant: "destructive",
      });
    }
  };

  // Mock data - substituir por dados reais do backend
  const versions: PromptVersion[] = [
    {
      version: "2.1.0",
      type: "minor",
      changeDescription: "Adicionado mais empatia nas respostas e incluídos exemplos práticos",
      systemPrompt: "Você é Clara, assistente de atendimento ao cliente. Seja empática...",
      createdAt: "2 dias atrás",
      createdBy: "João Silva",
    },
    {
      version: "2.0.0",
      type: "major",
      changeDescription: "Reformulação completa do tom de voz e objetivos principais",
      systemPrompt: "Você é Clara, assistente de atendimento ao cliente...",
      createdAt: "1 semana atrás",
      createdBy: "Maria Santos",
    },
    {
      version: "1.5.0",
      type: "minor",
      changeDescription: "Adicionadas instruções sobre política de devolução",
      systemPrompt: "Você é um assistente virtual de atendimento...",
      createdAt: "2 semanas atrás",
      createdBy: "João Silva",
    },
    {
      version: "1.0.0",
      type: "major",
      changeDescription: "Versão inicial do prompt",
      systemPrompt: "Você é um assistente virtual...",
      createdAt: "1 mês atrás",
      createdBy: "João Silva",
    },
  ];

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "destructive";
      case "minor":
        return "default";
      case "patch":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getVersionTypeLabel = (type: string) => {
    switch (type) {
      case "major":
        return "Major";
      case "minor":
        return "Minor";
      case "patch":
        return "Patch";
      default:
        return type;
    }
  };

  if (!prompt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Histórico de Versões
          </DialogTitle>
          <DialogDescription>
            Histórico completo de versões do prompt "{prompt.title}"
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div key={version.version}>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      version.version === prompt.currentVersion 
                        ? "bg-primary ring-4 ring-primary/20" 
                        : "bg-muted-foreground"
                    }`} />
                    {index < versions.length - 1 && (
                      <div className="w-0.5 h-full min-h-[80px] bg-border mt-2" />
                    )}
                  </div>

                  <div className="flex-1 space-y-3 pb-6">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-semibold">
                        v{version.version}
                      </code>
                      {version.version === prompt.currentVersion && (
                        <Badge variant="outline" className="bg-primary/10">
                          Atual
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {version.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {version.createdBy}
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm">{version.changeDescription}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-muted-foreground uppercase">
                            Conteúdo do Prompt
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyPrompt(version.systemPrompt, version.version)}
                            className="h-7"
                          >
                            {copiedVersion === version.version ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                Copiar
                              </>
                            )}
                          </Button>
                        </div>
                        <ScrollArea className="h-[200px] w-full rounded-md border bg-muted/30">
                          <div className="p-4">
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">
                              {version.systemPrompt}
                            </p>
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
