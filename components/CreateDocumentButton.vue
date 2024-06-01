<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const isOpen = ref(false);

function closeDialog() {
  isOpen.value = false;
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild>
      <Button> Upload document </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload a Document</DialogTitle>
        <DialogDescription>
          Upload a team document to search over in the future
        </DialogDescription>
      </DialogHeader>
      <UploadDocumentForm :onUpload="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
