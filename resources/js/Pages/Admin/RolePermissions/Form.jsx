import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import Icon from '@/Components/MiniComponent/Icon';
import ToastNotifier from '@/Components/Alerts/ToastNotifier';
import InputError from '@/Components/InputError';
import SelectOption from '@/Components/MiniComponent/SelectOption';

export default function Form({ role, permissions }) {
  
  const { data: formData, setData, post, put, processing, errors, reset } = useForm({
    name: role?.name || '',
    permissions: role?.permissions.map(perm => perm.uuid) || [], // Store only UUIDs
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      window.scrollTo(0, 0);
    }
  }, [errors]);

  // Handle both input fields and multi-select
  const handleChange = (e) => {    
    if (Array.isArray(e)) {
      setData("permissions", e.map(option => option.value));  // Extract only UUIDs
    } else {
      const { name, value, type, checked } = e.target;    
      setData(name, type === 'checkbox' ? checked : value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role?.uuid) {
      put(route('role-permissions.update', role.uuid), { onFinish: () => reset() });
    } else {
      post(route('role-permissions.store'), { onFinish: () => reset() });
    }
  };

  return (
    <AuthenticatedLayout>
      <ToastNotifier />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="ms-auto">
              <div className="btn-group">
                <Link href={route('role-permissions.index')} type="button" className="btn btn-primary btn-sm">
                  <Icon iconClass='lni lni-angle-double-left' />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 mx-auto">
              <div className="card border-top border-0 border-4 border-primary">
                <div className="card-body p-5">
                  <div className="card-title d-flex align-items-center">
                    <h5 className="mb-0 text-primary">{role ? 'Edit' : 'Create'} Role</h5>
                  </div>
                  <hr />
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-3">
                      <InputLabel htmlFor="name" className="form-label">
                        Name
                      </InputLabel>
                      <TextInput
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <InputError message={errors.name} />
                    </div>

                    <div className="col-md-9">
                      <InputLabel className="form-label">Permissions</InputLabel>
                      <SelectOption
                          options={permissions.map(perm => ({ value: perm.uuid, label: perm.name }))}
                          isMulti={true}
                          placeholder="Select Permissions"
                          onChange={handleChange}  
                          value={permissions
                              .filter(perm => formData.permissions.includes(perm.uuid)) // Match UUIDs
                              .map(perm => ({ value: perm.uuid, label: perm.name }))}
                          closeMenuOnSelect={false}  // Allows multiple selection
                          isSearchable={true}        // Enables search functionality
                      />
                      <InputError message={errors.permissions} />
                    </div>

                    <div className="col-12">
                      <PrimaryButton type="submit" className="btn-primary px-5" disabled={processing}>
                        {role ? 'Update' : 'Create'}
                      </PrimaryButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

