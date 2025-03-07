// import { Card, CardContent } from "@mui/material";
// import LogoutMessage from "./LogoutMessage";

// interface LogoutContainerProps {
//     isAuthenticated: boolean;
//     username: string;
//     handleLogout: () => void;
//     navigateToLogin: () => void;
// }

// const LogoutContainer: React.FC<LogoutContainerProps> = ({ isAuthenticated, username, handleLogout, navigateToLogin }) => {
//     return (
//         <Card sx={{ maxWidth: 450, margin: "auto", mt: 5, p: 3, textAlign: "center", boxShadow: 3 }}>
//             <CardContent>
//                 <LogoutMessage
//                     isAuthenticated={isAuthenticated}
//                     username={username}
//                     handleLogout={handleLogout}
//                     navigateToLogin={navigateToLogin}
//                 />
//             </CardContent>
//         </Card>
//     );
// };

// export default LogoutContainer;


import { Card, CardContent } from "@mui/material";
import LogoutContent from "../../components/logout/LogoutMessage";

interface LogoutContainerProps {
    isAuthenticated: boolean;
    username: string | null; // Allow null values
    handleLogout: () => void;
    navigateToLogin: () => void;
}

const LogoutContainer: React.FC<LogoutContainerProps> = ({
    isAuthenticated,
    username,
    handleLogout,
    navigateToLogin,
}) => {
    return (
        <Card sx={{ maxWidth: 450, margin: "auto", mt: 5, p: 3, textAlign: "center", boxShadow: 3 }}>
            <CardContent>
                <LogoutContent
                    isAuthenticated={isAuthenticated}
                    username={username ?? ""} // Ensure it's always a string
                    handleLogout={handleLogout}
                    navigateToLogin={navigateToLogin}
                />
            </CardContent>
        </Card>
    );
};

export default LogoutContainer;
