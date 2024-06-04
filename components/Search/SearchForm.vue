<template>
  <form @submit="onSubmit" class="flex w-full gap-2 py-2">
    <FormField v-slot="{ componentField }" name="searchText">
      <FormItem class="flex-grow">
        <FormControl>
          <Input
            type="text"
            placeholder="Search over all your notes using vector searching"
            v-bind="componentField"
            class="flex-1" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <LoadingButton
      :is-loading="form.isSubmitting.value"
      loading-text="Search"
      class="px-8"
      >Searching</LoadingButton
    >
  </form>
</template>
<script setup lang="ts">
import { api } from "~/convex/_generated/api";
import Input from "../ui/input/Input.vue";
import { useConvexAction } from "@convex-vue/core";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  setResults: (data: typeof api.search.searchRecords._returnType) => void;
}>();

const searchAction = useConvexAction(api.search.searchRecords);
const formSchema = toTypedSchema(
  z.object({
    searchText: z.string().min(1),
  }),
);
const form = useForm({ validationSchema: formSchema });
const onSubmit = form.handleSubmit(async (values) => {
  await searchAction
    .mutate({
      searchText: values.searchText,
    })
    .then((notes) => {
      if (notes) props.setResults(notes);
    })
    .catch((error) => {
      console.error(error);
    });
  form.resetForm();
});
</script>
