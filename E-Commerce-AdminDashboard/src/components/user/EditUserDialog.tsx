import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { IUserDetail } from "@/context/types";

interface EditUserDialogProps {
    open: boolean;
    handleClose: () => void;
    formData: Partial<IUserDetail>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdate: () => void;
}

const EditUserDialog = ({ open, handleClose, formData, handleChange, handleUpdate }: EditUserDialogProps) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
                <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
                <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth sx={{ mt: 2 }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdate}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserDialog;
