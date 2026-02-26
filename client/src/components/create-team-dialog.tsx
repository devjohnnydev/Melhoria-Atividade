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
import { Loader2, Plus, Terminal } from "lucide-react";

export function CreateTeamDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createTeam = useCreateTeam();

  const form = useForm<InsertTeam>({
    resolver: zodResolver(insertTeamSchema),
    defaultValues: {
      name: "",
      techLeadName: "",
      productOwnerName: "",
    },
  });

  const onSubmit = (data: InsertTeam) => {
    createTeam.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Squad Registrado! 🚀",
          description: `O squad ${data.name} foi criado com sucesso.`,
        });
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Erro ao criar squad",
          description: error.message,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="font-semibold bg-gradient-to-r from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)] text-[hsl(222,47%,6%)] hover:opacity-90 shadow-lg glow-cyan transition-all duration-300 rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Novo Squad
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] rounded-2xl border-white/[0.08] bg-[hsl(222,47%,9%)] shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)] flex items-center justify-center text-[hsl(222,47%,6%)]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="font-display text-2xl text-foreground">Novo Squad</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Registre uma nova dupla para o Dev Sprint.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-semibold text-sm">Nome do Squad</Label>
            <Input
              id="name"
              placeholder="Ex: Bug Hunters, Code Ninjas..."
              className="bg-white/[0.05] border-white/[0.08] focus-visible:ring-[hsl(187,96%,52%)] h-12 rounded-xl text-foreground placeholder:text-muted-foreground/50"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="techLead" className="text-foreground font-semibold text-sm">Tech Lead</Label>
              <Input
                id="techLead"
                placeholder="Nome do aluno"
                className="bg-white/[0.05] border-white/[0.08] focus-visible:ring-[hsl(187,96%,52%)] h-12 rounded-xl text-foreground placeholder:text-muted-foreground/50"
                {...form.register("techLeadName")}
              />
              {form.formState.errors.techLeadName && (
                <p className="text-xs text-destructive">{form.formState.errors.techLeadName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="po" className="text-foreground font-semibold text-sm">Product Owner</Label>
              <Input
                id="po"
                placeholder="Nome do aluno"
                className="bg-white/[0.05] border-white/[0.08] focus-visible:ring-[hsl(187,96%,52%)] h-12 rounded-xl text-foreground placeholder:text-muted-foreground/50"
                {...form.register("productOwnerName")}
              />
              {form.formState.errors.productOwnerName && (
                <p className="text-xs text-destructive">{form.formState.errors.productOwnerName.message}</p>
              )}
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={createTeam.isPending}
              className="w-full h-12 rounded-xl font-bold text-base bg-gradient-to-r from-[hsl(187,96%,52%)] to-[hsl(160,84%,39%)] text-[hsl(222,47%,6%)] hover:opacity-90 shadow-lg glow-cyan transition-all"
            >
              {createTeam.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Registrar Squad"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
