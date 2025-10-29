import { useState } from "react";
import { PromptCard } from "@/components/prompts/PromptCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Prompts() {
  const [prompts] = useState([
    {
      id: 1,
      title: "Prompt de Atendimento v2.1",
      creator: "João Silva",
      lastModified: "2 dias atrás",
      status: "published" as const,
    },
    {
      id: 2,
      title: "Prompt de Vendas v1.5",
      creator: "Maria Santos",
      lastModified: "5 dias atrás",
      status: "published" as const,
    },
    {
      id: 3,
      title: "Prompt de Análise",
      creator: "Pedro Costa",
      lastModified: "1 semana atrás",
      status: "draft" as const,
    },
    {
      id: 4,
      title: "Prompt de Marketing",
      creator: "Ana Lima",
      lastModified: "3 dias atrás",
      status: "published" as const,
    },
  ]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Prompts</h1>
          <p className="text-muted-foreground">
            Crie, edite e gerencie os prompts dos seus agentes de IA
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Criar Prompt
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            title={prompt.title}
            creator={prompt.creator}
            lastModified={prompt.lastModified}
            status={prompt.status}
            onEdit={() => console.log("Edit", prompt.id)}
            onHistory={() => console.log("History", prompt.id)}
            onTest={() => console.log("Test", prompt.id)}
            onDuplicate={() => console.log("Duplicate", prompt.id)}
          />
        ))}
      </div>
    </div>
  );
}
