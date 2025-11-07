import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface SaveVersionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (versionType: "major" | "minor" | "patch", notes: string) => void;
}

export function SaveVersionDialog({
  open,
  onOpenChange,
  onSave,
}: SaveVersionDialogProps) {
  const [versionType, setVersionType] = useState<"major" | "minor" | "patch">("minor");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    onSave(versionType, notes);
    setNotes("");
    setVersionType("minor");
    onOpenChange(false);
  };

  const versionInfo = {
    major: {
      title: "Major",
      description: "Use quando fizer mudanças significativas ou incompatíveis no comportamento do agente",
      example: "Ex: Mudança completa na personalidade ou objetivo do agente",
    },
    minor: {
      title: "Minor", 
      description: "Use quando adicionar funcionalidades ou melhorias que não quebram o comportamento atual",
      example: "Ex: Adicionar novas instruções ou melhorar respostas",
    },
    patch: {
      title: "Patch",
      description: "Use para pequenos ajustes, correções ou refinamentos",
      example: "Ex: Correção de erros gramaticais ou pequenos ajustes de tom",
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Salvar Nova Versão</DialogTitle>
          <DialogDescription>
            Documente as alterações realizadas no agente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tipo de Versão */}
          <div className="space-y-2">
            <Label htmlFor="version-type">Tipo de Alteração</Label>
            <Select
              value={versionType}
              onValueChange={(value: "major" | "minor" | "patch") => setVersionType(value)}
            >
              <SelectTrigger id="version-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="major">Major - Mudanças Significativas</SelectItem>
                <SelectItem value="minor">Minor - Novas Funcionalidades</SelectItem>
                <SelectItem value="patch">Patch - Correções e Ajustes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Explicação do tipo selecionado */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-medium text-foreground">
                  {versionInfo[versionType].title}
                </p>
                <p className="text-muted-foreground">
                  {versionInfo[versionType].description}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {versionInfo[versionType].example}
                </p>
              </div>
            </div>
          </div>

          {/* Notas da Versão */}
          <div className="space-y-2">
            <Label htmlFor="version-notes">Notas da Versão</Label>
            <Textarea
              id="version-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Descreva as alterações realizadas nesta versão..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!notes.trim()}>
            Salvar Versão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
