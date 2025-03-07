import { Card, Typography, List, ListItem, ListItemText } from "@mui/material";
import { CommentSectionProps } from "@/context/types";



const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
    return (
        <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, height: "400px", overflowY: "auto" }}>
            <Typography variant="h6" mb={2} fontWeight="bold">
                Comments
            </Typography>

            {comments.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                    No comments yet.
                </Typography>
            ) : (
                <List>
                    {comments.map((comment) => (
                        <ListItem key={comment.id} divider>
                            <ListItemText primary={comment.body} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Card>
    );
};

export default CommentSection;
