<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Doc } from "~/convex/_generated/dataModel";
import Button from "./ui/button/Button.vue";
import { Eye } from "lucide-vue-next";
defineProps<{
  document: Doc<"documents">;
}>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ document.title }}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent> Card Content </CardContent>
    <CardFooter>
      <Button asChild variant="secondary" class="flex items-center gap-2"
        ><NuxtLink :href="'/documents/' + document._id"
          ><Eye class="h-4 w-4" /> View</NuxtLink
        >
      </Button></CardFooter
    >
  </Card>
</template>
