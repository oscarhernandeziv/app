import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

import { useForm } from "@tanstack/react-form";
import {
  createExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

import { zodValidator } from "@tanstack/zod-form-adapter";

import { createExpenseSchema } from "@server/sharedTypes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      );

      navigate({ to: "/expenses" });

      // loading state
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });

      try {
        // success state
        const newExpense = await createExpense({ value });

        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        });
        toast("Expense created", {
          description: `Successfully created new expense: ${newExpense.title}.`,
        });
      } catch (error) {
        // error state
        toast("Error", {
          description: "Failed to create new expense.",
        });
        console.error(error);
      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });
  return (
    <div className="p-2 max-w-xl m-auto">
      <h2>Create Expense</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-y-4max-w-xl m-auto"
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Title:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </div>
            );
          }}
        />

        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={(field) => {
            return (
              <div>
                <Label htmlFor={field.name}>Amount:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </div>
            );
          }}
        />

        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => {
            return (
              <div className="flex flex-col space-y-1">
                <Label htmlFor={field.name}>Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !field.state.value && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.state.value ? (
                        format(new Date(field.state.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        field.state.value
                          ? new Date(field.state.value)
                          : undefined
                      }
                      onSelect={(date) =>
                        field.handleChange(date?.toISOString() ?? "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
              </div>
            );
          }}
        />

        {/* <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={(field) => {
            return (
              <div className="self-center">
                <Calendar
                  mode="single"
                  selected={new Date(field.state.value)}
                  onSelect={(date) =>
                    field.handleChange((date ?? new Date()).toISOString())
                  }
                  className="rounded-md border"
                />
              </div>
            );
          }}
        /> */}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-4" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
