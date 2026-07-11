import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import HistoryPage from "./pages/HistoryPage";
import { COLORS } from "./constants/colors";
import { Modal } from "./vibes";
import { CategoryForm } from "./components/CategoriesForm";
import { Category, CategoryFormData } from "./types";
import { createCategory, fetchCategories } from "./services/api";

function App() {
	const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("history");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategories();
	}, []);	
	
	const getCategories = async () => {
		try {
			setLoading(true);
			const data = await fetchCategories();
			setCategories(data);
			console.log("Categories fetched:", categories);
		} catch (error) {
			console.error("Error fetching categories:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleAddCategory = async (data: CategoryFormData) => {
		try {
			await createCategory(data);
			getCategories();
		} catch (error) {
			console.error("Error creating category:", error);
			throw error;
		}
	};

  const appStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: isSidebarCollapsed ? "80px" : "360px",
    transition: "margin-left 0.3s ease",
  };	
	
	const loadingStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "48px",
		fontSize: "18px",
		color: COLORS.secondary.s08,
	};

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={appStyle}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
  			onOpenSettings={() => setIsSettingsOpen(true)}
      />
			{loading ? (
          <div style={loadingStyle}>Loading...</div>
        ) : (					
					<main style={mainStyle}>
						{currentPage === "history" && <HistoryPage categoryNames={categories.map((cat) => cat.name)} />}
					</main>
				)
			}
			<Modal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				title="Settings"
				>
				<CategoryForm 
					existingCategories={categories.map((cat) => cat.name)}
					onSubmit={handleAddCategory} 
					submitLabel="Add Category"
				/>
			</Modal>
    </div>
  );
}

export default App;
