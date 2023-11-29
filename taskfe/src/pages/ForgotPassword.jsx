import styled from '@emotion/styled';
// @mui
import { MuiOtpInput } from 'mui-one-time-password-input'
import React, { useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';

// @hooks
import useResponsive from '../hooks/useResponsive';

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledReSend = styled('span') `
    color: #551a8b;
    text-decoration: underline;
    margin-left: 8px;
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`
const ForgotPassword = () => {
    const navigate = useNavigate();
    // const stackRef1 = useRef(null);
    // const stackRef2 = useRef(null);
    // const stackRef3 = useRef(null);
    const [activeStack, setActiveStack] = useState(1); // Ban đầu hiển thị Stack 1
    const [showToast, setShowToast] = useState(false);
    // const [showStack1, setShowStack1] = useState(true);
    // const [showStack2, setShowStack2] = useState(false);
    // const [showStack3, setShowStack3] = useState(false);
    const [otp, setOtp] = useState('');

    const mdUp = useResponsive('up', 'md');
    const handleClick = () => {
        if (activeStack === 3) {
            // navigate('/login', { state: { showToast: true, message: 'Cập nhật mật khẩu thành công' } });
            navigate('/login');
        } else {
            setActiveStack((prevStack) => {
                const nextStack = prevStack === 3 ? 1 : prevStack + 1;
                return nextStack;
            });
        }
    };

    const handleChange = (newValue) => {
        setOtp(newValue)
      }
    
    return (
        <div style={{ display: 'flex'}}>
            {mdUp && (
                <StyledSection>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Hi, Welcome Back
                    </Typography>
                    <img src="/assets/illustrations/illustration_login.png" alt="login" />
                </StyledSection>
            )}
            <Container maxWidth="sm" style={{display: 'flex'}}>
                <Stack  spacing={3} style={{margin: 'auto', display: activeStack === 1 ? 'flex' : 'none'}}>
                    <h2>Quên mật khẩu?</h2>
                    <span>
                        Đừng lo khi điều này xảy ra. Vui lòng nhập email của bạn. Chúng tôi sẽ gửi mã OTP vào vào email này.
                    </span>
                    <TextField id="Email" label="Email" variant="outlined" />
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <Link to="/login" >Quay lại trang đăng nhập</Link>
                    </div>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>handleClick}>
                        Tiếp tục
                    </LoadingButton>
                </Stack>

                <Stack  spacing={3} style={{margin: 'auto', display: activeStack === 2 ? 'flex' : 'none'}}>
                    <h2>Xác thực OTP</h2>
                    <div>Nhập mã chúng tôi đã gửi đến truo**@***.com</div>
                    <MuiOtpInput length={6} value={otp} onChange={handleChange} />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>handleClick}>
                        Tiếp tục
                    </LoadingButton>
                    <div style={{display: 'flex', justifyContent: 'center'}}>Không nhận được mã? <StyledReSend>Gửi lại</StyledReSend></div>
                </Stack>

                <Stack  spacing={3} style={{margin: 'auto', display: activeStack === 3 ? 'flex' : 'none'}}>
                    <h2>Cài đặt mật khẩu mới</h2>
                    <span>Mật khẩu của bạn phải dài từ 8 đến 16 ký tự, phải chứa ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự số và 1 ký tự đặc biệt</span>
                    <TextField id="password" label="Mật khẩu mới" variant="outlined" />
                    <TextField id="confirm-password" label="Xác nhận mật khẩu " variant="outlined" />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={()=>handleClick}>
                        Xác nhận
                    </LoadingButton>
                </Stack>
            </Container>
        </div>
    );
};

export default ForgotPassword;
