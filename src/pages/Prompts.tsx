import { useState, useMemo } from "react";
import { CreatePromptDialog } from "@/components/prompts/CreatePromptDialog";
import { EditPromptDialog } from "@/components/prompts/EditPromptDialog";
import { PromptHistoryDialog } from "@/components/prompts/PromptHistoryDialog";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Search, MoreVertical, Edit, History } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function Prompts() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [prompts] = useState([
    {
      id: 1,
      title: "Prompt de Atendimento v2.1",
      creator: "João Silva",
      lastModified: "2 dias atrás",
      status: "published" as const,
      version: "2.1.0",
      systemPrompt: "Você é Clara, assistente de atendimento ao cliente...",
    },
    {
      id: 2,
      title: "Prompt de Vendas v1.5",
      creator: "Maria Santos",
      lastModified: "5 dias atrás",
      status: "published" as const,
      version: "1.5.0",
      systemPrompt: "Você é um assistente de vendas...",
    },
    {
      id: 3,
      title: "Prompt de Análise",
      creator: "Pedro Costa",
      lastModified: "1 semana atrás",
      status: "draft" as const,
      version: "1.0.0",
      systemPrompt: "Você é um analista especializado...",
    },
    {
      id: 4,
      title: "Prompt de Marketing",
      creator: "Ana Lima",
      lastModified: "3 dias atrás",
      status: "published" as const,
      version: "1.2.1",
      systemPrompt: "Você é um especialista em marketing...",
    },
    {
      id: 5,
      title: "Prompt de Suporte Técnico",
      creator: "Carlos Mendes",
      lastModified: "4 dias atrás",
      status: "published" as const,
      version: "2.0.0",
      systemPrompt: "Você é um técnico de suporte...",
    },
    {
      id: 6,
      title: "Prompt de Onboarding",
      creator: "Fernanda Silva",
      lastModified: "6 dias atrás",
      status: "draft" as const,
      version: "1.0.0",
      systemPrompt: "Você é um guia de onboarding...",
    },
    {
      id: 7,
      title: "Prompt de Follow-up",
      creator: "Rafael Santos",
      lastModified: "1 dia atrás",
      status: "published" as const,
      version: "1.1.0",
      systemPrompt: "Você é responsável por follow-ups...",
    },
  ]);

  // Filtra prompts baseado na pesquisa
  const filteredPrompts = useMemo(() => {
    if (!searchQuery.trim()) return prompts;
    
    const query = searchQuery.toLowerCase();
    return prompts.filter(prompt => 
      prompt.title.toLowerCase().includes(query) ||
      prompt.creator.toLowerCase().includes(query)
    );
  }, [prompts, searchQuery]);

  // Calcula paginação
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset para primeira página quando busca muda
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleEditPrompt = (prompt: any) => {
    setSelectedPrompt(prompt);
    setIsEditDialogOpen(true);
  };

  const handleViewHistory = (prompt: any) => {
    setSelectedPrompt({
      id: prompt.id,
      title: prompt.title,
      currentVersion: prompt.version,
    });
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Gestão de Prompts</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Crie, edite e gerencie os prompts dos seus agentes de IA
          </p>
        </div>
        <Button className="gap-2 w-full md:w-auto" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Criar Prompt
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar prompts por título ou criador..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt encontrado' : 'prompts encontrados'}
        </p>
      </div>

      {paginatedPrompts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum prompt encontrado com os critérios de busca.</p>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mb-6">
            {paginatedPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-card border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{prompt.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      por {prompt.creator} • {prompt.lastModified}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditPrompt(prompt)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewHistory(prompt)}>
                        <History className="h-4 w-4 mr-2" />
                        Histórico
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-muted px-2 py-1 rounded">{prompt.version}</code>
                  <Badge 
                    variant={prompt.status === "published" ? "default" : "secondary"}
                    className={prompt.status === "published" ? "bg-green-600 hover:bg-green-700" : "bg-muted text-muted-foreground hover:bg-muted"}
                  >
                    {prompt.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Versão</TableHead>
                  <TableHead>Criador</TableHead>
                  <TableHead>Última Modificação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPrompts.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell className="font-medium">{prompt.title}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {prompt.version}
                      </code>
                    </TableCell>
                    <TableCell>{prompt.creator}</TableCell>
                    <TableCell>{prompt.lastModified}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={prompt.status === "published" ? "default" : "secondary"}
                        className={prompt.status === "published" ? "bg-green-600 hover:bg-green-700" : "bg-muted text-muted-foreground hover:bg-muted"}
                      >
                        {prompt.status === "published" ? "Publicado" : "Rascunho"}
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
                          <DropdownMenuItem onClick={() => handleEditPrompt(prompt)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewHistory(prompt)}>
                            <History className="h-4 w-4 mr-2" />
                            Histórico
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Mostrar primeira página, última página e páginas próximas à atual
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}

      <CreatePromptDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <EditPromptDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        prompt={selectedPrompt}
      />

      <PromptHistoryDialog
        open={isHistoryDialogOpen}
        onOpenChange={setIsHistoryDialogOpen}
        prompt={selectedPrompt}
      />
    </div>
  );
}
