import { Card, Typography, Box, Chip } from "@mui/material";
import { PostDetailsProps } from "@/context/types";



const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
    return (
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {post?.title}
            </Typography>
            <Typography variant="body1">{post?.body}</Typography>

            <Box mt={2} mb={1}>
                {post?.tags.map((tag) => (
                    <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
                ))}
            </Box>

            <Typography variant="subtitle2" color="textSecondary">
                👍 {post?.reactions.likes} | 👎 {post?.reactions.dislikes} | 👀 {post?.views} Views
            </Typography>
        </Card>
    );
};

export default PostDetails;
