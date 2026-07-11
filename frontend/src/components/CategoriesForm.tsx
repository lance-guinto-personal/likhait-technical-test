import React from "react";
import { CategoryFormData } from "../types";
import { useCategoryForm } from "../hooks/useCategoryForm";

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CategoryForm({
	initialData,
	onSubmit,
  onCancel,
  submitLabel = "Add Expense",
}: CategoryFormProps) {
	const { formData, errors, isSubmitting, handleChange, handleSubmit } = useCategoryForm({
		initialData,
		onSubmit,
	});

	const formStyle: React.CSSProperties = {
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
		};

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
			
		</form>
  );
}