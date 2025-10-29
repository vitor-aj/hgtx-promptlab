import { useState, useMemo } from "react";
import { PromptCard } from "@/components/prompts/PromptCard";
import { CreatePromptDialog } from "@/components/prompts/CreatePromptDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Prompts() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
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
    {
      id: 5,
      title: "Prompt de Suporte Técnico",
      creator: "Carlos Mendes",
      lastModified: "4 dias atrás",
      status: "published" as const,
    },
    {
      id: 6,
      title: "Prompt de Onboarding",
      creator: "Fernanda Silva",
      lastModified: "6 dias atrás",
      status: "draft" as const,
    },
    {
      id: 7,
      title: "Prompt de Follow-up",
      creator: "Rafael Santos",
      lastModified: "1 dia atrás",
      status: "published" as const,
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

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Prompts</h1>
          <p className="text-muted-foreground">
            Crie, edite e gerencie os prompts dos seus agentes de IA
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateDialogOpen(true)}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPrompts.map((prompt) => (
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
    </div>
  );
}
