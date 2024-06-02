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
import type { Id } from "~/convex/_generated/dataModel";

const props = defineProps({
  onUpload: {
    type: Function || Boolean,
    default: () => {},
  },
});

const createDocument = useConvexMutation(api.documents.createDocument);
const generateUploadUrl = useConvexMutation(api.documents.generateUploadUrl);

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50).default(""),
    file: z.instanceof(File),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  const url = await generateUploadUrl.mutate({});
  const result = await fetch(url as string, {
    method: "POST",
    headers: { "Content-Type": values.file.type },
    body: values.file,
  });
  const { storageId } = await result.json();
  await createDocument.mutate({
    title: values.title,
    storageId: storageId as Id<"_storage">,
  });
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
    <FormField v-slot="{ handleChange, handleBlur }" name="file">
      <FormItem>
        <FormLabel>File</FormLabel>
        <FormControl>
          <Input type="file" @change="handleChange" @blur="handleBlur" />
        </FormControl>
        <FormDescription> This is the file. </FormDescription>
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
