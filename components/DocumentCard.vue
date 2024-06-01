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
    <CardFooter><Button variant="secondary">View</Button></CardFooter>
  </Card>
</template>
