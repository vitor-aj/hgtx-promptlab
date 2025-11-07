import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAgentDialog } from "@/components/agents/CreateAgentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Edit, Trash2, Bot, Zap } from "lucide-react";

export default function Agents() {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [agents] = useState([
    {
      id: 1,
      name: "Agente de Atendimento",
      status: "active" as const,
      prompt: "Prompt de Atendimento v2.1",
      model: "Google Gemini 2.5 Flash",
      createdAt: "2 dias atrás",
    },
    {
      id: 2,
      name: "Agente de Vendas",
      status: "active" as const,
      prompt: "Prompt de Vendas v1.5",
      model: "OpenAI GPT-5",
      createdAt: "5 dias atrás",
    },
    {
      id: 3,
      name: "Agente de Análise",
      status: "inactive" as const,
      prompt: "Prompt de Análise",
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
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{agent.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{agent.createdAt}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/agents/${agent.id}`);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete", agent.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                    <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Prompt</p>
                      <p className="text-sm font-medium truncate">{agent.prompt}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Modelo de IA</p>
                    <code className="text-xs bg-background/80 px-3 py-1.5 rounded-md border inline-block">
                      {agent.model}
                    </code>
                  </div>
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
