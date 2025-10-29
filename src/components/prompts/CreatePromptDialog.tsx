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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2 } from "lucide-react";

interface CreatePromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePromptDialog({ open, onOpenChange }: CreatePromptDialogProps) {
  const [title, setTitle] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  
  // Assistente fields
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [mainObjective, setMainObjective] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [forbiddenPatterns, setForbiddenPatterns] = useState("");

  const handleGeneratePrompt = () => {
    const generatedPrompt = `Você é ${agentName}, ${agentRole}.

Público-alvo: ${targetAudience}

Objetivo principal: ${mainObjective}

Tom de voz: ${toneOfVoice}

${forbiddenPatterns ? `Padrões proibidos:\n${forbiddenPatterns}` : ''}

Siga estas diretrizes em todas as suas interações.`;

    setSystemPrompt(generatedPrompt);
  };

  const handleSave = () => {
    console.log("Salvando prompt:", { title, systemPrompt });
    // Aqui você implementaria a lógica de salvar no backend
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Prompt</DialogTitle>
          <DialogDescription>
            Crie um prompt manualmente ou use o assistente para gerar automaticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Nome do prompt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual</TabsTrigger>
              <TabsTrigger value="assistant">
                <Wand2 className="w-4 h-4 mr-2" />
                Assistente
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">System Prompt</Label>
                <Textarea
                  id="systemPrompt"
                  placeholder="Digite o system prompt..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="min-h-[300px] font-mono"
                />
              </div>
            </TabsContent>

            <TabsContent value="assistant" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agentName">Nome do Agente</Label>
                  <Input
                    id="agentName"
                    placeholder="Ex: Clara"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agentRole">Função / Papel do Agente</Label>
                  <Input
                    id="agentRole"
                    placeholder="Ex: assistente de atendimento ao cliente"
                    value={agentRole}
                    onChange={(e) => setAgentRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Público-alvo</Label>
                <Input
                  id="targetAudience"
                  placeholder="Ex: Clientes da loja online de eletrônicos"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainObjective">Objetivo Principal</Label>
                <Textarea
                  id="mainObjective"
                  placeholder="Ex: Ajudar clientes com dúvidas sobre produtos e pedidos"
                  value={mainObjective}
                  onChange={(e) => setMainObjective(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toneOfVoice">Tom de Voz</Label>
                <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                  <SelectTrigger id="toneOfVoice">
                    <SelectValue placeholder="Selecione o tom de voz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amigavel">Amigável</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="educado">Educado</SelectItem>
                    <SelectItem value="institucional">Institucional</SelectItem>
                    <SelectItem value="neutro">Neutro</SelectItem>
                    <SelectItem value="engracado">Engraçado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="forbiddenPatterns">Padrões Proibidos</Label>
                <Textarea
                  id="forbiddenPatterns"
                  placeholder="Ex: Não usar gírias, não dar opiniões pessoais, evitar emojis"
                  value={forbiddenPatterns}
                  onChange={(e) => setForbiddenPatterns(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleGeneratePrompt}
                className="w-full"
                variant="secondary"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Gerar System Prompt
              </Button>

              {systemPrompt && (
                <div className="space-y-2">
                  <Label>Prompt Gerado</Label>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!title || !systemPrompt}>
              Criar Prompt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
