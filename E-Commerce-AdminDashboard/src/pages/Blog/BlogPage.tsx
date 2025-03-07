
import { useState } from "react";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/postApi";
import { IPost } from "@/context/types";
import BlogList from "@/components/blog/BlogList";



const BlogPage = () => {
    const { data: posts, isLoading, isError } = useQuery<IPost[], Error>({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    const [page, setPage] = useState(1);
    const postsPerPage = 6;

    const startIndex = (page - 1) * postsPerPage;
    const paginatedPosts = posts?.slice(startIndex, startIndex + postsPerPage);
    const pageCount = posts ? Math.ceil(posts.length / postsPerPage) : 1;

    if (isError) return "Failed to load posts.";

    return (
        <div style={{ justifyContent: "center", textAlign: "center", padding: "20px" }}>
            <Box p={3}>
                <Typography variant="h4" sx={{ marginBottom: "25px", textAlign: "center" }}>
                    Blog & Comments
                </Typography>

                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <BlogList paginatedPosts={paginatedPosts} />
                )}

                <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            </Box>
        </div>
    );
};

export default BlogPage;
