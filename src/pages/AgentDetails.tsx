import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, History, Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VersionHistoryDialog } from "@/components/agents/VersionHistoryDialog";

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Mock data - substituir por dados reais do backend
  const [agent, setAgent] = useState<{
    id: string | undefined;
    name: string;
    status: "active" | "inactive";
    model: string;
    systemPrompt: string;
  }>({
    id: id,
    name: "Agente de Atendimento",
    status: "active",
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

  const handleToggleStatus = () => {
    const newStatus = agent.status === "active" ? "inactive" : "active";
    setAgent({ ...agent, status: newStatus });
    toast({
      title: "Status atualizado",
      description: `Agente ${newStatus === "active" ? "ativado" : "desativado"} com sucesso.`,
    });
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

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{agent.name}</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={() => setIsHistoryOpen(true)}
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">Histórico de Versões</span>
              <span className="sm:hidden">Histórico</span>
            </Button>
            <Button 
              variant={agent.status === "active" ? "destructive" : "default"}
              className="gap-2" 
              onClick={handleToggleStatus}
            >
              <Power className="h-4 w-4" />
              {agent.status === "active" ? "Desativar" : "Ativar"}
            </Button>
            <Button className="gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
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
              className="min-h-[300px] font-mono text-sm"
              placeholder="Digite o prompt do sistema..."
            />
          </CardContent>
        </Card>
      </div>

      <VersionHistoryDialog
        open={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
        agentName={agent.name}
        versions={versions}
      />
    </div>
  );
}
