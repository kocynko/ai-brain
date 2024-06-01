<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConvexMutation } from "@convex-vue/core";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  onUpload: {
    type: Function || Boolean,
    default: () => {},
  },
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50).default(""),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const createDocument = useConvexMutation(api.documents.createDocument);
const onSubmit = form.handleSubmit(async (values) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await createDocument.mutate(values);
  props.onUpload();
});
</script>

<template>
  <form @submit="onSubmit" class="w-2/3 space-y-6">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Document title"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <LoadingButton
      :is-loading="form.isSubmitting.value"
      loading-text="Uploading..."
      >Upload</LoadingButton
    >
  </form>
</template>
