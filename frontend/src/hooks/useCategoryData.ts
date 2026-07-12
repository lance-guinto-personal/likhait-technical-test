import { useCallback, useEffect, useState } from "react";
import { createCategory, fetchCategories } from "../services/api";
import { Category, CategoryFormData } from "../types";

export function useCategoryData() {
	const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

	const getCategories = useCallback(async () => {
		try {
			setLoading(true);
			const data = await fetchCategories();
			setCategories(data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleAddCategory = useCallback(async (data: CategoryFormData) => {
		try {
			await createCategory(data);
			getCategories();
		} catch (error) {
			console.error("Error creating category:", error);
			throw error;
		}
	}, [getCategories]);

	useEffect(() => {
		getCategories();
	}, [getCategories]);

	return {
		categories, 
		loading, 
		handleAddCategory };
}