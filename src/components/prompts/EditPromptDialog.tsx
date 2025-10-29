import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2, GitBranch } from "lucide-react";

interface EditPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: {
    id: number;
    title: string;
    systemPrompt?: string;
    version?: string;
  } | null;
}

export function EditPromptDialog({ open, onOpenChange, prompt }: EditPromptDialogProps) {
  const [title, setTitle] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [versionType, setVersionType] = useState<"major" | "minor" | "patch">("minor");
  const [changeDescription, setChangeDescription] = useState("");
  const [assistantInstructions, setAssistantInstructions] = useState("");

  useEffect(() => {
    if (prompt && open) {
      setTitle(prompt.title);
      setSystemPrompt(prompt.systemPrompt || "");
      setChangeDescription("");
      setVersionType("minor");
      setAssistantInstructions("");
    }
  }, [prompt, open]);

  const handleApplyAssistant = () => {
    // Aqui você implementaria a lógica de IA para modificar o prompt
    // Por enquanto, vamos apenas adicionar as instruções ao final do prompt
    const updatedPrompt = `${systemPrompt}\n\n[Aplicar mudanças: ${assistantInstructions}]`;
    setSystemPrompt(updatedPrompt);
    setAssistantInstructions("");
    console.log("Aplicando instruções do assistente:", assistantInstructions);
  };

  const handleSave = () => {
    console.log("Salvando nova versão:", { 
      promptId: prompt?.id,
      title, 
      systemPrompt,
      versionType,
      changeDescription 
    });
    // Aqui você implementaria a lógica de salvar nova versão no backend
    onOpenChange(false);
  };

  const getVersionDescription = () => {
    switch (versionType) {
      case "major":
        return "Mudanças significativas que alteram a funcionalidade principal";
      case "minor":
        return "Novas funcionalidades ou melhorias sem quebrar compatibilidade";
      case "patch":
        return "Correções e ajustes menores";
    }
  };

  if (!prompt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Editar Prompt</DialogTitle>
          <DialogDescription>
            Edite o prompt e descreva as mudanças. Uma nova versão será criada preservando o histórico.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Versão atual: <span className="font-medium text-foreground">{prompt.version || "1.0.0"}</span>
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Nome do prompt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              placeholder="Digite o system prompt..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <Label htmlFor="assistantInstructions" className="text-base font-medium">
                Assistente de Prompt
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Descreva o que deseja incluir ou modificar no prompt acima
            </p>
            <Textarea
              id="assistantInstructions"
              placeholder="Ex: Adicione mais empatia nas respostas, seja mais técnico ao explicar produtos, inclua exemplos práticos..."
              value={assistantInstructions}
              onChange={(e) => setAssistantInstructions(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleApplyAssistant}
              size="sm"
              variant="secondary"
              disabled={!assistantInstructions}
              className="w-full"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Aplicar Mudanças com Assistente
            </Button>
          </div>

          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div className="space-y-2">
              <Label htmlFor="versionType">Tipo de Versão</Label>
              <Select value={versionType} onValueChange={(v) => setVersionType(v as "major" | "minor" | "patch")}>
                <SelectTrigger id="versionType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="major">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Major (X.0.0)</span>
                      <span className="text-xs text-muted-foreground">Mudanças significativas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="minor">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Minor (0.X.0)</span>
                      <span className="text-xs text-muted-foreground">Novas funcionalidades</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="patch">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Patch (0.0.X)</span>
                      <span className="text-xs text-muted-foreground">Correções menores</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{getVersionDescription()}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="changeDescription">Descrição das Mudanças</Label>
              <Textarea
                id="changeDescription"
                placeholder="Descreva o que foi alterado nesta versão..."
                value={changeDescription}
                onChange={(e) => setChangeDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!title || !systemPrompt || !changeDescription}
            >
              Salvar Nova Versão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
