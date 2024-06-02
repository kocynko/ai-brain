<template>
  <div class="flex h-[300px] w-[300px] flex-col gap-2 bg-[#121212] p-2">
    <div class="overflow-y-auto">
      <div class="bg-gray-800 p-4">Hello</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
      <div class="bg-gray-800 p-4">World</div>
    </div>
    <form @submit="onSubmit" class="flex gap-3">
      <FormField v-slot="{ componentField }" name="question">
        <FormItem>
          <FormControl>
            <Input
              type="text"
              placeholder="Ask a question"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <LoadingButton
        :is-loading="form.isSubmitting.value"
        loading-text="Ai is thinking...."
        >Ask</LoadingButton
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { api } from "~/convex/_generated/api";
import Input from "./ui/input/Input.vue";
import { useConvexAction } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";
import { useForm, useResetForm } from "vee-validate";
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
