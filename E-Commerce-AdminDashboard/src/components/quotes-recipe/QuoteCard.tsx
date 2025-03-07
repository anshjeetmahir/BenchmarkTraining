import { Card, CardContent, Typography } from "@mui/material";
import { QuoteCardProps } from "@/context/types";

const QuoteCard: React.FC<QuoteCardProps> = ({ text, author }) => {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
                <Typography variant="body1" fontStyle="italic" gutterBottom>
                    "{text}"
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" align="right">
                    - {author}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default QuoteCard;
