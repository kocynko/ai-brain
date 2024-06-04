<template>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive" class="flex items-center gap-2"
        ><Trash2 class="h-4 w-4" /> Delete note
      </Button></AlertDialogTrigger
    >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your note
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          @click="onDeleteButtonClick"
          v-if="!deleteNote.isLoading"
          :disabled="!deleteNote.isLoading"
          ><Loader2 class="animate-spin" />Deleting..</AlertDialogAction
        >
        <AlertDialogAction v-else @click="onDeleteButtonClick"
          >Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useConvexMutation } from "@convex-vue/core";
import { Loader2, Trash2 } from "lucide-vue-next";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

const props = defineProps<{ noteId: Id<"notes"> }>();

const deleteNote = useConvexMutation(api.notes.deleteNote);

const onDeleteButtonClick = async () => {
  await deleteNote
    .mutate({ noteId: props.noteId })
    .then(() => {
      navigateTo("/dashboard/notes");
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
