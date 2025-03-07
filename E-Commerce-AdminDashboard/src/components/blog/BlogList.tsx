import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BlogListProps } from "@/context/types";


const BlogList: React.FC<BlogListProps> = ({ paginatedPosts }) => {
    return (
        <Box display="grid" gridTemplateColumns="repeat(3, minmax(300px, 1fr))" gap={2}>
            {paginatedPosts?.map((post) => (
                <Card
                    key={post.id}
                    component={Link}
                    to={`/admin/blog-comment/${post.id}`}
                    sx={{ textDecoration: "none" }}
                >
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {post.body.substring(0, 100)}...
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default BlogList;
