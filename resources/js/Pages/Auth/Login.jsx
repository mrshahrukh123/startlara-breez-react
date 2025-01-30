import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Icon from '@/Components/MiniComponent/Icon';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
    showPassword: false, // Track password visibility
  });

  // Submit form handler
  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setData('showPassword', !data.showPassword);
  };

  return (
    <GuestLayout>
      <Head title="Login" />
      <div className="card">
        <div className="card-body">
          <div className="border p-4 rounded">
            <div className="text-center">
              <h3>Sign in</h3>
              <p>
                Don't have an account yet?{' '}
                <Link
                  href={route('register')}
                  className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Sign up here
                </Link>
              </p>
            </div>
            <div className="login-separater text-center mb-4">
              <span>SIGN IN WITH EMAIL</span>
              <hr />
            </div>
            <form className="row g-3" onSubmit={submit}>
              {/* Email field */}
              <div className="col-12">
                <InputLabel htmlFor="inputEmailAddress" className="form-label" value="Email Address" />
                <TextInput
                  type="email"
                  className="form-control"
                  id="inputEmailAddress"
                  placeholder="Email Address"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2 text-danger" />
              </div>

              {/* Password field */}
              <div className="col-12">
                <InputLabel htmlFor="inputChoosePassword" className="form-label" value="Password" />
                <div className="input-group" id="show_hide_password">
                  <TextInput
                    type={data.showPassword ? 'text' : 'password'}
                    className="form-control border-end-0"
                    id="inputChoosePassword"
                    value={data.password}
                    name="password"
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                  <a
                    href="#"
                    onClick={togglePasswordVisibility}
                    className="input-group-text bg-transparent"
                  >
                    <i className={`bx ${data.showPassword ? 'bx-show' : 'bx-hide'}`}></i> {/* Toggle icon */}
                  </a>
                </div>
                <InputError message={errors.password} className="mt-2 text-danger" />
              </div>

              {/* Remember Me checkbox */}
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <TextInput
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                  />
                  <InputLabel className="form-check-label" htmlFor="flexSwitchCheckChecked">
                    Remember Me
                  </InputLabel>
                </div>
              </div>

              {/* Forgot Password link */}
              <div className="col-md-6 text-end">
                <Link
                  href={route('password.request')}
                  className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <div className="d-grid">
                  <PrimaryButton type="submit" className="btn btn-primary" disabled={processing}>
                    <Icon iconClass="bx bxs-lock-open" />
                     Sign in
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
