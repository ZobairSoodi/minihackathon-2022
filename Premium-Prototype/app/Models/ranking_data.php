<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ranking_data extends Model
{

    protected $table = "ranking_data";
    // protected $cul = ["name","score"];
    protected $fillable = ['name', 'score'];  
    public $timestamps = false;

}
