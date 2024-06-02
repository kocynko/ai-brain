<template>
  <div
    class="flex h-[500px] w-full flex-col gap-2 rounded bg-[#121212] px-4 pt-8"
  >
    <div class="h-[500px] space-y-8 overflow-y-auto">
      <div class="rounded p-2">Ask any question about the document</div>
      <div
        v-for="chat in data"
        :class="chat.isHuman ? 'text-right' : ''"
        class="whitespace-pre-line"
      >
        <span :class="chat.isHuman ? 'rounded bg-zinc-800 px-4 py-2' : ''">{{
          chat.text
        }}</span>
      </div>
    </div>
    <form @submit="onSubmit" class="flex w-full gap-2 py-2">
      <FormField v-slot="{ componentField }" name="question">
        <FormItem class="flex-grow">
          <FormControl>
            <Input
              type="text"
              placeholder="Ask a question"
              v-bind="componentField"
              class="flex-1"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <LoadingButton
        :is-loading="form.isSubmitting.value"
        loading-text="Ai is thinking...."
        class="px-8"
        >Ask</LoadingButton
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { api } from "~/convex/_generated/api";
import Input from "./ui/input/Input.vue";
import { useConvexAction, useConvexQuery } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const props = defineProps<{
  documentId: Id<"documents">;
}>();

const { data, isLoading, error } = useConvexQuery(api.chats.getChatRecords, {
  documentId: props.documentId,
});

const askQuestion = useConvexAction(api.documents.askQuestion);
const formSchema = toTypedSchema(
  z.object({
    question: z.string().min(1),
  }),
);
const form = useForm({ validationSchema: formSchema });
const onSubmit = form.handleSubmit(async (values) => {
  await askQuestion
    .mutate({
      question: values.question,
      documentId: props.documentId,
    })
    .then((res) => {
      console.log(res);
      form.resetForm();
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
