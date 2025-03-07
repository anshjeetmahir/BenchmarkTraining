
import { Container, Divider } from "@mui/material";
import QuotesSection from "../../components/quotes-recipe/QuotesSection";
import RecipesSection from "../../components/quotes-recipe/RecipesSection";

const RecipesPage = () => {
    return (
        <Container sx={{ justifyContent: "center", textAlign: "center", padding: "20px" }}>
            <QuotesSection />
            <Divider sx={{ my: 4 }} />
            <RecipesSection />
        </Container>
    );
};

export default RecipesPage;
