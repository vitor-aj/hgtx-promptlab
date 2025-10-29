import { useState } from "react";
import { CreateAgentDialog } from "@/components/agents/CreateAgentDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";

export default function Agents() {
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
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-card border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.createdAt}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log("Edit", agent.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => console.log("Delete", agent.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Prompt:</span>
                    <p className="text-sm">{agent.prompt}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Modelo:</span>
                    <p className="text-sm">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{agent.model}</code>
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={agent.status === "active" ? "default" : "secondary"}
                  className={agent.status === "active" ? "bg-green-600 hover:bg-green-700" : "bg-muted text-muted-foreground hover:bg-muted"}
                >
                  {agent.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Criado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.prompt}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {agent.model}
                      </code>
                    </TableCell>
                    <TableCell>{agent.createdAt}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={agent.status === "active" ? "default" : "secondary"}
                        className={agent.status === "active" ? "bg-green-600 hover:bg-green-700" : "bg-muted text-muted-foreground hover:bg-muted"}
                      >
                        {agent.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => console.log("Edit", agent.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => console.log("Delete", agent.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      <CreateAgentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
