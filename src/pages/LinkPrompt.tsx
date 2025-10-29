import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link as LinkIcon, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function LinkPrompt() {
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const { toast } = useToast();

  const handleLink = () => {
    if (selectedAgent && selectedPrompt) {
      toast({
        title: "Prompt vinculado com sucesso!",
        description: "O agente já está usando o novo prompt.",
      });
    }
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Vincular Prompt ao Agente
        </h1>
        <p className="text-muted-foreground">
          Associe um prompt específico a um agente de IA
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="agent-select">Selecione o Agente</Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger id="agent-select">
                <SelectValue placeholder="Escolha um agente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suporte">Agente de Suporte</SelectItem>
                <SelectItem value="vendas">Agente de Vendas</SelectItem>
                <SelectItem value="analise">Agente de Análise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt-select">Selecione o Prompt</Label>
            <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
              <SelectTrigger id="prompt-select">
                <SelectValue placeholder="Escolha um prompt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="atendimento">
                  Prompt de Atendimento v2.1
                </SelectItem>
                <SelectItem value="vendas">Prompt de Vendas v1.5</SelectItem>
                <SelectItem value="analise">Prompt de Análise</SelectItem>
                <SelectItem value="marketing">Prompt de Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedAgent && selectedPrompt && (
            <Card className="p-4 bg-muted animate-scale-in">
              <h3 className="font-medium text-foreground mb-2">Resumo da Vinculação</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agente:</span>
                  <span className="text-foreground font-medium">
                    {selectedAgent === "suporte" && "Agente de Suporte"}
                    {selectedAgent === "vendas" && "Agente de Vendas"}
                    {selectedAgent === "analise" && "Agente de Análise"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prompt:</span>
                  <span className="text-foreground font-medium">
                    {selectedPrompt === "atendimento" && "Prompt de Atendimento v2.1"}
                    {selectedPrompt === "vendas" && "Prompt de Vendas v1.5"}
                    {selectedPrompt === "analise" && "Prompt de Análise"}
                    {selectedPrompt === "marketing" && "Prompt de Marketing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="text-foreground font-medium">
                    {new Date().toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </Card>
          )}

          <Button
            onClick={handleLink}
            disabled={!selectedAgent || !selectedPrompt}
            className="w-full gap-2"
            size="lg"
          >
            <LinkIcon className="h-4 w-4" />
            Vincular Prompt
          </Button>
        </div>
      </Card>
    </div>
  );
}
