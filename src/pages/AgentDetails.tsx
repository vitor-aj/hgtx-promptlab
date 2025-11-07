import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Bot, Save, Clock, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - substituir por dados reais do backend
  const [agent, setAgent] = useState({
    id: id,
    name: "Agente de Atendimento",
    status: "active" as const,
    model: "google/gemini-2.5-flash",
    systemPrompt: "Você é um assistente de atendimento ao cliente. Seja educado, prestativo e objetivo nas suas respostas. Sempre mantenha um tom profissional e cordial.",
  });

  const [versions] = useState([
    {
      id: 1,
      version: "2.1",
      type: "major" as const,
      description: "Melhorias na clareza das respostas",
      prompt: "Você é um assistente de atendimento ao cliente. Seja educado, prestativo e objetivo nas suas respostas. Sempre mantenha um tom profissional e cordial.",
      createdAt: "2024-01-15 14:30",
      author: "João Silva",
    },
    {
      id: 2,
      version: "2.0",
      type: "major" as const,
      description: "Reformulação completa do prompt",
      prompt: "Você é um assistente de atendimento. Seja cordial e ajude o cliente.",
      createdAt: "2024-01-10 09:15",
      author: "Maria Santos",
    },
    {
      id: 3,
      version: "1.5",
      type: "minor" as const,
      description: "Ajustes de tom",
      prompt: "Você é um assistente. Seja educado.",
      createdAt: "2024-01-05 16:45",
      author: "João Silva",
    },
  ]);

  const aiModels = [
    { value: "google/gemini-2.5-pro", label: "Google Gemini 2.5 Pro" },
    { value: "google/gemini-2.5-flash", label: "Google Gemini 2.5 Flash" },
    { value: "google/gemini-2.5-flash-lite", label: "Google Gemini 2.5 Flash Lite" },
    { value: "openai/gpt-5", label: "OpenAI GPT-5" },
    { value: "openai/gpt-5-mini", label: "OpenAI GPT-5 Mini" },
    { value: "openai/gpt-5-nano", label: "OpenAI GPT-5 Nano" },
  ];

  const handleSave = () => {
    // TODO: Implementar salvamento no backend
    console.log("Saving agent:", agent);
    toast({
      title: "Agente atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
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
    <div className="animate-fade-in pb-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Agentes
        </Button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{agent.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant={agent.status === "active" ? "default" : "secondary"}
                  className={
                    agent.status === "active" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {agent.status === "active" ? "● Ativo" : "○ Inativo"}
                </Badge>
              </div>
            </div>
          </div>
          <Button className="gap-2 w-full md:w-auto" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Prompt & Model */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Prompt */}
          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>
                Define o comportamento e personalidade do agente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={agent.systemPrompt}
                onChange={(e) => setAgent({ ...agent, systemPrompt: e.target.value })}
                className="min-h-[200px] font-mono text-sm"
                placeholder="Digite o prompt do sistema..."
              />
            </CardContent>
          </Card>

          {/* AI Model */}
          <Card>
            <CardHeader>
              <CardTitle>Modelo de IA</CardTitle>
              <CardDescription>
                Selecione o modelo de inteligência artificial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={agent.model}
                onValueChange={(value) => setAgent({ ...agent, model: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aiModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Version History */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Histórico de Versões
              </CardTitle>
              <CardDescription>
                Todas as alterações salvas do prompt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
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
                        <p>{version.author} • {version.createdAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
