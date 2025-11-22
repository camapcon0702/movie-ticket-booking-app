import "./style.css";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../../redux/store";
// import { loginAction } from "../../../../redux/actions/auth";
// import {
//     ROUTES,
//     MESSAGES,
//     STORAGE_KEYS,
// } from "../../../../constants/app.constants";
// import type { ILoginFormValues } from "../../../../types/auth.types";
import { useState, useEffect } from "react";
// import { tokenService } from "../../../../services/token.service";
import { MESSAGES, ROUTES } from "../../../constants/app.constants";

const LoginComponent = () => {
    // const navigate = useNavigate();
    // const dispatch = useAppDispatch();
    // const authState = useAppSelector((state) => state.auth);
    // const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const savedEmail = localStorage.getItem(STORAGE_KEYS.REMEMBER_EMAIL);
    //     if (savedEmail) {
    //         form.setFieldsValue({ email: savedEmail, remember: true });
    //     }
    // }, [form]);

    // useEffect(() => {
    //     const tokens = tokenService.getTokens();
    //     if (tokens?.accessToken && authState.isAuthenticated) {
    //         navigate(ROUTES.MAIN.HOME);
    //     }
    // }, [authState.isAuthenticated, navigate]);

    // const handleSubmit = async (values: ILoginFormValues) => {
    //     setLoading(true);

    //     if (values.remember) {
    //         localStorage.setItem(STORAGE_KEYS.REMEMBER_EMAIL, values.email);
    //     } else {
    //         localStorage.removeItem(STORAGE_KEYS.REMEMBER_EMAIL);
    //     }

    //     try {
    //         await dispatch(
    //             loginAction(
    //                 {
    //                     email: values.email,
    //                     password: values.password,
    //                 },
    //                 navigate
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Login error:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="auth-login">
            <div className="auth-login-content">
                {loading && (
                    <div className="loading-overlay">
                        <Spin
                            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                        />
                    </div>
                )}

                <h2 className="txt-title">Đăng Nhập</h2>
                <p className="txt-subtitle">
                    Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
                </p>

                <Form
                // form={form}
                // name="login"
                // layout="vertical"
                // autoComplete="off"
                // onFinish={handleSubmit}
                // requiredMark={false}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: MESSAGES.VALIDATION.EMAIL_REQUIRED,
                            },
                            {
                                type: "email",
                                message: MESSAGES.VALIDATION.EMAIL_INVALID,
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={<MailOutlined className="icon-input" />}
                            placeholder="you@example.com"
                            autoComplete="email"
                            autoCapitalize="none"
                            spellCheck={false}
                            inputMode="email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: MESSAGES.VALIDATION.PASSWORD_REQUIRED,
                            },
                            {
                                min: 6,
                                message: MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH,
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined className="icon-input" />}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </Form.Item>

                    <div className="login-actions">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>
                        <Link to={ROUTES.AUTH.FORGOT_PASSWORD} className="forgot-link">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginComponent;
