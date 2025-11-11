import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, RotateCcw, MessageSquare, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export default function TestPrompt() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock data de agentes
  const agents = [
    { id: "1", name: "Agente de Atendimento" },
    { id: "2", name: "Agente de Vendas" },
    { id: "3", name: "Agente de Análise" },
  ];

  // Carrega conversas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("test_conversations");
    if (stored) {
      setConversations(JSON.parse(stored));
    }
  }, []);

  // Salva conversas no localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("test_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Limpa a conversa ao trocar de agente
  useEffect(() => {
    handleNewConversation();
  }, [selectedAgent]);

  const handleNewConversation = () => {
    if (!selectedAgent) return;
    
    const agent = agents.find((a) => a.id === selectedAgent);
    const newConversation: Conversation = {
      id: Date.now().toString(),
      agentId: selectedAgent,
      agentName: agent?.name || "Agente",
      title: "Nova Conversa",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setSelectedAgent(conversation.agentId);
      setMessages(conversation.messages);
    }
  };

  const updateConversation = (newMessages: Message[]) => {
    if (!currentConversationId) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentConversationId) {
          const title =
            newMessages.length > 0
              ? newMessages[0].content.substring(0, 50) + "..."
              : "Nova Conversa";
          return {
            ...conv,
            messages: newMessages,
            title,
            updatedAt: new Date().toISOString(),
          };
        }
        return conv;
      })
    );
  };

  const handleSend = () => {
    if (!input.trim() || !selectedAgent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    updateConversation(newMessages);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Esta é uma resposta simulada do agente de IA. Em produção, esta resposta seria gerada pelo modelo de IA configurado no agente selecionado.",
      };
      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      updateConversation(finalMessages);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
      setMessages([]);
    }
    toast({
      title: "Conversa excluída",
      description: "A conversa foi removida com sucesso.",
    });
  };

  return (
    <div className="animate-fade-in h-full flex gap-4">
      {/* Sidebar com todas as conversas */}
      <Card className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Histórico de Conversas</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Nenhuma conversa ainda
              </div>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentConversationId === conversation.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {conversation.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {conversation.agentName}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {new Date(conversation.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Área principal do chat */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="agent-select" className="mb-2 block text-sm">
                Selecione o Agente
              </Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger id="agent-select">
                  <SelectValue placeholder="Escolha um agente para conversar" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="pt-6">
              <Button
                onClick={handleNewConversation}
                disabled={!selectedAgent}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Nova Conversa
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Selecione um agente para começar a conversar</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || !selectedAgent}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !selectedAgent}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
