
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById, fetchComments } from "../../api/postApi";
import { useEffect } from "react";
import { useCommentStore } from "../../store/commentStore";
import { Box, Typography, CircularProgress } from "@mui/material";
import { IPostBlog, IComment } from "@/context/types";
import PostDetails from "../../components/blog/PostDetail";
import CommentSection from "../../components/blog/CommentSection";
import AddComment from "../../components/blog/AddComment";

const BlogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);
    const { comments, setComments } = useCommentStore();

    const { data: post, isLoading: postLoading, isError: postError } = useQuery<IPostBlog, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchPostById(postId),
        enabled: !!postId,
    });

    const { data: fetchedComments, isLoading: commentsLoading, isError: commentsError } = useQuery<IComment[], Error>(
        {
            queryKey: ["comments", postId],
            queryFn: () => fetchComments(),
            enabled: !!postId,
        }
    );

    useEffect(() => {
        if (fetchedComments) {
            setComments(fetchedComments);
        }
    }, [fetchedComments, setComments]);

    if (postLoading || commentsLoading) return <CircularProgress />;
    if (postError || commentsError) return <Typography color="error">Failed to load content.</Typography>;

    return (
        <Box p={4}>
            <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center">
                Blog & Comments
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                    gap: 3,
                }}
            >
                <PostDetails post={post!} />
                <CommentSection comments={comments} />
            </Box>

            <AddComment postId={postId} />
        </Box>
    );
};

export default BlogDetailPage;
