import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAgentDialog({ open, onOpenChange }: CreateAgentDialogProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleSave = () => {
    console.log("Salvando agente:", { name, status, selectedPrompt, selectedModel });
    // Implementar lógica de salvar no backend
    onOpenChange(false);
    // Reset form
    setName("");
    setStatus("active");
    setSelectedPrompt("");
    setSelectedModel("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Agente</DialogTitle>
          <DialogDescription>
            Configure o agente selecionando um prompt e modelo de IA
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Agente</Label>
            <Input
              id="name"
              placeholder="Ex: Agente de Atendimento"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "active" | "inactive")}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
              <SelectTrigger id="prompt">
                <SelectValue placeholder="Selecione um prompt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="atendimento">Prompt de Atendimento v2.1</SelectItem>
                <SelectItem value="vendas">Prompt de Vendas v1.5</SelectItem>
                <SelectItem value="analise">Prompt de Análise</SelectItem>
                <SelectItem value="marketing">Prompt de Marketing</SelectItem>
                <SelectItem value="suporte">Prompt de Suporte Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Modelo de IA</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-2.5-flash">Google Gemini 2.5 Flash</SelectItem>
                <SelectItem value="gemini-2.5-pro">Google Gemini 2.5 Pro</SelectItem>
                <SelectItem value="gpt-5">OpenAI GPT-5</SelectItem>
                <SelectItem value="gpt-5-mini">OpenAI GPT-5 Mini</SelectItem>
                <SelectItem value="gpt-4.1">OpenAI GPT-4.1</SelectItem>
                <SelectItem value="claude-sonnet-4-5">Anthropic Claude Sonnet 4.5</SelectItem>
                <SelectItem value="claude-opus-4-1">Anthropic Claude Opus 4.1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!name || !selectedPrompt || !selectedModel}
            >
              Criar Agente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
