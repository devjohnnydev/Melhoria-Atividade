import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTeamSchema, type InsertTeam } from "@shared/schema";
import { useCreateTeam } from "@/hooks/use-teams";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";

export function CreateTeamDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createTeam = useCreateTeam();
  
  const form = useForm<InsertTeam>({
    resolver: zodResolver(insertTeamSchema),
    defaultValues: {
      name: "",
      designerName: "",
      clientName: "",
    },
  });

  const onSubmit = (data: InsertTeam) => {
    createTeam.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Equipe Registrada!",
          description: `A equipe ${data.name} foi criada com sucesso.`,
        });
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Erro ao criar equipe",
          description: error.message,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/30 transition-all">
            <Plus className="w-4 h-4 mr-2" />
            Registrar Equipe
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Nova Equipe</DialogTitle>
          <DialogDescription>
            Crie uma nova dupla para o desafio de Identidade Visual.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-semibold">Nome da Equipe</Label>
            <Input 
              id="name" 
              placeholder="Ex: Agência Criativa" 
              className="bg-secondary/50 border-secondary focus-visible:ring-primary h-12 rounded-xl"
              {...form.register("name")} 
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="designer" className="text-foreground font-semibold">Designer</Label>
              <Input 
                id="designer" 
                placeholder="Nome do aluno" 
                className="bg-secondary/50 border-secondary focus-visible:ring-primary h-12 rounded-xl"
                {...form.register("designerName")} 
              />
              {form.formState.errors.designerName && (
                <p className="text-xs text-destructive">{form.formState.errors.designerName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="client" className="text-foreground font-semibold">Cliente</Label>
              <Input 
                id="client" 
                placeholder="Nome do aluno" 
                className="bg-secondary/50 border-secondary focus-visible:ring-primary h-12 rounded-xl"
                {...form.register("clientName")} 
              />
              {form.formState.errors.clientName && (
                <p className="text-xs text-destructive">{form.formState.errors.clientName.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={createTeam.isPending}
              className="w-full h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/25"
            >
              {createTeam.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Cadastrar Equipe"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
