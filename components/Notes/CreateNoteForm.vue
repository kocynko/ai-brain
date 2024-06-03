<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { useConvexMutation } from "@convex-vue/core";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import Textarea from "../ui/textarea/Textarea.vue";
import { useToast } from "../ui/toast";

const props = defineProps({
  onCreateNote: {
    type: Function || Boolean,
    default: () => {},
  },
});

const createNote = useConvexMutation(api.notes.createNote);

const formSchema = toTypedSchema(
  z.object({
    text: z
      .string()
      .min(2, {
        message: "Note text must be at least 2 characters",
      })
      .max(5000, { message: "Your text is too long" })
      .default(""),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  await createNote.mutate({
    text: values.text,
  });
  props.onCreateNote();
});
</script>

<template>
  <form @submit="onSubmit" class="w-full space-y-6">
    <FormField v-slot="{ componentField }" name="text">
      <FormItem>
        <FormLabel>Note text</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Write your note here..."
            class="resize-none"
            v-bind="componentField" />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

    <LoadingButton
      :is-loading="form.isSubmitting.value"
      loading-text="Creating..."
      >Create</LoadingButton
    >
  </form>
</template>
