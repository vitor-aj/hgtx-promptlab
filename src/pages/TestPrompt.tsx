import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThumbsUp, ThumbsDown, Send, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TestPrompt() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setOutput(
        "Esta é uma resposta simulada do agente de IA. Em produção, esta resposta seria gerada pelo modelo de IA configurado com o prompt selecionado."
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Teste de Prompt</h1>
        <p className="text-muted-foreground">
          Teste seus prompts em tempo real e avalie as respostas geradas
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompt-select">Selecione o Prompt</Label>
              <Select>
                <SelectTrigger id="prompt-select">
                  <SelectValue placeholder="Escolha um prompt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="atendimento">Prompt de Atendimento v2.1</SelectItem>
                  <SelectItem value="vendas">Prompt de Vendas v1.5</SelectItem>
                  <SelectItem value="analise">Prompt de Análise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="input">Entrada de Teste</Label>
              <Textarea
                id="input"
                placeholder="Digite sua mensagem de teste aqui..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button onClick={handleTest} disabled={!input || isLoading} className="w-full gap-2">
              {isLoading ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Testar Prompt
                </>
              )}
            </Button>
          </div>
        </Card>

        {output && (
          <Card className="p-6 animate-scale-in">
            <div className="space-y-4">
              <div>
                <Label>Resposta Gerada</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-foreground">{output}</p>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Avaliar Resposta</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Boa Resposta
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    Precisa Melhorar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
