import { useContext } from "react";
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement
import { addUser } from "../../Service/api";

const Component = styled(Box)({
  display: 'flex',
});

const Container = styled(Box)({
  padding: '56px 0 56px 56px',
});

const QRCode = styled('img')({
  margin: '50px 0 0 50px',
  height: 264,
  width: 264
});

const Title = styled(Typography)({
  fontSize: '26px',
  marginBottom: '25px',
  color: '#525252',
  fontFamily: 'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
  fontWeight: 300,
});

const StyledList = styled(List)({
  '& > li': {
    padding: 0,
    marginTop: '15px',
    fontSize: '18px',
    lineHeight: '28px',
    color: '#4a4a4a',
  },
});

const dialogStyle = {
  height: '96%',
  marginTop: '12%',
  width: '60%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  overflow: 'hidden'
};

// Define LoginDialog component
const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);
  
  const onLoginSuccess = async(res) => {
    // Handle successful login
    const decoded = jwtDecode(res.credential);
    setAccount(decoded); // Corrected usage
    await addUser(decoded)
  };

  const onLoginError = (res) => {
    // Handle login error
    console.log('Login Failed', res);
  };

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
    >
      <Component>
        <Container>
          <Title>To use WhatsApp on your compiler:</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: 'relative' }}>
          <QRCode src={qrCodeImage} alt="qr code" />
          <Box style={{ position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)' }}>
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError}
            />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog; // Export LoginDialog as the default export
