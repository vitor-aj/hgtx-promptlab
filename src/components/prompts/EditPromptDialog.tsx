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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  
  // Assistente fields
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [mainObjective, setMainObjective] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [forbiddenPatterns, setForbiddenPatterns] = useState("");
  const [refinementInstructions, setRefinementInstructions] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Carregar dados do prompt quando o dialog abrir
  useEffect(() => {
    if (prompt && open) {
      setTitle(prompt.title);
      setSystemPrompt(prompt.systemPrompt || "");
      setChangeDescription("");
      setVersionType("minor");
    }
  }, [prompt, open]);

  const handleGeneratePrompt = () => {
    let generatedPrompt = `Você é ${agentName}, ${agentRole}.

Público-alvo: ${targetAudience}

Objetivo principal: ${mainObjective}

Tom de voz: ${toneOfVoice}

${forbiddenPatterns ? `Padrões proibidos:\n${forbiddenPatterns}` : ''}

Siga estas diretrizes em todas as suas interações.`;

    if (refinementInstructions && isGenerated) {
      generatedPrompt += `\n\nInstruções adicionais:\n${refinementInstructions}`;
    }

    setSystemPrompt(generatedPrompt);
    setIsGenerated(true);
  };

  const handleStartOver = () => {
    setAgentName("");
    setAgentRole("");
    setTargetAudience("");
    setMainObjective("");
    setToneOfVoice("");
    setForbiddenPatterns("");
    setRefinementInstructions("");
    setSystemPrompt("");
    setIsGenerated(false);
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Prompt</DialogTitle>
          <DialogDescription>
            Edite o prompt manualmente ou use o assistente. Uma nova versão será criada preservando o histórico.
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
                  className="min-h-[400px] font-mono text-sm"
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

              <div className="flex gap-2">
                <Button
                  onClick={handleGeneratePrompt}
                  className="flex-1"
                  variant="secondary"
                  disabled={!agentName || !agentRole}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isGenerated ? "Regenerar Prompt" : "Gerar System Prompt"}
                </Button>
                {isGenerated && (
                  <Button
                    onClick={handleStartOver}
                    variant="outline"
                  >
                    Começar do Zero
                  </Button>
                )}
              </div>

              {systemPrompt && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <Label>Prompt Gerado</Label>
                    <Textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refinement">
                      Instruções Adicionais (opcional)
                    </Label>
                    <Textarea
                      id="refinement"
                      placeholder="Ex: Adicione mais empatia nas respostas, seja mais direto, inclua exemplos práticos..."
                      value={refinementInstructions}
                      onChange={(e) => setRefinementInstructions(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button
                      onClick={handleGeneratePrompt}
                      size="sm"
                      variant="secondary"
                      disabled={!refinementInstructions}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Aplicar Refinamento
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

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
