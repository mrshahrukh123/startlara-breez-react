import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        account_type: 'personal',  // Default to personal account
        company_website: '',       // For business accounts
        product_id: '',            // Dynamic product ID
        plan_id: '',               // Dynamic plan ID
    });

    // Separate state variables for controlling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(data.account_type);
    const [product, setProduct] = useState(null);
    const [plan, setPlan] = useState(null);

    // For toggling password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleAccountTypeChange = (e) => {
        const selectedType = e.target.value;
        setAccountType(selectedType);
        setData('account_type', selectedType);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Handling dynamic plan and product data
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedString = urlParams.get('plan');
        if (encodedString) {
            const decodedUrl = decodeURIComponent(encodedString);
            const queryString = atob(decodedUrl);
            const params = new URLSearchParams(queryString);
            setPlan(params.get('plan'));
            setProduct(params.get('product'));
            setData('product_id', params.get('product'));
            setData('plan_id', params.get('plan'));
        }
    }, []);

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="card">
                <div className="card-body">
                    <div className="border p-4 rounded">
                        <div className="text-center">
                            <h3>Create an Account!</h3>
                            <p>
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                        <div className="form-body">
                            <form className="row g-3" onSubmit={submit}>
                                <div className="col-12">
                                    <InputLabel htmlFor="name" value="Name or Company Name" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="form-control"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2 text-danger"/>
                                </div>

                                <div className="col-12">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="form-control"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="col-12">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <div className="input-group" id="show_hide_password">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={data.password}
                                            className="form-control border-end-0"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <a
                                            href="#"
                                            onClick={togglePasswordVisibility}
                                            className="input-group-text bg-transparent"
                                        >
                                            <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}></i> {/* Toggle icon */}
                                        </a>
                                    </div>
                                    <InputError message={errors.password} className="mt-2 text-danger"/>
                                </div>

                                <div className="col-12">
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                                    <div className="input-group" id="show_hide_password">
                                        <TextInput
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="form-control border-end-0"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <a
                                            href="#"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="input-group-text bg-transparent"
                                        >
                                            <i className={`bx ${showConfirmPassword ? 'bx-show' : 'bx-hide'}`}></i> {/* Toggle icon */}
                                        </a>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2 text-danger"/>
                                </div>

                                <div className="col-12">
                                    <InputLabel htmlFor="account_type" value="Account Type" />
                                    <select
                                        id="account_type"
                                        name="account_type"
                                        className="form-select"
                                        value={accountType}
                                        onChange={handleAccountTypeChange}
                                    >
                                        <option value="personal">Personal</option>
                                        <option value="business">Business</option>
                                    </select>
                                    <InputError message={errors.account_type} className="mt-2 text-danger" />
                                </div>

                                {accountType === 'business' && (
                                    <div className="col-12">
                                        <InputLabel htmlFor="company_website" value="Company Website" />
                                        <TextInput
                                            id="company_website"
                                            name="company_website"
                                            value={data.company_website}
                                            className="form-control"
                                            onChange={(e) => setData('company_website', e.target.value)}
                                        />
                                        <InputError message={errors.company_website} className="mt-2 text-danger" />
                                    </div>
                                )}

                                <div className="col-12">
                                    <input type="hidden" name="product_id" value={data.product_id} />
                                    <input type="hidden" name="plan_id" value={data.plan_id} />
                                </div>

                                <div className="col-12">
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary" disabled={processing}>
                                            <i className="bx bx-user"></i> Register Account
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
