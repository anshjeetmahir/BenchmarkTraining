import { useState } from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../api/postApi";
import { useCommentStore } from "../../store/commentStore";
import { AddCommentProps } from "@/context/types";


const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
    const queryClient = useQueryClient();
    const { comments, setComments } = useCommentStore();
    const [newComment, setNewComment] = useState("");

    const commentMutation = useMutation({
        mutationFn: async () => {
            if (!newComment.trim()) return;
            const addedComment = await addComment(postId, newComment);
            setComments([...comments, addedComment]);
            setNewComment("");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
    });

    return (
        <Card sx={{ p: 3, mt: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" mb={2} fontWeight="bold">
                Add a Comment
            </Typography>
            <TextField
                fullWidth
                label="Write your comment..."
                variant="outlined"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                multiline
                rows={3}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => commentMutation.mutate()}
                disabled={commentMutation.isPending}
            >
                {commentMutation.isPending ? "Adding..." : "Add Comment"}
            </Button>
        </Card>
    );
};

export default AddComment;
