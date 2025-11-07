import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

interface CreateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAgentDialog({ open, onOpenChange }: CreateAgentDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const aiModels = [
    { value: "google/gemini-2.5-pro", label: "Google Gemini 2.5 Pro" },
    { value: "google/gemini-2.5-flash", label: "Google Gemini 2.5 Flash" },
    { value: "google/gemini-2.5-flash-lite", label: "Google Gemini 2.5 Flash Lite" },
    { value: "openai/gpt-5", label: "OpenAI GPT-5" },
    { value: "openai/gpt-5-mini", label: "OpenAI GPT-5 Mini" },
    { value: "openai/gpt-5-nano", label: "OpenAI GPT-5 Nano" },
  ];

  const handleCreate = () => {
    // TODO: Implementar criação no backend
    const newAgentId = Math.floor(Math.random() * 10000); // Gerar ID temporário
    console.log("Criando agente:", { name, model: selectedModel });
    
    toast({
      title: "Agente criado",
      description: "O agente foi criado com sucesso.",
    });

    onOpenChange(false);
    
    // Navegar para a tela de detalhes do novo agente
    navigate(`/agents/${newAgentId}`);
    
    // Reset form
    setName("");
    setSelectedModel("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Agente</DialogTitle>
          <DialogDescription>
            Preencha os dados básicos do agente. Você poderá configurar o system prompt na próxima tela.
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
            <Label htmlFor="model">Modelo de IA</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreate} 
              disabled={!name || !selectedModel}
            >
              Criar Agente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
