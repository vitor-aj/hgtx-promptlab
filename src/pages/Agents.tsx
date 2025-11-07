import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAgentDialog } from "@/components/agents/CreateAgentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Bot, ChevronRight } from "lucide-react";

export default function Agents() {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [agents] = useState([
    {
      id: 1,
      name: "Agente de Atendimento",
      status: "active" as const,
      version: "2.1",
      model: "Google Gemini 2.5 Flash",
      createdAt: "2 dias atrás",
    },
    {
      id: 2,
      name: "Agente de Vendas",
      status: "active" as const,
      version: "1.5",
      model: "OpenAI GPT-5",
      createdAt: "5 dias atrás",
    },
    {
      id: 3,
      name: "Agente de Análise",
      status: "inactive" as const,
      version: "1.0",
      model: "Anthropic Claude Sonnet 4.5",
      createdAt: "1 semana atrás",
    },
  ]);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Gestão de Agentes</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Crie e gerencie agentes de IA com prompts e modelos específicos
          </p>
        </div>
        <Button className="gap-2 w-full md:w-auto" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Criar Agente
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar agentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {filteredAgents.length} {filteredAgents.length === 1 ? 'agente encontrado' : 'agentes encontrados'}
        </p>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum agente encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card 
              key={agent.id} 
              className="group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-card to-card/50 cursor-pointer"
              onClick={() => navigate(`/agents/${agent.id}`)}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="relative pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Bot className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl truncate">{agent.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          v{agent.version}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-2">Modelo de IA</p>
                  <p className="text-sm font-medium">{agent.model}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <Badge 
                    variant={agent.status === "active" ? "default" : "secondary"}
                    className={
                      agent.status === "active" 
                        ? "bg-green-600 hover:bg-green-700 shadow-sm" 
                        : "bg-muted text-muted-foreground hover:bg-muted"
                    }
                  >
                    {agent.status === "active" ? "● Ativo" : "○ Inativo"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateAgentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
