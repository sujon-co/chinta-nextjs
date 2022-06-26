import { NextPage } from 'next';
import Image from 'next/image';

interface Props {}

const SignIn: NextPage<Props> = () => {
    return (
        <section className="form-signin w-100 m-auto">
            <form className="login-form">
                <div className="text-center mb-3">
                    <Image
                        src="/logo.svg"
                        alt="brand logo"
                        layout="fixed"
                        height={60}
                        width={56}
                    />
                </div>
                <h1 className="h5 mb-3 fw-normal text-center text-uppercase ">
                    Dashboard Login
                </h1>

                <div className="form-floating mb-2">
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        id="floatingInput"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        id="floatingPassword"
                        placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox my-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember
                        me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-dark" type="submit">
                    Sign in
                </button>
            </form>
        </section>
    );
};
export default SignIn;
