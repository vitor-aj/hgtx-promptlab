import { useState } from "react";
import { AgentCard } from "@/components/agents/AgentCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Agents() {
  const [agents] = useState([
    {
      id: 1,
      name: "Agente de Suporte",
      description: "Responde dúvidas de clientes sobre produtos e serviços da empresa",
      promptName: "Prompt de Atendimento v2.1",
      status: "active" as const,
    },
    {
      id: 2,
      name: "Agente de Vendas",
      description: "Qualifica leads e apresenta produtos de forma personalizada",
      promptName: "Prompt de Vendas v1.5",
      status: "active" as const,
    },
    {
      id: 3,
      name: "Agente de Análise",
      description: "Analisa dados e gera insights para tomada de decisão",
      status: "inactive" as const,
    },
  ]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agentes de IA</h1>
          <p className="text-muted-foreground">
            Gerencie os agentes de IA e seus prompts vinculados
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Agente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            name={agent.name}
            description={agent.description}
            promptName={agent.promptName}
            status={agent.status}
            onLinkPrompt={() => console.log("Link prompt", agent.id)}
          />
        ))}
      </div>
    </div>
  );
}
