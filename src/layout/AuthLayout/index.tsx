import { Outlet } from "react-router-dom";
import "./style.css";
const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-content">
                <div className="auth-content-left">
                    <div className="auth-content-left-content">
                        <h1 className="txt-title">CINEMA</h1>
                        {/* <p className="txt-desc">
                            Xem ngay những bộ phim yêu thích của bạn với trải nghiệm đặt vé nhanh chóng
                            và tiện lợi.
                        </p> */}
                    </div>
                </div>
                <div className="auth-content-right">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default AuthLayout;
