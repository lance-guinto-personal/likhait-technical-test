import React from "react";
import { CategoryFormData } from "../types";
import { useCategoryForm } from "../hooks/useCategoryForm";
import { TextField, Button, ItemTable } from "../vibes";

interface CategoryFormProps {
	existingCategories?: string[];
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CategoryForm({
	existingCategories,
	initialData,
	onSubmit,
  onCancel,
  submitLabel = "Add Category",
}: CategoryFormProps) {
	const { formData, errors, isSubmitting, handleChange, handleSubmit } = useCategoryForm({
		initialData,
		onSubmit,
	});

	const categoryColumns = [
		{ key: "name", header: "Existing Categories" },
	];

	const divStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		gap: "1rem",
	};

	const formStyle: React.CSSProperties = {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		gap: "1rem",
	};

	const tableStyle: React.CSSProperties = {
		flex: 1,
	};
	
	const buttonGroupStyle: React.CSSProperties = {
		display: "flex",
		gap: "0.5rem",
		marginTop: "0.5rem",
	};

  return (
		<div style={divStyle}>
			<div style={tableStyle}>
				<ItemTable 
					columns={categoryColumns} 
					data={existingCategories?.map((name) => ({ name })) || []} 
					emptyMessage="No categories found." 
				/>
			</div>
			<form onSubmit={handleSubmit} style={formStyle}>
				<TextField
					label="Name"
					type="text"
					placeholder="Enter category name"
					value={formData.name}
					onChange={(e) => handleChange("name", e.target.value)}
					error={errors.name}
					fullWidth
					required
				/>
				<div style={buttonGroupStyle}>
					<Button
						type="submit"
						variant="primary"
						disabled={isSubmitting}
						fullWidth
					>
						{isSubmitting ? "Submitting..." : submitLabel}
					</Button>
					{onCancel && (
						<Button
							type="button"
							variant="secondary"
							onClick={onCancel}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
					)}
				</div>
			</form>
		</div>
  );
}