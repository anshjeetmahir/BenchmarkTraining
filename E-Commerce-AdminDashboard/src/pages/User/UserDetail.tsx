
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUserById, updateUser } from "@/api/userApi";
import { Card, CardContent, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IUserDetail } from "@/context/types";
import UserInfo from "../../components/user/UserInfo";
import UserAddress from "../../components/user/UserAddress";
import UserEducation from "../../components/user/UserEducation";
import UserCompany from "../../components/user/UserCompany";
import UserBank from "../../components/user/UserBank";
import EditUserDialog from "../../components/user/EditUserDialog";

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: user, isLoading } = useQuery<IUserDetail>({
        queryKey: ["user", id],
        queryFn: () => fetchUserById(Number(id)),
    });

    const mutation = useMutation<IUserDetail, Error, Partial<IUserDetail>>({
        mutationFn: (updatedData: Partial<IUserDetail>) => updateUser(Number(id), updatedData),
        onSuccess: () => {
            setAlertMessage("User updated successfully!");
            setAlertOpen(true);
            setEditMode(false);
            setTimeout(() => setAlertOpen(false), 3000);
        },
    });

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Partial<IUserDetail>>({});
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
    if (!user) return <Typography>User not found.</Typography>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Card sx={{ maxWidth: 700, margin: "20px auto", padding: "20px" }}>
            <CardContent>
                <Typography variant="h5" sx={{ textAlign: "center" }}>User Details</Typography>
                {alertOpen && <Alert severity="success">{alertMessage}</Alert>}
                <UserInfo user={user} />
                <UserAddress user={user} />
                <UserEducation user={user} />
                <UserCompany user={user} />
                <UserBank user={user} />
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>Edit</Button>
                <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={() => navigate(-1)}>Back</Button>
            </CardContent>
            <EditUserDialog open={editMode} handleClose={() => setEditMode(false)} formData={formData} handleChange={handleChange} handleUpdate={() => mutation.mutate(formData)} />
        </Card>
    );
};

export default UserDetails;
