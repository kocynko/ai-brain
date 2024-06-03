<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import CreateNoteForm from "./CreateNoteForm.vue";
import { useToast } from "../ui/toast";
const { toast } = useToast();
const isOpen = ref(false);

function closeDialog() {
  isOpen.value = false;
  toast({
    title: "Note created",
    description: "Your note has been created successfully",
  });
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild>
      <Button class="flex items-center gap-2"
        ><Plus class="h-4 w-4" /> Create Note
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a note</DialogTitle>
        <DialogDescription>
          Create note that will be searchable later on
        </DialogDescription>
      </DialogHeader>
      <CreateNoteForm :on-create-note="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
