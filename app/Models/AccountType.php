<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountType extends Model
{
    use HasUuids, HasFactory;
    protected $table = 'account_types';

    protected $fillable = [
        'name',
        'client_id',
        'client_secret',
        'scope',
        'redirect_uri',
        'status',
    ];
}
