import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import account from '../../../data/account';
// components
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const username = useRef(null);
  const password = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    console.log(username.current.value, password.current.value);
    // for ( const user1 of account){
    //   if( user1.username === username.current.value && user1.password === password.current.value){
    //     sessionStorage.setItem("username", username.current.value);
    //     navigate('/dashboard', { replace: true });
    //     break;
    //   }
    // }
    if (validateEmail(username.current.value)) {
      account.forEach((item) => {
        if (item.username === username.current.value && item.password === password.current.value) {
          sessionStorage.setItem("username", username.current.value);
          navigate("/dashboard", { replace: true });

        }
      })
    } else {
      toast("Email không hợp lệ")
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField defaultValue={"truonghoang@gmail.com"} inputRef={username} name="email" label="Email" />

        <TextField
          inputRef={password}
          name="password"
          label="Mật khẩu"
          defaultValue={1}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Grid>
          <Checkbox name="remember" label="Remember me" />
          Nhớ mật khẩu
        </Grid>
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Đăng nhập
      </LoadingButton>
      <ToastContainer />
    </>
  );
}
