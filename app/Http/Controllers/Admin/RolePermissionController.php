<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class RolePermissionController extends Controller
{
    public function list(Request $request)
    {
        if (!Gate::allows('list-role')) {
            abort(403);
        }
        $data = Role::with('permissions')->paginate($request->per_page);

        return response()->json([
            'data' => $data->items(),
            'total' => $data->total(),
            'current_page' => $data->currentPage(),
            'per_page' => $data->perPage(),
        ]);
    }
    public function index()
    {
        if (!Gate::allows('list-role')) {
            abort(403);
        }
        return Inertia::render('Admin/RolePermissions/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Gate::allows('create-role')) {
            abort(403);
        }
        $permissions = Permission::all();
        return Inertia::render('Admin/RolePermissions/Form', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!Gate::allows('create-role')) {
            abort(403);
        }
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'required',
        ]);

        $role = Role::create([
            'name' => $request->name,
        ]);

        $role->permissions()->sync($request->permissions);
        return redirect()->route('role-permissions.index')->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($role)
    {
        if (!Gate::allows('edit-role')) {
            abort(403);
        }
        $role = Role::with('permissions')->find($role);
        $permissions = Permission::all();
        return Inertia::render('Admin/RolePermissions/Form', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (!Gate::allows('edit-role')) {
            abort(403);
        }
        $request->validate([
            'name' => 'required',
        ]);

        $role = Role::find($id);
        $role->name = $request->name;
        $role->save();

        $role->permissions()->sync($request->permissions);
        return redirect()->route('role-permissions.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($uuid)
    {
        if (!Gate::allows('delete-role')) {
            abort(403);
        }
        $role = Role::find($uuid);
        if ($role) {
            $role->permissions()->detach();
            $role->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Role deleted successfully',
            ]);
        }
    }
}
