import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, GitBranch } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function History() {
  const versions = [
    {
      id: 1,
      version: "v2.1",
      author: "João Silva",
      date: "2 dias atrás",
      summary: "Melhorias na formatação de respostas e tom mais amigável",
      current: true,
    },
    {
      id: 2,
      version: "v2.0",
      author: "João Silva",
      date: "1 semana atrás",
      summary: "Adicionado contexto sobre produtos lançados em 2024",
      current: false,
    },
    {
      id: 3,
      version: "v1.9",
      author: "Maria Santos",
      date: "2 semanas atrás",
      summary: "Ajustes no limite de caracteres da resposta",
      current: false,
    },
    {
      id: 4,
      version: "v1.8",
      author: "Pedro Costa",
      date: "3 semanas atrás",
      summary: "Versão inicial com estrutura básica do prompt",
      current: false,
    },
  ];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Histórico de Versões</h1>
        <p className="text-muted-foreground">
          Visualize e restaure versões anteriores dos seus prompts
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Selecione o Prompt
            </label>
            <Select defaultValue="atendimento">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="atendimento">Prompt de Atendimento</SelectItem>
                <SelectItem value="vendas">Prompt de Vendas</SelectItem>
                <SelectItem value="analise">Prompt de Análise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {versions.map((version) => (
            <div key={version.id} className="relative pl-16 animate-fade-in">
              <div
                className={`absolute left-6 w-5 h-5 rounded-full border-2 ${
                  version.current
                    ? "bg-primary border-primary"
                    : "bg-background border-border"
                }`}
              />

              <Card className="p-5 hover:shadow-hover transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant={version.current ? "default" : "secondary"}>
                      {version.version}
                    </Badge>
                    {version.current && (
                      <Badge variant="outline" className="gap-1">
                        <GitBranch className="h-3 w-3" />
                        Atual
                      </Badge>
                    )}
                  </div>
                  {!version.current && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Restaurar
                    </Button>
                  )}
                </div>

                <p className="text-foreground font-medium mb-2">{version.summary}</p>
                <p className="text-sm text-muted-foreground">
                  por {version.author} • {version.date}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
