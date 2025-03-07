import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Box, Typography, Pagination } from "@mui/material";
import { fetchQuotes } from "../../api/recipeQuotesApi";
import QuoteCard from "./QuoteCard";
import { IQuote } from "@/context/types";

const QuotesSection = () => {
    const [quotePage, setQuotePage] = useState(1);
    const itemsPerPage = 6;

    const { data: quotes, isLoading, isError } = useQuery<IQuote[]>({
        queryKey: ["quotes"],
        queryFn: fetchQuotes,
    });

    if (isError) return <Typography color="error">Failed to load quotes.</Typography>;

    const paginatedQuotes = quotes?.slice((quotePage - 1) * itemsPerPage, quotePage * itemsPerPage);

    return (
        <>
            <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center" marginTop="20px">
                Motivational Quotes
            </Typography>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 3,
                    }}
                >
                    {paginatedQuotes?.map((quote) => (
                        <QuoteCard key={quote.id} text={quote.quote} author={quote.author} />
                    ))}
                </Box>
            )}

            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={Math.ceil((quotes?.length || 0) / itemsPerPage)}
                    page={quotePage}
                    onChange={(_, value) => setQuotePage(value)}
                    color="primary"
                />
            </Box>
        </>
    );
};

export default QuotesSection;
